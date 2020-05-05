import React, {useEffect, useState} from 'react'
import DevicesPanel from '../devices/DevicesPanel'
import ScenesPanel from '../scenes/ScenesPanel'
import {useHistory} from 'react-router';
import queryString from 'query-string'

/**
 * Returns the shared with me view
 * @returns {*}
 * @constructor
 */
const SharedWithGuests = () => {
    const [activePanel, setActivePanel] = useState("0")
    const history = useHistory()

    /**
     * Manages the changes of the views according to the query strings.
     * Avoids page reload, and thus, re fetching.
     */
    useEffect(() => {
        return history.listen((location) => {
            const values = queryString.parse(location.search)

            if (values.view === "0") { //DevicesPanel
                setActivePanel("0")
            } else if (values.view === "1") { //ScenesPanel
                setActivePanel("1")
            }
        })
    }, [history])

    console.log('re render')

    return (
        <>
            <div className={activePanel === "0" ? undefined : "display-none"}>
                <DevicesPanel/>
            </div>

            <div className={activePanel === "1" ? undefined : "display-none"}>
                <ScenesPanel/>
            </div>
        </>
    )
};

export {SharedWithGuests as default}
