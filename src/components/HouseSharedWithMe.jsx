import React from 'react';
import '../css/App.css';
import '../css/house.css';
import DevicesPanel from './devices/DevicesPanel';
import ScenesPanel from './scenes/ScenesPanel';

class HouseSharedWithMe extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            flag: true, // true = devices, false = scenes
        }
    }

    /**
     * Maps the received array of devices and sets it as this.state.devices. If no devices are available, this.state.devices gets changed with a specific phrase.
     * @param {device array} devices: array of devices
     */
    toggleDevicesScenes = () => {
        let toggle = this.state.flag ? false : true
        this.setState({flag: toggle})

        document.getElementById("ownerDevices").hidden = !toggle
        document.getElementById("ownerScenes").hidden = toggle
    }

    //Redirection to /sharedWithMe
    redirectToSharedWithMe = () => {
        window.location.href = '/sharedWithMe'
    }

    /**
     * Renders the list of rooms and device plus the form for the guest's username
     */
    render() {
        return (
            <div className="container">
                <div className="rooms-content-box z-depth-2">
                    <div className="headline-box row row-collapsible row row-collapsible-custom">
                        <h2 className="col l11 left-align headline-title">{this.state.flag ? "Devices" : "Scenes"} shared
                                                                                                                   with
                                                                                                                   me</h2>
                        <i className="col col-custom l1 btn waves-effect waves-light btn-primary-circular right material-icons"
                           onClick={this.toggleDevicesScenes}>add</i> {/* button to fix on design */}
                    </div>

                    <div id="ownerDevices" className="ownerDevices">
                        <DevicesPanel/>
                    </div>
                    <div hidden id="ownerScenes" className="ownerScenes">
                        <ScenesPanel/>
                    </div>
                    <button type="button" name="button" className="btn-secondary btn waves-effect waves-light"
                            onClick={this.redirectToSharedWithMe}>Back
                    </button>
                </div>
            </div>
        );
    }
}


export default HouseSharedWithMe;