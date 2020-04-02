import React from 'react';
import '../css/App.css';
import DevicesPanel from './devices/DevicesPanel';


/**
 * Placeholder page for the whole devices dashboard components pages
 */
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
