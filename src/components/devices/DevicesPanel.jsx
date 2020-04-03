import React, {useEffect, useReducer} from 'react'
import DevicesContext from '../../context/devices-context'
import devicesReducer from '../../reducers/devicesReducer'
import DeviceList from './DeviceList'
import '../../css/collapsible-component.css';
import '../../css/collapsible-devices.css';
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";


const params = (new URL(document.location)).searchParams;
const path = window.location.pathname.toLowerCase().split('/');
const devicesFetchUrl = 'http://localhost:8080/devices/';
const roomDevicesFetchUrl = 'http://localhost:8080/rooms/' + params.get('id') + '/devices';
const fetchUrl = path[1] === 'room' && +params.get('id') ? roomDevicesFetchUrl : devicesFetchUrl;
let roomBackground = '/img/backgrounds/rooms/background-hallway.svg';
let isLoading = true;
let isDataFound = true;
let isRoom = false;
let title = "";

/**
 * Generates a panel with a DevicePanel
 * @returns {DevicePanel}
 */
const DevicesPanel = () => {
    const [devices, dispatch] = useReducer(devicesReducer, []);
    const ColorCircularProgress = withStyles({root: {color: '#580B71'},})(CircularProgress);

    if (path[1] === 'room' && params.get('id')) {
        isRoom = true
    }

    // Fetches devices on page load
    useEffect(() => {

        if (isRoom) {
            let fetchRoomUrl = 'http://localhost:8080/rooms/' + params.get('id');
            fetch(fetchRoomUrl, {
                method: 'GET',
                headers: {
                    'user': localStorage.getItem('username'),
                    'session-token': localStorage.getItem('session_token')
                },
            })
                .then((res) => {
                    if (res.status === 401) {
                        this.props.logOut(1);
                    } else if (res.status === 200) {
                        return res.text();
                    } else {
                        return null;
                    }
                })
                .then((data) => {
                    let room = JSON.parse(data);
                    roomBackground = room.background;
                    title = room.name;
                })
                .catch(e => console.log(e));
        }

        fetch(fetchUrl, {
            method: 'GET',
            headers: {
                'user': localStorage.getItem('username'),
                'session-token': localStorage.getItem('session_token')
            },
        })
            .then((res) => {
                if (res.status === 401) {
                    this.props.logOut(1);
                } else if (res.status === 200) {
                    return res.text();
                } else {
                    return null;
                }
            })
            .then((data) => {
                let devices = sortDevices(JSON.parse(data));
                isLoading = false;

                if (data === null || devices.length === 0) {
                    isDataFound = false;
                }
                dispatch({type: 'POPULATE_DEVICES', devices: devices});
            })
            .catch(e => console.log(e));

    }, []);

    // Extracts devices from next state
    useEffect(() => {
        console.log('Devices were updated')
    }, [devices]);

    try {
        devices.sort(function (a, b) {
            let keyA = a.name;
            let keyB = b.name;
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });
    } catch (e) {
        throw e;
    }

    return (
        <DevicesContext.Provider value={{devices, dispatch, isRoom}}>
            <div id="wrapper" className="devices">
                <main style={{
                    backgroundImage: isRoom && "url('" + roomBackground + "')",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                    backgroundPosition: 'center'
                }}>
                    <article className="row row-collapsible row row-collapsible-custom">
                        <div id="content" className="">
                            <section
                                className={(isRoom) ? "content-box-collapsible z-depth-2 content-box-transparency" : "content-box-collapsible z-depth-2"}>
                                <div className="headline-box row row-collapsible row row-collapsible-custom">
                                    <h3 className="col col-collapsible l8 left-align headline-title">{(isRoom) ? title : "My Devices"}</h3>
                                    <a href="/addDevice"><i className="col col-collapsible l1 btn waves-effect waves-light btn-primary-circular right material-icons">add</i></a>
                                </div>
                                <div className={(isLoading) ? "centered-loading-data-message" : "hidden"}>
                                    <ColorCircularProgress/>
                                </div>
                                <div className={(!isDataFound) ? "centered-loading-data-message" : "hidden"}>
                                    <p>You haven't added any devices yet. Please add a new one.</p>
                                </div>
                                <ul className={(isLoading || !isDataFound) ? "hidden" : "collapsible expandable expandable-component"}>
                                    <li className="row row-collapsible row row-collapsible-custom">
                                        <DeviceList/>
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
    try {
        return devices.sort(function (a, b) {
            let keyA = a.name;
            let keyB = b.name;
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });
    } catch (e) {
        throw e;
    }
}

export {DevicesPanel as default}
