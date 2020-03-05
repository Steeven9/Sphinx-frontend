import React from 'react';
import '../App.css';

class Footer extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
			// placeholder
		}
	}

    render() {
        return (
            <footer className="page-footer">
                <div className="footer-copyright">
                    <span>&copy;2020 Sphinx Software</span>
                </div>
            </footer>
        );
    }
}

export default Footer;