import React from 'react';
import '../css/App.css';
import '../css/house.css';
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";

const ColorCircularProgress = withStyles({root: {color: '#580B71'},})(CircularProgress);

class House extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rooms: <div className="message-two-lines center-text"><span><ColorCircularProgress className="loading-spinner"/></span></div>
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
                    this.setState({rooms: <p><b>An error has occurred.</b></p>});
                } else if (response.length === 0) {
                    this.setState({
                        rooms: <p><b>You still have not create any rooms. Please click on the + button to add one.</b></p>
                    });
                } else {
                    this.mapRooms(response);
                }
            });
    }

    /**
     * Maps the received array of rooms and sets it as this.state.rooms. If no rooms are available, this.state.rooms gets changed with a specific phrase.
     * @param rooms: array of rooms
     */
    mapRooms = (rooms) => {
        if (rooms.length === 0) {
            this.setState({rooms: <p><b>You have created no rooms yet. Click on the + button to add one.</b></p>});
        } else {
            let toSet = rooms.map((room) =>
                <div className="row room">
                    <div className="col l1 image vertical-center"><img src={room.icon} alt="device-logo"/></div>
                    <div className="col l5 vertical-center">{room.name}</div>
                    <div className="col l2 vertical-center center-text">{room.devices.length}</div>
                    <div className="col l2"></div>
                    <div className="col l1 room-button1 vertical-center">
                        <i className="material-icons btn-icon btn-edit"
                           onClick={() => this.redirectToEditRoom(room.id)}>edit</i>
                    </div>
                    <div className="col l1 room-button2 vertical-center">
                        <i className="material-icons btn-icon btn-edit"
                           onClick={() => this.redirectToRoom(room.id)}>visibility_outlined</i>
                    </div>
                </div>
            );
            this.setState({rooms: toSet})
        }
    }

    //Redirection to /room
    redirectToRoom = (roomID) => {
        window.location.href = '/room?id=' + roomID
    }

    //Redirection to /editRoom
    redirectToEditRoom = (roomID) => {
        window.location.href = '/editRoom?id=' + roomID
    }

    /**
     * Renders the list of rooms
     */
    render() {
        return (
            <div className="container">
                <div className="rooms-content-box z-depth-2">
                    <div className="headline-box row row-custom">
                        <h2 className="col col-scene l8 left-align headline-title">My Rooms</h2>
                        <a href="/addRoom"><i className="col col-custom l1 btn waves-effect waves-light btn-primary-circular right material-icons">add</i></a>
                    </div>

                    <div className="row rooms-headline">
                        <div className="col l1"></div>
                        <div className="col l5">Name</div>
                        <div className="col l2 center-text">Devices</div>
                        <div className="col l4"></div>
                    </div>
                    {this.state.rooms}
                </div>
            </div>
        );
    }
}


export default House;