import React from 'react';
import '../App.css';
import '../components/css/house-dashboard.css';
import imgGarage from './img/icons/rooms/icon-garage.svg';

class House extends React.Component {

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
            <div className="house">
                <div class="content-box">
                    <div class="canvas1">
                       <h2>My rooms</h2>
                       <button class="btn-primary-circular2 add-btn">Add room</button>
                    </div>

                    <div class="canvas2">
                        <div class="informations"><div class="name1">Name</div> <div class="floor1">Floor</div> <div class="device1">Devices</div></div>
                        <hr class="line"/>
                        <div class="room">
                            <div class="image vertical-center"><img src={imgGarage} alt="device-logo"/></div>
                            <div class="room-name vertical-center"> name of the room</div>
                            <div class="flo-dev-number vertical-center">2</div>
                            <div class="flo-dev-number vertical-center">7</div>
                            <div class="room-button1 vertical-center"> <button><img src="" alt="im"/></button></div>
                            <div class="room-button2 vertical-center"> <button><img src="" alt="im"/></button></div>

                        </div>

                        

                        <hr class="line"/>
                    </div>
                </div>
            </div>
        );
    }
}


export default House;