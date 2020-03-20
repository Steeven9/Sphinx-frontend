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
    // const deviceBehaviour = getDeviceBehaviour(device);
    const switches = device.switches;

    return (
        <li className="row row-collapsible row row-collapsible-custom">
            <div id={device.id} className={"collapsible-header" + (switches ? " device-parent" : "")}>
                <div className="col col-collapsible l6 m6 s12">
                    <div className="col col-collapsible l12 s1 icons-wrapper">
                        <i className="material-icons l1">{getRowIcon(device)}</i>
                        <div className="icon-device l1">
                            <img className="" src={getDeviceIcon(device.deviceType)} alt="(device.name)"></img>
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
                        {(device.slider) &&
                            <Slider className="slider" valueLabelDisplay="auto" defaultValue={device.slider || 0}/>

                        }
                    </div>
                    <div className="col col-collapsible l4 device-control-switch">
                        <div className="switch col col-collapsible l2 m8 s11 right-align">
                            <PowerSwitch />
                        </div>
                        <div className="col col-collapsible l2 m1 s1 right-align">
                            <i className="material-icons btn-edit">edit</i>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
};

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

// function getDeviceBehaviour(device) {
//     if (device)
// }

export {Device as default}
