import React from 'react';
import '../css/App.css';
import '../css/devices.css';

class AddDevice extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            success: false,
            error: false,
            incomplete: false,
            deviceName: "",
            type: "0",
            room: "0",
            pairing: "0",
            selectRooms: <></>
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/rooms/', {
            method: 'GET',
            headers: {
                'user': this.props.username,
                'session-token': this.props.session_token,
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
            if (response === null) {
                this.setState({ room: "-1" })
                this.setState({ selectRooms: <select className="selector" onChange={this.handleRoomChange}><option value="-1">Error Occurred</option></select>, room: "-1" })
            } else {
                this.mapRooms(response);
            }
        })
        .catch(error => console.log(error));
    }

    /**
     * Map received array rooms into the Selector
     */
    mapRooms = (rooms) => {
        if (rooms.length === 0) {
            this.setState({ selectRooms: <select className="selector" disabled onChange={this.handleRoomChange}><option value="0">No Room Available</option></select>, room: "0" })
        } else {
            let i = 0;
            let toSet = <select className="selector" onChange={this.handleRoomChange}> <option value="0">Select Room</option> {rooms.map((room) => <option key={i++} value={room.id}>{room.name}</option>)}</select>
            this.setState({ selectRooms: toSet })
        }
    }

    /**
     * Sends informations contained in this.state to the backend
     */
    sendDatas = evt => {
        evt.preventDefault();
        if (this.state.type === "0" || this.state.room === "0") {
            this.setState({ success: false, error: false, incomplete: true })
        }
        else {
            let deviceName = this.state.deviceName.length === 0 ? "Device" : this.state.deviceName
            fetch('http://localhost:8080/devices/', {
                method: 'POST',
                headers: {
                    'user': this.props.username,
                    'session-token': this.props.session_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: deviceName,
                    icon: this.props.findPathDevice(this.state.type),
                    deviceType: parseInt(this.state.type),
                    // pairing: this.state.room //ID, if "0" then no room
                })
            })
            .then((res) => {
                if (res.status === 203) {
                    this.setState({ success: true, error: false, incomplete: false })
                }
                else if (res.status === 401) {
                    this.props.logOut(1)
                }
                else {
                    this.setState({ success: false, error: true, incomplete: false });
                }
            })
            .catch(error => console.log(error))
        }
    };

    // function to handle state on input change
    handleTypeChange = evt => {
        this.setState({ type: evt.target.value })
    }
    handleDeviceNameChange = evt => {
        this.setState({ deviceName: evt.target.value });
    }
    handleRoomChange = evt => {
        this.setState({ room: evt.target.value })
    }
    // handlePairingChange = evt => {
    //     this.setState({ pairing: evt.target.value })
    // }

    /**
     * Display a message if a room has been successfully created, and if not an error message
     */
    deviceCreated = () => {
        if (this.state.success) {
            return (<p><i>Device created successfully</i></p>)
        }
        else if (this.state.error) {
            return (<p>An error has occurred, please try again</p>)
        }
        else if (this.state.incomplete) {
            return (<p>Please insert all information</p>)
        }
    }

    //Redirection to /devices
    redirectToDevices = () => {
        window.location.href = '/devices'
    }

    /**
     * Renders AddDevice page
     */
    render() {
        return (
            <div className="addDevice">
                <div className="device-content-box z-depth-2">
                    <h2 className="title">Add device</h2>
                    <div>
                        <div className="textFields">
                            <input type="text" name="" placeholder="Device Name" onChange={this.handleDeviceNameChange} required />
                        </div>
                        <div className="textFields">
                            <select className="selector" onChange={this.handleTypeChange}>
                                <option value="0">Device type</option>
                                <option value="1">Light</option>
                                <option value="2">Dimmable Light</option>
                                <option value="3">Switch</option>
                                <option value="4">Dimmer</option>
                                <option value="5">Dimmer (no-memory)</option>
                                <option value="6">Smart plug</option>
                                <option value="7">Humidity sensor</option>
                                <option value="8">Light sensor</option>
                                <option value="9">Temperature sensor</option>
                                <option value="10">Motion sensor</option>
                            </select>
                        </div>
                        <div className="textFields">
                            {this.state.selectRooms}
                        </div>
                        {/* <div className="textFields"> 
                            <select className="selector" onChange={this.handlePairingChange}>
                                <option value="0">No pairing</option>
                            </select>
                        </div> */}
                        {this.deviceCreated()}
                    </div>
                    <div className="center">
                        <button type="button" name="button" className="btn-secondary btn waves-effect waves-light" onClick={this.redirectToDevices}>Cancel</button>
                        <button type="button" name="button" className="btn-primary btn waves-effect waves-light" onClick={this.sendDatas}>Save device</button>
                    </div>
                </div>
            </div>
        );
    }
}


export default AddDevice;