import React from 'react';
import '../App.css';
import logo from "./img/logo-horizontal.svg";

class Template extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
			// placeholder
		}
	}

    render() {
        return (
            <div id="wrapper" className="template">
                <header>
                    <nav className="navbar-fixed">
                        <div className="nav-wrapper">
                            <a href="/" className="brand-logo">
                                <img className="nav-left nav-logo-horizontal responsive-img" src={logo} alt="SmartHut logo" />
                            </a>
                            <ul className="right nav-menu-desktop-right hide-on-med-and-down">
                                <li><a href="rooms">My rooms</a></li>
                                <li><a href="devices">My devices</a></li>
                                <li><a href="#">Log out</a></li>
                            </ul>
                        </div>
                    </nav>
                </header>

                <main>
                    <article>
                        <div id="content" className="container">
                            <section className="content-box z-depth-2">
                                <div className="row">
                                    <h3 className="col center">Title</h3>
                                     {/*Remove the following button if needed */}
                                    <a className="btn waves-effect waves-light btn-primary-circular col right">+</a>
                                </div>

                                <div>
                                    {/* Substitute the next lines with the actual code we need */}
                                    <p>The content goes here</p>
                                    <p>more content</p>
                                    <p>a bit more content.</p>
                                </div>

                                <div className="center">
                                    <a className="waves-effect waves-light btn btn-secondary col l5">Cancel</a>
                                    <a className="waves-effect waves-light btn btn-secondary col l5">Secondary action</a>
                                    <a className="waves-effect waves-light btn btn-primary col l5">Main action</a>
                                </div>
                            </section>
                        </div>
                    </article>
                </main>

                <footer className="page-footer">
                    <div className="footer-copyright">
                        <span>&copy;2020 Sphinx Software</span>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Template;
