import React, {useEffect, useState, useReducer} from 'react'
import DevicesContext from '../../context/devicesContext'
import devicesReducer from '../../reducers/devicesReducer'
import DeviceList from './DeviceList'
import '../../css/collapsible-component.css';
import '../../css/collapsible-devices.css';
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";


const host = window.location.protocol + '//' + window.location.hostname + ':8080';
const params = (new URL(document.location)).searchParams;
const path = window.location.pathname.toLowerCase().split('/');
const devicesFetchUrl = host + '/devices';
const roomDevicesFetchUrl = host + '/rooms/' + params.get('id') + '/devices';
const fetchRoomUrl = host + '/rooms/' + params.get('id');
const fetchUrl = path[1] === 'room' && params.get('id') ? roomDevicesFetchUrl : devicesFetchUrl;
let roomBackground;
let isRoom = false;
let title = "";


/**
 * Generates a panel with a DevicePanel
 * @returns {DevicePanel}
 */
const DevicesPanel = () => {
        const [actionCompleted, setActionCompleted] = React.useState(false);
        const [devices, dispatch] = useReducer(devicesReducer, []);
        const [isDataFound, setIsDataFound] = useState(true);
        const [isLoading, setIsLoading] = useState(true);
        const [isNetworkError, setIsNetworkError] = useState(false);
        const ColorCircularProgress = withStyles({root: {color: '#580B71'},})(CircularProgress);

        if (path[1] === 'room' && params.get('id')) {
            isRoom = true
        }

        // Fetches devices and room info on page load
        useEffect(() => {
            const method = 'GET';
            const headers = {
                'user': localStorage.getItem('username'),
                'session-token': localStorage.getItem('session_token')
            };

            if (isRoom) {
                fetch(fetchRoomUrl, {
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
                    let room = JSON.parse(data);
                    roomBackground = room.background !== null && room.background;
                    title = room.name;
                })
                .catch(e => console.log(e));
            }

            fetch(fetchUrl, {
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
                setIsLoading(false)
                let devices = JSON.parse(data)

                if (devices.length === 0) {
                    setIsDataFound(false);
                } else {
                    devices.sort(function (a, b) {
                        let keyA = a.name.toLowerCase();
                        let keyB = b.name.toLowerCase();

                        if (keyA === keyB) {
                            if (a.id < b.id) return -1;
                            if (a.id > b.id) return 1;
                        }
                        if (keyA < keyB) return -1;
                        return 1;

                    });

                    dispatch({type: 'POPULATE_DEVICES', devices: devices});
                    setIsLoading(false)
                }
            })
            .catch(e => {
                console.log(e);
                setIsLoading(false)
                setIsNetworkError(true)
            });
            setActionCompleted(false)
        }, []);

        // Discards cached state and extract the next one
        useEffect(() => {
        }, [devices]);

        // Refreshes the sensors and thermostats state with setInterval
        useEffect(() => {
                const interval = setInterval(async () => {
                    const method = 'GET';
                    const headers = {
                        'user': localStorage.getItem('username'),
                        'session-token': localStorage.getItem('session_token')
                    };

                    try {
                        let updatedDevices = []

                        async function fetchDevices() {
                            return await (await fetch(fetchUrl, {
                                method: method,
                                headers: headers,
                            })).json();
                        }

                        await updatedDevices.push(await fetchDevices())

                        let filteredSensors = updatedDevices[0].filter(device => {
                            return device.type === 6 ||
                                   device.type === 7 ||
                                   device.type === 8 ||
                                   device.type === 9 ||
                                   device.type === 10 ||
                                   device.type === 11
                        })

                        dispatch({type: 'UPDATE_SENSORS', devices: devices, sensors: filteredSensors});
                    } catch (e) {
                        console.log(e)
                    }
                }, 5000);
                return () => clearInterval(interval);
            },
            [devices]
        );

        function redirectToAdd() {
            const params = (new URL(document.location)).searchParams;

            if (isRoom) {
                return '/addDevice?room=' + params.get('id');
            } else {
                return '/addDevice'
            }
        }

        const errorMessage = () => {
            if (!isDataFound) {
                return "You haven't added any devices yet. Please add a new one."
            }
            if (isNetworkError) {
                return "We are sorry. There was an error."
            }
        }

        return (
            <DevicesContext.Provider value={{devices, dispatch, isRoom, actionCompleted, setActionCompleted}}>
                <div id="wrapper" className="devices">
                    <main style={{
                        backgroundImage: isRoom && "url('" + roomBackground + "')",
                        backgroundRepeat: "no-repeat",
                        backgroundAttachment: "fixed",
                        backgroundPosition: 'center'
                    }}>
                        <article className="row row-custom row row-custom-custom">
                            <div id="content">
                                <section
                                    className={(isRoom) ? "content-box-collapsible z-depth-2 content-box-transparency" : "content-box-collapsible z-depth-2"}>
                                    <div className="headline-box row row-custom row row-custom-custom">
                                        <h3 className="col col-custom l8 left-align headline-title">{(isRoom) ? title : "My Devices"}</h3>
                                        <a href={redirectToAdd()}>
                                            <i className="col col-custom l1 btn waves-effect waves-light btn-primary-circular right material-icons">add</i></a>
                                    </div>
                                    <div className={(isLoading) ? "centered-loading-data-message" : "hidden"}>
                                        <ColorCircularProgress/>
                                    </div>
                                    <div
                                        className={(!isDataFound || isNetworkError) ? "centered-loading-data-message" : "hidden"}>
                                        <p className={(isNetworkError) ? "error-message" : undefined}>{errorMessage()}</p>
                                    </div>
                                    <ul className={(isLoading || !isDataFound) ? "hidden" : "collapsible expandable expandable-component"}>
                                        <li className="row row-custom row row-custom-custom">
                                            <DeviceList/>
                                        </li>
                                    </ul>
                                </section>
                            </div>
                        </article>
                    </main>
                </div>
            </DevicesContext.Provider>
        )
    }
;

export {DevicesPanel as default}
