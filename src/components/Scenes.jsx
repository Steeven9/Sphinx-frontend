import React from 'react';
import '../css/App.css';
import ScenesPanel from './scenes/ScenesPanel';


/**
 * Placeholder page for the scenes dashboard components pages
 */
class Scenes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            session_token: props.session_token
        }
    }

    render() {
        return (
            <ScenesPanel />
        );
    }
}

export default Scenes;
