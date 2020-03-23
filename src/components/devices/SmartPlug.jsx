import React, {useState, useEffect} from 'react'


const SmartPlug = (device) => {
    const [consumption, setConsumption] = useState(device.device.label);
    const resetSmartPlug = (e) => {
        e.preventDefault();
        setConsumption('0 kWh')
    };

    useEffect(() => {
        console.log('useEffectRan from Reset')
    }, [consumption]);

    return (<div className="col col-collapsible l8 s8 display-info display-active">
                <i onClick={(e) => resetSmartPlug(e)} className="col col-collapsible l2 s2 material-icons btn-reset">rotate_left</i>
                <span>{consumption}</span>
            </div>)
};

export {SmartPlug as default}
