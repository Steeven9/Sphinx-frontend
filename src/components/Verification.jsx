import React from 'react';
import '../css/App.css';
import * as qs from 'query-string';

class Verification extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: 0, // If 0, the page will send the code to the backend. If 1, display "account verified". If 2, display "incorrect code". If 3, display error message
            username: "",
            code: ""
        }
    }

    /**
     * Parses the URL and fetches a request to /auth/verify with what has been parsed
     * Displays a message if successful or not response
     */
    componentDidMount() {
        const parsed = qs.parse(window.location.search);

        if (!Object.keys(parsed).includes("code") || !Object.keys(parsed).includes("email")) { 
            this.setState({ show: 2 });
            return;
        }
        fetch('http://localhost:8080/auth/verify/' + parsed.email, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: parsed.code
        })
        .then( (res) => res.status === 200 ? this.setState({ show: 1 }) : this.setState({ show: 2 }) )
        .catch( (error) => this.setState({ show: 3 }) )
    }

    /**
     * Depending on the value of this.state.show, returns either the form to fill, or the result of the authentication.
     */
    showValidation = () => {
        if (this.state.show === 1) {
            return (<p>Account verified. <a href="/login">Click here</a> to log in</p>)
        }
        else if (this.state.show === 2) {
            return (<p>The code is invalid, the username doesn't exist, or the account has already been verified.</p>)
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
            <article>
                <div id="content" className="container">
                    <div className="content-box1 content-box z-depth-2">
                        {this.showValidation()}
                    </div>
                </div>
            </article>
        );
    }
}

export default Verification;
