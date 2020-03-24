import React from 'react';
import '../App.css';
import DevicesPanel from './devices/DevicesPanel';


class Devices extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            session_token: props.session_token
        }
    }

    render() {
        return (
            <DevicesPanel />
        );
    }
}

export default Devices;
