import React from 'react';
import '../css/App.css';

class LogOut extends React.Component {
    
    componentDidMount() {
        this.props.logOut(0);
    }

    /**
     * Empty page, only used for a better and faster implementation/fix of the logout
     */
    render() {
        return (
            <></>
        );
    }
}

export default LogOut;
