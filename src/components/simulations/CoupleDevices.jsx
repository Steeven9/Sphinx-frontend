import React, {useEffect, useReducer} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import '../../css/scenes.css';
import devicesReducer from "../../reducers/devicesReducer";

const params = (new URL(document.location)).searchParams;
const path = window.location.pathname.toLowerCase().split('/');
const fetchUrl = window.location.protocol + '//' + window.location.hostname;


const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
    },
    cardHeader: {
        backgroundColor: '#f1f1f1',
        padding: theme.spacing(1, 2),
    },
    list: {
        width: 200,
        height: 230,
        backgroundColor: '#f8f8f8',
        overflow: 'auto',
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
}));

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
    return [...a, ...not(b, a)];
}

/**
 * Compares two arrays and returns the difference
 * @param {} otherArray
 */
function compareArrays(otherArray) {
    return current =>
        otherArray.filter(other => other.id === current.id || other === current.id).length === 0;
}

function getNotUsedDevices(allDevices, currentDevices) {
    return allDevices.filter(compareArrays(currentDevices));
}

// Do not delete!
// function getUsedDevices(allDevices, currentDevices) {
//     return allDevices.filter(compareArrays(allDevices.filter(compareArrays(currentDevices))));
// }

//// Device types guide:
//  1: Light
//  2: DimmableLight
//  3: Switch
//  4: DimmableSwitch
//  5: StatelessDimmableSwitch
//  6: SmartPlug
//  7: HumiditySensor
//  8: LightSensor
//  9: TempSensor
// 10: MotionSensor
// 11: Thermostat
// 12: SmartCurtains
// 13: SecurityCamera
/**
 * Gets all the device types controllable by a parent device of the switches family
 * @param parent
 * @returns {number[]|*[]}
 */
function getDevicesTypesByCoupling(parent) {
    switch (parent.type) {
        case 3: //Switch
            return [1, 2, 6, 13]
        case 4: //DimmableSwitch
            return [2, 12]
        case 5: //StatelessDimmer
            return [2, 12]
        default:
            return []
    }
}

/**
 * Get all the devices that can be controllable by the parent device type and room ID
 * @param parent
 * @param devices
 * @param types
 * @returns {[]}
 */
function getCopulableDevicesByParentTypeAndRoom(parent, devices, types) {
    let filteredDevices = [];
    for (let type of types) {
        for (let device of devices) {
            if (device.type === type && device.roomId === parent.roomId) {
                filteredDevices.push(device)
            }
        }
    }
    return filteredDevices;
}

