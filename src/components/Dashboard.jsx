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

    access = () => {
        if (this.state.username === "") {
            return (
                <div id="content" className="container">
                    <section className="content-box z-depth-2">
                        <div>
                            <p><b>Access Denied</b></p>
                        </div>
                    </section>
                </div>
            )
        }
        else {
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
            )
        }
    }

    /**
     * Renders the main dashboard
     */
    render() {
        return (
            <div className="dashboardContainer">

                {this.access()}

            </div>
        );
    }
}


export default Dashboard;