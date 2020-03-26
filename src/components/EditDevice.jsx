import React from 'react';
import '../App.css';
import '../components/css/editPages.css';
import * as qs from 'query-string'


class EditDevice extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            session_token: props.session_token,
            device_id: "",
            deviceName: "",
            incomplete: false,
        }
    }

    componentDidMount() {
        const parsed = qs.parse(window.location.search);
        this.setState({device_id: parsed.id})
    }

    /**
     * Changes the Room
     */
    sendDatas = evt => {
        evt.preventDefault();
        if (this.state.deviceName === "") {
            this.setState({incomplete: true})
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
                    console.log("Device successfully edited")
                    this.props.redirectDevices()
                }
                else if (res.status === 401) {
                    this.props.logOut(1)
                }
                else {
                    console.log("Unexpected error")
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
                console.log("Device succesfully removed")
                this.props.redirectDevices()
            }
            else if (res.status === 401) {
                this.props.logOut(1)
            }
            else {
                console.log("Unexpected error")
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
                    <div className="textFields">
                        <div className="textFields"><input type="text" name="" placeholder="New Name" onChange={this.handleDeviceNameChange} required/></div>
                    </div>
                    {this.state.incomplete ? <p><b>Please fill the name</b></p> : <></>}
                    <div className="center">
                        <button type="button" name="button" className="Handle-btn-secondary btn" onClick={this.props.redirectDevices}>Cancel</button>
                        <button type="button" name="button" className="Handle-btn-secondary btn" onClick={this.deleteDevice}>Delete Device</button>
                        <button type="button" name="button" className="Handle-btn-primary btn" onClick={this.sendDatas}>Save</button>
                    </div>
                </div>
            </div>
        );
    }
}


export default EditDevice;