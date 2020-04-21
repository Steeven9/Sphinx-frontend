import React from 'react';
import '../css/App.css';
import '../css/house.css';
import DeviceToShare from './DeviceToShare';
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";

const ColorCircularProgress = withStyles({root: {color: '#580B71'},})(CircularProgress);
// var devicesToSend = [];

class AddGuest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            guestUsername: "",
            rooms: null,
            devices: [],
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
                <br/><br/>
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
        console.log("Datas Sent")
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
                    <button type="button" name="button" className="btn-secondary btn waves-effect waves-light" onClick={this.redirectToGuests}>Cancel</button>
                    <button type="button" name="button" className="Handle-btn-primary btn waves-effect waves-light" onClick={this.sendDatas}>Save</button>
                </div>
            </div>
        );
    }
}


export default AddGuest;