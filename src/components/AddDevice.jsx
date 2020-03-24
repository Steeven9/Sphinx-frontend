import React from 'react';
import '../App.css';

class AddDevice extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            session_token: props.session_token,
            success: false,
            error: false,
            uncomplete: false,
            deviceName: "",
            type: "0",
            room: "0",
            pairing: "0"
        }
    }

    /**
     * Sends informations contained in this.state to the backend
     */
    sendDatas = evt => {
        evt.preventDefault();
        if (this.state.type === "0" || this.state.room === "0") {
            this.setState({success: false, error: false, uncomplete: true})
        }
        else {
            fetch('http://localhost:8080/rooms', {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: {name: this.state.deviceName, icon: "???", deviceType: this.state.type}
            })
            .then( (res) => {
                if (res.status === 203) {
                    this.setState({success: true, error: false, uncomplete: false})
                }
                else if (res.status === 401) {
                    this.props.logOut()
                }
                else {
                    this.setState({success: false, error: true, uncomplete: false});
                }
            })
            .catch( error => this.props.logOut())
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
    handlePairingChange = evt => {
        this.setState({ pairing: evt.target.value })
    }

    /**
     * Display a message if a room has been successfully created, and if not an error message
     */
    roomCreated = () => {
        if (this.state.success) {
            return(<p><i>Device created succesfully</i></p>)
        }
        else if (this.state.error) {
            return(<p>An error has occurred, please try again</p>)
        }
        else if (this.state.uncomplete) {
            return(<p>Please insert all informations</p>)
        }
    }

    /**
     * Sends to House page
     */
    goToDevices = () => {
        window.location.href = '/devices'
    }

    /**
     * Renders AddDevice page
     */
    render() {
        return (
            <div className="addDevice">
                <div className="content-box">
                    <h2 className="title">Add device</h2>
                    <div className="dates">
                        <div className="Handle-input"> 
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
                        <div className="dates-input">
                            <input style={{ width: 300 + 'px' }} type="text" name="" placeholder="Device Name" onChange={this.handleDeviceNameChange} required/>
                        </div>
                        <div className="Handle-input"> 
                            <select className="selector" onChange={this.handleRoomChange}>
                                <option value="0">Room</option>
                            </select>
                        </div>
                        <div className="Handle-input"> 
                            <select className="selector" onChange={this.handlePairingChange}>
                                <option value="0">No pairing</option>
                            </select>
                        </div>
                        {this.state.deviceCreated}
                    </div>
                    <div className="dates">
                        <div className="dates-input"><button type="button" name="button" className="btn-secondary btn" onClick={this.goToDevices}>Cancel</button></div>
                        <div className="dates-input"><button type="button" name="button" className="btn-primary btn" onClick={this.sendDatas}>Save device</button></div>
                    </div>
                </div>
            </div>
        );
    }
}


export default AddDevice;