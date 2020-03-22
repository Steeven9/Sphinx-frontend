import React from 'react';
import '../App.css';
import Homepage from './Homepage';

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
            <Homepage />
        );
    }
}

export default LogOut;
