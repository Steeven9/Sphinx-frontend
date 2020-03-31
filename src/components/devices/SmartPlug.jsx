import React, {useState, useContext} from 'react'
import DevicesContext from "../../context/devices-context";


/**
 * Creates a SmartPlug that shows the energy consumption that can be reset
 * @param device
 * @returns {SmartPlug}
 */
const SmartPlug = (device) => {
    const [consumption, setConsumption] = useState(device.device.label);
    const {dispatch} = useContext(DevicesContext);

    const resetSmartPlug = (e) => {
        e.preventDefault();
        setConsumption('0 kWh');
        device.device.label = '0 kWh';
        dispatch({type: 'SYNC_DEVICES', device: device});
        dispatch({type: 'MODIFY_DEVICES', device: device});
    };

    return ((device.device.on) ?
        <div className="col col-collapsible l8 s8 display-info display-active">
            <i onClick={(e) => resetSmartPlug(e)} className="col col-collapsible l2 s2 material-icons btn-reset">rotate_left</i>
            <span>{consumption}</span>
        </div>
        :
        <div className="col col-collapsible l8 s8 display-info display-inactive">
            <span>{'- - - - - -'}</span>
        </div>
    )
};

export {SmartPlug as default}
