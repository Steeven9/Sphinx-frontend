import React from 'react';
import '../css/App.css';
import '../css/loginSignup.css';
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";

const ColorCircularProgress = withStyles({root: {color: '#580B71'},})(CircularProgress);

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: false,
            statusCode: '',
            isLoading: false
        }
    }

    /**
     * Sends all informations contained in this.state to the backend
     */
    sendDatas = evt => {
        this.setState({isLoading: true})
        this.setState({error: false})
        this.setState({statusCode: ''})
        evt.preventDefault();

        fetch('http://localhost:8080/auth/login/' + this.state.username, {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: this.state.password
        })
            .then((res) => {
                this.setState({statusCode: res.status});

                if (res.status === 200) {
                    return res.text();
                } else {
                    return null;
                }
            })
            .then((data, res) => {
                this.setState({isLoading: false})
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
        console.log(this.statusCode)
        if (this.state.error) {
            return (
                <span className="error-message">
                    {(this.state.statusCode === 403) ? "Please check your mail and verify your account." : "Couldn't log in. Please check your username or password."}
                </span>
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
                                    <ColorCircularProgress className={this.state.isLoading ? "loading-spinner" : "hidden"}/>
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
