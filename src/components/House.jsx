import React from 'react';
import '../App.css';
import '../components/css/house.css';
// import imgGarage from './img/icons/rooms/icon-garage.svg';

class House extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            session_token: props.session_token,
            rooms: <p><b>No Rooms available</b></p>
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/rooms', {
                method: 'GET',
                headers: { 
                    'user': this.state.username,
                    'session-token': this.state.session_token,
                },
            })
            .then( (res) => {
                if (res.status === 401) {
                    this.props.logOut(1)
                }
                else if (res.status === 200) {
                    this.mapRooms(res.rooms)
                }
                else {
                    this.setState({rooms: <p><b>An error has occurred.</b></p>})
                }
            })
            .catch( error => this.props.logOut(2))
            // .catch( error => {
            //     this.setState({rooms: 
            //         <>
            //         <div className="image vertical-center"><img src={imgGarage} alt="device-logo" /></div>
            //         <div className="room-name vertical-center"> name of the room</div>
            //         <div className="dev-number vertical-center">7</div>
            //         <div className="room-button1 vertical-center"><i className="material-icons btn-edit">edit</i></div>
            //         <div className="room-button2 vertical-center"><i className="material-icons btn-visibility">visibility</i></div>
            //         </>
            //     })
            // })
    }

    /**
     * Maps the received array of rooms and sets it as this.state.rooms. If no rooms are available, this.state.rooms gets changed with a specific phrase.
     * @param rooms: array of rooms
     */
    mapRooms = (rooms) => {
        //
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
                        <a href="/addRoom" className="add-btn waves-effect waves-light btn-primary-circular">+</a>
                    </div>

                    <div className="canvas2">
                        <div className="informations"><div className="name1">Name</div></div>
                        <hr className="line" />
                        <div className="room">
                            {this.state.rooms}
                        </div>
                        <hr className="line" />
                    </div>
                </div>
            </div>
        );
    }
}


export default House;