import React from 'react';
import '../App.css';
import './css/loginPages.css';


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
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify(
            {
                username: this.state.username, 
                email: this.state.email, 
                fullname: this.state.firstname + " " + this.state.lastname,
                password: this.state.password
            })
        })
        .then( (res) => res.status === 203 ? this.setState({success: 1}) : this.setState({success: 0}))
    };

    /**
     * Adds a new line in the page depending on the value of this.state.success
     */
    displayResult = () => {
        if (this.state.success === 1) {
            return (<p>Account created successfully, please check your inbox.</p>)
        }
        else if (this.state.success === 0) {
            return (<p>The account couldn't be created. Try checking your information.</p>)
        }
    }

    //Functions that handle changes in the inputs
    handleUsernameChange = evt => {
        this.setState({ username: evt.target.value });
    };
    handleFirstnameChange = evt => {
        this.setState({ firstname: evt.target.value });
    };
    handleLastnameChange = evt => {
        this.setState({ lastname: evt.target.value });
    };
    handleEmailChange = evt => {
        this.setState({ email: evt.target.value });
    };
    handlePasswordChange = evt => {
        this.setState({ password: evt.target.value });
    };
    handleConfirmPasswordChange = evt => {
        this.setState({ confirmPassword: evt.target.value });
    };

    /**
     * State: firstname, lastname, username, email, password, confirmPassword
     * isEnabled: boolean to enable button
     */
    render() {
        const { firstname, lastname, username, email, password, confirmPassword } = this.state;
        const isEnabled = (email.length > 0 && password.length > 0 && username.length > 0 && firstname.length > 0 && lastname.length > 0 && confirmPassword.length > 0 && confirmPassword === password);
    
        return (
            <article>
                <div id="content" className="container">
                    <div className="content-box1 content-box z-depth-2">
                        <h2 className="title">Create account</h2>

                        <p>All fields are required</p>

                        <div className="dates">

                            <div className="dates-input"><input className="cred" required name="firstname" value={this.state.firstname} onChange={this.handleFirstnameChange} type="text" placeholder="First name" /></div>

                            <div className="dates-input"><input className="cred" required name="lastname" value={this.state.lastname} onChange={this.handleLastnameChange} type="text" placeholder="Last name" /></div>

                            <div className="dates-input"><input className="cred" required name="email" value={this.state.email} onChange={this.handleEmailChange} type="email" placeholder="Email" /></div>

                            <div className="dates-input"><input className="cred" required name="username" value={this.state.username} onChange={this.handleUsernameChange} type="text" placeholder="Username" /></div>

                            <div className="dates-input"><input className="cred" required name="password" value={this.state.password} onChange={this.handlePasswordChange} type="password" placeholder="Password" /></div>

                            <div className="dates-input"><input className="cred" required name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleConfirmPasswordChange} type="password" placeholder="Confirm Password" /></div>

                        </div>

                        { this.displayResult() }

                        <div className="center">

                            <button type="button" name="button" className="btn-secondary btn" onClick={() => window.location.href="/login"}>Sign in</button>

                            <button type="button" disabled={!isEnabled} name="button" className="btn-primary btn" onClick={this.sendDatas}>Create</button>

                        </div>
                    </div>
                </div>
            </article>
        );
    }
}


export default Signup;