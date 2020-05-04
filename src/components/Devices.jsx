import React, {useState} from 'react';
import '../css/App.css';
import DevicesPanel from './devices/DevicesPanel';
import GuestsContext from "../context/guestsContext";


/**
 * Placeholder page for the whole devices dashboard components pages
 */
/**
 * Placeholder page for the whole devices dashboard components pages
 * @returns {*}
 * @constructor
 */
const Devices = () => {
    //Mode: 0=devices, 1=scenes
    const [view, setView] = useState(0)

    return (
        <GuestsContext.Provider value={{view, setView}}>
            <DevicesPanel/>
        </GuestsContext.Provider>
    )
};

export {Devices as default}

