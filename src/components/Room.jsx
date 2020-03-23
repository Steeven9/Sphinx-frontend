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