import React, { useState, useContext, useEffect } from 'react'
import DevicesContext from '../../context/devices-context'
import { getDeviceIcon } from '../../helpers/getIconsHelper'
import { getRowIcon } from '../../helpers/getIconsHelper'
import PowerSwitch from './PowerSwitch'
import SmartPlug from './SmartPlug'
import Slider from '@material-ui/core/Slider'

/**
 * Device factory that can create any type of device
 * @param device object
 * @returns { An individual device's HTML composed of several React components }
 * @constructor
 */
const Device = ({ device }) => {
    const { devices, dispatch } = useContext(DevicesContext);
    const [intensity, setIntensity] = useState(device.slider);

    // Extracts next value from the state
    useEffect(() => {
    }, [intensity]);

    const handleCommittedChange = (e, val) => {
        device.slider = val;
        devices.forEach((d) => {
            if (d.id === device.id) {
                d.slider = val;
            }
        });
        dispatch({ type: 'MODIFY_DEVICE', device: device });
    };

    const redirectToEdit = (id) => {
        window.location.href = '/editDevice?id=' + id
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
     * Depending on device type, returns either an intensity slider, a SmartPlug's display or a Sensor's display
     * @param device
     * @returns {Slider|SmartPlug display|Sensor display}
     */
    function getSliderOrDisplayOrSmartPlug(device) {
        switch (device.type) {
            case 2: //DimmableLight
            case 4: //DimmableSwitch
            case 5: //StatelessDimmableSwitch
                return getSlider();
            case 6: //SmartPlug
                return (<SmartPlug device={device} />);
            case 7: //HumiditySensor
            case 8: //LightSensor
            case 9: //TempSensor
            case 10: //MotionSensor
                return (
                    <div className={"col col-collapsible l8 s8 display-info" + (device.label ? " display-active" : " display-inactive")}>
                        <span>{device.label || "- - - - - -"}</span>
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
    function getSlider() {
        return (<Slider name={"slider"} className="slider"
            onChangeCommitted={(e, val) => { handleCommittedChange(e, val) }
            } valueLabelDisplay="auto" defaultValue={intensity} />)
    }

    /**
     * Generates a power switch to turn a device on or off
     * @param device
     * @returns {PowerSwitch}
     */
    function getPowerSwitch(device) {
        switch (device.type) {
            case 7: //HumiditySensor
            case 8: //LightSensor
            case 9: //TempSensor
            case 10: //MotionSensor
                return (<div className="row row-collapsible l1">
                    <div className="">
                        <div className="col col-collapsible l2 m1 s1">
                            <i className="material-icons btn-edit btn-edit-no-switch" onClick={() => redirectToEdit(device.id)}>edit</i>
                        </div>
                    </div>
                </div>);
            default:
                return (<div className="col col-collapsible l4 device-control-switch">
                    <div className="switch col col-collapsible l2 m8 s11 right-align">
                        <div>
                            <PowerSwitch device={device} />
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
                    <div className="col col-collapsible l12 s1 icons-wrapper">
                        <i className={"material-icons l1" + (device.child ? " muted-icon" : "")} >{getRowIcon(device)} </i>
                        <div className="icon-device l1">
                            <img className="" src={getDeviceIcon(device.type)} alt={device.name} />
                        </div>
                        <div className="device-info col col-collapsible l12 m6 s12 left-align">
                            <p className="device-name">{device.name}</p>
                            {!device.child && <p className="device-location">{device.room}</p>}
                        </div>
                    </div>
                </div>
                <div className="device-control col col-collapsible l6 m6 s12">
                    <div className="col col-collapsible l8 m6 s8">
                        {getSliderOrDisplayOrSmartPlug(device, intensity, setIntensity, handleCommittedChange)}
                    </div>
                    <div>
                        {getPowerSwitch(device)}
                    </div>
                </div>
            </form>
        </div>
    )
};

export { Device as default }
