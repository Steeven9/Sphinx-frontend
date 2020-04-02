import React from 'react';
import '../css/App.css';
import * as qs from 'query-string';

class Room extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            session_token: props.session_token,
            room_id: "",
        }
    }

    componentDidMount() {
        const parsed = qs.parse(window.location.search);
        this.setState({room_id: parsed.id})
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