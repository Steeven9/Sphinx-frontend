import React from 'react';
import logo from './logo.svg';
import './App.css';
import Homepage from './Homepage';
import Login from './Login';
import Signup from './Signup';
import ResetPassword from './ResetPassword';
import Home from './Home';
import House from './House';
import HandleRooms from './HandleRooms';
import AddRoom from './AddRoom';
import Room from './Room';
import AddRoomDevice from './AddRoomDevice';
import Devices from './Devices';
import AddDevice from './AddDevice';
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
                    this.state.toX ? <Redirect to='/X' /> : <React.Fragment /> 
                }
                <div>
                    <Switch>
                        <Route path="/">
                            <Homepage />
                        </Route>

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

                        <Route path="/addRoomDevice">
                            <AddRoomDevice />
                        </Route>

                        <Route path="/devices">
                            <Devices />
                        </Route>

                        <Route path="/addDevice">
                            <AddDevice />
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
