import React from 'react';
import '../css/App.css';
import SceneFactory from './scenes/SceneFactory'


/**
 * Placeholder page for the scenes dashboard components pages
 */
class EditScene extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            session_token: props.session_token
        }
    }

    render() {
        return (
            <SceneFactory />
        );
    }
}

export default EditScene;
