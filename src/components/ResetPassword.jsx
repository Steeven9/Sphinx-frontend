import React from 'react';
import '../App.css';
import './css/loginPages.css';


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
        .then( (res) => res.status === 204 ? this.setState({success: 1}) : this.setState({success: 0}))
    };
    
    /**
     * Handles changes in Email input
     */
    handleEmailChange = evt => {
        this.setState({ email: evt.target.value });
    };

    /**
     * Adds a new line in the page depending on the value of this.state.success
     */
    displayResult = () => {
        if (this.state.success === 1) {
            return (<p>Password reset completed, please check your inbox.</p>)
        }
        else if (this.state.success === 0) {
            return (<p>Couldn't reset password, please check your email address and try again.</p>)
        }
    }

    /**
     * State: email
     * isEnabled: boolean to enable button
     */
    render() {
        const { email } = this.state;
        const isEnabled = email.length > 1;

        return (
            <article>
                <div id="content" className="container">
                    <div className="content-box1 content-box z-depth-2">
                        <h2 className="title">Restore Password</h2>

                        <p>Type the email address registered to your account. If we find it in our records, you’ll receive the instructions to
                        restore your password.</p>

                        <div className="dates-input1"><input type="email" required name="email" value={this.state.email} onChange={this.handleEmailChange} placeholder="Email"/></div>

                        { this.displayResult() }

                        <div className="center">

                            <button type="button" name="button" className="btn-secondary btn" onClick={() => window.location.href = "/login"}>Cancel</button>

                            <button type="button" name="button" disabled={!isEnabled} className="btn-primary btn" onClick={this.sendDatas}>Reset</button>

                        </div>
                    </div>
                </div>
            </article>
        );
    }
}


export default ResetPassword;