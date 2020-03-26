import React, {useEffect, useReducer} from 'react'
import DevicesContext from '../../context/devices-context'
import devicesReducer from '../../reducers/devicesReducer'
import DeviceList from './DeviceList'
import '../css/collapsible-component.css';
import '../css/collapsible-devices.css';


/**
 * Generates a panel with a DevicePanel
 * @returns {DevicePanel}
 */
const DevicesPanel = () => {
    const [devices, dispatch] = useReducer(devicesReducer, []);

    // Stores devices in localStorage
    useEffect(async () => {
        // if (localStorage.devices === undefined) {
        //     localStorage.setItem('devices', JSON.stringify(myDevices));
        //     console.log('Devices stored in localStorage');
        // }

        fetch('http://localhost:8080/rooms/', {
            method: 'GET',
            headers: {
                'user': localStorage.getItem('username'),
                'session-token': localStorage.getItem('session_token')
            },
        })
            .then( (res) => {
                if (res.status === 401) {
                    this.props.logOut(1);
                } else if (res.status === 200) {
                    return res.text();
                } else {
                    return null;
                }
            })
            .then( (data) => {
                let response = JSON.parse(data);

                    dispatch({type: 'POPULATE_DEVICES', devices: [{}]});
                    console.log('Populated devices');
                    console.log(response);
            })
            .catch(e => console.log(e));

    }, []);

    // // Retrieves devices from localStorage and dispatches the render action
    // useEffect(() => {
    //     // const devices = JSON.parse(localStorage.getItem('devices'));
    //     // console.log('Devices retrieved from localStorage');
    //     // if(devices) {
    //     //     dispatch({type: 'POPULATE_DEVICES', devices: devices});
    //     //     console.log('Populated devices');
    //     // }
    //
    // }, []);

    useEffect(() => {
        console.log('Devices were updated')
    }, [devices]);

    try{
        devices.sort(function(a, b) {
            var keyA = a.name,
                keyB = b.name;
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });
    } catch(e){
        throw e;
    }

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
                                    <li className="row row-collapsible row row-collapsible-custom">
                                        <DeviceList />
                                    </li>
                                </ul>
                            </section>
                        </div>
                    </article>
                </main>
            </div>
        </DevicesContext.Provider>
    )
};

// Temporary mock devices to populate the localStorage
const myDevices = [
    {
        id: 0,
        icon: "DimmableLight",
        type: 2,
        name: "LED light",
        room: "Master bedroom",
        switched: 2,
        slider: 75,
        on: false
    },
    {
        id: 1,
        icon: "Light",
        type: 1,
        room: "Kitchen",
        name: "Light bulb",
        switched: 3,
        on: true
    },
    {
        id: 2,
        icon: "DimmableSwitch",
        type: 4,
        room: "Master bedroom",
        name: "Dimmable switch",
        slider: 100,
        switches: [0, 7],
        on: false
    },
    {
        id: 3,
        icon: "Switch",
        type: 3,
        name: "Switch",
        room: "Kitchen",
        switches: [1],
        on: true
    },
    {
        id: 4,
        icon: "TempSensor",
        type: 9,
        room: "Living room",
        name: "Temperature sensor",
        label: "2'000 lm"
    },
    {
        id: 5,
        icon: "SmartPlug",
        type: 6,
        room: "Garage",
        name: "Smart plug",
        label: '350 kWh',
        on: true
    },
    {
        id: 6,
        icon: "MotionSensor",
        type: 10,
        room: "Backyard",
        name: "Motion sensor"
    },
    {
        id: 7,
        icon: "DimmableLight",
        type: 2,
        name: "Smart LED light",
        room: "Master bedroom",
        switched: 2,
        slider: 30,
        on: false
    },
    {
        id: 8,
        icon: "iconDimmerRegular",
        type: 5,
        name: "Regular dimmer",
        room: "Guest's room",
        switches: [9],
        slider: 0,
        on: false
    },
    {
        id: 9,
        icon: "DimmableLight",
        type: 2,
        name: "Smart LED light 2",
        room: "Guest's room",
        switched: 8,
        slider: 60,
        on: false
    }
];

export {DevicesPanel as default}
