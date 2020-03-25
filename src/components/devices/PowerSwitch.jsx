import React, {useState, useContext} from 'react'
import DevicesContext from '../../context/devices-context'


/**
 * Creates a power switch to turn devices on and off
 * @param dev (device)
 * @returns {PowerSwitch}
 * @constructor
 */
const PowerSwitch = (dev) => {
    let device = dev.device;
    const [on, setPower] = useState(device.on);
    const {dispatch} = useContext(DevicesContext);

    const toggle = (e) => {
        console.log('toggle')
        setPower(e.target.checked);
        device.on = e.target.checked;
        console.log('Turning ' + device.name + ' ' + device.on ? 'on' : 'off' );
        // device.on = device.on;
        dispatch({type: 'MODIFY_DEVICE', device: device});
    };

    return(
        <div className="">
            <label>
                <input type='checkbox' value={on} onChange={(e) => toggle(e)} defaultChecked={on} />
                <span className='lever'></span>
            </label>
        </div>
    )
};

export {PowerSwitch as default}
