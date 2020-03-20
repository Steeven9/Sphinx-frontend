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

    /**
     * Sends all informations contained in this.state to the backend
     */
    sendDatas = evt => {
        fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            body: JSON.stringify(this.state)
        })
        .then( (res) => console.log(res))
    };

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
            <div className="main-img-background">


                <div className="content-box1 ">

                    <h2 className="title">Login</h2>
                    
                    <p>All fields are required</p>

                    <div
                        className="dates-input1"><input
                            type="text"
                            required={true}
                            name="username"
                            value={this.state.username}
                            onChange={this.handleUsernameChange}
                            placeholder="Username" /></div>

                    <div className="dates-input1"><input
                            type="password"
                            name="password"
                            required={true}
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                            placeholder="Password" /></div>

                    <a href="/reset">Forgot your password?</a>

                    <div className="buttons1">

                        <div className="dates-input1"><a href="/signup"><button
                                type="button"
                                name="button"
                                className="btn-secondary btn">Create account</button></a></div>

                        <div className="dates-input1"><button
                                type="button"
                                disabled= {!isEnabled}
                                name="button"
                                className="btn-primary btn"
                                onClick={this.sendDatas}>Login</button>
                        </div>

                    </div>

                </div>

            </div>
        );
    }
}


export default Login;