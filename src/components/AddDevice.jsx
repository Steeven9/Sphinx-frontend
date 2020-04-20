import React from 'react';
import '../css/App.css';
import '../css/devices.css';
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";

const ColorCircularProgress = withStyles({root: {color: '#580B71'},})(CircularProgress);

class AddDevice extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            unknownError: "",
            success: false,
            error: false,
            incomplete: false,
            deviceName: "Device",
            type: "0",
            room: "0",
            pairing: "0",
            selectRooms: <></>,
            isLoading: false,
            iconType: "0",
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", (evt) => {
            if (evt.key === 'Enter') this.sendDatas(evt)
        });

        fetch('http://localhost:8080/rooms', {
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
                this.setState({ room: "-1" })
                this.setState({ selectRooms: <select className="selector"><option value="-1">Error Occurred</option></select>, room: "-1" })
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
            this.setState({ selectRooms: <select className="selector" disabled><option value="0">No Room Available</option></select>, room: "0" })
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
            this.setState({isLoading: true, success: false, error: false, incomplete: false})
            fetch('http://localhost:8080/devices', {
                method: 'POST',
                headers: {
                    'user': this.props.username,
                    'session-token': this.props.session_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: this.state.deviceName,
                    icon: this.props.findPathDevice(this.state.iconType),
                    type: parseInt(this.state.type),
                    roomId: this.state.room
                })
            })
            .then((res) => {
                this.setState({isLoading: false})
                if (res.status === 201) {
                    // return res.json()
                    this.setState({ success: true, error: false, incomplete: false, unknownError: "" })
                }
                else if (res.status === 401) {
                    this.props.logOut(1)
                }
                else if (res.status === 400) {
                    this.setState({ success: false, error: false, incomplete: true, unknownError: "" })
                }
                else {
                    this.setState({ success: false, error: false, incomplete: false, unknownError: "Unexpected response status: " + res.status});
                }
            })
            // .then((data) => console.log(data))
            .catch(e => this.setState({isLoading: false, success: false, error: false, incomplete: false, unknownError: "Error: " + e}))
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
            this.redirectToDevices();
        }
        else if (this.state.error) {
            return (<span className="error-message">An error has occurred, please try again</span>)
        }
        else if (this.state.incomplete) {
            return (<span className="error-message">Please insert all information</span>)
        }
        else if (this.state.unknownError !== "") {
            return (<span className="error-message">{this.state.unknownError}</span>)
        }
    }

    moveToSelection = () => {
        document.getElementById("addDeviceInfo").hidden = true
        document.getElementById("addDeviceIconSelection").hidden = false
    }

    changeIconState = (type) => {
        this.setState({iconType: type});
        document.getElementById("addDeviceInfo").hidden = false
        document.getElementById("addDeviceIconSelection").hidden = true
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
                <div id="addDeviceInfo" className="device-content-box z-depth-2">
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
                                <option value="11">Thermostat</option>
                                <option value="12">Smart curtains</option>
                                <option value="13">Security camera</option>
                            </select>
                        </div>
                        <div className="textFields">
                            {this.state.selectRooms}
                        </div>
                        <div className="roomNameAndIcon">
                            <p>Icon</p>
                            <img className="fixedSizeIcon" src={this.props.findPathDevice(this.state.iconType)} alt="icon error" />
                            <button className="material-icons removeBorder toPointer" onClick={this.moveToSelection}>edit</button>
                        </div>
                        {/* <div className="textFields"> 
                            <select className="selector" onChange={this.handlePairingChange}>
                                <option value="0">No pairing</option>
                            </select>
                        </div> */}
                        <div className="message-two-lines center-text">
                            <span>
                                <ColorCircularProgress className={this.state.isLoading ? "loading-spinner" : "hidden"}/>
                            </span>
                            {this.deviceCreated()}
                        </div>
                    </div>
                    <div className="center">
                        <button type="button" name="button" className="btn-secondary btn waves-effect waves-light" onClick={this.redirectToDevices}>Cancel</button>
                        <button type="button" name="button" className="btn-primary btn waves-effect waves-light" onClick={this.sendDatas}>Save device</button>
                    </div>
                </div>

                <div hidden id="addDeviceIconSelection" className="content-box">
                    <h2 className="title">Select Icon</h2>
                    <div className="content-box-iconSelection">
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("1")}><img src={this.props.findPathDevice('1')} alt="Light" /><br />Light </button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("2")}><img src={this.props.findPathDevice('2')} alt="Dimmable Light" /><br />Dimmable Light </button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("3")}><img src={this.props.findPathDevice('3')} alt="Switch" /><br />Switch </button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("4")}><img src={this.props.findPathDevice('4')} alt="Dimmer" /><br />Dimmer </button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("5")}><img src={this.props.findPathDevice('5')} alt="Dimmer (no-memory)" /><br />Dimmer (no-memory) </button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("6")}><img src={this.props.findPathDevice('6')} alt="Smart plug" /><br />Smart plug </button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("7")}><img src={this.props.findPathDevice('7')} alt="Humidity sensor" /><br />Humidity sensor</button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("8")}><img src={this.props.findPathDevice('8')} alt="Light sensor" /><br />Light sensor</button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("9")}><img src={this.props.findPathDevice('9')} alt="Temperature sensor" /><br />Temperature sensor</button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("10")}><img src={this.props.findPathDevice('10')} alt="Motion sensor" /><br />Motion sensor</button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("11")}><img src={this.props.findPathDevice('11')} alt="Thermostat" /><br />Thermostat</button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("12")}><img src={this.props.findPathDevice('12')} alt="Smart curtains" /><br />Smart curtains</button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("13")}><img src={this.props.findPathDevice('13')} alt="Security camera" /><br />Security camera </button>
                    </div>
                </div>
            </div>
        );
    }
}


export default AddDevice;