// const CoupleDevices = (parent) => {
const CoupleDevices = () => {
    const [devices, dispatchDevices] = useReducer(devicesReducer, []);
    const [parent, setParent] = React.useState([]);
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([]);
    const [right, setRight] = React.useState([]);
    const isEditing = path[1].toLowerCase() === "editdevice";
    const leftLength = left.length;
    const rightLength = right.length;
    const classes = useStyles();


    // Fetches user's devices just once
    useEffect(() => {
            // Fetches parent device
            const method = 'GET';
            const headers = {
                'user': localStorage.getItem('username'),
                'session-token': localStorage.getItem('session_token')
            };
            let fetchedDevices = []

            // Fetches all devices
            fetch(fetchUrl + ':8080/devices', {
                method: method,
                headers: headers,
            })
                .then((res) => {
                    if (res.status === 401) {
                        this.props.logOut(1);
                    } else if (res.status === 200) {
                        return res.text();
                    } else {
                        return null;
                    }
                })
                .then((data) => {
                    if (data === null || data.length === 0) {
                        //Do nothing
                    } else {
                        fetchedDevices = JSON.parse(data).sort(function (a, b) {
                            let keyA = a.name;
                            let keyB = b.name;
                            if (keyA < keyB) return -1;
                            if (keyA > keyB) return 1;
                            return 0;
                        });

                        setParent(fetchedDevices.filter(device => device.id === parseInt(params.get('id')))[0])
                        dispatchDevices({type: 'POPULATE_DEVICES', devices: fetchedDevices});
                    }
                })
                .catch(e => {
                    console.log(e);
                });
        }, []
    );

    // Loads the devices to the left or right sides of the Transfer List on page load
    useEffect(() => {
        let devicesTypes = getDevicesTypesByCoupling(parent);
        let filteredDevices = getCopulableDevicesByParentTypeAndRoom(parent, devices, devicesTypes);

        if (parent.switches !== null) {
            let usedDevices = filteredDevices.filter(device => {
                let foundDevices;
                if (device.switched) {
                    foundDevices = device.switched.filter(parentId => parentId === parent.id)
                }
                return foundDevices;
            })

            setRight(getNotUsedDevices(filteredDevices, usedDevices))
            setLeft(usedDevices)
        } else {
            if (leftLength === 0 && rightLength === 0) {
                setRight(filteredDevices)
            }
        }
    }, [parent, devices, leftLength, rightLength, isEditing]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const numberOfChecked = (items) => intersection(checked, items).length;

    const handleToggleAll = (items) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };

    const handleCheckedRight = () => {
        let leftDevices = not(left, leftChecked);
        setRight(right.concat(leftChecked));
        setLeft(leftDevices);
        setChecked(not(checked, leftChecked));

        dispatchDevices({type: 'UPDATE_TRANSFER_LIST_STATE', devices: leftDevices, config: parent});
    };

    const handleCheckedLeft = () => {
        let leftDevices = left.concat(rightChecked);
        setLeft(leftDevices);
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));

        dispatchDevices({type: 'UPDATE_TRANSFER_LIST_STATE', devices: leftDevices, config: parent});
    };

    /**
     * Converts all devices to an array of IDs
     * @param scene
     * @returns {*}
     */
    function convertDevicesToIds(devicesArray) {
        return devicesArray.map(device => device.id)
    }

    /**
     * Couples parent
     */
    function coupleDevices(e) {
        e.preventDefault()
        console.log('coupling')
        const host = window.location.protocol + '//' + window.location.hostname + ':8080';
        const headers = {
            'user': localStorage.getItem('username'),
            'session-token': localStorage.getItem('session_token'),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        const childrenIds = convertDevicesToIds(left)
        const noChildrenIds = convertDevicesToIds(right)

        let method = 'POST';
        childrenIds.forEach(id => {
            console.log(host + '/devices/couple/' + parent.id + '/' + id)

            const devicesFetchUrl = host + '/devices/couple/' + parent.id + '/' + id;
            fetch(devicesFetchUrl, {
                method: method,
                headers: headers
            })
                .then((res) => {
                    if (res.status === 200 || res.status === 204) {
                        console.log(method + ' successful!');
                    } else {
                        console.log(method + ' unsuccessful!');
                    }
                    return res;
                })
                .catch(error => console.log(error))
        })

        method = 'DELETE';
        noChildrenIds.forEach(id => {
            console.log(host + '/devices/couple/' + parent.id + '/' + id)

            const devicesFetchUrl = host + '/devices/couple/' + parent.id + '/' + id;
            fetch(devicesFetchUrl, {
                method: method,
                headers: headers
            })
                .then((res) => {
                    if (res.status === 200 || res.status === 204) {
                        console.log(method + ' successful!');
                        return res
                    } else {
                        console.log(method + ' unsuccessful!');
                        return res
                    }
                })
                .catch(error => console.log(error))
        })
    }

    const customList = (title, items) => (
        <Card>
            <CardHeader
                className={classes.cardHeader}
                avatar={

                    <Checkbox
                        color={'default'}
                        onClick={handleToggleAll(items)}
                        checked={numberOfChecked(items) === items.length && items.length !== 0}
                        indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
                        disabled={items.length === 0}
                        inputProps={{'aria-label': 'all items selected'}}
                    />
                }
                title={title}
                subheader={`${numberOfChecked(items)}/${items.length} selected`}
            />
            <Divider/>
            <List className={classes.list} dense component="div" role="list">
                {items.map((value) => {
                    const labelId = `transfer-list-all-item-${value + '-' + value.id}-label`;
                    return (
                        <ListItem key={value.id} role="listitem" button
                                  onClick={handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    color={'default'}
                                    inputProps={{'aria-labelledby': labelId}}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value.name} secondary={value.roomName}/>
                        </ListItem>
                    );
                })}
                <ListItem/>
            </List>
        </Card>
    );

    return (
        <>
            <div className="editRoom container">
                <div id="editDeviceInfo" className="device-edit-content-box z-depth-2 content-box-transparency">
                    <h2 className="title">Edit device coupling</h2>
                    <div className="coupling-container">
                        <Grid container spacing={0}>
                            <div className="transfer-list-header-max-width">
                                <div className="transfer-list-header">
                            <span
                            >{parent.name}
                            </span>
                                </div>
                            </div>
                        </Grid>
                        <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
                            <Grid item>{customList('Controlling', left)}</Grid>
                            <Grid item>
                                <Grid container direction="column" alignItems="center">
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        className={classes.button}
                                        onClick={handleCheckedRight}
                                        disabled={leftChecked.length === 0}
                                        aria-label="move selected right"
                                    >
                                        &gt;
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        className={classes.button}
                                        onClick={handleCheckedLeft}
                                        disabled={rightChecked.length === 0}
                                        aria-label="move selected left"
                                    >
                                        &lt;
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid item>{customList('Not controlling', right)}</Grid>
                        </Grid>
                        <div className="center">
                            <button type="button" name="button" className="btn-secondary waves-effect waves-light btn"
                                    onClick={() => window.location.href = "/editDevice?id=" + params.get('id')}>Cancel
                            </button>
                            <button type="button" name="button" className="btn-primary waves-effect waves-light btn"
                                    onClick={e => coupleDevices(e)}>Save coupling
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export {CoupleDevices as default}
