import React from 'react';
import '../css/App.css';
import '../css/loginSignup.css';
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";

const ColorCircularProgress = withStyles({root: {color: '#580B71'},})(CircularProgress);

class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            successOrError: -1, // if -1 nothing, if 0 display success, if 1 display incomplete, if 2 bad request,
                                // if 3 email or username already in use, if 4 unexpected error
            errorType: '',
            isLoading: false,
            passwordMismatch: false,
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

        if (this.state.firstname === '' || this.state.lastname === '' || this.state.username === ''
            || this.state.email === '' || this.state.password === '' || this.state.confirmPassword === '') {
            this.setState({successOrError: 1})
            return;
        }
        if (this.state.password !== '' && this.state.confirmPassword !== '' && this.state.password !== this.state.confirmPassword) return;

        this.setState({isLoading: true, successOrError: -1})
        this.setState({success: -1})

        fetch('http://localhost:8080/user/' + this.state.username, {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify(
                {
                    username: this.state.username,
                    email: this.state.email,
                    fullname: this.state.firstname + " " + this.state.lastname,
                    password: this.state.password
                })
        })
        .then((res) => {
            this.setState({isLoading: false})
            if (res.status === 201) {
                this.setState({successOrError: 0})
            }
            else if (res.status === 400) {
                this.setState({successOrError: 2})
            }
            else if (res.status === 500) {
                this.setState({successOrError: 3})
            }
            else {
                this.setState({successOrError: 4, errorType: "Error Code: " + res.status})
            }
        })
        .catch( e => {
            this.setState({isLoading: false})
            this.setState({successOrError: 4, errorType: e.toString()})
        });
    };

    /**
     * Adds a new line in the page depending on the value of this.state.success
     */
    displayResult = () => {
        if (this.state.successOrError === 0) {
            return (
                <>
                    <span className="success-message">Account created successfully!</span><br/>
                    <span className="success-message">Please check your inbox and confirm your email account.</span>
                </>
            )
        }
        else if (this.state.successOrError === 1) {
            return (<span className="error-message">Insert all informations.</span>)
        }
        else if (this.state.successOrError === 2) {
            return (<span className="error-message">Error: Bad request.</span>)
        }
        else if (this.state.successOrError === 3) {
            return (<span className="error-message">Email or nickname already in use.</span>)
        }
        else if (this.state.successOrError === 4) {
            return (<span className="error-message">{this.state.errorType}</span>)
        }
    };

    passwordMatch = () => {
        if (this.state.password !== '' && this.state.confirmPassword !== '' && this.state.password !== this.state.confirmPassword) {
            return(<span>The two passwords don't match.</span>)
        }
    }

    //Functions that handle changes in the inputs
    handleUsernameChange = evt => {
        this.setState({username: evt.target.value});
    };
    handleFirstnameChange = evt => {
        this.setState({firstname: evt.target.value});
    };
    handleLastnameChange = evt => {
        this.setState({lastname: evt.target.value});
    };
    handleEmailChange = evt => {
        this.setState({email: evt.target.value});
    };
    handlePasswordChange = evt => {
        this.setState({password: evt.target.value});
    };
    handleConfirmPasswordChange = evt => {
        this.setState({confirmPassword: evt.target.value});
    };

    loading = () => {
        return (
            <div className="message-two-lines center-text"><span>
                <ColorCircularProgress className="loading-spinner"/>
            </span></div>
        )
    }

    /**
     * State: firstname, lastname, username, email, password, confirmPassword
     * isEnabled: boolean to enable button
     */
    render() {
        const {firstname, lastname, username, email, password, confirmPassword} = this.state;
        const isEnabled = (email.length > 0 && password.length > 0 && username.length > 0 && firstname.length > 0 && lastname.length > 0 && confirmPassword.length > 0 && confirmPassword === password);

        return (
            <div id="wrapper" className="homepage img-homepage-headline main-img-background">

                <article>
                    <div id="content" className="container">
                        <div className="signup-box z-depth-2">
                            <h2 className="title">Create account</h2>

                            {this.state.isLoading ? this.loading() :
                                <>
                                    <p>All fields are required</p>

                                    <div className="row">

                                        <div className="col l6 m12">
                                            <input required name="firstname"
                                            value={this.state.firstname}
                                            onChange={this.handleFirstnameChange} type="text"
                                            placeholder="First name"/>
                                        </div>

                                        <div className="col l6 m12">
                                            <input required name="lastname"
                                            value={this.state.lastname}
                                            onChange={this.handleLastnameChange} type="text"
                                            placeholder="Last name"/>
                                        </div>

                                        <div className="col l6 m12">
                                            <input required name="email"
                                            value={this.state.email}
                                            onChange={this.handleEmailChange} type="email"
                                            placeholder="Email"/>
                                        </div>

                                        <div className="col l6 m12">
                                            <input required name="username"
                                            value={this.state.username}
                                            onChange={this.handleUsernameChange} type="text"
                                            placeholder="Username"/>
                                        </div>

                                        <div className="col l6 m12">
                                            <input required name="password"
                                            value={this.state.password}
                                            onChange={this.handlePasswordChange} type="password"
                                            placeholder="Password"/>
                                        </div>

                                        <div className="col l6 m12">
                                            <input required name="confirmPassword"
                                            value={this.state.confirmPassword}
                                            onChange={this.handleConfirmPasswordChange}
                                            type="password" placeholder="Confirm Password"/>
                                        </div>

                                    </div>

                                    <div className="message-two-lines center-text">
                                        {this.passwordMatch()} 
                                        <br/>
                                        <span>
                                            <ColorCircularProgress className={this.state.isLoading ? "loading-spinner" : "hidden"}/>
                                        </span>
                                        {this.displayResult()}
                                    </div>

                                    <div className="center">

                                        <button type="button" name="button" className="btn-secondary waves-effect waves-light btn"
                                                onClick={() => window.location.href = "/login"}>Sign in
                                        </button>

                                        <button type="button" disabled={!isEnabled} name="button" className="btn-primary waves-effect waves-light btn"
                                                onClick={this.sendDatas}>Create
                                        </button>

                                    </div>
                                </>}
                        </div>
                    </div>
                </article>
            </div>
        );
    }
}


export default Signup;
