import React from 'react';
import './App.css';
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import Header from './components/Header';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Signup from './components/Signup';
import ResetPassword from './components/ResetPassword';
import Verification from './components/Verification';
import ChangePassword from './components/ChangePassword';
import Dashboard from './components/Dashboard';
import House from './components/House';
import EditRoom from './components/EditRoom';
import AddRoom from './components/AddRoom';
import Room from './components/Room';
import Devices from './components/Devices';
import EditDevice from './components/EditDevice';
import AddDevice from './components/AddDevice';
import LogOut from './components/LogOut';
import Error404 from './components/Error404';


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import Footer from "./components/Footer";

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
            toHomepage: false,
            toDashboard: false,
            toLogin: false,
            toHouse: false,
            toEditRoom: false,
            toEditDevice: false,

            roomToEdit: "",
            deviceToEdit: "",

            username: "",
            session_token: ""
        }
    }

    /**
     * Checks localStorage values and updates the state accordingly
     */
    componentDidMount() {
        let newUsername;
        if (localStorage.getItem("username") === null) {
            newUsername = "";
        }
        else {
            newUsername = localStorage.getItem("username");
        }

        let newSession_token;
        if (localStorage.getItem("session_token") === null) {
            newSession_token = "";
        }
        else {
            newSession_token = localStorage.getItem("session_token");
        }

        let newLoggedIn = localStorage.getItem("loggedIn") === "true";

        if (newLoggedIn) {
            fetch('http://localhost:8080/auth/validate/' + newUsername, {
                method: 'POST',
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                },
                body: newSession_token
            })
            .then( (res) => res.status === 200 ? 
                this.setState({ username: newUsername, session_token: newSession_token, loggedIn: newLoggedIn }) 
                : 
                this.logOut()
            )
                // Uncomment the following line to enter production mode
                .catch( error => this.logOut())
                // Uncomment the following line to enter testing mode
                // .catch(error => this.setState({ username: newUsername, session_token: newSession_token, loggedIn: newLoggedIn }))
        }
        else {
            this.setState({ username: newUsername, session_token: newSession_token, loggedIn: newLoggedIn })
        }
    }

    /**
     * Function used to cancel all redirections.
     * Should get called to every redirection Function.
     * It might be useless, but it sure doesn't do any harm.
     */
    stopRedirections = () => {
        this.setState({
            toDashboard: false,
            toLogin: false,
            toDevices: false,
            toRoom: false,
            toHouse: false,
        });
    }

    /**
     * Functions for redirections
     */
    redirectHomepage = () => {
        this.stopRedirections();
        this.setState({
            toHomepage: true,
        });
    }

    redirectDashboard = () => {
        this.stopRedirections();
        this.setState({
            toDashboard: true,
        });
    }

    redirectLogin = () => {
        this.stopRedirections();
        this.setState({
            toLogin: true,
        });
    }

    redirectHouse = () => {
        this.stopRedirections();
        this.setState({
            toHouse: true,
        });
    }

    redirectEditRoom = (room) => {
        this.stopRedirections();
        this.setState({
            roomToEdit: room,
            toEditRoom: true,
        });
    }

    redirectEditDevice = (device) => {
        this.stopRedirections();
        this.setState({
            deviceToEdit: device,
            toEditDevice: true,
        });
    }

    /**
     * Used to set usernme and session token
     */
    setSession = (user, token) => {
        this.setState({
            username: user,
            session_token: token,
            loggedIn: true
        });

        localStorage.setItem("username", user);
        localStorage.setItem("session_token", token);
        localStorage.setItem("loggedIn", "true");
    }

    /**
     * Used to set usernme and session token
     */
    logOut = () => {
        // console.log(this.loggedIn)
        this.setState({
            username: "",
            session_token: "",
            loggedIn: false
        });

        localStorage.setItem("username", "");
        localStorage.setItem("session_token", "");
        localStorage.setItem("loggedIn", "false");

        window.location.href = '/';
    }

    /**
     * It returns the "Access Denied" page
     */
    accessDenied = () => {
        return (
            <div id="content" className="container">
                <section className="content-box z-depth-2">
                    <div>
                        <p><b>Access Denied</b></p>
                    </div>
                </section>
            </div>
        )
    }

    
    /**
     * Take cares of switching from one path to the other, adding the Header and the Footer.
     * It only calls different components and deciding which ones to call, it has no pure html.
     */
    render() {
        return (
            <Router>
                { this.state.toHomepage ? <Redirect to='/' /> : <React.Fragment /> }
                { this.state.toDashboard ? <Redirect to='/dashboard' /> : <React.Fragment /> }
                { this.state.toLogin ? <Redirect to='/login' /> : <React.Fragment /> }
                { this.state.toHouse ? <Redirect to='/house' /> : <React.Fragment /> }

                <div id="wrapper">
                    <Header 
                        loggedIn = {this.state.loggedIn}
                        redirectDashboard = {this.redirectDashboard} 
                    />

                    <main>
                        <Switch>

                            <Route path="/login">
                                {this.state.loggedIn ? this.accessDenied() :
                                    <Login
                                        redirectDashboard = {this.redirectDashboard} 
                                        setSession = {this.setSession}
                                    />
                                }
                            </Route>

                            <Route path="/signup">
                                {this.state.loggedIn ? this.accessDenied() :
                                    <Signup
                                        redirectLogin = {this.redirectLogin} 
                                    />
                                }
                            </Route>

                            <Route path="/reset">
                                <ResetPassword
                                    redirectLogin = {this.redirectLogin} 
                                />
                            </Route>

                            <Route path="/verify">
                                <Verification />
                            </Route>

                            <Route path="/changepassword">
                                <ChangePassword />
                            </Route>

                            <Route path="/dashboard">
                                {this.state.loggedIn ? 
                                    <Dashboard 
                                        username = {this.state.username}
                                        session_token = {this.state.session_token}
                                    />
                                : this.accessDenied()}
                            </Route>

                            <Route path="/house">
                                {this.state.loggedIn ? 
                                    <House 
                                        username = {this.state.username}
                                        session_token = {this.state.session_token}
                                        logOut = {this.logOut} 
                                        redirectEditRoom = {this.redirectEditRoom} 
                                    />
                                : this.accessDenied()}
                            </Route>

                            <Route path="/editRoom">
                                {this.state.loggedIn && (this.state.roomToEdit !== "") ? 
                                    <EditRoom 
                                        username = {this.state.username}
                                        session_token = {this.state.session_token}
                                        roomToEdit = {this.roomToEdit}
                                        logOut = {this.logOut} 
                                    />
                                : this.accessDenied()}
                            </Route>

                            <Route path="/addRoom">
                                {this.state.loggedIn ? 
                                    <AddRoom
                                        redirectHouse = {this.redirectHouse} 
                                        username = {this.state.username}
                                        session_token = {this.state.session_token}
                                        logOut = {this.logOut} 
                                    />
                                : this.accessDenied()}
                            </Route>

                            <Route path="/room">
                                {this.state.loggedIn ? 
                                    <Room 
                                        username = {this.state.username}
                                        session_token = {this.state.session_token}
                                        logOut = {this.logOut} 
                                    />
                                : this.accessDenied()}
                            </Route>

                            <Route path="/devices">
                                {this.state.loggedIn ? 
                                    <Devices 
                                        username = {this.state.username}
                                        session_token = {this.state.session_token}
                                        logOut = {this.logOut} 
                                        redirectEditDevice = {this.redirectEditDevice} 
                                    />
                                : this.accessDenied()}
                            </Route>

                            <Route path="/editDevice">
                                {this.state.loggedIn && (this.state.deviceToEdit !== "") ? 
                                    <EditDevice 
                                        username = {this.state.username}
                                        session_token = {this.state.session_token}
                                        deviceToEdit = {this.deviceToEdit}
                                        logOut = {this.logOut} 
                                    />
                                : this.accessDenied()}
                            </Route>

                            <Route path="/addDevice">
                                {this.state.loggedIn ? 
                                    <AddDevice 
                                        username = {this.state.username}
                                        session_token = {this.state.session_token}
                                        logOut = {this.logOut} 
                                    />
                                : this.accessDenied()}
                            </Route>

                            <Route path="/logout">
                                {this.state.loggedIn ? 
                                    <LogOut
                                        logOut = {this.logOut} 
                                        redirectHomepage = {this.redirectHomepage}
                                    />
                                : this.accessDenied()}
                            </Route>

                            <Route path="/changepassword">
                                <ChangePassword/>
                            </Route>

                            <Route exact path="/">
                                <Homepage />
                            </Route>

                            <Route path="*">
                                <Error404 />
                            </Route>


                        </Switch>
                    </main>

                    <Footer />
                </div>
            </Router>
        );
    }
}

export default App;