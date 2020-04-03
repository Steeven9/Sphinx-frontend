import React from 'react';
import '../css/App.css';
import '../css/loginSignup.css';


class ResetPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            success: -1 //if -1, nothing, if 1 display success, if 0 display error
        }
    }

    /**
     * Sends all informations contained in this.state to the backend
     */
    sendDatas = evt => {
        evt.preventDefault();
        fetch('http://localhost:8080/auth/reset/' + this.state.email, {
            method: 'POST',
        })
            .then((res) => res.status === 204 ? this.setState({success: 1}) : this.setState({success: 0}))
    };

    /**
     * Handles changes in Email input
     */
    handleEmailChange = evt => {
        this.setState({email: evt.target.value});
    };

    /**
     * Adds a new line in the page depending on the value of this.state.success
     */
    displayResult = () => {
        if (this.state.success === 1) {
            return (
                <>
                    <span className="success-message">Password reset request processed!</span><br/>
                    <span className="success-message">Please check your inbox and follow the link to change it.</span>
                </>
            )
        } else if (this.state.success === 0) {
            return (
                <>
                    <span className="error-message">There was an issue with your request!</span><br/>
                    <span className="error-message">Please check your types email address and try again.</span>
                </>
            )
        }
    };

    /**
     * State: email
     * isEnabled: boolean to enable button
     */
    render() {
        const {email} = this.state;
        const isEnabled = email.length > 1;

        return (
            <div id="wrapper" className="homepage img-homepage-headline main-img-background">
                <article>
                    <div id="content" className="container">
                        <div className="password-reset-box z-depth-2">
                            <h2 className="title">Restore password</h2>

                            <p className="center-text top-bottom-margins">Type the email address registered to your account. If we find it in our records, you’ll
                                receive the instructions to
                                restore your password.</p>

                            <div className="password-reset-input"><input type="email" required name="email"
                                                                 value={this.state.email}
                                                                 onChange={this.handleEmailChange} placeholder="Email"/>
                            </div>

                            <div className="message-two-lines center-text">
                                {this.displayResult()}
                            </div>

                            <div className="center">

                                <button type="button" name="button" className="btn-secondary waves-effect waves-light btn"
                                        onClick={() => window.location.href = "/login"}>Cancel
                                </button>

                                <button type="button" name="button" disabled={!isEnabled} className="btn-primary waves-effect waves-light btn"
                                        onClick={this.sendDatas}>Reset
                                </button>

                            </div>
                        </div>
                    </div>
                </article>
            </div>
        );
    }
}


export default ResetPassword;