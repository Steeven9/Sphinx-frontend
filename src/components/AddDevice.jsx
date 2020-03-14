import React from 'react';
import '../App.css';

class AddDevice extends React.Component {

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
            <div className="addDevice">
                <div class="content-box">
                        <h2 class="title">Add device</h2>
                        <div class="dates"> 
                            <div class="dates-input"><input style={{width: 300 + 'px'}} type="text" name="" placeholder="Device type*"/></div>
                           <div class="dates-input"><input style={{width: 300 + 'px'}} type="text" name="" placeholder="Costum name*" /></div>
                           <div class="dates-input"><input style={{width: 300 + 'px'}} type="text" name="" placeholder="Room*" /></div>
                           <div class="dates-input"><input style={{width: 300 + 'px'}} type="text" name="" placeholder="couple with device" /></div>
                        </div>
                        <div class="dates">
                           <div class="dates-input"><button type="button" name="button" class="btn-secondary btn">Cancel</button></div>
                            <div class="dates-input"><button type="button" name="button" class="btn-primary btn">Save room</button></div>
                        </div>
                    </div>
            </div>
        );
    }
}


export default AddDevice;