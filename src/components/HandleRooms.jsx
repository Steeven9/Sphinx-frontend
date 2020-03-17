import React from 'react';
import '../App.css';

class HandleRooms extends React.Component {

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
            <div className="handleRooms">
                <div class="content-box2">
                        <h2 class="title">Modify Room</h2>
                        <div class="dates"> 
                            <div class="dates-input"><input style={{width: 300 + 'px'}} type="text" name="" placeholder="Room name"/></div>
                           <div class="dates-input"><input style={{width: 300 + 'px'}} type="number" name="" placeholder="floor"/></div>
                           <div class="dates-input"><input style={{width: 300 + 'px'}} type="text" name="" placeholder="Room type" /></div>
                        </div>
                        <div class="dates">
                           <div class="dates-input mod-width"><button type="button" name="button" class="btn-secondary btn">Cancel</button></div>
                           <div class="dates-input mod-width"><button type="button" name="button" class="btn-secondary btn">Delete Room</button></div>
                            <div class="dates-input mod-width"><button type="button" name="button" class="btn-primary btn">Save Changes</button></div>
                        </div>
                    </div>
            </div>  
        );
    }
}


export default HandleRooms;