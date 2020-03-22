import React from 'react';
import '../App.css';
import '../components/css/handleRoom.css';


class HandleRooms extends React.Component {

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
            <div className="handleRooms">
                <div className="Handle-content-box2">
                    <h2 className="title">Modify Room</h2>
                    <div className="Handle-dates">
                        <div className="Handle-input"><input style={{ width: 300 + 'px' }} type="text" name="" placeholder="Room name" /></div>
                        <div className="Handle-input"> <select className="selector">
                            <option>Room type</option>
                            <option>Attic</option>
                            <option>Backyard</option>
                            <option>Basement</option>
                            <option>Bathroom</option>
                            <option>Bedroom</option>
                            <option>Dining room</option>
                            <option>Garage</option>
                            <option>Generic room</option>
                            <option>Hallway</option>
                            <option>House front</option>
                            <option>Living room</option>
                            <option>Office</option>
                        </select>
                        </div>
                    </div>
                    <div className="Handle-dates">
                        <div className="Handle-input mod-width"><button type="button" name="button" className="Handle-btn-secondary btn">Cancel</button></div>
                        <div className="Handle-input mod-width"><button type="button" name="button" className="Handle-btn-secondary btn">Delete Room</button></div>
                        <div className="Handle-input mod-width"><button type="button" name="button" className="Handle-btn-primary btn">Save Changes</button></div>
                    </div>
                </div>
            </div>
        );
    }
}


export default HandleRooms;