import React from 'react';
import '../css/App.css';
import '../css/house.css';
import * as qs from 'query-string';
import DeviceToShare from './DeviceToShare';
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
     * Maps the received array of rooms and sets it as this.state.rooms. If no rooms are available, this.state.rooms gets changed with a specific phrase.
     * @param rooms: array of rooms
     */
    mapRooms = () => {  //TODO
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
                <br/>
                </React.Fragment>
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
                    {this.mapRooms()}
                </div>
            </div>
        );
    }
}


export default HouseSharedWithMe;