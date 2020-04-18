import React from 'react';
import '../css/App.css';
import '../css/devices.css';
import * as qs from 'query-string';
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";

const ColorCircularProgress = withStyles({root: {color: '#580B71'},})(CircularProgress);

class EditDevice extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            session_token: props.session_token,
            device_id: "",
            deviceName: "",
            error: -1,  // -1 nothing, 0 incomplete, 1 bad request, 2 unexpected error
            errorType: "",
            isLoading: false,
        }
    }

    componentDidMount() {
        const parsed = qs.parse(window.location.search);
        this.setState({device_id: parsed.id})

        document.addEventListener("keydown", (evt) => {
            if (evt.key === 'Enter') this.sendDatas(evt)
        });
    }

    /**
     * Changes the Room
     */
    sendDatas = evt => {
        evt.preventDefault();
        if (this.state.deviceName === "") {
            this.setState({error: 0})
        }
        else {
            this.setState({isLoading: true, error: -1})
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
                this.setState({isLoading: false})
                if (res.status === 200) {
                    this.redirectToDevices()
                }
                else if (res.status === 401) {
                    this.props.logOut(1)
                }
                else if (res.status === 400) {
                    this.setState({error: 1})
                }
                else {
                    this.setState({error: 2, errorType: "Error Code: " + res.status})
                }
            })
            .catch( e => this.setState({error: 2, errorType: e}))
        }
    };

    /**
     * Deletes the Device
     */
    deleteDevice = evt => {
        this.setState({isLoading: true, error: -1})
        fetch('http://localhost:8080/devices/' + this.state.device_id, {
            method: 'DELETE',
            headers: { 
                'user': this.state.username,
                'session-token': this.state.session_token,
            }
        })
        .then( (res) => {
            this.setState({isLoading: false})
            if (res.status === 204) {
                this.redirectToDevices()
            }
            else if (res.status === 401) {
                this.props.logOut(1)
            }
            else if (res.status === 400) {
                this.setState({error: 1})
            }
            else {
                this.setState({error: 2, errorType: "Error Code: " + res.status})
            }
        })
        .catch( e => {
            this.setState({isLoading: false})
            this.setState({error: 2, errorType: e})
        })
    };

    // function to handle state on input change
    handleDeviceNameChange = evt => {
        this.setState({ deviceName: evt.target.value });
    };
    
    //Redirection to /devices
    redirectToDevices = () => {
        window.location.href = '/devices'
    }

    showError = () => {
        if (this.state.error === 0) {
            return (<span className="error-message">Please fill the name</span>)
        }
        else if (this.state.error === 1) {
            return (<span className="error-message">Error: bad request</span>)
        }
        else if (this.state.error === 2) {
            return (<span className="error-message">{this.state.errorType}</span>)
        }
    }

    /**
     * Renders the device handler
     */
    render() {
        return (
            <div className="editRoom">
                <div className="device-content-box z-depth-2">
                    <h2 className="title">Edit Device</h2>
                    <div className="textFields">
                        <div className="textFields"><input type="text" name="" placeholder="New Name" onChange={this.handleDeviceNameChange} required/></div>
                    </div>

                    <div className="message-two-lines center-text">
                        <span>
                            <ColorCircularProgress className={this.state.isLoading ? "loading-spinner" : "hidden"}/>
                        </span>
                        {this.showError()}
                    </div>
                    
                    <div className="center">
                        <button type="button" name="button" className="Handle-btn-secondary btn waves-effect waves-light" onClick={this.redirectToDevices}>Cancel</button>
                        <button type="button" name="button" className="Handle-btn-secondary btn waves-effect waves-light" onClick={this.deleteDevice}>Delete</button>
                        <button type="button" name="button" className="Handle-btn-primary btn waves-effect waves-light" onClick={this.sendDatas}>Save</button>
                    </div>
                </div>
            </div>
        );
    }
}


export default EditDevice;