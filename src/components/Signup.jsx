import React from 'react';
import '../App.css';
import './css/LoginCreateReset.css';
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

        }
    }

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
        const isEnabled = ((email.length > 0 && password.length > 0) && (username.length > 0 && firstname.length > 0)) && (lastname.length > 0 && confirmPassword.length > 0);
    
        return (

            <div className="signup">


                <div class="content-box1">

                    <h2 class="title">Create account</h2>

                    <p>All fields are required</p>

                    <div class="dates">

                        <div class="dates-input"><input class="cred" name="firstname" value={this.state.firstname} onChange={this.handleFirstnameChange} type="text" placeholder="First name" /></div>

                        <div class="dates-input"><input class="cred" name="lastname" value={this.state.lastname} onChange={this.handleLastnameChange} type="text" placeholder="Laste name*" /></div>

                        <div class="dates-input"><input class="cred" name="email" value={this.state.email} onChange={this.handleEmailChange} type="email" placeholder="Email" /></div>

                        <div class="dates-input"><input class="cred" name="username" value={this.state.username} onChange={this.handleUsernameChange} type="text" placeholder="Username" /></div>

                        <div class="dates-input"><input class="cred" name="password" value={this.state.password} onChange={this.handlePasswordChange} type="password" placeholder="Password*" /></div>

                        <div class="dates-input"><input class="cred" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleConfirmPasswordChange} type="password" placeholder="Confirm*" /></div>

                    </div>

                    <div class="dates">

                        <div class="dates-input"><a href="/login"><button type="button" name="button" class="btn-secondary btn">Sign in</button></a></div>

                        <div class="dates-input"><button type="button" disabled={!isEnabled} name="button" class="btn-primary btn">Create account</button></div>

                    </div>

                </div>


            </div>
        );
    }
}


export default Signup;