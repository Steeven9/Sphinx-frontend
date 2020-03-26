import React from 'react';
import '../App.css';
import '../components/css/editPages.css';


class EditRoom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            session_token: props.session_token,
            room_id: props.roomTo,
            roomName: "",
            type: "0",
            uncomplete: false,
        }
    }

    /**
     * Changes the Room
     */
    sendDatas = evt => {
        evt.preventDefault();
        if (this.state.type === "0" || this.state.roomName === "") {
            this.setState({uncomplete: true})
        }
        else {
            fetch('http://localhost:8080/rooms/' + this.state.room_id, {
                method: 'PUT',
                headers: { 
                    'user': this.state.username,
                    'session-token': this.state.session_token,
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({
                    name: this.state.roomName, 
                    icon: this.props.findPathRoom(this.state.type, 0), 
                    background: this.props.findPathRoom(this.state.type, 1),
                })
            })
            .then( (res) => {
                if (res.status === 204) {
                    alert("Room succesfully edited")
                    this.props.redirectHouse()
                }
                else if (res.status === 401) {
                    this.props.logOut(1)
                }
                else {
                    alert("Unexpected error")
                }
            })
            .catch( error => this.props.logOut(2))
        }
    };

    /**
     * Deletes the Room
     */
    deleteRoom = evt => {
        fetch('http://localhost:8080/rooms/' + this.state.room_id, {
            method: 'DELETE',
            headers: { 
                'user': this.state.username,
                'session-token': this.state.session_token,
            }
        })
        .then( (res) => {
            if (res.status === 203 || res.status === 200) {
                alert("Room succesfully removed")
                this.props.redirectHouse()
            }
            else if (res.status === 401) {
                this.props.logOut(1)
            }
            else {
                alert("Unexpected error")
            }
        })
        .catch( error => this.props.logOut(2))
    };

    // function to handle state on input change
    handleRoomNameChange = evt => {
        this.setState({ roomName: evt.target.value });
    };
    handleTypeChange = evt => {
        this.setState({ type: evt.target.value })
    }

    /**
     * Renders the room handler
     */
    render() {
        return (
            <div className="editRoom">
                <div className="Handle-content-box2">
                    <h2 className="title">Edit Room</h2>
                    <div className="Handle-dates">
                        <div className="Handle-input"><input style={{ width: 300 + 'px' }} type="text" name="" placeholder="New Name" 
                            onChange={this.handleRoomNameChange} required/></div>
                        <div className="Handle-input"> 
                            <select className="selector" onChange={this.handleTypeChange}>
                                <option value="0">Select Room Type</option>
                                <option value="attic">Attic</option>
                                <option value="backyard">Backyard</option>
                                <option value="basement">Basement</option>
                                <option value="bathroom">Bathroom</option>
                                <option value="bedroom">Bedroom</option>
                                <option value="dining-room">Dining room</option>
                                <option value="garage">Garage</option>
                                <option value="generic-room">Generic room</option>
                                <option value="hallway">Hallway</option>
                                <option value="house-front">House front</option>
                                <option value="kitchen">House front</option>
                                <option value="living-room">Living room</option>
                                <option value="office">Office</option>
                            </select>
                        </div>
                    </div>
                    {this.state.uncomplete ? <p><b>Please fill all the data</b></p> : <></>}
                    <div className="Handle-dates">
                        <div className="Handle-input mod-width"><button type="button" name="button" className="Handle-btn-secondary btn" onClick={this.props.redirectHouse}>Cancel</button></div>
                        <div className="Handle-input mod-width"><button type="button" name="button" className="Handle-btn-secondary btn" onClick={this.deleteRoom}>Delete Room</button></div>
                        <div className="Handle-input mod-width"><button type="button" name="button" className="Handle-btn-primary btn" onClick={this.sendDatas}>Save Changes</button></div>
                    </div>
                </div>
            </div>
        );
    }
}


export default EditRoom;