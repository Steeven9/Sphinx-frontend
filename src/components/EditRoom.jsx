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
            type: "generic-room",
            error: -1,  // -1 nothing, 0 incomplete, 1 bad request, 2 unexpected error
            errorType: "",
            isLoading: false,
        }
    }

    componentDidMount() {
        //document.querySelector('main').style.backgroundImage = 'url(' + this.props.findPathRoom(this.state.type, 1) + ')';
        const parsed = qs.parse(window.location.search);
        this.setState({ room_id: parsed.id })

        fetch('http://localhost:8080/rooms/' + parsed.id, {
            method: 'GET',
            headers: {
                'user': this.state.username,
                'session-token': this.state.session_token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            }
            else {
                return null;
            }
        })
        .then((data) => {
            this.setState({roomName: data.name})
            document.getElementById('editRoomFixedSizeIcon').src = data.icon
            document.querySelector('main').style.backgroundImage = 'url(' + data.background + ')'
        })
        .catch(error => console.log(error))

        document.addEventListener("keydown", (evt) => {
            if (evt.key === 'Enter') this.sendDatas(evt)
        });
    }

    /**
     * Changes the Room
     */
    sendDatas = evt => {
        evt.preventDefault();
        if (this.state.roomName === "") {
            this.setState({error: 0})
        } 
        else {
            this.setState({isLoading: true, error: -1})
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
                    background: document.getElementById('imageURL1').value !== "" ?
                        document.getElementById('imageURL1').value :
                        this.props.findPathRoom(this.state.type, 1),
                })
            })
            .then((res) => {
                this.setState({isLoading: false})
                if (res.status === 200) {
                    this.redirectToHouse()
                } 
                else if (res.status === 401) {
                    this.props.logOut(1)
                } 
                else if (res.status === 400) {
                    this.setState({error: 1})
                }
                else {
                    this.setState({error: 2, errorType: "Error Code: " + res.status})
                }
            })
            .catch( e => {
                this.setState({isLoading: false})
                this.setState({error: 2, errorType: e})
            })
        }
    };

    /**
     * Deletes the Room
     */
    deleteRoom = evt => {
        this.setState({isLoading: true, error: -1})
        fetch('http://localhost:8080/rooms/' + this.state.room_id, {
            method: 'DELETE',
            headers: {
                'user': this.state.username,
                'session-token': this.state.session_token,
            }
        })
        .then((res) => {
            this.setState({isLoading: false})
            if (res.status === 204) {
                this.redirectToHouse()
            } 
            else if (res.status === 401) {
                this.props.logOut(1)
            } 
            else if (res.status === 400) {
                this.setState({error: 1})
            }
            else {
                this.setState({error: 2, errorType: "Error Code: " + res.status})
            }
        })
        .catch( e => this.setState({error: 2, errorType: e}))
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

    changeIconState = (path) => {
        this.setState({ type: path });
        document.querySelector('main').style.backgroundImage = 'url(' + this.props.findPathRoom(path, 1) + ')';
        this.moveToInformation();
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
        this.moveToInformation();
    }

    changeDinamicallyBackground = (e) => {

        var reader = new FileReader();
        var file = e.target.files[0];
        if (file) {
            reader.addEventListener('load', (event) => {
                const dataUrl = reader.result;
                document.querySelector('main').style.backgroundImage = "url(" + dataUrl + ")";
                document.getElementById('imageURL1').value = dataUrl;
            });
            reader.readAsDataURL(file);
        }


    }

    resetBackground = () => {
        document.getElementById('inputPicture1').value = "";
        document.getElementById('imageURL1').value = "";
        document.querySelector('main').style.backgroundImage = "url(" + this.props.findPathRoom(this.state.type, 1) + ")";
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
        document.getElementById("addRoomInfo1").hidden = true
        document.getElementById("addRoomIconSelection1").hidden = false
    }

    moveToInformation = () => {
        document.getElementById("addRoomInfo1").hidden = false
        document.getElementById("addRoomIconSelection1").hidden = true
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
                document.getElementById('imageURL1').value = dataUrl;
            });
            reader.readAsDataURL(file);
        }


    }

    resetBackground = () => {
        document.getElementById('inputPicture1').value = "";
        document.getElementById('imageURL1').value = "";
        document.querySelector('main').style.backgroundImage = "url(" + this.props.findPathRoom(this.state.type, 1) + ")";
    }

    //Redirection to /house
    redirectToHouse = () => {
        window.location.href = '/house'
    }

    showError = () => {
        if (this.state.error === 0) {
            return (<span className="error-message">Please fill all informations</span>)
        }
        else if (this.state.error === 1) {
            return (<span className="error-message">Error: bad request</span>)
        }
        else if (this.state.error === 2) {
            return (<span className="error-message">{this.state.errorType}</span>)
        }
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
                                <input type="text" name="roomName" value={this.state.roomName} placeholder="Room Name" onChange={this.handleRoomNameChange} required />
                            </span>
                            <div className="roomNameAndIcon">
                                <p>Icon</p>
                                <img className="fixedSizeIcon" id="editRoomFixedSizeIcon" src={this.props.findPathRoom(this.state.type, 0)} alt="icon error" />
                                <button className="material-icons removeBorder toPointer" onClick={this.moveToSelection}>edit</button>
                            </div>

                        </div>
                        <br /><br /><br />
                        <div className="roomNameAndIcon2">
                            <p>Customize background</p>
                            <input type="file" className="inputBackground" accept="image/*" onClick={this.resetBackground} onChange={this.changeDinamicallyBackground} id="inputPicture1" />
                            <input type="hidden" id="imageURL1" value="" />
                        </div>
                    </div>

                    <div className="message-two-lines center-text">
                        <span>
                            <ColorCircularProgress className={this.state.isLoading ? "loading-spinner" : "hidden"}/>
                        </span>
                        {this.showError()}
                    </div>

                    <div className="center">
                        <button type="button" name="button" className="btn-secondary btn waves-effect waves-light" onClick={this.redirectToHouse}>Cancel</button>
                        <button type="button" name="button" className="btn-secondary btn waves-effect waves-light" onClick={this.deleteRoom}>Delete room</button>
                        <button type="button" name="button" className="btn-primary btn waves-effect waves-light" onClick={this.sendDatas}>Save room</button>
                    </div>
                </div>

                <div hidden id="addRoomIconSelection1" className="content-box">
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
                    <button type="button" name="button" className="btn-secondary btn waves-effect waves-light" onClick={this.moveToInformation}>Cancel</button>
                </div>

            </div>

        );
    }
}


export default EditRoom;
