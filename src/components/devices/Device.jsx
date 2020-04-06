import React, {useState, useContext, useEffect} from 'react'
import DevicesContext from '../../context/devices-context'
import {getDeviceIcon, getDeviceTypeName, getMinMax, getSliderMarks} from '../../helpers/getDeviceMetadadaHelper'
import {getRowIcon} from '../../helpers/getDeviceMetadadaHelper'
import PowerSwitch from './PowerSwitch'
import SmartPlug from './SmartPlug'
import Slider from '@material-ui/core/Slider'
import ToggleButtons from "./ToggleButtons";

/**
 * Device factory that can create any type of device
 * @param device object
 * @returns { An individual device's HTML composed of several React components }
 * @constructor
 */
const Device = ({device}) => {
        const {devices, dispatch, isRoom, customMuiTheme} = useContext(DevicesContext);
        const [intensity, setIntensity] = useState(device.slider);
        const [disabled, setDisabled] = useState(device.disable);
        /**
         * Disables slider for stateless dimmers. As a secondary, needed effect, the call to this
         * effect is also needed to extract the next value from the state via de dependencies call.
         */
        useEffect(() => {
            setIntensity(device.slider);
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
         * Syncronizes and re-renders devices state for view purposes dispatching the action to the devices reducer
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
            dispatch({type: 'MODIFY_DEVICE', device: device});
        };

        /**
         * Assigns classes to parent or child device's header
         * @param device
         * @returns {string}
         */
        function getDeviceHeader(device) {
            if (device.switches !== undefined) {
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
            window.location.href = '/editDevice?id=' + id
        }

        /**
         * Depending on device type, returns either an intensity slider, a SmartPlug's display or a Sensor's display
         * @param device {Device}
         * @returns {Slider|SmartPlug display|Sensor display}
         */
        function getSliderOrDisplayOrSmartPlug(device) {
            switch (device.type) {
                case 2: //DimmableLight
                case 4: //DimmableSwitch
                case 5: //StatelessDimmableSwitch
                case 11: //Thermostat
                case 12: //Blinds
                    return getSlider(device.type);
                case 6: //SmartPlug
                    return (<SmartPlug device={device}/>);
                case 7: //HumiditySensor
                case 8: //LightSensor
                case 9: //TempSensor
                case 10: //MotionSensor
                    return (
                        <div
                            className={"col col-collapsible l9 s8 display-info" + (device.label ? " display-active" : " display-inactive")}>
                            <span>{device.label || "- - - - - -"}</span>
                        </div>
                    );
                case 13: //MotionSensor
                    return (
                        <div className={"col col-collapsible l9 s8"}>
                            <button type="button" name="button"
                                    className={"waves-effect waves-light" + (device.on ? " btn-video-active" : " btn-video-inactive")}
                                    onClick={showVideoFeed}>{(device.on ? "Watch now" : "No video feed")}</button>
                        </div>
                    );
                default:
                    return (<></>)
            }
        }

        function showVideoFeed() {
            // implement function here
        }

        /**
         * Generates a slider to control the intensity of a light or of a dimmer.
         * @returns {Slider}
         */
        function getSlider(type) {
            const minMax = getMinMax(device.type);

            switch (type) {
                case 11: //Thermostat
                    return (<>
                        <div className="row">
                            <div className="col l9">
                                <div className={"col l12 col-collapsible display-info" + (device.label ? " display-active" : " display-inactive")}>
                                    <span>{device.label || "- - - - - -"}</span>
                                </div>
                                <Slider name={"slider"}
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
                                        marks={getSliderMarks(device.type)}/>
                            </div>
                            <div className="col l2">
                                    <ToggleButtons device={device}/>
                            </div>

                            {/*<div className="col l1"></div>*/}

                        </div>

                    </>);
                default:
                    return (<Slider name={"slider"}
                                    className=""
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
                                    marks={getSliderMarks(device.type)}/>);
            }
        }


        /**
         * Generates a power switch to turn a device on or off
         * @param device {Device}
         * @returns {PowerSwitch}
         */
        function getPowerSwitch(device) {
            switch (device.type) {
                case 7: //HumiditySensor
                case 8: //LightSensor
                case 9: //TempSensor
                case 10: //MotionSensor
                case 12: //Blinds
                    return (<div className="row row-collapsible l1">
                        <div className="">
                            <div className="col col-collapsible l2 m1 s1">
                                <i className="material-icons btn-edit btn-edit-no-switch"
                                   onClick={() => redirectToEdit(device.id)}>edit</i>
                            </div>
                        </div>
                    </div>);
                case 11: //Thermostat
                    return (
                            <div className="col col-collapsible l1 m1 s1">
                                <i className="material-icons btn-edit btn-edit-no-switch"
                                   onClick={() => redirectToEdit(device.id)}>edit</i>
                            </div>
                    );
                default:
                    return (<div className="col col-collapsible l4 device-control-switch">
                        <div className="switch col col-collapsible l2 m8 s11 right-align">
                            <div>
                                <PowerSwitch device={device}/>
                            </div>
                        </div>
                        <div className="col col-collapsible l2 m1 s1 right-align">
                            <i className="material-icons btn-edit" onClick={() => redirectToEdit(device.id)}>edit</i>
                        </div>
                    </div>);
            }
        }

        return (
            <div id={device.id} className={getDeviceHeader(device)}>
                <form id="devicesForm" className="device-form">
                    <div className="col col-collapsible l6 m6 s12">
                        <div className="col col-collapsible l12 s12 icons-wrapper">
                            <i className={"material-icons l1" + (device.child ? " muted-icon" : "")}>{getRowIcon(device)} </i>
                            <div className="icon-device l1">
                                <img className="" src={getDeviceIcon(device.type)} alt={device.name}/>
                            </div>
                            <div className="device-info col col-collapsible l12 m6 s12 left-align">
                                <p className="device-name">{device.name}</p>
                                {!device.child && !isRoom && <p className="device-location">{device.room}</p>}
                                <p className="device-type-name">{getDeviceTypeName(device.type)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="device-control col col-collapsible l6 m6 s12">
                        <div className="col col-collapsible l8 m6 s8">
                            {getSliderOrDisplayOrSmartPlug(device)}
                        </div>
                        <div>
                            {getPowerSwitch(device)}
                        </div>
                    </div>
                </form>
            </div>
        )
    }
;

export {Device as default}
