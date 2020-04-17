import React, {useContext} from 'react'
import ScenesContext from '../../context/scenesContext'
import PlayIcon from './PlayIcon'

/**
 * Scene factory that can create any type of scene
 * @param scene object
 * @returns { An individual scene's HTML composed of several React components }
 * @constructor
 */
const Scene = ({scene}) => {
    const {dispatch} = useContext(ScenesContext);

    const handleDuplicate = (e) => {
        e.preventDefault();
        dispatch({type: 'DUPLICATE_SCENE', scene: scene});
    };

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch({type: 'DELETE_SCENE', scene: scene});
    };

    return (
        <div className="scene row">
            <div id={scene.id} className="item">
                <div id={scene.id} className="scene-item col l1">
                    <PlayIcon scene={scene} />
                </div>
                <div className="scene-item col l1">
                    <img alt={scene.name} className="img-scene-icon"
                         src={scene.icon ? scene.icon : "/img/icons/scenes/icon-unknown.svg"}/>
                </div>
                <div className="scene-item col l7">
                    <span className="scene-item scene-item-name">{scene.name}</span>
                </div>
                <div className="scene-item col l1">
                    <a href={"/editScene?id=" + scene.id}><i className="scene-item material-icons btn-icon">edit</i></a>
                </div>
                <div className="scene-item col l1">
                    <i className="scene-item material-icons btn-icon btn-icon-duplicate"
                       onClick={(e) => handleDuplicate(e)}>file_copy</i>

                </div>
                <div className="scene-item col l1">
                    <i className="scene-item material-icons btn-icon"
                       onClick={(e) => handleDelete(e)}> highlight_off </i>
                </div>
            </div>
        </div>
    )
};

export {Scene as default}
