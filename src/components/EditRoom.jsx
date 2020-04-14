import React from 'react';
import '../css/App.css';
import '../css/editPages.css';
import * as qs from 'query-string';
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";

const ColorCircularProgress = withStyles({root: {color: '#580B71'},})(CircularProgress);

class EditRoom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            session_token: props.session_token,
            room_id: "",
            roomName: "",
            type: "0",
            incomplete: false,
            isLoading: false,
        }
    }

    componentDidMount() {
        const parsed = qs.parse(window.location.search);
        this.setState({room_id: parsed.id})
    }

    /**
     * Changes the Room
     */
    sendDatas = evt => {
        evt.preventDefault();
        if (this.state.type === "0" || this.state.roomName === "") {
            this.setState({incomplete: true})
        } 
        else {
            this.setState({isLoading: true})
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
                .then((res) => {
                    this.setState({isLoading: false})
                    if (res.status === 204) {
                        console.log("Room successfully edited")
                        this.redirectToHouse()
                    } else if (res.status === 401) {
                        this.props.logOut(1)
                    } else {
                        console.log("Unexpected error")
                    }
                })
                .catch(error => console.log(error))
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
            .then((res) => {
                if (res.status === 203 || res.status === 200) {
                    console.log("Room successfully removed")
                    this.redirectToHouse()
                } else if (res.status === 401) {
                    this.props.logOut(1)
                } else {
                    console.log("Unexpected error")
                }
            })
            .catch(error => console.log(error))
    };

    // function to handle state on input change
    handleRoomNameChange = evt => {
        this.setState({roomName: evt.target.value});
    };
    handleTypeChange = evt => {
        this.setState({type: evt.target.value})
    }

    //Redirection to /house
    redirectToHouse = () => {
        window.location.href = '/house'
    }

    /**
     * Renders the room handler
     */
    render() {
        return (
            <div className="container">
                <div className="room-content-box content-box-transparency z-depth-2">
                    <h2 className="title">Edit room</h2>
                    <div className="room-inputs">
                        <div>
                            <input type="text" name="" placeholder="New room name"
                                                           onChange={this.handleRoomNameChange} required/>
                        </div>
                        <div>
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
                        </div>
                    </div>
                    <span>
                        <ColorCircularProgress className={this.state.isLoading ? "loading-spinner" : "hidden"}/>
                    </span>
                    {this.state.incomplete ? <p><b>Please fill all the data</b></p> : <></>}
                    <div className="center">
                        <button type="button" name="button"
                                className="Handle-btn-secondary btn waves-effect waves-light"
                                onClick={this.redirectToHouse}>Cancel
                        </button>
                        <button type="button" name="button"
                                className="Handle-btn-secondary btn waves-effect waves-light"
                                onClick={this.deleteRoom}>Delete
                        </button>
                        <button type="button" name="button" className="Handle-btn-primary btn waves-effect waves-light"
                                onClick={this.sendDatas}>Save changes
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}


export default EditRoom;
