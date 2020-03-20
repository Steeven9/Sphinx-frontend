import React from 'react';
import '../App.css';
import './css/LoginCreateReset.css';

class ResetPassword extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
			email: '',
		}
    }
    
    handleEmailChange = evt => {
        this.setState({ email: evt.target.value });
    };

    /**
     * State: email
     * isEnabled: boolean to enable button
     */
    render() {
        const { email } = this.state;
        const isEnabled = email.length > 1;


        return (


            <div className="main-img-background">

                <div className="content-box1">

                    <h2 className="title">Restore Password</h2>

                    <p>Type the email address registered to your account. If we find it in our records, you’ll receive the instructions to
                    restore your password.</p>

                    <div className="dates-input1"><input type="email"  required={true} name="email" value={this.state.email} onChange={this.handleEmailChange} placeholder="Email"/></div>

                    <div className="buttons1">

                        <div className="dates-input1"><a href="/login"><button type="button" name="button" className="btn-secondary btn">Cancel</button></a></div>

                        <div className="dates-input1"><button type="button" name="button" disabled={!isEnabled} className="btn-primary btn">Reset</button></div>

                    </div>

                </div>

            </div>
        );
    }
}


export default ResetPassword;