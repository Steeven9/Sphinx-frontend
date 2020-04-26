import React, {useContext, useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import '../../css/toggle-buttons.css';
import DevicesContext from "../../context/devicesContext";


function StatelessDimmerButtons({device, devices}) {
    const {dispatch, setActionCompleted} = useContext(DevicesContext);
    const [switchedDevices, setSwitchedDevices] = useState([]);

    /**
     * Synchronizes and re-renders devices state for view purposes dispatching the action to the devices reducer
     * Then PUTs the new slider value to the API
     * @param e {event}
     */
    const handleClick = (e) => {
        let val;

        if (e.currentTarget.value === "increase") {
            val = 1
        } else {
            val = -1
        }

        device.slider = val;
        switchedDevices.forEach((d) => {
            if (d.switched === device.id) {
                d.slider = d.slider + val;

                if (d.slider > 100) {
                    d.slider = 100;
                } else if (d.slider < 0) {
                    d.slider = 0;
                }
            }
        });
        dispatch({type: 'SYNC_DEVICES', device: device});
        dispatch({type: 'MODIFY_DEVICE', device: device, setActionCompleted: setActionCompleted});
    };

    // Extracts next state
    useEffect(() => {
        let filteredDevices = devices.filter(d => d.switched === device.id)
        setSwitchedDevices(filteredDevices)
    }, [device, devices]);

    return (
        <ButtonGroup variant="contained" size="small" aria-label="contained primary button group">
            <Button value="decrease" onClick={handleClick}>
                <i className="waves-effect waves-light right material-icons"> remove </i>
            </Button>
            <Button value="increase" onClick={handleClick}>
                <i className="waves-effect waves-light right material-icons"> add </i>
            </Button>
        </ButtonGroup>
    );
}

export {StatelessDimmerButtons as default}
