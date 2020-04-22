import React from 'react';
import '../css/App.css';
import '../css/house.css';

class SceneToShare extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            guestUsername: props.guestUsername,
            scene: props.scene,
            editGuest: props.editGuest,
            guestScenes: props.guestScenes,
        }
    }

    componentDidMount() {
        this.editScene()
    }

    composeSceneHTML = () => {
        const { scene } = this.state;
        return <div id="1" class="collapsible-header">
                    <form id="devicesForm" class="device-form">
                        <div class="col col-collapsible l6 m6 s12">
                            <div class="col col-collapsible l12 s12 icons-wrapper">
                                <i class="material-icons l1"> </i>
                                <div class="icon-device l1"><img class="" src={scene.icon} alt="Device"/></div>
                                <div class="device-info col col-collapsible l12 m6 s12 left-align">
                                    <p class="device-name">{scene.name}</p>
                                </div>
                            </div>
                        </div>
                        <div class="device-control col col-collapsible l6 m6 s12">
                            <div class="col col-collapsible l8 m6 s8">{}</div>
                            <div>
                                <div class="col col-collapsible l4 device-control-switch">
                                    <div class="switch col col-collapsible l2 m8 s11 right-align">
                                        <div>
                                            <div class=""></div>
                                        </div>
                                    </div>
                                    <div class="col col-collapsible l2 m1 s1 right-align">
                                        {
                                            this.state.editGuest ?
                                            <label><input type="checkbox" id={scene.id} onClick={() => this.handleCheckboxSceneEditGuest()}/><span></span></label>
                                            :
                                            <label><input type="checkbox" id={scene.id} onClick={() => this.props.handleCheckboxScene()}/><span></span></label>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
    }

    handleCheckboxSceneEditGuest = () => {
        let checked = document.getElementById(this.state.scene.id).checked
        document.getElementById(this.state.scene.id).checked = (checked ? true : false)
        this.props.handleCheckboxScene(this.state.scene.id)
    }

    editScene = () => {
        if (this.state.editGuest && (this.state.guestScenes.indexOf(this.state.scene.id) !== -1)) {
            document.getElementById(this.state.scene.id).checked = true;
            this.props.handleCheckboxScene(this.state.scene.id)
        }
    }

    /**
     * Renders the scene
     */
    render() {
        return (
            <>
                {this.composeSceneHTML}
            </>
        );
    }
}


export default SceneToShare;