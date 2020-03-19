import React from 'react';
import '../App.css';
import '../components/css/handleRoom.css';


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
                <div class="Handle-content-box2">
                        <h2 class="title">Modify Room</h2>
                        <div class="Handle-dates"> 
                            <div class="Handle-input"><input style={{width: 300 + 'px'}} type="text" name="" placeholder="Room name"/></div>
                           <div class="Handle-input"><input style={{width: 300 + 'px'}} type="number" name="" placeholder="Floor"/></div>
                           <div class="Handle-input"><input style={{width: 300 + 'px'}} type="text" name="" placeholder="Room type" /></div>
                        </div>
                        <div class="Handle-dates">
                           <div class="Handle-input mod-width"><button type="button" name="button" class="Handle-btn-secondary btn">Cancel</button></div>
                           <div class="Handle-input mod-width"><button type="button" name="button" class="Handle-btn-secondary btn">Delete Room</button></div>
                            <div class="Handle-input mod-width"><button type="button" name="button" class="Handle-btn-primary btn">Save Changes</button></div>
                        </div>
                    </div>
            </div>  
        );
    }
}


export default HandleRooms;