import React from 'react';
import '../App.css';

class Signup extends React.Component {

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
            <div className="login" >
                <section className="content-box sample-box z-depth-2">
                <div>
                    <div>
                        <h2 className="center"> Create account </h2>
                    </div>
                    <br/>
                    <div className="flex-raw">
                        <input type="text" placeholder="First name*" />
                        <input type="text" placeholder="Last name*" />
                    </div>
                    <div className="flex-raw">
                        <input type="email" placeholder="Email*"/>
                        <input type="text" placeholder="Username*"/>    
                    </div>
                    <div className="flex-raw">
                        <input type="password" placeholder="Password*"/>
                        <input type="password" placeholder="Confirm password*"/>
                    </div>
                </div>
                
                <br/> <br/>
                <div>
                    <div className="flex-raw">
                        <a href="/login"><b>Login</b></a>
                        <form action="/create" method="POST">
                            <button className="login-btn">
                                <b>Create</b>
                            </button>
                        </form>
                    </div>
                </div>
                </section>
            </div>
        );
    }
}


export default Signup;