import React, {useState, useContext, useEffect} from 'react'
import ScenesContext from '../../context/scenesContext'

/**
 * Scene factory that can create any type of scene
 * @param scene object
 * @returns { An individual scene's HTML composed of several React components }
 * @constructor
 */
const Scene = ({scene}) => {
    const {scenes, dispatch, isGuest} = useContext(ScenesContext);
    const [playing, setPlaying] = React.useState(false);

    const handlePlay = (e) => {
        setPlaying(!playing);
    };

    const handleDuplicate = (e) => {
        console.log('Duplicated this')
    };

    const handleDelete = (e) => {
        console.log('Delete this')
    };

    return (
        <div id={scene.id}>
            <div className="item">
                <div className="scene-item col l1">
                    <img alt="scene play button" className="scene-item material-icons btn-icon-play"
                         src="/img/icons/material-ui-svg/PlayCircleOutlined.svg"
                    onClick={(e) => handlePlay(e)}/>
                    <img alt="scene play circle 1"
                         className={!playing ? "hidden" : "scene-item material-icons btn-icon-rotate-clockwise-over-1 btn-icon-rotate-clockwise-1"}
                         src="/img/icons/material-ui-svg/PlayCircleOutline1.svg"/>
                    <img alt="scene play circle 2"
                         className={!playing ? "hidden" : "scene-item material-icons btn-icon-rotate-clockwise-over-2 btn-icon-rotate-clockwise-2"}
                         src="/img/icons/material-ui-svg/PlayCircleOutline2.svg"/>
                    <img alt="scene play circle 3"
                         className={!playing ? "hidden" : "scene-item material-icons btn-icon-rotate-clockwise-over-3 btn-icon-rotate-clockwise-3"}
                         src="/img/icons/material-ui-svg/PlayCircleOutline3.svg"/>
                    <img alt="scene play circle 4"
                         className={!playing ? "hidden" : "scene-item material-icons btn-icon-rotate-clockwise-over-4 btn-icon-rotate-clockwise-4"}
                         src="/img/icons/material-ui-svg/PlayCircleOutline4.svg"/>
                </div>
                <div className="scene-item col l1">
                    {/*<img alt="Scene" className="img-scene-icon" src="/img/icons/scenes/icon-sunset.svg"/>*/}
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
                    <i className="scene-item material-icons btn-icon" onClick={(e) => handleDelete(e)}> highlight_off </i>
                </div>
            </div>
        </div>
    )
};

export {Scene as default}
