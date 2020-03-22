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

            <div className="main-img-background">


                <div className="content-box1">

                    <h2 className="title">Create account</h2>

                    <p>All fields are required</p>

                    <div className="dates">

                        <div className="dates-input"><input className="cred" required={true} name="firstname" value={this.state.firstname} onChange={this.handleFirstnameChange} type="text" placeholder="First name" /></div>

                        <div className="dates-input"><input className="cred" required={true} name="lastname" value={this.state.lastname} onChange={this.handleLastnameChange} type="text" placeholder="Last name" /></div>

                        <div className="dates-input"><input className="cred" required={true} name="email" value={this.state.email} onChange={this.handleEmailChange} type="email" placeholder="Email" /></div>

                        <div className="dates-input"><input className="cred" required={true} name="username" value={this.state.username} onChange={this.handleUsernameChange} type="text" placeholder="Username" /></div>

                        <div className="dates-input"><input className="cred" required={true} name="password" value={this.state.password} onChange={this.handlePasswordChange} type="password" placeholder="Password" /></div>

                        <div className="dates-input"><input className="cred" required={true} name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleConfirmPasswordChange} type="password" placeholder="Confirm Password" /></div>

                    </div>

                    <div className="dates">

                        <div className="dates-input"><a href="/login"><button type="button" name="button" className="btn-secondary btn">Sign in</button></a></div>

                        <div className="dates-input"><button type="button" disabled={!isEnabled} name="button" className="btn-primary btn">Create</button></div>

                    </div>

                </div>


            </div>
        );
    }
}


export default Signup;