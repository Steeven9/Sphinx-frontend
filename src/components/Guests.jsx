import React from 'react';
import '../css/App.css';
import '../css/house.css';
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";

const ColorCircularProgress = withStyles({root: {color: '#580B71'},})(CircularProgress);

class Guests extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            guests: <div className="message-two-lines center-text"><span><ColorCircularProgress className="loading-spinner"/></span></div>
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/guests/', {
            method: 'GET',
            headers: {
                'user': this.props.username,
                'session-token': this.props.session_token,
            },
        })
        .then((res) => {
            if (res.status === 401) {
                this.props.logOut(1);
            } else if (res.status === 200) {
                return res.text();
            } else {
                return null;
            }
        })
        .then((data) => {
            let response = JSON.parse(data);

            if (response === null) {
                this.setState({guests: <p><b>An error has occurred.</b></p>});
            } else if (response.length === 0) {
                this.setState({
                    guests: <p><b>You haven't authorized any guest yet. Click on the + button to authorize one.</b></p>
                });
            } else {
                this.mapGuests(response);
            }
        })
        .catch(e => this.setState({guests: <p><b>Error.</b></p>}))
    }

    /**
     * Maps the received array of guests and sets it as this.state.guests. If no guests are available, this.state.guests gets changed with a specific phrase.
     * @param guests: array of guests
     */
    mapGuests = (guests) => {
        if (guests.length === 0) {
            this.setState({guests: <p><b>You haven't authorized any guest yet. Click on the + button to authorize one.</b></p>});
        } else {
            let i = 0;
            let toSet = guests.map((guest) =>
                <div key={i++} className="row room">
                    <div className="col l1 image vertical-center"><img src={"TODO"} alt="device-logo"/></div>
                    <div className="col l5 vertical-center">{guest.username}</div>
                    <div className="col l2"></div>
                    <div className="col l1 room-button1 vertical-center">
                        <i className="material-icons btn-edit"
                           onClick={() => this.redirectToEditGuest(guest.username)}>edit</i>
                    </div>
                    <div className="col l1 room-button2 vertical-center">
                        <i className="material-icons btn-edit"
                           onClick={() => this.redirectToGuest(guest.username)}>visibility_outlined</i>
                    </div>
                </div>
            );
            this.setState({guests: toSet})
        }
    }

    //Redirection to /guest
    redirectToGuest = (guestUsername) => {
        window.location.href = '/guest?username=' + guestUsername
    }

    //Redirection to /editGuest
    redirectToEditGuest = (guestUsername) => {
        window.location.href = '/editGuest?username=' + guestUsername
    }

    /**
     * Renders the list of guests
     */
    render() {
        return (
            <div className="container">
                <div className="rooms-content-box z-depth-2">
                    <div className="headline-box row row-collapsible row row-collapsible-custom">
                        <h2 className="col l11 left-align headline-title">My guests</h2>
                        <a href="/addGuest"><i className="col col-collapsible l1 btn waves-effect waves-light btn-primary-circular right material-icons">add</i></a>
                    </div>

                    <div className="row rooms-headline">
                        <div className="col l1"></div>
                        <div className="col l5">Username</div>
                        <div className="col l4"></div>
                    </div>
                    {this.state.guests}
                </div>
            </div>
        );
    }
}


export default Guests;