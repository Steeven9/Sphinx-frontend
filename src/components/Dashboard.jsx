import React from 'react';
import '../css/App.css';
import DashboardMenu from './DashboardMenu';


class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            session_token: props.session_token
        }
    }

    /**
     * Renders the main dashboard
     */
    render() {
        return (
                <DashboardMenu />
        );
    }
}


export default Dashboard;