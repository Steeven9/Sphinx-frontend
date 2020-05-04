import React, {useState} from 'react';
import '../css/App.css';
import ScenesPanel from './scenes/ScenesPanel';
import GuestsContext from "../context/guestsContext";


/**
 * Placeholder page for the scenes dashboard components pages
 */
const Scenes = () => {
    //Mode: 0=devices, 1=scenes
    const [view, setView] = useState(0)

    return (
        <GuestsContext.Provider value={{view, setView}}>
            <ScenesPanel/>
        </GuestsContext.Provider>
    );
}

export default Scenes;
