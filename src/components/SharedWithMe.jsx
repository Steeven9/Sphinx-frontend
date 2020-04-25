import React from 'react';
import '../css/App.css';
import '../css/house.css';
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";

const ColorCircularProgress = withStyles({root: {color: '#580B71'},})(CircularProgress);

class SharedWithMe extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            owners: <div className="message-two-lines center-text"><span><ColorCircularProgress className="loading-spinner"/></span></div>
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/guests/houses', {
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
                this.setState({owners: <p><b>An error has occurred.</b></p>});
            } else if (response.length === 0) {
                this.setState({
                    owners: <p><b>You're no-one guest.</b></p>
                });
            } else {
                this.mapOwners(response);
            }
        })
        .catch(e => this.setState({owners: <p><b>Error.</b></p>}))
    }

    /**
     * Maps the received array of owners and sets it as this.state.owners. If no owners are available, this.state.owners gets changed with a specific phrase.
     * @param owners: array of owners
     */
    mapOwners = (owners) => {
        if (owners.length === 0) {
            this.setState({owners: <p><b>You're no-one guest.</b></p>});
        } else {
            let i = 0;
            let toSet = owners.map((owner) =>
                <div key={i++} className="row room">
                    <div className="col l1 image vertical-center"><i className="material-icons account-circle">account_circle</i></div>
                    <div className="col l5 vertical-center">{owner.username}</div>
                    <div className="col l2"></div>
                    <div className="col l1 room-button2 vertical-center">
                        <i className="material-icons btn-edit"
                           onClick={() => this.redirectToHouseSharedWithMe(owner.username)}>visibility_outlined</i>
                    </div>
                </div>
            );
            this.setState({owners: toSet})
        }
    }

    //Redirection to /houseSharedWithMe
    redirectToHouseSharedWithMe = (ownerUsername) => {
        window.location.href = '/houseSharedWithMe?owner=' + ownerUsername
    }

    /**
     * Renders the list of owners
     */
    render() {
        return (
            <div className="container">
                <div className="rooms-content-box z-depth-2">
                    <div className="headline-box row row-collapsible row row-collapsible-custom">
                        <h2 className="col l11 left-align headline-title">Houses shared with me</h2>
                    </div>

                    <div className="row rooms-headline">
                        <div className="col l1"></div>
                        <div className="col l5">Owner</div>
                        <div className="col l4"></div>
                    </div>
                    {this.state.owners}
                </div>
            </div>
        );
    }
}


export default SharedWithMe;