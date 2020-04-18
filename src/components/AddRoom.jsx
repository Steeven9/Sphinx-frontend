import React from 'react';
import '../css/App.css';
import '../css/editPages.css'
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";

const ColorCircularProgress = withStyles({root: {color: '#580B71'},})(CircularProgress);

class AddRoom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            unknownError: "",
            success: false,
            error: false,
            incomplete: false,
            roomName: "",
            type: "generic-room",
            isLoading: false,
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", (evt) => {
            if (evt.key === 'Enter') this.sendDatas(evt)
        });
        document.querySelector('main').style.backgroundImage = 'url(' + this.props.findPathRoom(this.state.type, 1) + ')';
    }

    /**
     * Sends informations contained in this.state to the backend
     */
    sendDatas = evt => {
        evt.preventDefault();
        if (this.state.roomName.length === 0) {
            this.setState({ success: false, error: false, incomplete: true })
        }
        else {
            this.setState({isLoading: true, success: false, error: false, incomplete: false})

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

                    background: document.getElementById('imageURL').value !== "" ? 
                    document.getElementById('imageURL').value : 
                    this.props.findPathRoom(this.state.type, 1),

                    devices: []
                })
            })
            .then( (res) => {
                this.setState({isLoading: false})
                if (res.status === 201) {
                    this.setState({success: true, error: false, incomplete: false, unknownError: ""})
                }
                else if (res.status === 401) {
                    this.props.logOut(1)
                }
                else if (res.status === 400) {
                    this.setState({success: false, error: true, incomplete: false, unknownError: ""});
                }
                else {
                    this.setState({success: false, error: false, incomplete: false, unknownError: "Unexpected response status: " + res.status});
                }
            })
            .catch( e => this.setState({isLoading: false, success: false, error: false, incomplete: false, unknownError: "Error: " + e}))
        }
    };

    // function to handle state on input change
    handleRoomNameChange = evt => {
        this.setState({ roomName: evt.target.value });
    };
    handleTypeChange = evt => {
        this.setState({ type: evt.target.value })
    };

    /**
     * Display a message if a room has been successfully created, and if not an error message
     */
    roomCreated = () => {
        if (this.state.success) {
            window.location.href = '/house';
        }
        else if (this.state.error) {
            return (<p>Bad Request</p>)
        }
        else if (this.state.incomplete) {
            return (<p>Please complete all fields</p>)
        }
        else if (this.state.unknownError !== "") {
            return (<p>{this.state.unknownError}</p>)
        }
    }

    /*
    *
    *   Functions for icon selection
    * 
    */

    changeIconState = (path) => {
        this.setState({ type: path });
        document.querySelector('main').style.backgroundImage = 'url(' + this.props.findPathRoom(path, 1) + ')';
        this.moveToInformation();
    }

    moveToSelection = () => {
        document.getElementById("addRoomInfo").hidden = true
        document.getElementById("addRoomIconSelection").hidden = false
    }

    moveToInformation = () => {
        document.getElementById("addRoomInfo").hidden = false
        document.getElementById("addRoomIconSelection").hidden = true
    }

    changeAndMove = () => {
        this.moveToInformation();
    }

    changeDinamicallyBackground = (e) => {

        var reader = new FileReader();
        var file = e.target.files[0];
        if (file) {
            reader.addEventListener('load', (event) => {
                const dataUrl = reader.result;
                document.querySelector('main').style.backgroundImage = "url(" + dataUrl + ")";
                document.getElementById('imageURL').value = dataUrl;
            });
            reader.readAsDataURL(file);
        }

    }


    resetBackground = () => {
        document.getElementById('inputPicture').value = "";
        document.getElementById('imageURL').value = "";
        document.querySelector('main').style.backgroundImage = "url(" + this.props.findPathRoom(this.state.type, 1) + ")";
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
            <div className="addRoom" id="addRoom">
                <div id="addRoomInfo" className="content-box ">
                    <h2 className="title">Add room</h2>
                    <div className="dates">
                        <div className="roomNameAndIcon">
                            <span className="textFields">
                                <input type="text" name="roomName" placeholder="Room Name" onChange={this.handleRoomNameChange} required />
                            </span>
                            <div className="roomNameAndIcon">
                                <p>Icon</p>
                                <img className="fixedSizeIcon" src={this.props.findPathRoom(this.state.type, 0)} alt="icon error" />
                                <button className="material-icons removeBorder toPointer" onClick={this.moveToSelection}>edit</button>
                            </div>

                        </div>
                        <br /><br /><br />
                        <div className="roomNameAndIcon2">
                            <p>Customize background</p>
                            <input type="file" className="inputBackground" onClick={this.resetBackground} accept="image/*" onChange={this.changeDinamicallyBackground} id="inputPicture" />
                            <input type="hidden" id="imageURL" value="" />
                        </div>

                        <div className="message-two-lines center-text">
                            <span>
                                <ColorCircularProgress className={this.state.isLoading ? "loading-spinner" : "hidden"}/>
                            </span>

                            {this.roomCreated()}
                        </div>
                    </div>
                    <div className="center">
                        <button type="button" name="button" className="btn-secondary btn waves-effect waves-light" onClick={this.redirectToHouse}>Cancel</button>
                        <button type="button" name="button" className="btn-primary btn waves-effect waves-light" onClick={this.sendDatas}>Save room</button>
                    </div>
                </div>

                <div hidden id="addRoomIconSelection" className="content-box">
                    <h2 className="title">Select Icon</h2>
                    <div className="content-box-iconSelection">
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("bathroom")}><img src={this.props.findPathRoom('bathroom', 0)} alt="Bathroom" /><br />Bathroom </button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("office")}><img src={this.props.findPathRoom('office', 0)} alt="Office" /><br />Office </button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("attic")}><img src={this.props.findPathRoom('attic', 0)} alt="Attic" /><br />Attic </button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("basement")}><img src={this.props.findPathRoom('basement', 0)} alt="Basement" /><br />Basement </button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("backyard")}><img src={this.props.findPathRoom('backyard', 0)} alt="Backyard" /><br />Backyard </button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("garage")}><img src={this.props.findPathRoom('garage', 0)} alt="Garage" /><br />Garage </button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("dining-room")}><img src={this.props.findPathRoom('dining-room', 0)} alt="Dining" /><br />Dining Room</button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("generic-room")}><img src={this.props.findPathRoom('generic-room', 0)} alt="Generic" /><br />Generic</button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("hallway")}><img src={this.props.findPathRoom('hallway', 0)} alt="Hallway" /><br />Hallway</button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("house-front")}><img src={this.props.findPathRoom('house-front', 0)} alt="House" /><br />House</button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("kitchen")}><img src={this.props.findPathRoom('kitchen', 0)} alt="Kitchen" /><br />Kitchen</button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("living-room")}><img src={this.props.findPathRoom('living-room', 0)} alt="Living" /><br />Living</button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("bedroom")}><img src={this.props.findPathRoom('bedroom', 0)} alt="Bedroom" /><br />Bedroom </button>
                    </div>
                </div>

            </div>

        );
    }
}


export default AddRoom;