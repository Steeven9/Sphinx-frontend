import React from 'react';
import '../App.css';

class AddDevice extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            session_token: props.session_token
        }
    }

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
     * TODO
     */
    render() {
        return (
            <div className="addDevice">
                <div className="content-box">
                    <h2 className="title">Add device</h2>
                    <div className="dates">
                        <div className="Handle-input"> 
                                <select className="selector">
                                    <option value="">Device type</option>
                                    <option value="1">Light</option>
                                    <option value="2">Dimmable Light</option>
                                    <option value="3">Switch</option>
                                    <option value="4">Dimmer</option>
                                    <option value="5">Dimmer (no-memory)</option>
                                    <option value="6">Smart plug</option>
                                    <option value="7">Humidity sensor</option>
                                    <option value="8">Light sensor</option>
                                    <option value="9">Temperature sensor</option>
                                    <option value="10">Motion sensor</option>
                                </select>
                            </div>
                        <div className="dates-input"><input style={{ width: 300 + 'px' }} type="text" name="" placeholder="Custom name" /></div>
                        <div className="Handle-input"> 
                            <select className="selector">
                                <option value="">Room</option>
                            </select>
                        </div>
                        <div className="Handle-input"> 
                            <select className="selector">
                                <option value="">No pairing</option>
                            </select>
                        </div>
                    </div>
                    <div className="dates">
                        <div className="dates-input"><button type="button" name="button" className="btn-secondary btn">Cancel</button></div>
                        <div className="dates-input"><button type="button" name="button" className="btn-primary btn">Save device</button></div>
                    </div>
                </div>
            </div>
        );
    }
}


export default AddDevice;