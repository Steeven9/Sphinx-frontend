import React from 'react';
import '../App.css';
import imgAllDevice from './img/icons/dashboard/icon-all-devices.svg';
import imgAllRoom from './img/icons/dashboard/icon-all-rooms.svg';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // placeholder
        }
    }

    /**
     * TODO
     */
    render() {
        return (
            <div className="dashboard">

                <div class="content-box3">
                    <img src={imgAllDevice} alt="not find"/>
<<<<<<< HEAD
                    <p class="dash-text">see all devices</p>
                </div>
                <div class="content-box3">
                    <img src={imgAllRoom} alt="not find"/>
                    <p class="dash-text">see device by room</p>
=======
                    <p>see all devices</p>
                </div>
                <div class="content-box3">
                    <img src={imgAllRoom} alt="not find"/>
                    <p>see device by room</p>
>>>>>>> dashoboard
                </div>

            </div>
        );
    }
}


export default Dashboard;