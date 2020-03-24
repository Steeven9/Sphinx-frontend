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
import Footer from './components/Footer';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,

            toHomepage: false,
            toDashboard: false,
            toLogin: false,
            toHouse: false,
            toDevices: false,
            toEditRoom: false,
            toEditDevice: false,
            toRoom: false,

            roomTo: "",
            deviceTo: "test",

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
            fetch('http://localhost:8080/auth/validate/', {
                method: 'POST',
                headers: {
                   'user': newUsername,
                   'session-token': newSession_token
                },
            })
            .then( (res) => res.status === 200 ? 
                this.setState({ username: newUsername, session_token: newSession_token, loggedIn: newLoggedIn }) 
                : 
                this.logOut(0)
            )
            .catch( error => this.logOut(0))
            // .catch( error => this.setState({ username: newUsername, session_token: newSession_token, loggedIn: newLoggedIn }))
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
            toHomepage: false,
            toDashboard: false,
            toLogin: false,
            toHouse: false,
            toDevices: false,
            toEditRoom: false,
            toEditDevice: false,
            toRoom: false,

            roomTo: "",
            deviceTo: ""
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
    redirectDevices = () => {
        this.stopRedirections();
        this.setState({
            toDevices: true,
        });
    }
    redirectEditRoom = (room) => {
        this.stopRedirections();
        this.setState({
            roomTo: room,
            toEditRoom: true,
        });
    }
    redirectEditDevice = (device) => {
        this.stopRedirections();
        this.setState({
            deviceTo: device,
            toEditDevice: true,
        });
    }
    redirectRoom = (room) => {
        this.stopRedirections();
        this.setState({
            roomTo: room,
            toRoom: true,
        });
    }

    /**
     * Used to set usernme and session token
     */
    logIn = (user, token) => {
        this.setState({
            username: user,
            session_token: token,
            loggedIn: true
        });

        localStorage.setItem("username", user);
        localStorage.setItem("session_token", token);
        localStorage.setItem("loggedIn", "true");

        this.redirectDashboard();
    }

    /**
     * Used to log out.
     * exitCode: if 0, normal log out. If 1, expired session token, if 2, unexpected error
     */
    logOut = (exitCode) => {
        this.setState({
            username: "",
            session_token: "",
            loggedIn: false
        });

        localStorage.setItem("username", "");
        localStorage.setItem("session_token", "");
        localStorage.setItem("loggedIn", "false");

        if (exitCode === 1) {
            alert("Session expired. Please log in again.")
        }
        else if (exitCode === 2) {
            alert("Unexpected error, logging out...")
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
        let path = './img/icons/devices/'
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
        else path += 'unknwon-device'
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
                { this.state.toHomepage ? <Redirect to='/' /> : <React.Fragment /> }
                { this.state.toDashboard ? <Redirect to='/dashboard' /> : <React.Fragment /> }
                { this.state.toLogin ? <Redirect to='/login' /> : <React.Fragment /> }
                { this.state.toHouse ? <Redirect to='/house' /> : <React.Fragment /> }
                { this.state.toDevices ? <Redirect to='/devices' /> : <React.Fragment /> }
                { this.state.toEditRoom ? <Redirect to='/editRoom' /> : <React.Fragment /> }
                { this.state.toEditDevice ? <Redirect to='/editDevice' /> : <React.Fragment /> }
                { this.state.toRoom ? <Redirect to='/room' /> : <React.Fragment /> }

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
                                        logIn = {this.logIn}
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
                                        redirectRoom = {this.redirectRoom} 
                                    />
                                : this.accessDenied()}
                            </Route>

                            <Route path="/editRoom">
                                {this.state.loggedIn && (this.state.roomTo !== "") ? 
                                    <EditRoom 
                                        username = {this.state.username}
                                        session_token = {this.state.session_token}
                                        roomTo = {this.roomTo}
                                        logOut = {this.logOut} 
                                        redirectHouse = {this.redirectHouse} 
                                        findPathRoom = {this.findPathRoom}
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
                                        findPathRoom = {this.findPathRoom}
                                    />
                                : this.accessDenied()}
                            </Route>

                            <Route path="/room">
                                {this.state.loggedIn ? 
                                    <Room 
                                        username = {this.state.username}
                                        session_token = {this.state.session_token}
                                        logOut = {this.logOut} 
                                        roomTo = {this.roomTo}
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
                                {this.state.loggedIn && (this.state.deviceTo !== "") ? 
                                    <EditDevice 
                                        username = {this.state.username}
                                        session_token = {this.state.session_token}
                                        deviceTo = {this.deviceTo}
                                        logOut = {this.logOut} 
                                        redirectDevices = {this.redirectDevices} 
                                    />
                                : this.accessDenied()}
                            </Route>

                            <Route path="/addDevice">
                                {this.state.loggedIn ? 
                                    <AddDevice 
                                        username = {this.state.username}
                                        session_token = {this.state.session_token}
                                        logOut = {this.logOut} 
                                        redirectDevices = {this.redirectDevices} 
                                        findPathDevice = {this.findPathDevice}
                                    />
                                : this.accessDenied()}
                            </Route>

                            <Route path="/logout">
                                {this.state.loggedIn ? 
                                    <LogOut
                                        logOut = {this.logOut} 
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