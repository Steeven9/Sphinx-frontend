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
            <div className="addRoom">
                <div className="content-box">
                    <h2 className="title">Add room</h2>
                    <div className="dates">
                        <div className="dates-input"><input style={{ width: 300 + 'px' }} type="text" name="" placeholder="Room Name" /></div>
                        <div className="Handle-input"> 
                            <select className="selector">
                                <option value="">Room type</option>
                                <option value="">Attic</option>
                                <option value="">Backyard</option>
                                <option value="">Basement</option>
                                <option value="">Bathroom</option>
                                <option value="">Bedroom</option>
                                <option value="">Dining room</option>
                                <option value="">Garage</option>
                                <option value="">Generic room</option>
                                <option value="">Hallway</option>
                                <option value="">House front</option>
                                <option value="">Living room</option>
                                <option value="">Office</option>
                            </select>
                        </div>
                    </div>
                    <div className="dates">
                        <div className="dates-input"><button type="button" name="button" className="btn-secondary btn">Cancel</button></div>
                        <div className="dates-input"><button type="button" name="button" className="btn-primary btn">Save room</button></div>
                    </div>
                </div>
            </div>

        );
    }
}


export default AddRoom;