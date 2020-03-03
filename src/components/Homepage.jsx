import React from 'react';
import '../App.css';
import logo from './img/logo-horizontal.svg'
import imgSmartHouse from './img/smart-home.svg'

class Homepage extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
			// placeholder
		}
	}

    render() {
        return (
            <div className="homepage main-img-background">
                <header>
                    <nav>
                        <div className="nav-wrapper">
                            <a href="/" className="brand-logo">
                                <img className="nav-left nav-logo-horizontal responsive-img" src={logo} alt="SmartHut logo" />
                            </a>
                            <ul className="right nav-menu-desktop-right hide-on-med-and-down">
                                <li><a href="signup.html">Create account</a></li>
                                <li><a href="login.html">Log in</a></li>
                            </ul>
                        </div>
                    </nav>
                </header>

                <div id="content" className="container">
                    <section className="row headline-box">
                        <img className="img-homepage-headline  responsive-img col l5" src={imgSmartHouse} alt="SmartHut"/>
                        <div className="col l6">
                            <h1 className="text-homepage-headline">Smart control for your smart home</h1>
                            <a className="btn-homepage-headline waves-effect waves-light btn btn-primary col l6 border2">Join now</a>
                        </div>
                    </section>

                    <section className="content-box z-depth-2">
                        <h2> How does it work?</h2>
                        <p><strong>SmartHut</strong> is you one-stop managent system for all your smart lights and sensors in your home, independently on their manufacturer. It also let’s you control non-smart devices with our proprietary <strong>SmartPlug&trade;️.</strong></p>

                        <p> Using <strong>SmartHut</strong> is as easy as creating rooms and then adding all your devices to them. You’ll get immediate control from out easy an intuitive web app.</p>
                        <div className="center-align">
                            <a className="waves-effect waves-light btn btn-primary center-align">Join now</a>
                        </div>
                    </section>
                </div>

                <footer className="page-footer">
                    <div className="footer-copyright">
                        <div className="container">
                            © 2020 Sphinx Software
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}


export default Homepage;