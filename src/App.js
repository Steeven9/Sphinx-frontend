import React from 'react';
import './css/App.css';
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
} from "react-router-dom";
import Footer from "./components/Footer";

class App extends React.Component {

    constructor(props) {
        super(props);
        let username = "";
        let session_token = "";

        try {
            username = localStorage.getItem('username');
            session_token = localStorage.getItem('session_token');
        } catch (e) {
            console.log(e);
        }

        this.state = {
            loggedIn: true,
            username: username,
            session_token: session_token,

            loginAccess: true,
        }
    }

    /**
     * Checks localStorage values and updates the state accordingly
     */
    componentDidMount() {
        let newUsername = localStorage.getItem("username");
        let newSession_token = localStorage.getItem("session_token");
        let newLoggedIn = localStorage.getItem("loggedIn");

        if (newLoggedIn === "true") {
            fetch('http://localhost:8080/auth/validate/', {
                method: 'POST',
                headers: {
                    'user': newUsername,
                    'session-token': newSession_token
                },
            })
                .then((res) => res.status === 200 ?
                    this.setState({ username: newUsername, session_token: newSession_token, loggedIn: newLoggedIn, loginAccess: false })
                    :
                    this.logOut(0)
                )
        }
        else {
            this.setState({ username: "", session_token: "", loggedIn: false, loginAccess: true })
        }
    }

    /**
     * Used to set username and session token
     */
    logIn = (user, token) => {
        this.setState({
            username: user,
            session_token: token,
            loggedIn: true,
        });

        localStorage.setItem("username", user);
        localStorage.setItem("session_token", token);
        localStorage.setItem("loggedIn", "true");

        if (this.state.loggedIn) {
            window.location.href = "/";
        }
    }

    /**
     * Used to log out.
     * exitCode: if 0, normal log out. If 1, expired session token.
     */
    logOut = (exitCode) => {
        this.setState({
            username: "",
            session_token: "",
            loggedIn: false,
            loginAccess: true
        });

        localStorage.setItem("username", "");
        localStorage.setItem("session_token", "");
        localStorage.setItem("loggedIn", "false");

        if (exitCode === 1) {
            alert("Session expired. Please log in again.")
        }

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
     * Return Device icon path
     */
    findPathDevice = (type) => {
        let path = '/img/icons/devices/'
        if (type === "1") path += 'bulb-regular'
        else if (type === "2") path += 'bulb-led'
        else if (type === "3") path += 'switch'
        else if (type === "4") path += 'dimmer-state'
        else if (type === "5") path += 'dimmer-regular'
        else if (type === "6") path += 'smart-plug'
        else if (type === "7") path += 'sensor-humidity'
        else if (type === "8") path += 'sensor-light'
        else if (type === "9") path += 'sensor-temperature'
        else if (type === "10") path += 'sensor-motion'
        else if (type === "11") path += 'automation-thermostat'
        else if (type === "12") path += 'smart-curtains'
        else if (type === "13") path += 'security-camera'
        else path += 'unknown-device'
        path += '.svg'
        return path;
    }

    /**
     * Return Room icon/background path
     * @param flag: if false icon, if true background
     */
    findPathRoom = (type, flag) => {
        let path = './img/'
        if (flag) {
            path += 'backgrounds/rooms/background-'
        }
        else {
            path += 'icons/rooms/icon-'
        }
        path += type
        path += '.svg'
        return path;
    }


    /**
     * Take cares of switching from one path to the other, adding the Header and the Footer.
     * It only calls different components and deciding which ones to call, it has no pure html.
     */
    render() {
        return (
            <Router>

                <div id="wrapper">
                    <Header
                        loggedIn={this.state.loggedIn}
                    />

                    <main>
                        <Switch>

                            <Route path="/login">
                                {this.state.loginAccess ? 
                                    <Login
                                        logIn={this.logIn}
                                    />
                                    :
                                    this.accessDenied()
                                }
                            </Route>

                            <Route path="/signup">
                                {this.state.loggedIn ? this.accessDenied() :
                                    <Signup />
                                }
                            </Route>

                            <Route path="/reset">
                                <ResetPassword />
                            </Route>

                            <Route path="/verification">
                                <Verification />
                            </Route>

                            <Route path="/changepassword">
                                <ChangePassword />
                            </Route>

                            <Route path="/house">
                                {this.state.loggedIn ?
                                    <House
                                        username={this.state.username}
                                        session_token={this.state.session_token}
                                        logOut={this.logOut}
                                    />
                                    : this.accessDenied()}
                            </Route>

                            <Route path="/editRoom">
                                {this.state.loggedIn ?
                                    <EditRoom
                                        username={this.state.username}
                                        session_token={this.state.session_token}
                                        logOut={this.logOut}
                                        findPathRoom={this.findPathRoom}
                                    />
                                    : this.accessDenied()}
                            </Route>

                            <Route path="/addRoom">
                                {this.state.loggedIn ?
                                    <AddRoom
                                        username={this.state.username}
                                        session_token={this.state.session_token}
                                        logOut={this.logOut}
                                        findPathRoom={this.findPathRoom}
                                    />
                                    : this.accessDenied()}
                            </Route>

                            <Route path="/room">
                                {this.state.loggedIn ?
                                    <Room
                                        username={this.state.username}
                                        session_token={this.state.session_token}
                                        logOut={this.logOut}
                                    />
                                    : this.accessDenied()}
                            </Route>

                            <Route path="/devices">
                                {this.state.loggedIn ?
                                    <Devices
                                        username={this.state.username}
                                        session_token={this.state.session_token}
                                        logOut={this.logOut}
                                    />
                                    : this.accessDenied()}
                            </Route>

                            <Route path="/editDevice">
                                {this.state.loggedIn ?
                                    <EditDevice
                                        username={this.state.username}
                                        session_token={this.state.session_token}
                                        logOut={this.logOut}
                                        findPathDevice={this.findPathDevice}
                                    />
                                    : this.accessDenied()}
                            </Route>

                            <Route path="/addDevice">
                                {this.state.loggedIn ?
                                    <AddDevice
                                        username={this.state.username}
                                        session_token={this.state.session_token}
                                        logOut={this.logOut}
                                        findPathDevice={this.findPathDevice}
                                    />
                                    : this.accessDenied()}
                            </Route>

                            <Route path="/logout">
                                {this.state.loggedIn ?
                                    <LogOut
                                        logOut={this.logOut}
                                    />
                                    : this.accessDenied()}
                            </Route>

                            <Route path="/changepassword">
                                <ChangePassword />
                            </Route>

                            <Route exact path="/">
                                {this.state.loggedIn ?
                                    <Dashboard
                                        username={this.state.username}
                                        session_token={this.state.session_token}
                                    />
                                    : 
                                    <Homepage />
                                }
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