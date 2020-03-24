import React from 'react';
import '../App.css';
import '../components/css/editPages.css';


class EditRoom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            session_token: props.session_token,
            room_name: props.roomToEdit
        }
    }

    /**
     * Renders the room handler
     */
    render() {
        return (
            <div className="editRoom">
                <div className="Handle-content-box2">
                    <h2 className="title">Edit Room: {this.state.room_name}</h2>
                    <div className="Handle-dates">
                        <div className="Handle-input"><input style={{ width: 300 + 'px' }} type="text" name="" placeholder="New Name" /></div>
                        <div className="Handle-input"> <select className="selector">
                            <option>New room type</option>
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
                        <div className="Handle-input mod-width"><button type="button" name="button" className="Handle-btn-secondary btn" onClick={this.props.redirectDevices}>Cancel</button></div>
                        <div className="Handle-input mod-width"><button type="button" name="button" className="Handle-btn-secondary btn">Delete Room</button></div>
                        <div className="Handle-input mod-width"><button type="button" name="button" className="Handle-btn-primary btn">Save Changes</button></div>
                    </div>
                </div>
            </div>
        );
    }
}


export default EditRoom;