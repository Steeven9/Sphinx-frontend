import React from 'react';
import '../App.css';

class Devices extends React.Component {

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
            <div className="devices">
                html page code here
            </div>
        );
    }
}


export default Devices;