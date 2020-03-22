import React, {useState, useEffect, useContext} from 'react'

import DevicesContext from '../../context/devices-context'

const PowerSwitch = (device) => {
    const [on, setPower] = useState(device.device.on);
    const toggle = (e) => {
        setPower(!on)
    };

    useEffect(() => {
       console.log('useEffectRan runs from PowerSwitch')}, [on]);

    return(
        <div className="">
            <label>
                <input type='checkbox' value='on' onChange={(e) => toggle(e)} defaultChecked={on} />
                <span className='lever'></span>
            </label>
        </div>
    )
};

export {PowerSwitch as default}
