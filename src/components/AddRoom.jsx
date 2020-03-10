import React from 'react';
import '../App.css';

class AddRoom extends React.Component {

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
            // <body>            
                <div className="addRoom">
                    <div class="content-box">
                        <h2 class="title">Add room</h2>
                        <div class="dates"> 
                            <div class="dates-input"><input style={{width: 300 + 'px'}} type="text" name="" placeholder="Room Name*"/></div>
                           <div class="dates-input"><input style={{width: 300 + 'px'}} type="text" name="" placeholder="Room Type*" /></div>
                           <div class="dates-input"><input style={{width: 300 + 'px'}} type="number" name="" placeholder="Floor*" /></div>
                        </div>
                        <div class="dates">
                           <div class="dates-input"><button type="button" name="button" class="btn-secondary btn">Cancel</button></div>
                            <div class="dates-input"><button type="button" name="button" class="btn-primary btn">Save room</button></div>
                        </div>
                    </div>
                </div>
            // </body>

        );
    }
}


export default AddRoom;