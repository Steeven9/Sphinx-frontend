import React from 'react';
import '../App.css';
import '../components/css/house.css';

/**
 * Placeholder page for the whole devices dashboard components pages
 */
class OmegaDevices extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            devices: <p><b>No Devices available</b></p>
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/devices/', {
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
            if (data === null) {
                this.setState({ devices: <p><b>An error has occurred.</b></p> });
            } else {
                this.mapDevices(JSON.parse(data));
            }
        });
    }

    /**
     * Maps the received array of devices and sets it as this.state.devices. If no devices are available, this.state.devices gets changed with a specific phrase.
     * @param devices: array of devices
     */
    mapdevices = (devices) => {
        if (devices.length === 0) {
            this.setState({ devices: <p><b>No devices available</b></p> });
        }
        else {
        let toSet = devices.map((device) => <div className="room"><div className="image vertical-center"><img src={device.icon} alt="device-logo" /></div><div className="room-name vertical-center">{device.name}</div>{this.checkSlider(device.slider)}{this.checkOn(device.on)}<div className="room-button1 vertical-center"><i className="material-icons btn-edit" onClick={() => this.goToEditDevice(device.id)}>edit</i></div></div>)
            this.setState({ devices: toSet })
        }
    }

    checkSlider = (slider) => {
        //
    }

    checkOn = (on) => {
        //
    }

    goToEditDevice = (deviceID) => {
        this.props.redirectEditDevice(deviceID)
    }

    /**
     * Renders the list of devices
     */
    render() {
        return (
            <div className="house">
                <div className="content-box">
                    <div className="canvas1">
                        <h2>My devices</h2>
                        <a href="/adddevice" className="add-btn waves-effect waves-light btn-primary-circular">+</a>
                    </div>

                    <div className="canvas2">
                        <div className="informations"><div className="name1">Name</div></div>
                        <hr className="line" />
                        {this.state.devices}
                        <hr className="line" />
                    </div>
                </div>
            </div>
        );
    }
}

export default OmegaDevices;