import React from 'react';
import '../App.css';
import imgAllDevice from './img/icons/dashboard/icon-all-devices.svg';
import imgAllRoom from './img/icons/dashboard/icon-all-rooms.svg';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            session_token: props.session_token
        }
    }
    
    /**
     * Checks localStorage values and updates the state accordingly
     */
    componentDidMount() {
        let username;
        if (localStorage.getItem("username") === null) {
            username = "";
        }
        else {
            username = localStorage.getItem("username");
        }

        let session_token;
        if (localStorage.getItem("session_token") === null) {
            session_token = "";
        }
        else {
            session_token = localStorage.getItem("session_token");
        }

        this.setState({ username: username, session_token: session_token})
    }

    /**
     * Renders the main dashboard
     */
    render() {
        return (
            <div className="dashboard">
                <div className="content-box3" onClick={() => { window.location.href = '/devices'; }}>
                    <img src={imgAllDevice} alt="All devices" />
                    <a href="/devices" className="dash-text">See all devices</a>
                </div>
                <div className="content-box3" onClick={() => { window.location.href = '/house'; }}>
                    <img src={imgAllRoom} alt="All rooms" />
                    <a href="/house" className="dash-text">See device by room</a>
                </div>
            </div>
        );
    }
}


export default Dashboard;