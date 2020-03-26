import React from 'react';
import '../App.css';
import '../components/css/editPages.css';


class EditDevice extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            session_token: props.session_token,
            device_id: props.deviceTo,
            deviceName: "",
            uncomplete: false,
        }
    }

    /**
     * Changes the Room
     */
    sendDatas = evt => {
        evt.preventDefault();
        if (this.state.deviceName === "") {
            this.setState({uncomplete: true})
        }
        else {
            fetch('http://localhost:8080/devices/' + this.state.device_id, {
                method: 'PUT',
                headers: { 
                    'user': this.state.username,
                    'session-token': this.state.session_token,
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({
                    name: this.state.deviceName, 
                })
            })
            .then( (res) => {
                if (res.status === 204) {
                    alert("Deivce succesfully edited")
                    this.props.redirectDevices()
                }
                else if (res.status === 401) {
                    this.props.logOut(1)
                }
                else {
                    alert("Unexpected error")
                }
            })
            .catch( error => this.props.logOut(2))
        }
    };

    /**
     * Deletes the Room
     */
    deleteRoom = evt => {
        fetch('http://localhost:8080/devices/' + this.state.device_id, {
            method: 'DELETE',
            headers: { 
                'user': this.state.username,
                'session-token': this.state.session_token,
            }
        })
        .then( (res) => {
            if (res.status === 203 || res.status === 200) {
                alert("Device succesfully removed")
                this.props.redirectDevices()
            }
            else if (res.status === 401) {
                this.props.logOut(1)
            }
            else {
                alert("Unexpected error")
            }
        })
        .catch( error => this.props.logOut(2))
    };

    // function to handle state on input change
    handleDeviceNameChange = evt => {
        this.setState({ deviceName: evt.target.value });
    };

    /**
     * Renders the device handler
     */
    render() {
        return (
            <div className="editRoom">
                <div className="Handle-content-box2">
                    <h2 className="title">Edit Device</h2>
                    <div className="Handle-dates">
                        <div className="Handle-input"><input style={{ width: 300 + 'px' }} type="text" name="" placeholder="New Name" onChange={this.handleDeviceNameChange} required/></div>
                    </div>
                    {this.state.uncomplete ? <p><b>Please fill the name</b></p> : <></>}
                    <div className="Handle-dates">
                        <div className="Handle-input mod-width"><button type="button" name="button" className="Handle-btn-secondary btn" onClick={this.props.redirectDevices}>Cancel</button></div>
                        <div className="Handle-input mod-width"><button type="button" name="button" className="Handle-btn-secondary btn" onClick={this.deleteDevice}>Delete Device</button></div>
                        <div className="Handle-input mod-width"><button type="button" name="button" className="Handle-btn-primary btn" onClick={this.sendDatas}>Save New Name</button></div>
                    </div>
                </div>
            </div>
        );
    }
}


export default EditDevice;