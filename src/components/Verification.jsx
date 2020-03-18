import React from 'react';
import '../App.css';

class Verification extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            toSend: true, // If true, the page will have a form. If false, it will check "success"
            success: false, // If false, display error. If true, display a different message
            code: ""
        }
    }

    sendCode = (event) => {
        this.setState({ toSend: false });
    }

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
                            { this.state.toSend ?
                                <form onSubmit={this.sendCode}>
                                        <p>Insert Validation Code:</p> 
                                        <input type="text" name="validation-code" onChange={this.changeCode} />
                                        <input type="submit" className="waves-effect waves-light btn btn-primary col l5" />
                                </form>

                                : 
                                
                                <div>
                                    { this.state.success ? 
                                        <p>Account verified</p>
                                        :
                                        <p>The code {this.state.code} is invalid</p>
                                    }
                                </div>
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