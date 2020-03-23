import React, {useState, useEffect, useContext, useReducer} from 'react'
import DevicesContext from '../../context/devices-context'
import devicesReducer from "../../reducers/devicesReducer";

const PowerSwitch = (device) => {
    const [on, setPower] = useState(device.device.on);
    const toggle = (e) => {
        setPower(!on);
        // devicesDispatch({type: 'TOGGLE_SWITCH', devices: devices});
        console.log('Switch toggled');
    };

    useEffect(() => {
       console.log('Toggle switch rendered')}, [on]);

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
