import React from 'react';
import '../css/App.css';
import * as qs from 'query-string';
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";

const ColorCircularProgress = withStyles({root: {color: '#580B71'},})(CircularProgress);

class ChangePassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: 0, // If 0, the page will have a form. If 1, display "password changed". If 2, display error message
            password: "",
            confirmPassword: "",
            isLoading: false,
            incomplete: false,
            mismatch: false,
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", (evt) => {
            if (evt.key === 'Enter') this.sendDatas(evt)
        });
    }

    /**
     * Sends the code and the username given in the form to the backend to check it.
     * Depending on the backend response, it will change the "success" and "toSend" variable values.
     */
    sendDatas = (event) => {
        event.preventDefault();
        const parsed = qs.parse(window.location.search);

        if (this.state.password === "" || this.state.confirmPassword === "") {
            this.setState({mismatch: false, incomplete: true});
            return;
        }
        if (this.state.password !== this.state.confirmPassword) {
            this.setState({mismatch: true, incomplete: false});
            return;
        }

        if (!Object.keys(parsed).includes("code") || !Object.keys(parsed).includes("email")) {
            this.setState({show: 3});
            return;
        }
        this.setState({isLoading: true})
        fetch('http://localhost:8080/auth/reset/' + parsed.email + '/' + parsed.code, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: this.state.password
        })
        .then((res) => {
            this.setState({isLoading: false})
            res.status === 204 ? this.setState({show: 1}) : this.setState({show: 3})
        })
        .catch((error) => {
            this.setState({isLoading: false})
            this.setState({show: 3})
        })
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

    showIncomplete = (event) => {
        if (this.state.incomplete) {
            return (<p>Please insert both passwords</p>)
        }
        else if (this.state.mismatch) {
            return (<p>The passwords don't match.</p>)
        }
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

                {this.showIncomplete()}

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
            return (<p>The code is invalid or the user doesn't exit. Please, <a href="/reset">request a new link</a>.</p>)
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
                            <span>
                                <ColorCircularProgress className={this.state.isLoading ? "loading-spinner" : "hidden"}/>
                            </span>
                            {this.showChange()}
                        </div>
                    </div>
                </article>
            </div>
        );
    }
}

export default ChangePassword;
