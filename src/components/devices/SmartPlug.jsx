import React, {useState, useContext, useEffect} from 'react'
import DevicesContext from "../../context/devicesContext";


/**
 * Creates a SmartPlug that shows the energy consumption that can be reset
 * @param device
 * @returns {SmartPlug}
 */
const SmartPlug = (device) => {
    const [consumption, setConsumption] = useState(device.device.label);
    const {dispatch, setActionCompleted} = useContext(DevicesContext);

    const resetSmartPlug = (e) => {
        e.preventDefault();
        device.device.label = '0 kWh';
        setConsumption('0 kWh');
        device.device.reset = true;
        dispatch({type: 'MODIFY_DEVICE', device: device.device, setActionCompleted: setActionCompleted});
    };

    // Discards cached state and extract the next one
    useEffect(() => {
        setConsumption(device.device.label)
    }, [device, consumption]);

    device.device.reset = false;

    return ((device.device.on) ?
            <div className="col col-custom l8 s8 display-info display-active">
                <i onClick={(e) => resetSmartPlug(e)}
                   className="col col-custom l2 s2 material-icons btn-reset">rotate_left</i>
                <span>{consumption}</span>
            </div>
            :
            <div className="col col-custom l8 s8 display-info display-inactive">
                <span>{'- - - - - -'}</span>
            </div>
    )
};

export {SmartPlug as default}
