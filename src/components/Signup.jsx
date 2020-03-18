import React from 'react';
import '../App.css';

class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // placeholder
        }
    }

    /**
     * TODO
     */
    render() {
        return (
            <div
                className="signup">


                <div
                    class="content-box1">

                    <h2
                        class="title">Create account</h2>

                    <div
                        class="dates">

                        <div
                            class="dates-input"><input
                                class="cred"
                                type="text"
                                name=""
                                placeholder="First name" /></div>

                        <div
                            class="dates-input"><input
                                class="cred"
                                type="text"
                                name=""
                                placeholder="Laste name*"
                            /></div>

                        <div
                            class="dates-input"><input
                                class="cred"
                                type="email"
                                name=""
                                placeholder="Email"
                            /></div>

                        <div
                            class="dates-input"><input
                                class="cred"
                                type="text"
                                name=""
                                placeholder="Username"
                            /></div>

                        <div
                            class="dates-input"><input
                                class="cred"
                                type="password"
                                name=""
                                placeholder="Password*"
                            /></div>

                        <div
                            class="dates-input"><input
                                class="cred"
                                type="password"
                                name=""
                                placeholder="Confirm*"
                            /></div>

                    </div>

                    <div
                        class="dates">

                        <div
                            class="dates-input"><a href="/login"><button
                                type="button"
                                name="button"
                                class="btn-secondary btn">Login</button></a></div>

                        <div
                            class="dates-input"><button
                                type="button"
                                name="button"
                                class="btn-primary btn">Create account</button></div>

                    </div>

                </div>


            </div>
        );
    }
}


export default Signup;