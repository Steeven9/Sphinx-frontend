import React, {useEffect, useReducer} from 'react'
import DevicesContext from '../../context/devices-context'
import devicesReducer from '../../reducers/devicesReducer'
import DeviceList from './DeviceList'
import '../../css/collapsible-component.css';
import '../../css/collapsible-devices.css';


/**
 * Generates a panel with a DevicePanel
 * @returns {DevicePanel}
 */
const DevicesPanel = (props) => {
    const [devices, dispatch] = useReducer(devicesReducer, []);


    // Fetches devices on page load
    useEffect( () => {
        const params = (new URL(document.location)).searchParams;
        const path = window.location.pathname.toLowerCase().split('/');
        const devicesFetchUrl = 'http://localhost:8080/devices/';
        const roomDevicesFetchUrl = 'http://localhost:8080/rooms/' + params.get('id');
        const fetchUrl = path[1] === 'room' && params.get('id') ? roomDevicesFetchUrl : devicesFetchUrl;

        fetch(fetchUrl, {
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
                let devices = sortDevices(JSON.parse(data));

                    if (data === null) {
                        devices = [{name: 'You have no devices yet. Please add a new one.'}]
                    }
                    dispatch({type: 'POPULATE_DEVICES', devices: devices});
            })
            .catch(e => console.log(e));

    }, []);

    useEffect(() => {
        console.log('Devices were updated')
    }, [devices]);

    try{
        devices.sort(function(a, b) {
            let keyA = a.name;
            let keyB = b.name;
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
                                    <h3 className="col col-collapsible l8 left-align headline-title">{props.title}</h3>
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

function sortDevices(devices) {
    try{
        return devices.sort(function(a, b) {
            let keyA = a.name;
            let keyB = b.name;
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });
    } catch(e) {
        throw e;
    }
}

// // Temporary mock devices to populate the localStorage
// const myDevices = [
//     {
//         id: 0,
//         icon: "bulb-led.svg",
//         type: 2,
//         name: "LED light 1",
//         room: "Master bedroom",
//         switched: 2,
//         slider: 75,
//         on: false
//     },
//     {
//         id: 1,
//         icon: "bulb-fluorescent.svg",
//         type: 1,
//         room: "Kitchen",
//         name: "Fluorescent bulb 1",
//         switched: 3,
//         on: true
//     },
//     {
//         id: 2,
//         icon: "dimmer-state.svg",
//         type: 4,
//         room: "Master bedroom",
//         name: "Dimmer (memory)",
//         slider: 100,
//         switches: [0, 7],
//         on: false
//     },
//     {
//         id: 3,
//         icon: "switch.svg",
//         type: 3,
//         name: "Switch",
//         room: "Kitchen",
//         switches: [1],
//         on: true
//     },
//     {
//         id: 4,
//         icon: "sensor-temperature.svg",
//         type: 9,
//         room: "Living room",
//         name: "Temperature sensor",
//         label: "2'000 lm"
//     },
//     {
//         id: 5,
//         icon: "smart-plug.svg",
//         type: 6,
//         room: "Garage",
//         name: "SmartPlug",
//         label: '350 kWh',
//         on: true
//     },
//     {
//         id: 6,
//         icon: "sensor-motion.svg",
//         type: 10,
//         room: "Backyard",
//         name: "Motion sensor"
//     },
//     {
//         id: 7,
//         icon: "bulb-led.svg",
//         type: 2,
//         name: "LED light 2",
//         slider: 10,
//         room: "Master bedroom",
//         switched: 2,
//         on: false
//     },
//     {
//         id: 8,
//         icon: "dimmer-regular",
//         type: 5,
//         name: "Dimmer (regular)",
//         room: "Guest room",
//         switches: [9],
//         slider: 0,
//         on: false
//     },
//     {
//         id: 9,
//         icon: "bulb-led.svg",
//         type: 2,
//         name: "LED light 3",
//         room: "Guest room",
//         switched: 8,
//         slider: 60,
//         on: false
//     },
//     {
//         id: 10,
//         icon: "bulb-led.svg",
//         type: 2,
//         name: "LED light 4",
//         room: "Guest bedroom",
//         switched: 8,
//         slider: 75,
//         on: false
//     },
//     {
//         id: 0,
//         icon: "bulb-led.svg",
//         type: 2,
//         name: "LED light 5",
//         room: "Kitchen",
//         switched: 3,
//         slider: 15,
//         on: false
//     }
// ];


export {DevicesPanel as default}
