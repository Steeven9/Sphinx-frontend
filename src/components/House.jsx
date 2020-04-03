import React from 'react';
import '../css/App.css';
import '../css/house.css';


class House extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rooms: <p><b>No Rooms available</b></p>
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
                    this.setState({ rooms: <p><b>An error has occurred.</b></p> });
                } else if (response.length === 0){
                    this.setState({ rooms: <p><b>You still have not create any rooms. Please select the + button to add one.</b></p> });
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
            this.setState({ rooms: <p><b>No Rooms available</b></p> });
        }
        else {
            let toSet = rooms.map((room) => <div className="room"><div className="image vertical-center"><img src={room.icon} alt="device-logo" /></div><div className="room-name vertical-center">{room.name}</div><div className="dev-number vertical-center">{room.devices.length}</div><div className="room-button1 vertical-center"><i className="material-icons btn-edit" onClick={() => this.redirectToEditRoom(room.id)}>edit</i></div><div className="room-button2 vertical-center"><i className="material-icons btn-edit" onClick={() => this.redirectToRoom(room.id)}>visibility-outlined</i></div></div>)
            this.setState({ rooms: toSet })
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
            <div className="house">
                <div className="content-box">
                    <div className="canvas1">
                        <h2>My rooms</h2>
                        <a href="/addRoom"><i className="col col-collapsible l1 btn waves-effect waves-light btn-primary-circular right material-icons">add</i></a>
                    </div>

                    <div className="canvas2">
                        <div className="informations"><div className="name1">Name</div><div className="name1">Devices</div></div>
                        <hr className="line" />
                        {this.state.rooms}
                        <hr className="line" />
                    </div>
                </div>
            </div>
        );
    }
}


export default House;