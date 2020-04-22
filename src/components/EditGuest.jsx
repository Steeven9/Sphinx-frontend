import React from 'react';
import '../css/App.css';
import '../css/house.css';
import * as qs from 'query-string';
import DeviceToShare from './DeviceToShare';
import SceneToShare from './SceneToShare';
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";

const ColorCircularProgress = withStyles({root: {color: '#580B71'},})(CircularProgress);

class EditGuest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            guestUsername: "",
            rooms: [],
            devices: [],
            scenes: [],
            scenesToSend: [],
            error: -1,  // -1 nothing, 0 no devices or scenes selected, 1 bad request, 2 unexpected error
            errorType: "",
            isLoading: false,
            guestDevices: [],
            guestScenes: [],
            allDevices: false,
            allScenes: false,
            allDevicesIDs: [],
            allScenesIDS: [],
        }
    }

    componentDidMount() {
        const parsed = qs.parse(window.location.search);
        let parsedGuest = parsed.guest
        this.setState({guestUsername: parsedGuest})

        document.addEventListener("keydown", (evt) => {
            if (evt.key === 'Enter') this.sendDatas(evt)
        });

        fetch('http://localhost:8080/guests/' + this.props.username + '/devices/' + parsedGuest, {
            method: 'GET',
            headers: {
                'user': this.props.username,
                'session-token': this.props.session_token,
            },
        })
        .then((res) => {
            if (res.status === 200) {
                return res.text();
            } else {
                return null;
            }
        })
        .then((data) => {
            if (data === null) return;
            let devices = JSON.parse(data);
            this.setState({guestDevices: devices, devices: devices})
        });

        fetch('http://localhost:8080/rooms/', {
            method: 'GET',
            headers: {
                'user': this.props.username,
                'session-token': this.props.session_token,
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
            let response = JSON.parse(data);

            if (response === null) {
                //TODO error handling
            } else {
                this.setState({
                    rooms: response,
                });
            }
        });

        fetch('http://localhost:8080/scenes/' + this.props.username + '/devices/' + parsedGuest, {
            method: 'GET',
            headers: {
                'user': this.props.username,
                'session-token': this.props.session_token,
            },
        })
        .then((res) => {
            if (res.status === 200) {
                return res.text();
            } else {
                return null;
            }
        })
        .then((data) => {
            if (data === null) return;
            let scenes = JSON.parse(data);
            this.setState({guestScenes: scenes, scenesToSend: scenes})
        });

        fetch('http://localhost:8080/scenes/', {
            method: 'GET',
            headers: {
                'user': this.props.username,
                'session-token': this.props.session_token,
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
            let response = JSON.parse(data);

            if (response === null) {
                // TODO error handling
            } else {
                this.setState({
                    scenes: response,
                });
            }
        });
    }

    /**
     * Maps the received array of rooms and sets it as this.state.rooms. If no rooms are available, this.state.rooms gets changed with a specific phrase.
     * @param rooms: array of rooms
     */
    mapRooms = () => {
        const { rooms } = this.state;
        if (!rooms) { 
            return <div className="message-two-lines center-text"><span><ColorCircularProgress className="loading-spinner"/></span></div>
        } else if (rooms.length === 0) {
            return <p><b>You have no rooms.</b></p>
        } else {
            return rooms.map((room) =>
                <React.Fragment key={room.id}>
                    <div className="row rooms-headline">
                        <div className="col l1"></div>
                        <div className="col l5">{room.name}</div>
                        <div className="col l2 center-text"></div>
                        <div className="col l4">
                            {/* {room.devices.length > 0 ? <label><input type="checkbox" id={room.id} onClick={() => this.handleCheckboxRoom(room.id)}/><span></span></label> : <></>} */}
                        </div>
                    </div>
                    <ul className="collapsible expandable expandable-component">
                        <li className="row row-collapsible row row-collapsible-costum">
                            {room.devices.length > 0 ? 
                                room.devices.map((deviceID) => (
                                    <DeviceToShare
                                        key = {deviceID}
                                        username = {this.props.username}
                                        session_token = {this.props.session_token}
                                        roomID = {room.id}
                                        deviceID = {deviceID}
                                        editGuest = {true}
                                        guestUsername = {this.state.guestUsername}
                                        guestDevices = {this.state.guestDevices}
                                        handleCheckboxDevice = {this.handleCheckboxDevice}
                                    />
                                ))
                                :
                                <p><b>There are no devices in this room.</b></p>
                            }
                        </li>
                    </ul>
                </React.Fragment>
            );
        }
    }

    /**
     * Maps the received array of scenes and sets it as this.state.scenes. If no scenes are available, this.state.scenes gets changed with a specific phrase.
     */
    mapScenes = () => {
        const { scenes } = this.state;
        if (!scenes) { 
            return <div className="message-two-lines center-text"><span><ColorCircularProgress className="loading-spinner"/></span></div>
        } else if (scenes.length === 0) {
            return <p><b>You have created no scenes yet.</b></p>
        } else {
            return scenes.map((scene) => (
                    <SceneToShare
                        key = {scene.id}
                        username = {this.props.username}
                        session_token = {this.props.session_token}
                        scene = {scene}
                        editGuest = {true}
                        guestUsername = {this.state.guestUsername}
                        guestScenes = {this.state.guestScenes}
                        handleCheckboxScene = {this.handleCheckboxScene}
                    />
                )
            )
        }
    }

    handleCheckboxDevice = (deviceID) => {
        let devices = this.state.devices
        if (devices.indexOf(deviceID) !== -1) {
            let deviceIndex = devices.indexOf(deviceID);
            let toSet = devices.splice(0, deviceIndex).concat(devices.splice(deviceIndex+1, devices.length + 1))
            this.setState({devices: toSet})
        }
        else {
            devices = [...this.state.devices, deviceID]
            this.setState({devices: devices})
        }
    }

    handleCheckboxScene = (sceneID) => {
        let scenes = this.state.scenesToSend
        if (scenes.indexOf(sceneID) !== -1) {
            let sceneIndex = scenes.indexOf(sceneID);
            let toSet = scenes.splice(0, sceneIndex).concat(scenes.splice(sceneIndex+1, scenes.length + 1))
            this.setState({scenesToSend: toSet})
        }
        else {
            scenes = [...this.state.scenesToSend, sceneID]
            this.setState({scenesToSend: scenes})
        }
    }

    selectAllDevices = () => {
        if (this.state.allDevices === []) {
            let toSet = []
            this.state.rooms.forEach((room) => {
                room.devices.forEach((device) => {
                    toSet.push(device)
                })
            })
            this.setState({allDevicesIDs: toSet})
        }
        this.state.allDevices ? this.setState({allDevices: false, devices: this.state.guestDevices}) : this.setState({allDevices: true})
    }

    selectAllScenes = () => {
        if (this.state.allScenes === []) {
            let toSet = []
            this.state.scenes.forEach((scene) => {
                toSet.push(scene.id)
            })
            this.setState({allScenesIDs: toSet})
        }
        this.state.allScenes ? this.setState({allScenes: false, scenesToSend: this.state.guestScenes}) : this.setState({allScenes: true})
    }

    //Redirection to /guests
    redirectToGuests = () => {
        window.location.href = '/guests'
    }

    sendDatas = evt => {
        evt.preventDefault();

        if (this.state.devices.length === 0 && this.state.scenes.length === 0) {
            this.setState({error: 0})
            return
        }
        else {
            let devicesToSend = this.state.devices
            let scenesToSend = this.state.scenesToSend
            if (this.state.allDevices) devicesToSend = this.state.allDevicesIDs
            if (this.state.allScenes) scenesToSend = this.state.allScenesIDs
            this.setState({isLoading: true, error: -1})
            fetch('http://localhost:8080/guests/', {
                method: 'PUT',
                headers: { 
                    'user': this.state.username,
                    'session-token': this.state.session_token,
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({
                    guest: this.state.guestUsername,
                    devices: devicesToSend,
                    scenes: scenesToSend
                })
            })
            .then( (res) => {
                this.setState({isLoading: false})
                if (res.status === 200) {
                    this.redirectToGuests()
                }
                else if (res.status === 401) {
                    this.props.logOut(1)
                }
                else if (res.status === 400) {
                    this.setState({error: 1})
                }
                else {
                    this.setState({error: 2, errorType: "Error Code: " + res.status})
                }
            })
            .catch( e => this.setState({isLoading: false, error: 2, errorType: e.toString()}))
        }
    }

    deleteGuest = evt => {
        this.setState({isLoading: true, error: -1})
        fetch('http://localhost:8080/guests/' + this.state.guestUsername, {
            method: 'DELETE',
            headers: { 
                'user': this.state.username,
                'session-token': this.state.session_token,
            }
        })
        .then( (res) => {
            this.setState({isLoading: false})
            if (res.status === 204) {
                this.redirectToGuests()
            }
            else if (res.status === 401) {
                this.props.logOut(1)
            }
            else if (res.status === 400) {
                this.setState({error: 1})
            }
            else {
                this.setState({error: 2, errorType: "Error Code: " + res.status})
            }
        })
        .catch( e => {
            this.setState({isLoading: false})
            this.setState({error: 2, errorType: e.toString()})
        })
    }

    showError = () => {
        if (this.state.error === 0) {
            return (<span className="error-message">Please select at least one device or scene</span>)
        }
        else if (this.state.error === 1) {
            return (<span className="error-message">Error: bad request</span>)
        }
        else if (this.state.error === 2) {
            return (<span className="error-message">{this.state.errorType}</span>)
        }
    }

    /**
     * Renders the list of rooms and device plus the form for the guest's username
     */
    render() {
        return (
            <div className="container">
                <div className="rooms-content-box z-depth-2">
                    <div className="headline-box row row-collapsible row row-collapsible-custom">
                        <h2 className="col l11 left-align headline-title">Edit guest</h2>
                    </div>
                    
                    <label><input type="checkbox" onClick={() => this.selectAllDevices()}/><span>Select all Devices</span></label>
                    <br/>
                    <label><input type="checkbox" onClick={() => this.selectAllScenes()}/><span>Select all Scenes</span></label>
                    <br/>
                    {this.state.allDevices ? <></> : this.mapRooms()}
                    <br/>
                    {this.state.allScenes ? <></> :
                        <>
                            <div className="row rooms-headline">
                                <div className="col l1"></div>
                                <div className="col l5">Scenes</div>
                                <div className="col l2 center-text"></div>
                                <div className="col l4"></div>
                            </div>
                            <ul className="collapsible expandable expandable-component">
                                <li className="row row-collapsible row row-collapsible-costum">
                                    {this.mapScenes()}
                                </li>
                            </ul>
                        </>
                    }

                    <div className="message-two-lines center-text">
                        <span>
                            <ColorCircularProgress className={this.state.isLoading ? "loading-spinner" : "hidden"}/>
                        </span>
                        {this.showError()}
                    </div>
                    <button type="button" name="button" className="btn-secondary btn waves-effect waves-light" onClick={this.redirectToGuests}>Cancel</button>
                        <button type="button" name="button" className="Handle-btn-secondary btn waves-effect waves-light" onClick={this.deleteGuest}>Delete</button>
                    <button type="button" name="button" className="Handle-btn-primary btn waves-effect waves-light" onClick={this.sendDatas}>Save</button>
                </div>
            </div>
        );
    }
}


export default EditGuest;