import React from 'react';
import './components/css/App.css';
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import Header from './components/Header';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Signup from './components/Signup';
import ResetPassword from './components/ResetPassword';
import Dashboard from './components/Dashboard';
import House from './components/House';
import HandleRooms from './components/HandleRooms';
import AddRoom from './components/AddRoom';
import Room from './components/Room';
import DevicesPanel from './components/devices/DevicesPanel';
import AddDevice from './components/AddDevice';
import Footer from './components/Footer';
import ControlledExpansionPanel from './components/ControlledExpansionPanel';
import Template from './components/Template';
import AllDevicesTemplate from './components/AllDevicesTemplate';

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
            toX: false
        }
    }

    /**
     * Used for redirections. It's a template for future redirections.
     */
    toX = (x) => {
        this.setState({
            toX: true,
        });
    }

    
    /**
     * Take cares of switching from one path to the other, adding the Header and the Footer.
     * It only calls different components and deciding which ones to call, it has no pure html.
     */
    render() {
        return (
            <Router>
                {
                    this.state.toX ? <Redirect to='/' /> : <React.Fragment />
                }

                <div id="wrapper">
                    <Header 
                        loggedIn = {this.state.loggedIn}
                    />

                    <Switch>
                        <Route path="/login">
                            <Login />
                        </Route>

                        <Route path="/signup">
                            <Signup />
                        </Route>

                        <Route path="/reset">
                            <ResetPassword />
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
                            <AddRoom />
                        </Route>

                        <Route path="/room">
                            <Room />
                        </Route>

                        <Route path="/devices/">
                            <DevicesPanel />
                        </Route>

                        <Route path="/addDevice">
                            <AddDevice />
                        </Route>

                        <Route path="/template">
                            <Template />
                        </Route>

                        <Route path="/allDevicesTemplate">
                            <AllDevicesTemplate />
                        </Route>

                        <Route path="/expand">
                            <ControlledExpansionPanel />
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