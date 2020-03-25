import React from 'react';
import '../App.css';
import imgSmartHouse from './img/logo/smart-home.svg';

class Homepage extends React.Component {

    /**
     * Renders the initial logged out screen of the website.
     * It has two buttons that link to the Sign up page. Everything else is just fancy graphics.
     */
    render() {
        return (
            <div id="wrapper" className="homepage img-homepage-headline main-img-background">
                <div id="content" className="container">
                    <main>
                        <article>
                            <section className="row headline-box">
                                <img className="responsive-img col l5" src={imgSmartHouse} alt="SmartHut"/>
                                <div className="col l6">
                                    <h1 className="text-homepage-headline">Smart control for your smart home</h1>
                                    <a href="/signup" className="btn-homepage-headline waves-effect waves-light btn btn-primary col l6">Join now</a>
                                </div>
                            </section>
                            
                            <section className="content-box z-depth-2">
                                <h2> How does it work?</h2>
                                <p><strong>SmartHut</strong> is your one-stop management system for all your smart lights and sensors in your home, independently from their manufacturer.</p>

                                <p> Using <strong>SmartHut</strong> is as easy as creating rooms and then adding all your devices to them. You’ll get immediate control from our easy and intuitive web app.</p>
                                <div className="center-align">
                                    <a href="/signup" className="waves-effect waves-light btn btn-primary center-align">Join now</a>
                                </div>
                            </section>
                        </article>
                    </main>
                </div>
            </div>
        );
    }
}

export default Homepage;
