import React, {useContext} from 'react'
import Device from './Device'
import DevicesContext from '../context/devices-context'

const DeviceList = () => {
    const {devices} = useContext(DevicesContext);

    return devices.map((device) => (
        <Device key={device.id} device={device} />
    ))
};

export {DeviceList as default}
