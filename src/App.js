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
            toDashboard: false,
            toLogin: false,
            toHouse: false,
        }
    }

    // /**
    //  * Function used to cancel all redirections.
    //  * Should get passed to every page to use on load in case of problems, so that previous redirections won't cause any.
    //  * Note: I (Aron) don't think that this function will be used, but it's already here in case that something goes wrong.
    //  */
    // stopRedirections = () => {
    //     this.setState({
    //         toDashboard: false,
    //         toLogin: false,
    //         toDevices: false,
    //         toRoom: false,
    //         toHouse: false,
    //     });
    // }

    /**
     * Used for redirection to the Dashboard page.
     */
    redirectDashboard = () => {
        this.setState({
            toDashboard: true,
        });
    }

    /**
     * Used for redirection to the Dashboard page.
     */
    redirectLogin = () => {
        this.setState({
            toLogin: true,
        });
    }

    /**
     * Used for redirection to the Dashboard page.
     */
    redirectHouse = () => {
        this.setState({
            toHouse: true,
        });
    }

    
    /**
     * Take cares of switching from one path to the other, adding the Header and the Footer.
     * It only calls different components and deciding which ones to call, it has no pure html.
     */
    render() {
        return (
            <Router>
                { this.state.toDashboard ? <Redirect to='/home' /> : <React.Fragment /> }
                { this.state.toLogin ? <Redirect to='/login' /> : <React.Fragment /> }
                { this.state.toHouse ? <Redirect to='/house' /> : <React.Fragment /> }

                <div id="wrapper">
                    <Header 
                        loggedIn = {this.state.loggedIn}
                    />

                    <Switch>
                        <Route path="/login">
                            <Login
                                redirectDashboard = {this.redirectDashboard} 
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
                            <Dashboard />
                        </Route>

                        <Route path="/house">
                            <House />
                        </Route>

                        <Route path="/handleRooms">
                            <HandleRooms />
                        </Route>

                        <Route path="/addRoom">
                            <AddRoom
                                redirectHouse = {this.redirectHouse} 
                            />
                        </Route>

                        <Route path="/room">
                            <Room />
                        </Route>

                        <Route path="/devices">
                            <Devices />
                        </Route>

                        <Route path="/addDevice">
                            <AddDevice />
                        </Route>

                        <Route path="/template">
                            <Template />
                        </Route>

                        <Route path="/test">
                            <RedirectionTest
                                redirectDashboard = {this.redirectDashboard} 
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