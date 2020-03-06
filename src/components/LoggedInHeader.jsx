import React from 'react';
import '../App.css';
import logo from "./img/logo-horizontal.svg";

class LoggedInHeader extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
			// placeholder
		}
	}

    render() {
        return (
            <header id="page-header" className="loggedInHeader">
                <div className="navbar-fixed">
                    <nav className="navbar-fixed">
                        <div className="nav-wrapper">
                            <a href="/home" className="brand-logo">
                                <img className="nav-left nav-logo-horizontal responsive-img" src={logo} alt="SmartHut logo" />
                            </a>
                            <ul className="right nav-menu-desktop-right hide-on-med-and-down">
                                <li><a href="rooms">My rooms</a></li>
                                <li><a href="devices">My devices</a></li>
                                <li><a href="#">Log out</a></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
        );
    }
}

export default LoggedInHeader;