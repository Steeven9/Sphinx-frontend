import React, {useState, useContext, useEffect} from 'react'
import DevicesContext from '../../context/devicesContext'
import {getDeviceTypeName, getMinMax, getSliderMarks} from '../../helpers/getDeviceMetadataHelper'
import {getRowIcon} from '../../helpers/getDeviceMetadataHelper'
import PowerSwitch from './PowerSwitch'
import SmartPlug from './SmartPlug'
import Thermostat from './Thermostat'
import StatelessDimmerButtons from './StatelessDimmerButtons'
import Slider from '@material-ui/core/Slider'
import CardMedia from '@material-ui/core/CardMedia'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


/**
 * Device factory that can create any type of device

 * @param device
 * @returns {*}
 * @constructor
 */
const Device = ({device}) => {
    const {devices, dispatch, isRoom, setActionCompleted} = useContext(DevicesContext);
    const [intensity, setIntensity] = useState(device.slider * 100);
    const [disabled, setDisabled] = useState(device.disabled);
    const [open, setOpen] = React.useState(false);

    /**
     * Disables slider for stateless dimmers. As a secondary, needed effect, the call to this
     * effect is also needed to extract the next value from the state via de dependencies call.
     */
    useEffect(() => {
        if (device.slider < 1 && device.slider > 0) setIntensity(device.slider * 100);
        else setIntensity(device.slider);
        if (device.type === 5) {
            if (!device.on) {
                device.disabled = true;
                setDisabled(true)
            } else {
                device.disabled = false;
                setDisabled(false)
            }
        }
    }, [device, devices]);

    /**
     * Synchronizes and re-renders devices state for view purposes dispatching the action to the devices reducer
     * @param e {event}
     * @param val {int}
     */
    const handleChange = (e, val) => {
        setIntensity(val);
        device.slider = val;
        devices.forEach((d) => {
            if (d.id === device.id) {
                d.slider = val;
            }
        });
        dispatch({type: 'SYNC_DEVICES', device: device});
    };

    /**
     * Updates only the affected device's state into the back-end
     * @param e {event}
     * @param val {int}
     */
    const handleChangeCommitted = (e, val) => {
        setIntensity(val);
        device.slider = val;
        dispatch({type: 'MODIFY_DEVICE', device: device, setActionCompleted: setActionCompleted});
    };

    const handleClickOpen = () => {
        setOpen(true);
        if (open) {
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    /**
     * Assigns classes to parent or child device's header
     * @param device
     * @returns {string}
     */
    function getDeviceHeader(device) {
        if (device.switches) {
            return "collapsible-header device-parent";
        } else if (device.child === true) {
            return "collapsible-header device-child";
        }
        return "collapsible-header"
    }

    /**
     * Calls the edit device page with the corresponding device ID
     * @param id {int}
     */
    function redirectToEdit(id) {
        const params = (new URL(document.location)).searchParams;

        if (isRoom) {
            window.location.href = '/editDevice?id=' + id + '&room=' + params.get('id');
        } else {
            window.location.href = '/editDevice?id=' + id
        }
    }

    /**
     * Shows the correct feedback from a motion sensor
     * @param device
     * @returns {string|*}
     */
    function getSensorValue(device) {
        if (device.type === 10) {
            if (device.label.toLowerCase() === "true") {
                return ">> detected <<"
            } else {
                return "idle"
            }
        } else {
            return device.label
        }
    }

    /**
     * Depending on device type, returns either an intensity slider, a SmartPlug's display or a Sensor's display
     * @param device {Device}
     * @returns {Slider|SmartPlug display|Sensor display}
     */
    function getDeviceControllerOrDisplay(device) {
        switch (device.type) {
            case 2: //DimmableLight
            case 4: //DimmableSwitch
            case 11: //Thermostat
            case 12: //SmartCurtains
                return getSlider(device.type);
            case 5: //StatelessDimmableSwitch
                return (<StatelessDimmerButtons device={device} setIntensity={setIntensity}/>)
            case 6: //SmartPlug
                return (<SmartPlug device={device}/>);
            case 7: //HumiditySensor
            case 8: //LightSensor
            case 9: //TempSensor
            case 10: //MotionSensor
                return (
                    <div
                        className={"col col-custom l9 s8 display-info" + (device.label ? " display-active" : " display-inactive")}>
                        <span>{(device.label !== null) ? getSensorValue(device) : "- - - - - -"}</span>
                    </div>
                );
            case 13: //MotionSensor
                return (
                    <div className={"col col-custom l9 s8"}>
                        {device.on && <AlertDialog/>}
                        <button type="button" name="button"
                                disabled={!device.on ? true : false}
                                className={"waves-effect waves-light" + (device.on ? " btn-video-active" : " btn-video-inactive")}
                                onClick={handleClickOpen}>{(device.on ? "Watch now" : "No video feed")}
                        </button>
                    </div>
                );
            default:
                return (<></>)
        }
    }

    /**
     * Generates a slider to control the intensity of a light or of a dimmer.
     * @returns {Slider}
     */
    function getSlider(type) {
        const minMax = getMinMax(device.type);

        switch (type) {
            case 11: //Thermostat
                return (
                    <Thermostat device={device}/>
                )
            default:
                return (<Slider name={"slider"}

                                onChange={(e, val) => {
                                    handleChange(e, val)
                                }}
                                onChangeCommitted={(e, val) => {
                                    handleChangeCommitted(e, val)
                                }}
                                valueLabelDisplay="auto"
                                value={intensity}
                                min={minMax[0]}
                                max={minMax[1]}
                                disabled={disabled}
                                marks={getSliderMarks(device)}/>);
        }
    }

    /**
     * Generates a power switch to turn a device on or off
     * @param device {Device}
     * @returns {PowerSwitch}
     */
    function getSwitch(device) {
        switch (device.type) {
            case 7: //HumiditySensor
            case 8: //LightSensor
            case 9: //TempSensor
            case 10: //MotionSensor
            case 12: //SmartCurtains
                return (<div className="row row-custom l1">
                    <div>
                        <div className="col col-custom l2 m1 s1">
                            <i className="material-icons btn-edit btn-edit-no-switch"
                               onClick={() => redirectToEdit(device.id)}>edit</i>
                        </div>
                    </div>
                </div>);
            case 5: //StatelessDimmer
            case 11: //Thermostat
                return (
                    <div className="col col-custom l1 m1 s1">
                        <i className="material-icons btn-edit btn-edit-no-switch"
                           onClick={() => redirectToEdit(device.id)}>edit</i>
                    </div>
                );
            default:
                return (<div className="col col-custom l4 device-control-switch">
                    <div className="switch col col-custom l2 m8 s11 right-align">
                        <div>
                            <PowerSwitch device={device}/>
                        </div>
                    </div>
                    <div className="col col-custom l2 m1 s1 right-align">
                        <i className="material-icons btn-edit" onClick={() => redirectToEdit(device.id)}>edit</i>
                    </div>
                </div>);
        }
    }

    /**
     * Generates a modal to play the security cam video
     * @returns {AlertDialog}
     **/
    function AlertDialog() {
        let video = 'https://res.cloudinary.com/erickgarro/video/upload/v1586203233/SmartHut/video-cabin.mp4'
        return (
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <h2 className="center-text">{device.roomName}: {device.name}</h2>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <CardMedia
                                component="video"
                                image={video}
                                autoPlay="true"
                                loop="true"
                            />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <button type="button" name="button"
                                className="display-inf btn-secondary btn waves-effect waves-light"
                                onClick={handleClose}>Close
                        </button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    return (
        <div id={device.id} className={getDeviceHeader(device)}>
            <form id="devicesForm" className="device-form">
                <div className="col col-custom l6 m6 s12">
                    <div className="col col-custom l12 s12 icons-wrapper">
                        <i className={"material-icons l1" + (device.child ? " muted-icon" : "")}>{getRowIcon(device)} </i>
                        <div className="icon-device l1">
                            <img src={device.icon} alt={device.name}/>
                        </div>
                        <div className="device-info col col-custom l12 m6 s12 left-align">
                            <p className="device-name">{device.name}</p>
                            {!device.child && !isRoom && <p className="device-location">{device.roomName}</p>}
                            <p className="device-type-name">{getDeviceTypeName(device.type)}</p>
                        </div>
                    </div>
                </div>
                <div className="device-control col col-custom l6 m6 s12">
                    <div className="col col-custom l8 m6 s8">
                        {getDeviceControllerOrDisplay(device)}
                    </div>
                    <div>
                        {getSwitch(device)}
                    </div>
                </div>
            </form>
        </div>
    )
};

export {Device as default}
