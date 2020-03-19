import React, {useEffect, useReducer} from 'react'
import DevicesContext from '../context/devices-context'
import devicesReducer from '../../reducers/devicesReducer'
import DeviceList from './DeviceList'

const DevicesPanel = () => {
    const [devices, dispatch] = useReducer(devicesReducer, []);

    useEffect(() => {
        const devices = JSON.parse(localStorage.getItem('devices'));

        if(devices) {
            dispatch({type: 'POPULATE_DEVICES', devices: devices})
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('devices', JSON.stringify(devices))
    }, [devices]);

    return(
        <DevicesContext.Provider value={{devices, dispatch}}>
            <div id="wrapper" className="devices">
                <main>
                    <article className="row row-collapsible row row-collapsible-custom">
                        <div id="content" className="">
                            <section className="content-box-collapsible z-depth-2">
                                <div className="headline-box row row-collapsible row row-collapsible-custom">
                                    <h3 className="col col-collapsible l8 left-align headline-title">My devices</h3>
                                    <a href="/#"><i className="col col-collapsible l1 btn waves-effect waves-light btn-primary-circular right material-icons">add</i></a>
                                </div>
                                <ul className="collapsible expandable expandable-component">
                                    <DeviceList />
                                </ul>
                            </section>
                        </div>
                    </article>
                </main>
            </div>
        </DevicesContext.Provider>
    )

};

export {DevicesPanel as default}
