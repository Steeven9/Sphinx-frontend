import React, {useEffect, useState} from 'react'
import DevicesPanel from '../devices/DevicesPanel'
import ScenesPanel from '../scenes/ScenesPanel'
import SharedWithGuestsContext from "../../context/guestsContext";

/**
 * Returns the shared with me view
 * @returns {*}
 * @constructor
 */

const SharedWithGuests = () => {
    //Mode: 0=devices, 1=scenes
    const [view, setView] = useState(0)

    // Manages the active view
    useEffect(() => {
        if (view === 0) {
            setView(<DevicesPanel/>)
        } else if (view === 1) {
            setView(<ScenesPanel/>)
        }
        // setView(<DevicesPanel/>)
    }, [view]);

    return (
        <SharedWithGuestsContext.Provider value={{setView}}>
            {view}
        </SharedWithGuestsContext.Provider>
    )
};

export {SharedWithGuests as default}
