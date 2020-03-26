import React, {useContext} from 'react'
import Device from './Device'
import DevicesContext from '../../context/devices-context'


/**
 * Generates a list of nested devices
 * @returns {DeviceList}
 */
const DeviceList = () => {
    const {devices} = useContext(DevicesContext);

    let expandedDevices = [];
    let children = JSON.parse(JSON.stringify(devices));
    let id = 0;

    for (let parent of devices) {
        expandedDevices.push(parent);

        if(parent.switches !== undefined){
            parent.parent = true;

            for (let child of children){
                if (child.switched === parent.id){
                    child.child = true;
                    expandedDevices.push(child);
                }
            }
        }
    }
    return expandedDevices.map((device) => (
            <Device key={id++} device={device} />
    ))
};

export {DeviceList as default}
