import React from 'react';
import '../App.css';

class ResetPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // placeholder
        }
    }

    /**
     * TODO
     */
    render() {
        return (
            <div
                className="resetPassword">

                <div
                    class="content-box1">

                    <h2
                        class="title">Restore Password</h2>

                    <p>Type the email address registered to your account. If we find it in our records, you’ll receive the instructionsto
 restore your password.</p>

                    <div
                        class="dates-input1"><input
                            type="text"
                            name=""
                            placeholder="Email" /></div>

                    <div
                        class="buttons1">

                        <div
                            class="dates-input1"><a href="/login"><button
                                type="button"
                                name="button"
                                class="btn-secondary btn">Cancel</button></a></div>

                        <div
                            class="dates-input1"><button
                                type="button"
                                name="button"
                                class="btn-primary btn">Reset password</button></div>

                    </div>

                </div>

            </div>
        );
    }
}


export default ResetPassword;