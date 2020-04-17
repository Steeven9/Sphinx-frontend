import React, {useState, useContext, useEffect} from 'react'
import DevicesContext from '../../context/devices-context'


/**
 * Creates a power switch to turn devices on and off
 * @param dev (device)
 * @returns {PowerSwitch}
 * @constructor
 */
const PowerSwitch = ({device}) => {
    const {devices,dispatch} = useContext(DevicesContext);
    const [on, setPower] = useState(device.on);

    /**
     * Sets the power state on change and extracts the next state
     */
    useEffect(() => {
        setPower(device.on)
    }, [device, devices]);

    /**
     * Toggles the device on change and dispatches the the action to the devices reducer
     * @param e {event}
     */
    const toggle = (e) => {
        setPower(e.target.checked);
        device.on = e.target.checked;
        device.clicked = true;
        dispatch({type: 'SYNC_DEVICES', device: device});
        dispatch({type: 'MODIFY_DEVICES', device: device});
    };

    return(
        <div className="">
            <label>
                <input
                    type='checkbox'
                    checked={on}
                    onChange={(e) => toggle(e)}
                />
                <span className='lever'></span>
            </label>
        </div>
    )
};

export {PowerSwitch as default}
