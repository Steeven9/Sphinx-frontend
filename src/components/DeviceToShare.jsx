import React from 'react';
import '../css/App.css';
import '../css/house.css';
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";

const ColorCircularProgress = withStyles({root: {color: '#580B71'},})(CircularProgress);

class DeviceToShare extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            guestUsername: props.guestUsername,
            roomID: props.roomID,
            deviceID: props.deviceID,
            device: <div className="message-two-lines center-text"><span><ColorCircularProgress className="loading-spinner"/></span></div>,
            editGuest: props.editGuest,
            guestDevices: props.guestDevices,
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/devices/' + this.state.deviceID, {
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
            let device = JSON.parse(data);

            let toSet = this.composeDeviceHTML(device)
            this.setState({device: toSet})
            this.editDevice()
        });
    }

    composeDeviceHTML = (device) => {
        return <div id="1" class="collapsible-header">
                    <form id="devicesForm" class="device-form">
                        <div class="col col-collapsible l6 m6 s12">
                            <div class="col col-collapsible l12 s12 icons-wrapper">
                                <i class="material-icons l1"> </i>
                                <div class="icon-device l1"><img class="" src={device.icon} alt="Device"/></div>
                                <div class="device-info col col-collapsible l12 m6 s12 left-align">
                                    <p class="device-name">{device.name}</p>
                                </div>
                            </div>
                        </div>
                        <div class="device-control col col-collapsible l6 m6 s12">
                            <div class="col col-collapsible l8 m6 s8">{this.getType(device.type)}</div>
                            <div>
                                <div class="col col-collapsible l4 device-control-switch">
                                    <div class="switch col col-collapsible l2 m8 s11 right-align">
                                        <div>
                                            <div class=""></div>
                                        </div>
                                    </div>
                                    <div class="col col-collapsible l2 m1 s1 right-align">
                                        {
                                            this.state.editGuest ?
                                            <label><input type="checkbox" id={device.id} onClick={() => this.handleCheckboxDeviceEditGuest()}/><span></span></label>
                                            :
                                            <label><input type="checkbox" id={device.id} onClick={() => this.props.handleCheckboxDevice()}/><span></span></label>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
    }

    handleCheckboxDeviceEditGuest = () => {
        let checked = document.getElementById(this.state.deviceID).checked
        document.getElementById(this.state.deviceID).checked = (checked ? true : false)
        this.props.handleCheckboxDevice(this.state.deviceID)
    }

    editDevice = () => {
        if (this.state.editGuest && (this.state.guestDevices.indexOf(this.state.deviceID) !== -1)) {
            document.getElementById(this.state.deviceID).checked = true;
            this.props.handleCheckboxDevice(this.state.deviceID)
        }
    }

    getType = (type) => {
        if (type === 1) return 'Light'
        else if (type === 2) return 'Dimmable Light'
        else if (type === 3) return 'Switch'
        else if (type === 4) return 'Dimmer'
        else if (type === 5) return 'Dimmer (no-memory)'
        else if (type === 6) return 'Smart plug'
        else if (type === 7) return 'Humidity sensor'
        else if (type === 8) return 'Light sensor'
        else if (type === 9) return 'Temperature sensor'
        else if (type === 10) return 'Motion sensor'
        else if (type === 11) return 'Thermostat'
        else if (type === 12) return 'Smart curtains'
        else if (type === 13) return 'Security camera'
        else return 'Unknown Device'
    }

    /**
     * Renders the device
     */
    render() {
        return (
            <>
                {this.state.device}
            </>
        );
    }
}


export default DeviceToShare;