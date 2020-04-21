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
            statusCode: '',
            isLoading: false,
            error: -1,  // -1 nothing, 0 incomplete, 1 wrong username or password, 2 not authenticated, 3 unexpected error
            errorType: "",
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", (evt) => {
            if (evt.key === 'Enter') this.sendDatas(evt)
        });
    }

    /**
     * Sends all informations contained in this.state to the backend
     */
    sendDatas = evt => {
        evt.preventDefault();

        if (this.state.username === '' || this.state.password === '') {
            this.setState({error: 0})
            return;
        }
        
        this.setState({isLoading: true, error: -1, statusCode: ''})

        fetch('http://localhost:8080/auth/login/' + this.state.username, {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: this.state.password
        })
        .then((res) => {
            this.setState({statusCode: res.status});

            if (res.status === 200) {
                return res.text();
            } 
            else if (res.status === 401 || res.status === 404) {
                this.setState({error: 1})
            } 
            else if (res.status === 403) {
                this.setState({error: 2})
            }
            else {
                this.setState({error: 3, errorType: "Error Code: " + res.status})
            }
            return null;
        })
        .then((data, res) => {
            this.setState({isLoading: false})
            if (data !== null) {
                this.props.logIn(this.state.username, data);
            }
        })
        .catch( e => {
            this.setState({isLoading: false})
            this.setState({error: 3, errorType: e})
        });
    };

    /**
     * Display an error message if this.state.error === true
     */
    showError = () => {
        if (this.state.error === 0) {
            return (<span className="error-message">Please fill all the informations</span>)
        }
        else if (this.state.error === 1) {
            return (<span className="error-message">Wrong username or password</span>)
        }
        else if (this.state.error === 2) {
            return (<span className="error-message">Account not verified. <a className="primary-link" href="/resend">Resend email</a></span>)
        }
        else if (this.state.error === 3) {
            return (<span className="error-message">{this.state.errorType}</span>)
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

                            <div className="message-two-lines center-text">
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
