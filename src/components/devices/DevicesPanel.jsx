import React, {useEffect, useReducer} from 'react'
import DevicesContext from '../../context/devicesContext'
import devicesReducer from '../../reducers/devicesReducer'
import DeviceList from './DeviceList'
import '../../css/collapsible-component.css';
import '../../css/collapsible-devices.css';
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";


const host = window.location.protocol + '//' + window.location.hostname + ':8080';
const params = (new URL(document.location)).searchParams;
const path = window.location.pathname.toLowerCase().split('/');
const devicesFetchUrl = host + '/devices';
const roomDevicesFetchUrl = host + '/rooms/' + params.get('id') + '/devices';
const fetchRoomUrl = host + '/rooms/' + params.get('id');
const fetchUrl = path[1] === 'room' && params.get('id') ? roomDevicesFetchUrl : devicesFetchUrl;
let roomBackground = '/img/backgrounds/rooms/background-hallway.svg';
// let isDeviceStateChanging = false;
let isLoading = true;
let isDataFound = true;
let isNetworkError = false;
let isRoom = false;
let title = "";


/**
 * Generates a panel with a DevicePanel
 * @returns {DevicePanel}
 */
const DevicesPanel = () => {
    const [actionCompleted, setActionCompleted] = React.useState(false);
    const [devices, dispatch] = useReducer(devicesReducer, []);
    const ColorCircularProgress = withStyles({root: {color: '#580B71'},})(CircularProgress);

    if (path[1] === 'room' && params.get('id')) {
        isRoom = true
    }

    // Fetches devices and room info on page load
    useEffect(() => {
        const method = 'GET';
        const headers = {
            'user': localStorage.getItem('username'),
            'session-token': localStorage.getItem('session_token')
        };

        if (isRoom) {
            fetch(fetchRoomUrl, {
                method: method,
                headers: headers,
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
                    roomBackground = room.background !== null && room.background;
                    title = room.name;
                })
                .catch(e => console.log(e));
        }

        fetch(fetchUrl, {
            method: method,
            headers: headers,
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
                isLoading = false;

                if (data === null || data.length === 0) {
                    isDataFound = false;
                } else {
                    let devices = JSON.parse(data).sort(function (a, b) {
                        let keyA = a.name;
                        let keyB = b.name;
                        if (keyA < keyB) return -1;
                        if (keyA > keyB) return 1;
                        return 0;
                    });
                    dispatch({type: 'POPULATE_DEVICES', devices: devices});
                    isLoading = false;
                }
            })
            .catch(e => {
                console.log(e);
                isLoading = false;
                isNetworkError = true;
            });
        setActionCompleted(false)
    }, []);

    // Fetches scenes on state change, on Reducer's actions completion
    useEffect(() => {
        if (actionCompleted) {
            const method = 'GET';
            const headers = {
                'user': localStorage.getItem('username'),
                'session-token': localStorage.getItem('session_token')
            };

            fetch(fetchUrl, {
                method: method,
                headers: headers,
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
                    isLoading = false;

                    if (data === null || data.length === 0) {
                        isDataFound = false;
                    } else {
                        let devices = JSON.parse(data).sort(function (a, b) {
                            let keyA = a.name;
                            let keyB = b.name;
                            if (keyA < keyB) return -1;
                            if (keyA > keyB) return 1;
                            return 0;
                        });
                        dispatch({type: 'POPULATE_DEVICES', devices: devices});
                        isLoading = false;
                    }
                })
                .catch(e => {
                    console.log(e);
                    isLoading = false;
                    isNetworkError = true;
                });
            setActionCompleted(false)
        }
    }, [actionCompleted]);

    const errorMessage = () => {
        if (!isDataFound) {
            return "You haven't added any devices yet. Please add a new one."
        }
        if (isNetworkError) {
            return "We are sorry. There was an error."
        }
    }

    return (
        <DevicesContext.Provider value={{devices, dispatch, isRoom, setActionCompleted}}>
            <div id="wrapper" className="devices">
                <main style={{
                    backgroundImage: isRoom && "url('" + roomBackground + "')",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                    backgroundPosition: 'center'
                }}>
                    <article className="row row-custom row row-custom-custom">
                        <div id="content" className="">
                            <section
                                className={(isRoom) ? "content-box-collapsible z-depth-2 content-box-transparency" : "content-box-collapsible z-depth-2"}>
                                <div className="headline-box row row-custom row row-custom-custom">
                                    <h3 className="col col-custom l8 left-align headline-title">{(isRoom) ? title : "My Devices"}</h3>
                                    <a href="/addDevice"><i
                                        className="col col-custom l1 btn waves-effect waves-light btn-primary-circular right material-icons">add</i></a>
                                </div>
                                <div className={(isLoading) ? "centered-loading-data-message" : "hidden"}>
                                    <ColorCircularProgress/>
                                </div>
                                <div className={(!isDataFound  || isNetworkError) ? "centered-loading-data-message" : "hidden"}>
                                    <p className={(isNetworkError) ? "error-message" : undefined}>{errorMessage()}</p>
                                </div>
                                <ul className={(isLoading || !isDataFound) ? "hidden" : "collapsible expandable expandable-component"}>
                                    <li className="row row-custom row row-custom-custom">
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

export {DevicesPanel as default}
