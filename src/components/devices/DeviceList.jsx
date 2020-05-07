import React, {useContext} from 'react'
import Device from './Device'
import DevicesContext from '../../context/devicesContext'


/**
 * Generates a list of nested devices
 * @returns {DeviceList}
 */
const DeviceList = (isGuest) => {
        const {devices} = useContext(DevicesContext);

        let expandedDevices = [];
        let children = JSON.parse(JSON.stringify(devices));
        let id = 0;

        // Sets a 'child' flag to identify each parent device's children
        for (let parent of devices) {
            expandedDevices.push(parent);

            if (parent.switches) {
                parent.parent = true;

                for (let child of children) {
                    if (child.switched !== null) {
                        for (let parentId of child.switched)
                            if (parentId === parent.id) {
                                child.child = true;
                                expandedDevices.push(child);
                            }
                    }
                }
            }
        }
        return expandedDevices.map((device) => (
            <Device key={id++} device={device} isGuest={isGuest}/>
        ))
    }
;

export {DeviceList as default}

