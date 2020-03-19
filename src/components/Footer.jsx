import React from 'react';
import './css/App.css';

class Footer extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
			// placeholder
		}
	}

    /**
     * Returns the Footer for all pages. It has no special components.
     */
    render() {
        return (
            <footer className="page-footer">
                <div className="footer-copyright">
                    <span>&copy; 2020 Sphinx Software</span>
                </div>
            </footer>
        );
    }
}

export default Footer;