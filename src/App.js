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
import Dashboard from './components/Dashboard';
import House from './components/House';
import HandleRooms from './components/HandleRooms';
import AddRoom from './components/AddRoom';
import Room from './components/Room';
import Devices from './components/Devices';
import AddDevice from './components/AddDevice';
import LogOut from './components/LogOut';
import Template from './components/Template';
import RedirectionTest from './components/RedirectionTest';
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

            username: "",
            session_token: ""
        }
    }

    // componentDidMount() {
    //     let username;
    //     if (sessionStorage.getItem("username") === null) {
    //         username = "";
    //     }
    //     else {
    //         username = sessionStorage.getItem("username");
    //     }

    //     let session_token;
    //     if (sessionStorage.getItem("session_token") === null) {
    //         session_token = "";
    //     }
    //     else {
    //         session_token = sessionStorage.getItem("session_token");
    //     }

    //     let loggedIn = sessionStorage.getItem("loggedIn") === true;

    //     this.setState({ username: username, session_token: session_token, loggedIn: loggedIn })
    // }

    /**
     * Function used to cancel all redirections.
     * Should get passed to every page to use on load in case of problems, so that previous redirections won't cause any.
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
     * Used for redirections
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

    /**
     * Used to set usernme and session token
     */
    setSession = (user, token) => {
        this.setState({
            username: user,
            session_token: token,
            loggedIn: true
        });

        sessionStorage.setItem("username", user);
        sessionStorage.setItem("session_token", token);
        sessionStorage.setItem("loggedIn", "true");
    }

    /**
     * Used to set usernme and session token
     */
    logOut = () => {
        this.setState({
            username: "",
            session_token: "",
            loggedIn: false
        });

        sessionStorage.setItem("username", "");
        sessionStorage.setItem("session_token", "");
        sessionStorage.setItem("loggedIn", "false");

        this.redirectHomepage();
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

                    <Switch>
                        <Route path="/login">
                            <Login
                                redirectDashboard = {this.redirectDashboard} 
                                setSession = {this.setSession}
                            />
                        </Route>

                        <Route path="/signup">
                            <Signup
                                redirectLogin = {this.redirectLogin} 
                            />
                        </Route>

                        <Route path="/reset">
                            <ResetPassword
                                redirectLogin = {this.redirectLogin} 
                            />
                        </Route>

                        <Route path="/verify">
                            <Verification />
                        </Route>

                        <Route path="/dashboard">
                            <Dashboard 
                                username = {this.state.username}
                                session_token = {this.state.session_token}
                            />
                        </Route>

                        <Route path="/house">
                            <House 
                                username = {this.state.username}
                                session_token = {this.state.session_token}
                            />
                        </Route>

                        <Route path="/handleRooms">
                            <HandleRooms 
                                username = {this.state.username}
                                session_token = {this.state.session_token}
                            />
                        </Route>

                        <Route path="/addRoom">
                            <AddRoom
                                redirectHouse = {this.redirectHouse} 
                                username = {this.state.username}
                                session_token = {this.state.session_token}
                            />
                        </Route>

                        <Route path="/room">
                            <Room 
                                username = {this.state.username}
                                session_token = {this.state.session_token}
                            />
                        </Route>

                        <Route path="/devices">
                            <Devices 
                                username = {this.state.username}
                                session_token = {this.state.session_token}
                            />
                        </Route>

                        <Route path="/addDevice">
                            <AddDevice 
                                username = {this.state.username}
                                session_token = {this.state.session_token}
                            />
                        </Route>

                        <LogOut 
                            logOut = {this.logOut} 
                            redirectHomepage = {this.redirectHomepage}
                        />

                        <Route path="/template">
                            <Template />
                        </Route>

                        <Route path="/test">
                            <RedirectionTest
                                redirectDashboard = {this.redirectDashboard} 
                                username = {this.state.username}
                                session_token = {this.state.session_token}
                            />
                        </Route>

                        <Route path="/">
                            <Homepage />
                        </Route>
                    </Switch>

                    <Footer />
                </div>
            </Router>
        );
    }
}

export default App;