import React, {useState, useContext} from 'react'
import DevicesContext from '../../context/devices-context'


const PowerSwitch = (device) => {
    const {dispatch} = useContext(DevicesContext);
    const [on, setPower] = useState(device.device.on);

    const toggle = (e) => {
        let dev = JSON.parse(JSON.stringify(device));
        setPower(e.target.checked);
        dev.on = e.target.checked;
        dispatch({type: 'MODIFY_DEVICE', device: dev});
    };

    return(
        <div className="">
            <label>
                <input type='checkbox' value={on} onChange={toggle} defaultChecked={on} />
                <span className='lever'></span>
            </label>
        </div>
    )
};

export {PowerSwitch as default}
