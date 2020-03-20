import React, {useEffect, useReducer} from 'react'
import DevicesContext from '../context/devices-context'
import devicesReducer from '../../reducers/devicesReducer'
import DeviceList from './DeviceList'

const DevicesPanel = () => {
    const myDevices = [
        {
            id: 0,
            icon: "DimmableLight",
            deviceType: "DimmableLight",
            name: "LED light",
            room: "Master bedroom",
            slider: 75
        },
        {
            id: 1,
            icon: "Light",
            deviceType: "Light",
            room: "Master bedroom",
            name: "Light bulb",
            switched: '3'
        },
        {
            id: 2,
            icon: "DimmableSwitch",
            deviceType: "DimmableSwitch",
            room: "Kitchen",
            name: "Dimmable switch",
            switches: '0'
        },
        {
            id: 3,
            icon: "Switch",
            deviceType: "Switch",
            name: "Switch",
            room: "Master bedroom",
            switches: '1'
        },
        {
            id: 4,
            icon: "TempSensor",
            deviceType: "TempSensor",
            room: "Living room",
            name: "Temperature sensor"
        },
        {
            id: 5,
            icon: "SmartPlug",
            deviceType: "SmartPlug",
            room: "Garage",
            name: "Smart plug"
        }];

    const [devices, dispatch] = useReducer(devicesReducer, []);

    useEffect(() => {
        const devices = JSON.parse(localStorage.getItem('devices'));

        if(devices) {
            dispatch({type: 'POPULATE_DEVICES', devices: devices})
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('devices', JSON.stringify(myDevices))
    }, [devices]);

    return(
        <DevicesContext.Provider value={{devices, dispatch}}>
            <div id="wrapper" className="devices">
                <main>
                    <article className="row row-collapsible row row-collapsible-custom">
                        <div id="content" className="">
                            <section className="content-box-collapsible z-depth-2">
                                <div className="headline-box row row-collapsible row row-collapsible-custom">
                                    <h3 className="col col-collapsible l8 left-align headline-title">My devices</h3>
                                    <a href="/#"><i className="col col-collapsible l1 btn waves-effect waves-light btn-primary-circular right material-icons">add</i></a>
                                </div>
                                <ul className="collapsible expandable expandable-component">
                                    <DeviceList />
                                </ul>
                            </section>
                        </div>
                    </article>
                </main>
            </div>
        </DevicesContext.Provider>
    )

};

export {DevicesPanel as default}
