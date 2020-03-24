// import React, {useState, useContext} from 'react'
// import DevicesContext from '../../context/devices-context'
// import PowerSwitch from './PowerSwitch'
// import SmartPlug from './SmartPlug'
// import Slider from '@material-ui/core/Slider'
//
// // Light devices SVG icons
// import iconDimmerState from "../img/icons/devices/dimmer-state.svg";
// import iconDimmerRegular from "../img/icons/devices/dimmer-regular.svg";
// import iconSmartPlug from "../img/icons/devices/smart-plug.svg"
// import iconSwitch from "../img/icons/devices/switch.svg";
// import iconRegularBulb from "../img/icons/devices/bulb-regular.svg";
// import iconLedBulb from "../img/icons/devices/bulb-led.svg"
// import iconLightSensor from "../img/icons/devices/sensor-light.svg";
// import iconHumiditySensor from "../img/icons/devices/sensor-humidity.svg";
// import iconMotionSensor from "../img/icons/devices/sensor-motion.svg";
// import iconTemperatureSensor from "../img/icons/devices/sensor-temperature.svg";
// import iconUnknownDevice from "../img/icons/devices/unknown-device.svg"
//
//
// const Device = ({device}) => {
//     const {devices, dispatch} = useContext(DevicesContext);
//     const [intensity, setIntensity] = useState(device.slider);
//
//     const handleChange = async (e, val) => {
//         let updatedDevices = [];
//         let currentDevices = [];
//         let newDevices = [];
//
//         device.slider = intensity;
//         await setIntensity(val);
//
//         if (device.switches !== undefined) {
//             updatedDevices = JSON.parse(JSON.stringify(devices.filter((d) => d.id === device.id || d.switched === device.id)));
//             updatedDevices.forEach((d) => d.slider = val);
//             currentDevices = JSON.parse(JSON.stringify(devices.filter((d) => d.id !== device.id && d.switched !== device.id)));
//         } else {
//             currentDevices = JSON.parse(JSON.stringify(devices.filter((d) => d.id !== device.id)));
//             updatedDevices.push(JSON.parse(JSON.stringify(device)));
//         }
//         // console.log('device: ' + JSON.stringify(device));
//         newDevices = [...currentDevices, ...updatedDevices];
//         // console.log('currentDevices: ' + JSON.stringify(currentDevices));
//         // console.log('updatedDevices: ' + JSON.stringify(updatedDevices));
//         // console.log('newDevices    : ' + JSON.stringify(newDevices));
//
//         dispatch({type: 'MODIFY_DEVICE', devices: newDevices});
//     };
//
//     // const getSwitchedDevices = (activeDeviceId) => {
//     //     return JSON.parse(JSON.stringify(devices.filter((d) => d.switched === activeDeviceId)))
//     // };
//
//
//     return (
//         <div id={device.id} className={getDeviceHeader(device)}>
//             <form id="devicesForm" className="device-form">
//                 <div className="col col-collapsible l6 m6 s12">
//                     <div className="col col-collapsible l12 s1 icons-wrapper">
//                         <i className={"material-icons l1" + (device.child ? " muted-icon" : "")} >{getRowIcon(device)}</i>
//                         <div className="icon-device l1">
//                             <img className="" src={getDeviceIcon(device.deviceType)} alt={device.name}/>
//                         </div>
//                         <div className="device-info col col-collapsible l12 m6 s12 left-align">
//                             <p className="device-name">{device.name}</p>
//                             {!device.child && <p className="device-location">{device.room}</p>}
//                         </div>
//                     </div>
//                 </div>
//                 <div className="device-control col col-collapsible l6 m6 s12">
//                     <div className="col col-collapsible l8 m6 s8">
//                         {getSliderOrDisplay(device, intensity, setIntensity, handleChange)}
//                     </div>
//                     <div>
//                         {getPowerSwitch(device)}
//                     </div>
//                 </div>
//             </form>
//         </div>
//     )
// };
//
// function getDeviceHeader(device) {
//     if (device.switches !== undefined) {
//         return  "collapsible-header device-parent";
//     } else if (device.child === true) {
//         return  "collapsible-header device-child";
//     }
//     return "collapsible-header"
// }
//
// function getSliderOrDisplay(device, intensity, setIntensity, handleChange) {
//     switch (device.deviceType) {
//         case 2: //DimmableLight
//         case 4: //DimmableSwitch
//         case 5: //StatelessDimmableSwitch
//             return getSlider(device, intensity, setIntensity, handleChange);
//         case 6: //SmartPlug
//             return (<SmartPlug device={device} />)
//         case 7: //HumiditySensor
//         case 8: //LightSensor
//         case 9: //TempSensor
//         case 10: //MotionSensor
//             return (<div className={"col col-collapsible l8 s8 display-info" + (device.label ? " display-active" : " display-inactive")}>
//                 <span>{device.label || "---"}</span>
//             </div>);
//         default:
//             return(<></>)
//     }
// }
//
// function getSlider(device, intensity, setIntensity, handleChange) {
//     function getIntensity() {
//         if (device.deviceType === 4 || device.deviceType === 2) {
//             return device.slider;
//         }
//         return 0;
//     };
//     return (
//         <Slider className="slider" onChangeCommitted={
//             (e, val) =>  {
//                 setIntensity(val);
//                 handleChange(e, val);
//             }
//         } valueLabelDisplay="auto" defaultValue={intensity} />)
//
//     // <Slider className="slider" onChangeCommitted={
//     //     (e, val, h) => {
//     //         setIntensity(e.target.value);
//     //         let handle = handleChange(e, val);
//     //     }
//     // }
//     //         valueLabelDisplay="auto" defaultValue={getIntensity()} />)
// }
//
// function getPowerSwitch(device) {
//     switch (device.deviceType) {
//         case 7: //HumiditySensor
//         case 8: //LightSensor
//         case 9: //TempSensor
//         case 10: //MotionSensor
//             return(
//                 <div className="row row-collapsible l1">
//                     <div className="">
//                         <div className="col col-collapsible l2 m1 s1">
//                             <i className="material-icons btn-edit btn-edit-no-switch">edit</i>
//                         </div>
//                     </div>
//                 </div>
//             );
//         default:
//             return (
//                 <div className="col col-collapsible l4 device-control-switch">
//                     <div className="switch col col-collapsible l2 m8 s11 right-align">
//                         <div>
//                             <PowerSwitch device={device} />
//                         </div>
//                     </div>
//                     <div className="col col-collapsible l2 m1 s1 right-align">
//                         <i className="material-icons btn-edit">edit</i>
//                     </div>
//                 </div>
//             );
//     }
// }
//
// /**
//  * Gets a SVG icon object for the corresponding device
//  * @param {string} deviceType
//  * @returns {icon} SVG imported icon
//  * @author Erick Garro Elizondo
//  */
// function getDeviceIcon(deviceType) {
//     switch(deviceType){
//
//         //// Regular lights (w/o intensity)
//         case 1: //Ligth
//             return iconRegularBulb;
//
//         //// Smart lights (with intensity state)
//         case 2: //DimmableLight
//             return iconLedBulb;
//
//         //// Light controllers
//         case 3: //Switch
//             return iconSwitch;
//         case 4: //DimmableSwitch
//             return iconDimmerState;
//         case 5: //StatelessDimmableSwitch
//             return iconDimmerRegular;
//         case 6: //SmartPlug
//             return iconSmartPlug;
//
//         //// Sensors
//         case 7: //HumiditySensor
//             return iconHumiditySensor;
//         case 8: //LightSensor
//             return iconLightSensor;
//         case 9: //TempSensor
//             return iconTemperatureSensor;
//         case 10: //MotionSensor
//             return iconMotionSensor;
//
//         default:
//             return iconUnknownDevice;
//     }
// }
//
// /**
//  * Gets a SVG icon object for the corresponding device
//  * @param {object} device
//  * @returns {string} SVG imported icon
//  * @author Erick Garro Elizondo
//  */
// function getRowIcon(device) {
//     if (device.parent) {
//         return 'more_vert';
//     } else if (device.child) {
//         return 'arrow_drop_up';
//     }
// }
//
// export {Device as default}
