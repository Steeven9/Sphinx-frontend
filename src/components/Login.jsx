import React from 'react';
import '../App.css';
import './css/LoginCreateReset.css';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    // functions to handle state on input change
    handleUsernameChange = evt => {
        this.setState({ username: evt.target.value });
    };
    
    handlePasswordChange = evt => {
        this.setState({ password: evt.target.value });
    };

     /**
     * State: username, password
     * isEnabled: boolean to enable button
     */
    render() {
        const { username, password } = this.state;
        const isEnabled = username.length > 0 && password.length > 0;
        return (
            <div className="login">


                <div class="content-box1">

                    <h2 class="title">Login</h2>
                    
                    <p>All fields are required</p>

                    <div
                        class="dates-input1"><input
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleUsernameChange}
                            placeholder="Username" /></div>

                    <div class="dates-input1"><input
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                            placeholder="Password" /></div>

                    <a href="/reset">Forgot your password?</a>

                    <div class="buttons1">

                        <div class="dates-input1"><a href="/signup"><button
                                type="button"
                                name="button"
                                class="btn-secondary btn">Create account</button></a></div>

                        <div class="dates-input1"><button
                                type="button"
                                disabled= {!isEnabled}
                                name="button"
                                class="btn-primary btn">Login</button>
                        </div>

                    </div>

                </div>

            </div>
        );
    }
}


export default Login;