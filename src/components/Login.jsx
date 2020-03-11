import React from 'react';
import '../App.css';

class Login extends React.Component {

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
                        <h2 className="center">Log in</h2>
                    </div>
                    <br/>
                    <div className='flex-column center'>
                        <input type="text" placeholder="Username" />
                        <br/>
                        <input type="password" placeholder="Password" />
                    </div>
                </div>
                <br/>
                <div className="center">
                    <a href="/reset"><i>Forgot your password?</i></a>
                </div>
                <br/> <br/>
                <div>
                    <div className="flex-raw">
                        <a href="/signup"><b>Create account</b></a>
                        <form action="/login" method="POST">
                            <button  className="login-btn">
                               <b>Log in</b> 
                            </button>
                        </form>
                    </div>
                </div>
                </section>
            </div>
        );
    }
}


export default Login;