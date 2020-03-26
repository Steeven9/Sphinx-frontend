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
                    <a href="/house" className="dash-text">See devices by room</a>
                </div>
            </div>
        );
    }
}


export default Dashboard;