import React from 'react';
import './App.css';
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import LoggedInHeader from './components/LoggedInHeader';
import NotLoggedInHeader from './components/NotLoggedInHeader';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Signup from './components/Signup';
import ResetPassword from './components/ResetPassword';
import Home from './components/Home';
import House from './components/House';
import HandleRooms from './components/HandleRooms';
import AddRoom from './components/AddRoom';
import Room from './components/Room';
import Devices from './components/Devices';
import AddDevice from './components/AddDevice';
import Template from './components/Template';
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
            toX: false
        }
    }

    toX = (x) => {
        this.setState({
            toX: true,
        });
    }

    render() {
        return (
            <Router>
                {
                    this.state.toX ? <Redirect to='/' /> : <React.Fragment /> 
                }

                <div>
                    {
                        this.state.loggedIn ? <LoggedInHeader /> : <NotLoggedInHeader /> 
                    }

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

                        <Route path="/home">
                            <Home />
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

                        <Route path="/devices">
                            <Devices />
                        </Route>

                        <Route path="/addDevice">
                            <AddDevice />
                        </Route>

                        <Route path="/template">
                            <Template />
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