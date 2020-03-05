import React from 'react';
import '../App.css';
import logo from "./img/logo-horizontal.svg";

class LoggedOutHeader extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
			// placeholder
		}
	}

    render() {
        return (
            <header id="page-header" className="loggedOutHeader">
                <nav className="navbar-fixed">
                    <div className="nav-wrapper">
                        <a href="/" className="brand-logo">
                            <img className="nav-left nav-logo-horizontal responsive-img" src={logo} alt="SmartHut logo" />
                        </a>
                        <ul className="right nav-menu-desktop-right hide-on-med-and-down">
                            <li><a href="signup">Create account</a></li>
                            <li><a href="login">Log in</a></li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}

export default LoggedOutHeader;