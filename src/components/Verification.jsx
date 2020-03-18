import React from 'react';
import '../App.css';

class Verification extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: 0, // If 0, the page will have a form. If 1, display error. If 2, display a different message
            code: ""
        }
    }

    /**
     * Sends the code given in the form to the backend to check it.
     * Depending on the backend response, it will change the "success" and "toSend" variable values.
     */
    sendCode = () => {
        this.setState({ show: 1 });
    }

    /**
     * Every time that the text inside the input changes, this.state.code gets changed.
     */
    changeCode = (event) => {
        this.setState({ code: event.target.value });
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
                            { 
                            this.state.show === 0 && (
                                <form onSubmit={this.sendCode}>
                                        <p>Insert Validation Code:</p> 
                                        <input type="text" name="validation-code" onChange={this.changeCode} />
                                        <input type="submit" className="waves-effect waves-light btn btn-primary col l5" />
                                </form>
                            )
                            }
                            {
                            this.state.show === 1 && (
                                <p>The code {this.state.code} is invalid</p>
                            )
                            }
                            {
                            this.state.show === 2 && (
                                <p>Account verified</p>
                            )
                            }
                            </div>
                        </section>
                    </div>
                </article>
            </main>
        );
    }
}

export default Verification;