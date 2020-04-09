import React from 'react';
import '../css/App.css';
import '../css/addEditRoom.css'

class AddRoom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            success: false,
            error: false,
            incomplete: false,
            roomName: "",
            type: "0",
            iconPath: "/img/icons/rooms/icon-generic-room.svg",
            iconActualState: "/img/icons/rooms/icon-generic-room.svg"
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
            .catch( error => console.log(error))
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
            return(<p>An error has occurred, please try again</p>)
        }
        else if (this.state.incomplete) {
            return(<p>Please complete all fields</p>)
        }
    }

    /*
    *
    *   Functions for icon selection
    * 
    */

    changeIcon = () => {
        this.setState({ iconPath: this.state.iconActualState })
    }

    changeIconState = (path) => {
        this.setState({ iconActualState: path })
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
        this.changeIcon();
        this.moveToInformation();
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
                <div id="addRoomInfo" className="content-box content-box-transparency">
                    <h2 className="title">Add room</h2>
                    <div className="dates">
                        <div className="roomNameAndIcon">
                            <span className="textFields">
                                <input type="text" name="roomName" placeholder="Room Name" onChange={this.handleRoomNameChange} required/>
                            </span>
                            <div className="roomNameAndIcon">
                                <p>icon*</p> 
                                &nbsp; &nbsp; &nbsp; &nbsp;
                                <img className="fixedSizeIcon" src={this.state.iconPath} alt=""/> 
                                &nbsp; &nbsp; &nbsp; &nbsp;
                                <button className="removeBorder" onClick={this.moveToSelection}>edit</button>
                            </div>
                            
                        </div>
                        <br/><br/><br/>
                        <div className="roomNameAndIcon">
                            <p>Customize background</p> 
                            <input type="file" accept="image/jpeg"/>
                            
                        </div>
                        

                        
                        
                        {this.roomCreated()}
                    </div>
                    <div className="center">
                        <button type="button" name="button" className="btn-secondary btn waves-effect waves-light" onClick={this.redirectToHouse}>Cancel</button>
                        <button type="button" name="button" className="btn-primary btn waves-effect waves-light" onClick={this.sendDatas}>Save room</button>
                    </div>
                </div>

                <div hidden id="addRoomIconSelection" className="content-box  content-box-transparency">
                    <h2 className="title">Select Icon</h2>
                    <div className="content-box-iconSelection">
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("/img/icons/rooms/icon-bathroom.svg")}><img src="/img/icons/rooms/icon-bathroom.svg" alt=""/><br/>Bathroom </button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("/img/icons/rooms/icon-office.svg")}><img src="/img/icons/rooms/icon-office.svg" alt=""/><br/>Office </button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("/img/icons/rooms/icon-attic.svg")}><img src="/img/icons/rooms/icon-attic.svg" alt=""/><br/>Attic </button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("/img/icons/rooms/icon-basement.svg")}><img src="/img/icons/rooms/icon-basement.svg" alt=""/><br/>Basement </button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("/img/icons/rooms/icon-backyard.svg")}><img src="/img/icons/rooms/icon-backyard.svg" alt=""/><br/>Backyard </button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("/img/icons/rooms/icon-garage.svg")}><img src="/img/icons/rooms/icon-garage.svg" alt=""/><br/>Garage </button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("/img/icons/rooms/icon-dining-room.svg")}><img src="/img/icons/rooms/icon-dining-room.svg" alt=""/><br/>Dining</button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("/img/icons/rooms/icon-generic-room.svg")}><img src="/img/icons/rooms/icon-generic-room.svg" alt=""/><br/>Generic</button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("/img/icons/rooms/icon-hallway.svg")}><img src="/img/icons/rooms/icon-hallway.svg" alt=""/><br/>Hallway</button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("/img/icons/rooms/icon-house-front.svg")}><img src="/img/icons/rooms/icon-house-front.svg" alt=""/><br/>House</button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("/img/icons/rooms/icon-kitchen.svg")}><img src="/img/icons/rooms/icon-kitchen.svg" alt=""/><br/>Kitchen</button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("/img/icons/rooms/icon-living-room.svg")}><img src="/img/icons/rooms/icon-living-room.svg" alt=""/><br/>Living</button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("/img/icons/rooms/icon-bedroom.svg")}><img src="/img/icons/rooms/icon-bedroom.svg" alt=""/><br/>Bedroom </button>
                    </div>  
                    <div className="center">
                        <button type="button" name="button" className="btn-secondary btn waves-effect waves-light" onClick={this.moveToInformation}>Cancel</button>
                        <button type="button" name="button" className="btn-primary btn waves-effect waves-light"  onClick={this.changeAndMove}>Choose</button>
                    </div>
                </div>
                
            </div>

        );
    }
}


export default AddRoom;