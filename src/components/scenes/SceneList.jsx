import React, {useContext} from 'react'
import Scene from './Scene'
import ScenesContext from '../../context/scenesContext'


/**
 * Generates a list of nested scenes
 * @returns {SceneList}
 */
const SceneList = () => {

    const {scenes} = useContext(ScenesContext);

    return scenes.map((scene) => (
        <Scene key={scene.id} scene={scene}/>
    ))
};

export {SceneList as default}
