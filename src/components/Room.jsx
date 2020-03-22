import React from 'react';
import '../App.css';

class Room extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            session_token: props.session_token
        }
    }

    componentDidMount() {
        let username;
        if (sessionStorage.getItem("username") === null) {
            username = "";
        }
        else {
            username = sessionStorage.getItem("username");
        }

        let session_token;
        if (sessionStorage.getItem("session_token") === null) {
            session_token = "";
        }
        else {
            session_token = sessionStorage.getItem("session_token");
        }

        this.setState({ username: username, session_token: session_token})
    }

    /**
     * TODO
     */
    render() {
        return (
            <div className="room">
                html page code here
            </div>
        );
    }
}


export default Room;