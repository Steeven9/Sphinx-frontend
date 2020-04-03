import React from 'react';
import '../css/App.css';
import '../css/loginSignup.css';
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";

const ColorCircularProgress = withStyles({root: {color: '#580B71'},})(CircularProgress);
let isLoading = false;

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: false
        }
    }

    /**
     * Sends all informations contained in this.state to the backend
     */
    sendDatas = evt => {
        isLoading = true;
        evt.preventDefault();

        fetch('http://localhost:8080/auth/login/' + this.state.username, {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: this.state.password
        })
            .then((res) => {
                if (res.status === 200) {
                    return res.text();
                } else {
                    return null;
                }
            })
            .then((data) => {
                isLoading = false;
                if (data === null) {
                    this.setState({error: true});
                } else {
                    this.props.logIn(this.state.username, data);
                }
            });
    };

    /**
     * Function only used for testing without the backend
     */
    sendDatasTest = evt => {
        evt.preventDefault();
        this.props.logIn(this.state.username, "a test token");
        if (this.state.username !== "") {
            window.location.href = '/dashboard';
        }
    }

    /**
     * Display an error message if this.state.error === true
     */
    showError = () => {
        if (this.state.error) {
            return (
                <span className="error-message">Couldn't log in.</span>
            )
        }
    }

    // functions to handle state on input change
    handleUsernameChange = evt => {
        this.setState({username: evt.target.value});
    };
    handlePasswordChange = evt => {
        this.setState({password: evt.target.value});
    };

    /**
     * State: username, password
     * isEnabled: boolean to enable button
     */
    render() {
        const {username, password} = this.state;
        const isEnabled = username.length > 0 && password.length > 0;
        return (
            <div id="wrapper" className="homepage img-homepage-headline main-img-background">

                <article>
                    <div id="content" className="container">
                        <div className="login-box z-depth-2">

                            <h2 className="title">Log in</h2>

                            <p>All fields are required</p>

                            <div
                                className="dates-input1">
                                <input
                                    type="text"
                                    required={true}
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.handleUsernameChange}
                                    placeholder="Username or email"/>
                            </div>

                            <div className="dates-input1">
                                <input
                                    type="password"
                                    name="password"
                                    required={true}
                                    value={this.state.password}
                                    onChange={this.handlePasswordChange}
                                    placeholder="Password"/>
                            </div>

                            <div className="center-text forgot-password">
                                <a className="primary-link" href="/reset">Forgot your password?</a>
                            </div>

                            <div className="message-one-line center-text">
                                <span>
                                    <ColorCircularProgress className={isLoading ? "loading-spinner" : "hidden"}/>
                                </span>
                                <span>
                                    {this.showError()}
                                </span>
                            </div>

                            <div className="center">
                                <button type="button"
                                        name="button"
                                        className="btn-secondary waves-effect waves-light btn"
                                        onClick={() => window.location.href = "/signup"}>Create account
                                </button>

                                <button type="button"
                                        disabled={!isEnabled}
                                        name="button"
                                        className="btn-primary waves-effect waves-light btn"
                                        onClick={this.sendDatas}>Log in
                                </button>
                            </div>
                        </div>
                    </div>

                </article>
            </div>
        );
    }
}


export default Login;
