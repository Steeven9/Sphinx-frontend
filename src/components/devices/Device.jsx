import React, {useState, useContext, useEffect} from 'react'
import DevicesContext from '../../context/devices-context'
import {getDeviceIcon} from '../../helpers/getIconsHelper'
import {getRowIcon} from '../../helpers/getIconsHelper'
import PowerSwitch from './PowerSwitch'
import SmartPlug from './SmartPlug'
import Slider from '@material-ui/core/Slider'


const Device = ({device}) => {
    const {devices, dispatch} = useContext(DevicesContext);
    const [intensity, setIntensity] = useState(device.slider);

    // Extracts next value from the state
    useEffect(() => {
    }, [intensity]);

    const handleCommittedChange = (e, val) => {
        device.slider = val;
        devices.forEach((d) => {
        if (d.id === device.id) {
            d.slider = val;
        }});
        dispatch({type: 'MODIFY_DEVICE', device: device});
    };

    const handleInstantChange = (e, val) => {
        // device.slider = val;
        // devices.forEach((d) => {
        //     if (d.switched === device.id) {
        //         d.slider = val;
        //         console.log(d.name + " " + d.slider)
        //     }
        // });
        // console.log(val);
        //
        // dispatch({type: 'SYNC_DEVICES', devices: devices});
    };

    function getSlider() {
        return (<Slider name={"slider"} className="slider"
                        onChange={(e, val) =>  {handleInstantChange(e, val)}}
                        onChangeCommitted={(e, val) =>  {handleCommittedChange(e, val)}
        } valueLabelDisplay="auto" defaultValue={intensity} />)
    }

    function getDeviceHeader(device) {
        if (device.switches !== undefined) {
            return  "collapsible-header device-parent";
        } else if (device.child === true) {
            return  "collapsible-header device-child";
        }
        return "collapsible-header"
    }

    function getSliderOrDisplayOrSmartPlug(device) {
        switch (device.deviceType) {
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
                return(<></>)
        }
    }

    function getPowerSwitch(device) {
        switch (device.deviceType) {
            case 7: //HumiditySensor
            case 8: //LightSensor
            case 9: //TempSensor
            case 10: //MotionSensor
                return(<div className="row row-collapsible l1">
                    <div className="">
                        <div className="col col-collapsible l2 m1 s1">
                            <i className="material-icons btn-edit btn-edit-no-switch">edit</i>
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
                        <i className="material-icons btn-edit">edit</i>
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
                                <img className="" src={getDeviceIcon(device.deviceType)} alt={device.name}/>
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

export {Device as default}
