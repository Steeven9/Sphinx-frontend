import React from 'react';
import '../App.css';
import '../components/css/editPages.css';


class EditDevice extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            session_token: props.session_token,
            device_name: props.deviceToEdit
        }
    }

    /**
     * Renders the room handler
     */
    render() {
        return (
            <div className="editRoom">
                <div className="Handle-content-box2">
                    <h2 className="title">Edit Device: {this.state.device_name}</h2>
                    <div className="Handle-dates">
                        <div className="Handle-input"><input style={{ width: 300 + 'px' }} type="text" name="" placeholder="New Name" required/></div>
                    </div>
                    <div className="Handle-dates">
                        <div className="Handle-input mod-width"><button type="button" name="button" className="Handle-btn-secondary btn" onClick={this.props.redirectDevices}>Cancel</button></div>
                        <div className="Handle-input mod-width"><button type="button" name="button" className="Handle-btn-secondary btn">Delete Device</button></div>
                        <div className="Handle-input mod-width"><button type="button" name="button" className="Handle-btn-primary btn">Save New Name</button></div>
                    </div>
                </div>
            </div>
        );
    }
}


export default EditDevice;