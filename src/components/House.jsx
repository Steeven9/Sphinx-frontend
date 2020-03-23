import React from 'react';
import '../App.css';
import '../components/css/house-dashboard.css';
import imgGarage from './img/icons/rooms/icon-garage.svg';

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
        fetch('http://localhost:8080/', {
                method: 'GET',
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: {user: this.state.username, session_token: this.state.session_token}
            })
            .then( (res) => {
                if (res.status === 400) {
                    this.props.logOut()
                }
                else if (res.status === 200) {
                    this.setState({rooms: 
                        <>
                        <div className="image vertical-center"><img src={imgGarage} alt="device-logo" /></div>
                        <div className="room-name vertical-center"> name of the room</div>
                        <div className="dev-number vertical-center">7</div>
                        <div className="room-button1 vertical-center"><i className="material-icons btn-edit">edit</i></div>
                        <div className="room-button2 vertical-center"><i className="material-icons btn-visibility">visibility</i></div>
                        </>
                    })
                }
                else {
                    this.setState({rooms: <p><b>An error has occurred.</b></p>})
                }
            })
            // .catch( error => this.props.logOut())
            .catch( error => {
                this.setState({rooms: 
                    <>
                    <div className="image vertical-center"><img src={imgGarage} alt="device-logo" /></div>
                    <div className="room-name vertical-center"> name of the room</div>
                    <div className="dev-number vertical-center">7</div>
                    <div className="room-button1 vertical-center"><i className="material-icons btn-edit">edit</i></div>
                    <div className="room-button2 vertical-center"><i className="material-icons btn-visibility">visibility</i></div>
                    </>
                })
            })
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
                        <div className="informations"><div className="name1">Name</div><div className="device1">Devices</div></div>
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