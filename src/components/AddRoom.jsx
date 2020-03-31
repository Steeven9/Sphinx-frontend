import React from 'react';
import '../css/App.css';

class AddRoom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            success: false,
            error: false,
            incomplete: false,
            roomName: "",
            type: "0"
        }
    }

    /**
     * Sends informations contained in this.state to the backend
     */
    sendDatas = evt => {
        evt.preventDefault();
        if (this.state.type === "0" || this.state.roomName.length === 0) {
            this.setState({success: false, error: false, incomplete: true})
        }
        else {
            fetch('http://localhost:8080/rooms/', {
                method: 'POST',
                headers: { 
                    'user': this.props.username,
                    'session-token': this.props.session_token,
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({
                    name: this.state.roomName, 
                    icon: this.props.findPathRoom(this.state.type, 0), 
                    background: this.props.findPathRoom(this.state.type, 1),
                    devices: []
                })
            })
            .then( (res) => {
                if (res.status === 203) {
                    this.setState({success: true, error: false, incomplete: false})
                }
                else if (res.status === 401) {
                    this.props.logOut(1)
                }
                else {
                    this.setState({success: false, error: true, incomplete: false});
                }
            })
            .catch( error => this.props.logOut(2))
        }
    };

    // function to handle state on input change
    handleRoomNameChange = evt => {
        this.setState({ roomName: evt.target.value });
    };
    handleTypeChange = evt => {
        this.setState({ type: evt.target.value })
    }

    /**
     * Display a message if a room has been successfully created, and if not an error message
     */
    roomCreated = () => {
        if (this.state.success) {
            window.location.href = '/house';
        }
        else if (this.state.error) {
            return(<p>An error has occurred, please try again</p>)
        }
        else if (this.state.incomplete) {
            return(<p>Please complete all fields</p>)
        }
    }
    
    //Redirection to /house
    redirectToHouse = () => {
        window.location.href = '/house'
    }

    /**
     * Renders AddRoom page
     */
    render() {
        return (         
            <div className="addRoom">
                <div className="content-box">
                    <h2 className="title">Add room</h2>
                    <div className="dates">
                        <span className="textFields"><input type="text" name="roomName" placeholder="Room Name"
                                onChange={this.handleRoomNameChange} required/></span>
                        <span className="textFields"> 
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
                                <option value="kitchen">Kitchen</option>
                                <option value="living-room">Living room</option>
                                <option value="office">Office</option>
                            </select>
                        </span>
                        {this.roomCreated()}
                    </div>
                    <div className="center">
                        <button type="button" name="button" className="btn-secondary btn" onClick={this.redirectToHouse}>Cancel</button>
                        <button type="button" name="button" className="btn-primary btn" onClick={this.sendDatas}>Save room</button>
                    </div>
                </div>
            </div>

        );
    }
}


export default AddRoom;