import React from 'react';
import '../App.css';

class Template extends React.Component {

    constructor(props) {
		super(props);
		this.state = {
			// placeholder
		}
	}

    /**
     * Template
     */
    render() {
        return (
            <main>
                <article>
                    <div id="content" className="container">
                        <section className="content-box z-depth-2">
                            <div className="row">
                                <h3 className="col center">Title</h3>
                                 {/*Remove the following button if needed */}
                                <a href="/#"><i className="col col-collapsible l1 btn waves-effect waves-light btn-primary-circular right material-icons">add</i></a>
                            </div>

                            <div>
                                {/* Substitute the next lines with the actual code we need */}
                                <p>The content goes here</p>
                                <p>more content</p>
                                <p>a bit more content.</p>
                            </div>

                            <div className="center">
                                <a href="/#" className="waves-effect waves-light btn btn-secondary col l5">Cancel</a>
                                <a href="/#" className="waves-effect waves-light btn btn-secondary col l5">Secondary action</a>
                                <a href="/#" className="waves-effect waves-light btn btn-primary col l5">Main action</a>
                            </div>
                        </section>
                    </div>
                </article>
            </main>
        );
    }
}

export default Template;
