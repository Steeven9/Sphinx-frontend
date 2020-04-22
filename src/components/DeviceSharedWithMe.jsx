import React from 'react';
import '../css/App.css';
import '../css/house.css';
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";

const ColorCircularProgress = withStyles({root: {color: '#580B71'},})(CircularProgress);

class DeviceSharedWithMe extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            deviceID: props.deviceID,
            device: <div className="message-two-lines center-text"><span><ColorCircularProgress className="loading-spinner"/></span></div>,
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
        return <div className="collapsible-header">
                    <form id="devicesForm" className="device-form">
                        <div className="col col-collapsible l6 m6 s12">
                            <div className="col col-collapsible l12 s12 icons-wrapper">
                                <i className="material-icons l1"> </i>
                                <div className="icon-device l1"><img className="" src="/img/icons/devices/bulb-regular.svg" alt="Device"/></div>
                                <div className="device-info col col-collapsible l12 m6 s12 left-align">
                                    <p className="device-name">{device.name}</p>
                                    <p className="device-location">room1</p>
                                    <p className="device-type-name"></p>
                                </div>
                            </div>
                        </div>
                        <div className="device-control col col-collapsible l6 m6 s12">
                            <div className="col col-collapsible l8 m6 s8">{this.getType(device.type)}</div>
                            <div>
                                <div className="col col-collapsible l4 device-control-switch">
                                    <div className="switch col col-collapsible l2 m8 s11 right-align">
                                        <div>
                                            <div className=""></div>
                                        </div>
                                    </div>
                                    <div className="col col-collapsible l2 m1 s1 right-align">
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


export default DeviceSharedWithMe;