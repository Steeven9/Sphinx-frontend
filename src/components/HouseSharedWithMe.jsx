import React from 'react';
import '../css/App.css';
import '../css/house.css';
import * as qs from 'query-string';
import DeviceSharedWithMe from './DeviceSharedWithMe';
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";

const ColorCircularProgress = withStyles({root: {color: '#580B71'},})(CircularProgress);

class HouseSharedWithMe extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ownerUsername: "",
            rooms: null,
            devices: [],
            scenes: [],
            error: -1,  // -1 nothing, 0 no devices or scenes selected, 1 bad request, 2 unexpected error
            errorType: "",
            isLoading: false,
        }
    }

    componentDidMount() {
        const parsed = qs.parse(window.location.search);
        let parsedOwner = parsed.owner
        this.setState({ownerUsername: parsedOwner})

        document.addEventListener("keydown", (evt) => {
            if (evt.key === 'Enter') this.sendDatas(evt)
        });

        fetch('http://localhost:8080/guests/' + parsedOwner + '/devices/' + this.props.username, {
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
            let ownerDevices = JSON.parse(data);
            this.setState({devices: ownerDevices})
        });
    }

    /**
     * Maps the received array of devices and sets it as this.state.devices. If no devices are available, this.state.devices gets changed with a specific phrase.
     * @param devices: array of devices
     */
    mapDevices = () => {
        const { devices } = this.state;
        if (!devices) { 
            return <div className="message-two-lines center-text"><span><ColorCircularProgress className="loading-spinner"/></span></div>
        } else if (devices.length === 0) {
            return <p><b>No shared devices.</b></p>
        } else {
            return devices.map((device) =>
                <DeviceSharedWithMe
                    key = {device}
                    username = {this.props.username}
                    session_token = {this.props.session_token}
                    deviceID = {device}
                />
            );
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
                        <h2 className="col l11 left-align headline-title">{this.state.ownerUsername}'s House</h2>
                    </div>
                    {this.mapDevices()}
                </div>
            </div>
        );
    }
}


export default HouseSharedWithMe;