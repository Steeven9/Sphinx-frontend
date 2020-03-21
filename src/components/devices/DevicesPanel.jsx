import React, {useEffect, useReducer} from 'react'
import DevicesContext from '../../context/devices-context'
import devicesReducer from '../../reducers/devicesReducer'
import DeviceList from './DeviceList'
import '../css/collapsible-component.css';
import '../css/collapsible-devices.css';

const DevicesPanel = () => {
    const myDevices = [
        {
            id: 0,
            icon: "DimmableLight",
            deviceType: "DimmableLight",
            name: "LED light",
            room: "Master bedroom",
            switched: 2,
            slider: 75,
            on: true
        },
        {
            id: 1,
            icon: "Light",
            deviceType: "Light",
            room: "Kitchen",
            name: "Light bulb",
            switched: 3,
            on: true
        },
        {
            id: 2,
            icon: "DimmableSwitch",
            deviceType: "DimmableSwitch",
            room: "Master bedroom",
            name: "Dimmable switch",
            slider: 100,
            switches: 0,
            on: false
        },
        {
            id: 3,
            icon: "Switch",
            deviceType: "Switch",
            name: "Switch",
            room: "Kitchen",
            switches: 1,
            on: true
        },
        {
            id: 4,
            icon: "TempSensor",
            deviceType: "TempSensor",
            room: "Living room",
            name: "Temperature sensor",
            label: "2'000 lm"
        },
        {
            id: 5,
            icon: "SmartPlug",
            deviceType: "SmartPlug",
            room: "Garage",
            name: "Smart plug",
            on: false
        },
        {
            id: 6,
            icon: "MotionSensor",
            deviceType: "MotionSensor",
            room: "Backyard",
            name: "Motion sensor"
        },
        {
            id: 7,
            icon: "DimmableLight",
            deviceType: "DimmableLight",
            name: "Smart LED light",
            room: "Master bedroom",
            switched: 2,
            slider: 30,
            on: true
        }
    ];

    const [devices, dispatch] = useReducer(devicesReducer, []);

    useEffect(() => {
        const devices = JSON.parse(localStorage.getItem('devices'));

        if(devices) {
            dispatch({type: 'POPULATE_DEVICES', devices: devices})
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('devices', JSON.stringify(myDevices))
    }, [myDevices]);

    devices.sort(function(a, b) {
        var keyA = a.name,
            keyB = b.name;
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    });

    return(
        <DevicesContext.Provider value={{devices, dispatch}}>
            <div id="wrapper" className="devices">
                <main>
                    <article className="row row-collapsible row row-collapsible-custom">
                        <div id="content" className="">
                            <section className="content-box-collapsible z-depth-2">
                                <div className="headline-box row row-collapsible row row-collapsible-custom">
                                    <h3 className="col col-collapsible l8 left-align headline-title">My devices</h3>
                                    <a href="/addDevice"><i className="col col-collapsible l1 btn waves-effect waves-light btn-primary-circular right material-icons">add</i></a>
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
