import React from 'react';
import '../css/App.css';
import '../css/house.css';
import DeviceToShare from './DeviceToShare';
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";

const ColorCircularProgress = withStyles({root: {color: '#580B71'},})(CircularProgress);

class AddGuest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            guestUsername: "",
            rooms: null,
            devices: [],
            scenes: [],
            error: -1,  // -1 nothing, 0 no guest username, 1 no devices or scenes selected, 2 bad request, 3 unexpected error
            errorType: "",
            isLoading: false,
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", (evt) => {
            if (evt.key === 'Enter') this.sendDatas(evt)
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
            return <p><b>You have created no rooms yet. Click on the + button to add one.</b></p>
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
                {room.devices.length > 0 ? 
                    room.devices.map((deviceID) => (
                        <DeviceToShare
                            key = {deviceID}
                            username = {this.props.username}
                            session_token = {this.props.session_token}
                            roomID = {room.id}
                            deviceID = {deviceID}
                            handleCheckboxDevice = {this.handleCheckboxDevice}
                        />
                    ))
                    :
                    <p><b>There are no devices in this room.</b></p>
                }
                <br/>
                </React.Fragment>
            );
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

    // handleCheckboxRoom = (roomID) => {
    //     console.log(document.getElementById(roomID))
    // }

    handleGuestUsernameChange= (evt) => {
        this.setState({ guestUsername: evt.target.value });
    }

    //Redirection to /guests
    redirectToGuests = () => {
        window.location.href = '/guests'
    }

    sendDatas = evt => {
        evt.preventDefault();

        if (this.state.guestUsername === "") {
            this.setState({error: 0})
            return
        }
        else if (this.state.devices.length === 0 && this.state.scenes.length === 0) {
            this.setState({error: 1})
            return
        }
        else {
            this.setState({isLoading: true, error: -1})
            fetch('http://localhost:8080/guests/', {
                method: 'POST',
                headers: { 
                    'user': this.state.username,
                    'session-token': this.state.session_token,
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({
                    guest: this.state.guestUsername,
                    devices: this.state.devices,
                    scenes: this.state.scenes
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
                    this.setState({error: 2})
                }
                else {
                    this.setState({error: 3, errorType: "Error Code: " + res.status})
                }
            })
            .catch( e => this.setState({isLoading: false, error: 3, errorType: e.toString()}))
        }
    }

    showError = () => {
        if (this.state.error === 0) {
            return (<span className="error-message">Please fill the guest's username</span>)
        }
        else if (this.state.error === 1) {
            return (<span className="error-message">Please select at least one device or scene</span>)
        }
        else if (this.state.error === 2) {
            return (<span className="error-message">Error: bad request</span>)
        }
        else if (this.state.error === 3) {
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
                        <h2 className="col l11 left-align headline-title">Add guest</h2>
                    </div>
                    <div className="textFields">
                        <input type="text" name="guestUsername" value={this.state.deviceName} placeholder="Insert Guest Username" onChange={this.handleGuestUsernameChange} required/>
                    </div>
                    <br/>
                    {this.mapRooms()}

                    <div className="message-two-lines center-text">
                        <span>
                            <ColorCircularProgress className={this.state.isLoading ? "loading-spinner" : "hidden"}/>
                        </span>
                        {this.showError()}
                    </div>
                    <button type="button" name="button" className="btn-secondary btn waves-effect waves-light" onClick={this.redirectToGuests}>Cancel</button>
                    <button type="button" name="button" className="Handle-btn-primary btn waves-effect waves-light" onClick={this.sendDatas}>Save</button>
                </div>
            </div>
        );
    }
}


export default AddGuest;