import React from 'react';
import '../App.css';
import './css/loginPages.css';


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
        evt.preventDefault();
        fetch('http://localhost:8080/auth/login/' + this.state.username, {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: this.state.password
        })
        // .then( (res) => console.log(res))
        .then( (res) => {
            if (res.status === 200) {
                this.props.setSession(this.state.username, res.session_token);
                this.props.setLogin();
                this.props.redirectDashboard();
            }
            else {
                this.setState({error: true});
            }
        })
    };

    /**
     * Function only used for testing without the backend
     */
    sendDatasTest = evt => {
        evt.preventDefault();
        this.props.setSession(this.state.username, "a test token");
        if (this.state.username !== "") {
            window.location.href = '/dashboard';
        }
    }

    /**
     * Display an error message if this.state.error === true
     */
    showError = () => {
        if (this.state.error) {
            return(
                <p>Couldn't log in.</p>
            )
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
            <article>
                <div id="content" className="container">
                    <div className="content-box1 content-box z-depth-2">

                        <h2 className="title">Login</h2>
                        
                        <p>All fields are required</p>

                        <div
                            className="dates-input1"><input
                                type="text"
                                required={true}
                                name="username"
                                value={this.state.username}
                                onChange={this.handleUsernameChange}
                                placeholder="Username or email" /></div>

                        <div className="dates-input1"><input
                                type="password"
                                name="password"
                                required={true}
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                                placeholder="Password" /></div>

                        { this.showError() }

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
                                // Uncomment th efollowing line to enter production mode
                                    // onClick={this.sendDatas}>Login</button>
                                // Uncomment the following line to enter testing mode
                                    onClick={this.sendDatasTest}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>

            </article>
        );
    }
}


export default Login;