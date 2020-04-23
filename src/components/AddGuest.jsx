import React from 'react';
import '../css/App.css';
import '../css/house.css';
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";

const ColorCircularProgress = withStyles({root: {color: '#580B71'},})(CircularProgress);

class AddGuest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            guestUsernameOrEmail: "",
            error: -1,  // -1 nothing, 0 no guest username, 1 no devices or scenes selected, 2 bad request, 3 unexpected error
            errorType: "",
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", (evt) => {
            if (evt.key === 'Enter') this.sendDatas(evt)
        });
    }

    handleGuestUsernameOrEmailChange = (evt) => {
        this.setState({ guestUsernameOrEmail: evt.target.value });
    }

    //Redirection to /guests
    redirectToGuests = () => {
        window.location.href = '/guests'
    }

    sendDatas = evt => {
        evt.preventDefault();

        if (this.state.guestUsernameOrEmail === "") {
            this.setState({error: 0})
        }
        else {
            this.setState({isLoading: true, error: -1})
            fetch('http://localhost:8080/guests/', {
                method: 'POST',
                headers: { 
                    'user': this.state.username,
                    'session-token': this.state.session_token,
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({
                    guest: this.state.guestUsernameOrEmail,
                })
            })
            .then( (res) => {
                this.setState({isLoading: false})
                if (res.status === 200) {
                    this.redirectToGuests()
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
            .catch( e => this.setState({isLoading: false, error: 2, errorType: e.toString()}))
        }
    }

    showError = () => {
        if (this.state.error === 0) {
            return (<span className="error-message">Please fill the guest's username or email</span>)
        }
        else if (this.state.error === 1) {
            return (<span className="error-message">Error: bad request</span>)
        }
        else if (this.state.error === 2) {
            return (<span className="error-message">{this.state.errorType}</span>)
        }
    }

    /**
     * Renders the list of rooms and device plus the form for the guest's username
     */
    render() {
        return (
            <div className="container">
                <div className="rooms-content-box z-depth-2">
                    <div className="headline-box row row-collapsible row row-collapsible-custom">
                        <h2 className="col l11 left-align headline-title">Add guest</h2>
                    </div>
                    <div className="textFields">
                        <input type="text" name="guestUsername" value={this.state.guestUsernameOrEmail} placeholder="Insert Guest Username or Email" onChange={this.handleGuestUsernameOrEmailChange} required/>
                    </div>

                    <div className="message-two-lines center-text">
                        <span>
                            <ColorCircularProgress className={this.state.isLoading ? "loading-spinner" : "hidden"}/>
                        </span>
                        {this.showError()}
                    </div>
                    <button type="button" name="button" className="btn-secondary btn waves-effect waves-light" onClick={this.redirectToGuests}>Cancel</button>
                    <button type="button" name="button" className="Handle-btn-primary btn waves-effect waves-light" onClick={this.sendDatas}>Save</button>
                </div>
            </div>
        );
    }
}


export default AddGuest;