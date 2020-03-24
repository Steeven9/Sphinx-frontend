import React, {useState, useContext, useEffect} from 'react'
import DevicesContext from '../../context/devices-context'


const PowerSwitch = (device) => {
    const [on, setPower] = useState(device.device.on);
    const {dispatch} = useContext(DevicesContext);

    const toggle = (e) => {
        console.log('toggle')
        setPower(e.target.checked);
        device.device.on = e.target.checked;
    };

    useEffect(() => {
        console.log('Turning ' + device.device.name + ' ' + device.device.on ? 'on' : 'off' );
        // device.device.on = device.device.on;
        dispatch({type: 'MODIFY_DEVICE', device: device});
    }, [on]);

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
