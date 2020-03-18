import React from 'react';
import '../App.css';
import logo from "./img/logo/logo-horizontal.svg";

class Header extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
			loggedIn: false
		}
    }
    
    /**
     * React function for changing the state whenever receiving the loggedIn variable from App.js
     * @param {*} props - all parameters received from App.js
     * @param {*} state - this state
     * returns the new state, that goes directly into the state of this class
     */
    static getDerivedStateFromProps(props, state) {
		return {
            loggedIn: props.loggedIn
        };
	}

    /**
     * Renders the header depending on the variable loggedIn.
     * The logged in header has a clickable logo that links to the home and clickable buttons that link to the rooms, the devices and to the log out;
     * The logged out header has a clickable logo that links to the homepage and clickable buttons that link to Sign in and Log in;
     */
    render() {
        return (
            <header id="page-header" className="header">
                <div className="navbar-fixed">
                        <nav className="navbar-fixed">
                            <div className="nav-wrapper">
                                <a href={this.state.loggedIn ? "/dashboard" : "/"} className="brand-logo">
                                    <img className="nav-left nav-logo-horizontal responsive-img" src={logo} alt="SmartHut logo" />
                                </a>

                                {
                                    this.state.loggedIn ? 

                                    <ul className="right nav-menu-desktop-right hide-on-med-and-down">
                                        <li><a href="/rooms">My rooms</a></li>
                                        <li><a href="/devices">My devices</a></li>
                                        <li><a href="/template">Log out</a></li>
                                    </ul>
                    
                                    :

                                    <ul className="right nav-menu-desktop-right hide-on-med-and-down">
                                        <li><a href="/signup">Create account</a></li>
                                        <li><a href="/login">Log in</a></li>
                                    </ul>
                                }

                            </div>
                        </nav>
                    </div>
            </header>
        );
    }
}

export default Header;