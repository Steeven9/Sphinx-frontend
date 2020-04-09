import React from 'react';
import '../css/App.css';
import '../css/editPages.css';
import * as qs from 'query-string';


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
            iconPath: "/img/icons/rooms/icon-generic-room.svg",
            iconActualState: "/img/icons/rooms/icon-generic-room.svg"
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
        } else {
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
        document.getElementById("addRoomInfo1").hidden = true
        document.getElementById("addRoomIconSelection1").hidden = false
    }

    moveToInformation = () => {
        document.getElementById("addRoomInfo1").hidden = false
        document.getElementById("addRoomIconSelection1").hidden = true
    }

    changeAndMove = () => {
        this.changeIcon();
        this.moveToInformation();
    }

    changeDinamicallyBackground = (e) => {

        // var preview = document.getElementById("addRoom");
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

    //Redirection to /house
    redirectToHouse = () => {
        window.location.href = '/house'
    }

    /**
     * Renders the room handler
     */
    render() {
        return (
            <div className="addRoom" id="addRoom">
                <div id="addRoomInfo1" className="content-box ">
                    <h2 className="title">Edit room</h2>
                    <div className="dates">
                        <div className="roomNameAndIcon">
                            <span className="textFields">
                                <input type="text" name="roomName" placeholder="Room Name" onChange={this.handleRoomNameChange} required/>
                            </span>
                            <div className="roomNameAndIcon">
                                <p>Icon</p> 
                                <img className="fixedSizeIcon" src={this.state.iconPath} alt="icon error"/> 
                                <button className="material-icons removeBorder" onClick={this.moveToSelection}>edit</button>
                            </div> 
                            
                        </div>
                        <br/><br/><br/>
                        <div className="roomNameAndIcon2">
                            <p>Customize background</p> 
                            <input type="file" className="inputBackground" accept="image/*" onChange={this.changeDinamicallyBackground} id="inputPicture"/>
                            <input type="hidden" id="imageURL" value=""/>
                        </div>
                        

                        
                    </div>
                    <div className="center">
                        <button type="button" name="button" className="btn-secondary btn waves-effect waves-light" onClick={this.redirectToHouse}>Cancel</button>
                        <button type="button" name="button" className="btn-primary btn waves-effect waves-light" onClick={this.sendDatas}>Save room</button>
                    </div>
                </div>

                <div hidden id="addRoomIconSelection1" className="content-box">
                    <h2 className="title">Select Icon</h2>
                    <div className="content-box-iconSelection">
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("/img/icons/rooms/icon-bathroom.svg")}><img src="/img/icons/rooms/icon-bathroom.svg" alt="Bathroom"/><br/>Bathroom </button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("/img/icons/rooms/icon-office.svg")}><img src="/img/icons/rooms/icon-office.svg" alt="Office"/><br/>Office </button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("/img/icons/rooms/icon-attic.svg")}><img src="/img/icons/rooms/icon-attic.svg" alt="Attic"/><br/>Attic </button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("/img/icons/rooms/icon-basement.svg")}><img src="/img/icons/rooms/icon-basement.svg" alt="Basement"/><br/>Basement </button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("/img/icons/rooms/icon-backyard.svg")}><img src="/img/icons/rooms/icon-backyard.svg" alt="Backyard"/><br/>Backyard </button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("/img/icons/rooms/icon-garage.svg")}><img src="/img/icons/rooms/icon-garage.svg" alt="Garage"/><br/>Garage </button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("/img/icons/rooms/icon-dining-room.svg")}><img src="/img/icons/rooms/icon-dining-room.svg" alt="Dining"/><br/>Dining</button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("/img/icons/rooms/icon-generic-room.svg")}><img src="/img/icons/rooms/icon-generic-room.svg" alt="Generic"/><br/>Generic</button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("/img/icons/rooms/icon-hallway.svg")}><img src="/img/icons/rooms/icon-hallway.svg" alt="Hallway"/><br/>Hallway</button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("/img/icons/rooms/icon-house-front.svg")}><img src="/img/icons/rooms/icon-house-front.svg" alt="House"/><br/>House</button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("/img/icons/rooms/icon-kitchen.svg")}><img src="/img/icons/rooms/icon-kitchen.svg" alt="Kitchen"/><br/>Kitchen</button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("/img/icons/rooms/icon-living-room.svg")}><img src="/img/icons/rooms/icon-living-room.svg" alt="Living"/><br/>Living</button>
                        <button className="selectionIconBtn" onClick={() => this.changeIconState("/img/icons/rooms/icon-bedroom.svg")}><img src="/img/icons/rooms/icon-bedroom.svg" alt="Bedroom"/><br/>Bedroom </button>
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


export default EditRoom;
