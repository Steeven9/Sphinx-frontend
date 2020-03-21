import React from 'react';
import '../App.css';

class Verification extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: 0, // If 0, the page will have a form. If 1, display "account verified". If 2, display "incorrect code". If 3, display error message
            username: "",
            code: ""
        }
    }

    /**
     * Sends the code and the username given in the form to the backend to check it.
     * Depending on the backend response, it will change the "success" and "toSend" variable values.
     */
    sendDatas = (event) => {
        event.preventDefault();
        fetch('http://localhost:8080/auth/verify', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: { username: this.state.username, verificationToken: this.state.code }
        })
        .then( (res) => res.status === 200 ? this.setState({ show: 1 }) : this.setState({ show: 2 }) )
        .catch( (error) => this.setState({ show: 3 }) )
    }

    /**
     * Every time that the text inside the input changes, this.state.username gets changed.
     */
    changeCode = (event) => {
        this.setState({ username: event.target.value });
    }

    /**
     * Every time that the text inside the input changes, this.state.code gets changed.
     */
    changeCode = (event) => {
        this.setState({ code: event.target.value });
    }

    /**
     * Depending on the value of show, returns either the form to fill, or the result of the authentication.
     */
    showValidation = () => {
        if (this.state.show === 0) {
            return (<form onSubmit={this.sendDatas}>
                <div className="dates">
                    <div className="dates-input"><input type="text" name="username" onChange={this.changeUsername} placeholder="Username" required /></div>
                    <div className="dates-input"><input type="text" name="validation-code" onChange={this.changeCode} placeholder="Validation Code" required /></div>
                    <p><input type="submit" className="waves-effect waves-light btn btn-primary col l5" /></p>
                </div>
            </form>)
        }
        else if (this.state.show === 1) {
            return (<p>Account verified</p>)
        }
        else if (this.state.show === 2) {
            return (<p>The code {this.state.code} is invalid</p>)
        }
        else if (this.state.show === 3) {
            return (<p>An error has occurred. Please try again.</p>)
        }
    }

    /**
     * This page will feature a form that will be sent to the backend.
     * Depending on the backend response, it will feature different messages.
     */
    render() {
        return (
            <main>
                <article>
                    <div id="content" className="container">
                        <section className="content-box z-depth-2">
                            <div className="row">
                                <h3 className="col center">Verify Account</h3>
                            </div>

                            <div className="center">
                                {this.showValidation()}
                            </div>
                        </section>
                    </div>
                </article>
            </main>
        );
    }
}

export default Verification;