import React from 'react';
import '../css/App.css';


const active = window.location.pathname.toLowerCase().split('/')

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        }
    }

    // /**
    //  * React function for changing the state whenever receiving the loggedIn variable from App.js
    //  * @param {*} props - all parameters received from App.js
    //  * @param {*} state - this state
    //  * returns the new state, that goes directly into the state of this class
    //  */
    // static getDerivedStateFromProps(props, state) {
    //     console.log(props.loggedIn)
    // 	return {
    //         loggedIn: props.loggedIn
    //     };
    // }

    /**
     * Checks localStorage "loggedIn" value and updates the state accordingly
     */
    componentDidMount() {
        let newLoggedIn = localStorage.getItem("loggedIn") === "true";
        // console.log(newLoggedIn);
        this.setState({loggedIn: newLoggedIn})
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
                            <a href="/" className="brand-logo">
                                <img className="nav-left nav-logo-horizontal responsive-img"
                                     src="/img/logo/logo-horizontal.svg" alt="SmartHut logo"/>
                            </a>

                            {
                                this.state.loggedIn ?
                                    <>
                                        <ul className="right hide-on-med-and-down">
                                            <li> <a className={(active[1] === '') ? 'nav-link active' : 'nav-link'} href="/">Dashboard</a></li>
                                            <li> <a className={(active[1] === 'devices') ? 'nav-link active' : 'nav-link'} href="/devices">Devices</a></li>
                                            <li> <a className={(active[1] === 'house' || active[1] === 'room') ? 'nav-link active' : 'nav-link'} href="/house">Rooms</a></li>
                                            <li> <a className={(active[1] === 'scenes') ? 'nav-link active' : 'nav-link'} href="/scenes">Scenes</a> </li>
                                            <li> <a className={(active[1] === 'automation') ? 'nav-link active' : 'nav-link'} href="/automation">Automation</a></li>
                                            <li> <a className={(active[1] === 'guests') ? 'nav-link active' : 'nav-link'} href="/guests">Guests</a></li>
                                            <li><a className='nav-link' href="/logout">Log out</a></li>
                                        </ul>
                                    </>
                                    :

                                    <ul className="right hide-on-med-and-down">
                                        <li> <a className={(active[1] === '') ? 'nav-link active' : 'nav-link'} href="/">Home</a></li>
                                        <li> <a className={(active[1] === 'signup') ? 'nav-link active' : 'nav-link'} href="/signup">Create account</a></li>
                                        <li> <a className={(active[1] === 'login') ? 'nav-link active' : 'nav-link'} href="/login">Log in</a></li>
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
