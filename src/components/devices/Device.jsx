import React, {useContext} from 'react'
import DevicesContext from '../context/devices-context'
import PowerSwitch from './PowerSwitch'
import Slider from '@material-ui/core/Slider'

// Light devices SVG icons
import iconDimmerState from "../img/icons/devices/dimmer-state.svg";
import iconDimmerRegular from "../img/icons/devices/dimmer-regular.svg";
import iconSmartPlug from "../img/icons/devices/smart-plug.svg"
import iconSwitch from "../img/icons/devices/switch.svg";
import iconRegularBulb from "../img/icons/devices/bulb-regular.svg";
import iconLedBulb from "../img/icons/devices/bulb-led.svg"
import iconLightSensor from "../img/icons/devices/sensor-light.svg";
import iconHumiditySensor from "../img/icons/devices/sensor-humidity.svg";
import iconMotionSensor from "../img/icons/devices/sensor-motion.svg";
import iconTemperatureSensor from "../img/icons/devices/sensor-temperature.svg";
import iconUnknownDevice from "../img/icons/devices/unknown-device.svg"

const Device = ({device}) => {
    const {dispatch} = useContext(DevicesContext);
    const switches = device.switches;

    return (
        <li className="row row-collapsible row row-collapsible-custom">
            <div id={device.id} className={"collapsible-header" + (switches ? " device-parent" : "")}>
                <div className="col col-collapsible l6 m6 s12">
                    <div className="col col-collapsible l12 s1 icons-wrapper">
                        <i className="material-icons l1">{getRowIcon(device)}</i>
                        <div className="icon-device l1">
                            <img className="" src={getDeviceIcon(device.deviceType)} alt="(device.name)"/>
                        </div>
                        <div className="device-info col col-collapsible l12 m6 s12 left-align">
                            <p className="device-name">{device.name}</p>
                            {device.room &&
                                <p className="device-location">{device.room}</p>
                            }
                        </div>
                    </div>
                </div>
            <div className="device-control col col-collapsible l6 m6 s12">
                <div className="col col-collapsible l8 m6 s8">
                    {getSliderOrDisplay(device)}
                </div>
                    {getPowerSwitch(device)}
                </div>
            </div>
        </li>
    )
};

function getPowerSwitch(device) {
    switch (device.deviceType) {
        case 'HumiditySensor':
        case 'LightSensor':
        case 'TempSensor':
        case 'MotionSensor':
            return(
                <div className="row row-collapsible l1">
                    <div className="">
                        <div className="col col-collapsible l2 m1 s1">
                            <i className="material-icons btn-edit btn-edit-no-switch">edit</i>
                        </div>
                    </div>
                </div>
            );
        default:
            return (
                <div className="col col-collapsible l4 device-control-switch">
                    <div className="switch col col-collapsible l2 m8 s11 right-align">
                        <PowerSwitch
                            onChange={()=>{}}
                            checked={device.state}
                        />
                    </div>
                    <div className="col col-collapsible l2 m1 s1 right-align">
                        <i className="material-icons btn-edit">edit</i>
                    </div>
                </div>
            );
    }
}

function getSliderOrDisplay(device) {
    switch (device.deviceType) {
        case 'DimmableLight':
        case 'DimmableSwitch':
        case 'StatelessDimmableSwitch':
            return (<Slider className="slider" valueLabelDisplay="auto" defaultValue={device.slider || 0}/>)
        case 'SmartPlug':
            return (<div className="col col-collapsible l8 s8 display-info display-active">
                <i className="col col-collapsible l2 s2 material-icons btn-reset">rotate_left</i>
                <span>350 kWh</span>
            </div>);
        case 'HumiditySensor':
        case 'LightSensor':
        case 'TempSensor':
        case 'MotionSensor':
            return (<div className={"col col-collapsible l8 s8 display-info" + (device.label ? " display-active" : " display-inactive")}>
                <span>{device.label || "---"}</span>
            </div>);
        default:
            return(<></>)
    }
}

/**
 * Gets a SVG icon object for the corresponding device
 * @param {string} deviceType
 * @returns {icon} SVG imported icon
 * @author Erick Garro Elizondo
 */
function getDeviceIcon(deviceType) {
    switch(deviceType){
        // Controllers
        case 'DimmableSwitch':
            return iconDimmerState;
        case 'StatelessDimmableSwitch':
            return iconDimmerRegular;
        case 'SmartPlug':
            return iconSmartPlug;
        case 'Switch':
            return iconSwitch;

        // Smart lights (with intensity state)
        case 'Light':
            return iconRegularBulb;

        // Regular lights (w/o intensity)
        case 'DimmableLight':
            return iconLedBulb;

        // Sensors
        case 'HumiditySensor':
            return iconHumiditySensor;
        case 'LightSensor':
            return iconLightSensor;
        case 'MotionSensor':
            return iconMotionSensor;
        case 'TempSensor':
            return iconTemperatureSensor;

        default:
            return iconUnknownDevice;
    }
}

/**
 * Gets a SVG icon object for the corresponding device
 * @param {object} device
 * @returns {icon} SVG imported icon
 * @author Erick Garro Elizondo
 */
function getRowIcon(device) {
    if (device.switches) {
        return 'more_vert';
    }
}

export {Device as default}
