import React from 'react';
import '../css/App.css';
import * as qs from 'query-string';

class ChangePassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: 0, // If 0, the page will have a form. If 1, display "password changed". If 2, display "password mismatch". If 3, display error message
            password: "",
            confirmPassword: ""
        }
    }

    /**
     * Sends the code and the username given in the form to the backend to check it.
     * Depending on the backend response, it will change the "success" and "toSend" variable values.
     */
    sendDatas = (event) => {
        event.preventDefault();
        const parsed = qs.parse(window.location.search);

        if (!Object.keys(parsed).includes("code") || !Object.keys(parsed).includes("email")) {
            this.setState({show: 3});
            return;
        }
        if (this.state.password !== this.state.confirmPassword) {
            this.setState({show: 2});
            return;
        }
        fetch('http://localhost:8080/auth/reset/' + parsed.email + '/' + parsed.code, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: this.state.password
        })
            .then((res) => res.status === 204 ? this.setState({show: 1}) : this.setState({show: 3}))
            .catch((error) => this.setState({show: 3}))
    }

    /**
     * Every time that the text inside the input changes, this.state.username gets changed.
     */
    changePassword = (event) => {
        this.setState({password: event.target.value});
    }

    /**
     * Every time that the text inside the input changes, this.state.code gets changed.
     */
    changeConfirmPassword = (event) => {
        this.setState({confirmPassword: event.target.value});
    }

    /**
     * Depending on the value of show, returns either the form to fill, or the result of the authentication.
     */
    showChange = () => {
        if (this.state.show === 0) {
            return (<>
                <h2 className="title">Change password</h2>

                <p className="center-text">Type your new password</p>

                <div>
                    <input type="password" name="password" onChange={this.changePassword} placeholder="Password"
                           required/>
                </div>
                <div>
                    <input type="password" name="confirmPassword" onChange={this.changeConfirmPassword}
                           placeholder="Repeat password" required/>
                </div>

                <div>

                    <div className="center-text">
                        <button type="button" name="button" className="btn-primary waves-effect waves-light btn"
                                onClick={this.sendDatas}>Change password
                        </button>
                    </div>

                </div>
            </>)
        } else if (this.state.show === 1) {
            return (<p>Password changed successfully. <a href="/login">Click here</a> to login</p>)
        } else if (this.state.show === 2) {
            return (<p>The passwords don't match.</p>)
        } else if (this.state.show === 3) {
            return (<p>An error has occurred. Please try again.</p>)
        }
    }

    /**
     * This page will feature a form that will be sent to the backend.
     * Depending on the backend response, it will feature different messages.
     */
    render() {
        return (
            <div id="wrapper" className="homepage img-homepage-headline main-img-background">
                <article>
                    <div id="content" className="container">
                        <div className="password-reset-box z-depth-2">
                            {this.showChange()}
                        </div>
                    </div>
                </article>
            </div>
        );
    }
}

export default ChangePassword;
