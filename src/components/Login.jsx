import React from 'react';
import '../App.css';

class Login extends React.Component {

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
                className="login">


                <div
                    class="content-box1">

                    <h2
                        class="title">Login</h2>

                    <div
                        class="dates-input1"><input
                            type="text"
                            name=""
                            placeholder="Username" /></div>

                    <div
                        class="dates-input1"><input
                            type="password"
                            name=""
                            placeholder="Password"
                        /></div>

                    <a
                        href="/reset">forgot your password?</a>

                    <div
                        class="buttons1">

                        <div
                            class="dates-input1"><a href="/signup"><button
                                type="button"
                                name="button"
                                class="btn-secondary btn">Create account</button></a></div>

                        <div
                            class="dates-input1"><button
                                type="button"
                                name="button"
                                class="btn-primary btn">Login</button></div>

                    </div>

                </div>

            </div>
        );
    }
}


export default Login;