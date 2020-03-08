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
            <div className="login" >
                <section className="content-box sample-box z-depth-2">
                <div>
                    <div>
                        <h2 className="center">Restore password</h2>
                    </div>
                    <br/>
                    <div className=" instructions center">
                        Type the email address registered to your account. If we find it in our records, you’ll receive the instructionsto restore your password.
                    </div>
                    <br/> 
                    <div className='flex-column center'>
                        <input type="text" placeholder="E-mail" />
                    </div>
                </div>
                <br/>
                <br/> <br/>
                <div>
                    <div className="flex-raw">
                        <a href="/login"><b>cancel</b></a>
                        <form action="/login" method="POST">
                            <button className="login-btn">
                               <b>Reset</b> 
                            </button>
                        </form>
                    </div>
                </div>
                </section>
            </div>
        );
    }
}


export default ResetPassword;