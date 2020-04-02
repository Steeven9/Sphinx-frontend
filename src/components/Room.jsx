import React from 'react';
import '../css/App.css';
import DevicesPanel from "./devices/DevicesPanel";

class Room extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            session_token: props.session_token,
            room_id: "",
        }
    }

    render() {
        return (
            <DevicesPanel />
        );
    }
}

export default Room;
