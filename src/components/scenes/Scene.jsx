import React, {useState, useContext, useEffect} from 'react'
import ScenesContext from '../../context/scenesContext'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

/**
 * Scene factory that can create any type of scene
 * @param scene object
 * @returns { An individual scene's HTML composed of several React components }
 * @constructor
 */
const Scene = ({scene}) => {
    const {scenes, dispatch, isRoom} = useContext(ScenesContext);

    /**
     * Assigns classes to parent or child scene's header
     * @param scene
     * @returns {string}
     */
    function getSceneHeader(scene) {
        if (scene.switches !== null) {
            return "scene-header scene-parent";
        } else if (scene.child === true) {
            return "scene-header scene-child";
        }
        return "scene-header"
    }

    /**
     * Calls the edit scene page with the corresponding scene ID
     * @param id {int}
     */
    function redirectToEdit(id) {
        window.location.href = '/editScene?id=' + id
    }


    /**
     * Generates a modal to play the security cam video
     * @returns {AlertDialog}
     **/
    function AlertDialog() {
        // let video = 'https://res.cloudinary.com/erickgarro/video/upload/v1586203233/SmartHut/video-cabin.mp4'
        // return (
        //     <div>
        //         <Dialog
        //             open={open}
        //             onClose={handleClose}
        //             aria-labelledby="alert-dialog-title"
        //             aria-describedby="alert-dialog-description"
        //         >
        //             <h2 className="center-text">{scene.roomName}: {scene.name}</h2>
        //             <DialogContent>
        //                 <DialogContentText id="alert-dialog-description">
        //                     <CardMedia
        //                         component="video"
        //                         image={video}
        //                         autoPlay="true"
        //                         loop="true"
        //                     />
        //                 </DialogContentText>
        //             </DialogContent>
        //             <DialogActions>
        //                 <button type="button" name="button" className="btn-secondary btn waves-effect waves-light" onClick={handleClose}>Close</button>
        //             </DialogActions>
        //         </Dialog>
        //     </div>
        // );
    }

    return (
        <div id={scene.id} className={getSceneHeader(scene)}>
            {/*<form id="scenesForm" className="scene-form">*/}
            {/*    <div className="col col-scene l6 m6 s12">*/}
            {/*        <div className="col col-scene l12 s12 icons-wrapper">*/}
            {/*            <i className={"material-icons l1" + (scene.child ? " muted-icon" : "")}>{getRowIcon(scene)} </i>*/}
            {/*            <div className="icon-scene l1">*/}
            {/*                <img className="" src={getSceneIcon(scene.type)} alt={scene.name}/>*/}
            {/*            </div>*/}
            {/*            <div className="scene-info col col-scene l12 m6 s12 left-align">*/}
            {/*                <p className="scene-name">{scene.name}</p>*/}
            {/*                {!scene.child && !isRoom && <p className="scene-location">{scene.roomName}</p>}*/}
            {/*                <p className="scene-type-name">{getSceneTypeName(scene.type)}</p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className="scene-control col col-scene l6 m6 s12">*/}
            {/*        <div className="col col-scene l8 m6 s8">*/}
            {/*            {getSliderOrDisplayOrSmartPlug(scene)}*/}
            {/*        </div>*/}
            {/*        <div>*/}
            {/*            {getPowerSwitch(scene)}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</form>*/}
        </div>
    )
};

export {Scene as default}
