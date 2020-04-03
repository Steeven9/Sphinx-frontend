import React from 'react';
import '../css/App.css';
import '../css/loginSignup.css';


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
            success: -1 //if -1 nothing, if 1 display success, if 0 display error
        }
    }

    /**
     * Sends all informations contained in this.state to the backend
     */
    sendDatas = evt => {
        evt.preventDefault();
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
            .then((res) => res.status === 203 ? this.setState({success: 1}) : this.setState({success: 0}))
    };

    /**
     * Adds a new line in the page depending on the value of this.state.success
     */
    displayResult = () => {
        if (this.state.success === 1) {
            return (
                <>
                    <span className="success-message">Account created successfully!</span><br/>
                    <span className="success-message">Please check your inbox and confirm your email account.</span>
                </>
            )
        } else if (this.state.success === 0) {
            return (
                <>
                    <span className="error-message">The account couldn't be created!</span><br/>
                    <span className="error-message">Check your information and try again.</span>
                </>
            )
        }
    };

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

                            <p>All fields are required</p>

                            <div className="row">

                                <div className="signup-input col"><input required name="firstname"
                                                                    value={this.state.firstname}
                                                                    onChange={this.handleFirstnameChange} type="text"
                                                                    placeholder="First name"/></div>

                                <div className="signup-input col"><input required name="lastname"
                                                                    value={this.state.lastname}
                                                                    onChange={this.handleLastnameChange} type="text"
                                                                    placeholder="Last name"/></div>

                                <div className="signup-input col"><input required name="email"
                                                                    value={this.state.email}
                                                                    onChange={this.handleEmailChange} type="email"
                                                                    placeholder="Email"/></div>

                                <div className="signup-input col"><input required name="username"
                                                                    value={this.state.username}
                                                                    onChange={this.handleUsernameChange} type="text"
                                                                    placeholder="Username"/></div>

                                <div className="signup-input col"><input required name="password"
                                                                    value={this.state.password}
                                                                    onChange={this.handlePasswordChange} type="password"
                                                                    placeholder="Password"/></div>

                                <div className="signup-input col"><input required name="confirmPassword"
                                                                    value={this.state.confirmPassword}
                                                                    onChange={this.handleConfirmPasswordChange}
                                                                    type="password" placeholder="Confirm Password"/>
                                </div>

                            </div>

                            <div className="message-two-lines center-text">
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
                        </div>
                    </div>
                </article>
            </div>
        );
    }
}


export default Signup;
