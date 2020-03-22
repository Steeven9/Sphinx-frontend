import React from 'react';
import '../App.css';

class LogOut extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
			// placeholder
		}
    }
    
    componentDidMount() {
        this.props.logOut();
    }

    /**
     * Logging Out page, nothing special
     */
    render() {
        return (
            <>
            </>
        );
    }
}

export default LogOut;
