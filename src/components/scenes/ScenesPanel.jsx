import React, {useEffect, useReducer} from 'react'
import ScenesContext from '../../context/scenesContext'
import scenesReducer from '../../reducers/scenesReducer'
import SceneList from './SceneList'
import '../../css/scenes.css';
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";


const params = (new URL(document.location)).searchParams;
const path = window.location.pathname.toLowerCase().split('/');
const scenesFetchUrl = 'http://localhost:8080/scenes/';
const guestScenesFetchUrl = 'http://localhost:8080/guests/' + params.get('id') + '/scenes/';
const fetchUrl = path[1] === 'guest' && +params.get('id') ? guestScenesFetchUrl : scenesFetchUrl;
let isLoading = true;
let isDataFound = true;
let isGuest = false;
let title = "";

/**
 * Generates a panel with a ScenesPanel
 * @returns {ScenesPanel}
 */
const ScenesPanel = () => {
    const [scenes, dispatch] = useReducer(scenesReducer, []);
    const ColorCircularProgress = withStyles({root: {color: '#580B71'},})(CircularProgress);

    if (path[1] === 'guest' && params.get('id')) {
        isGuest = true
    }

    // Fetches scenes on page load
    useEffect(() => {

        // if (isGuest) {
        //     let fetchGuestUrl = 'http://localhost:8080/guests/' + params.get('id');
        //     fetch(fetchGuestUrl, {
        //         method: 'GET',
        //         headers: {
        //             'user': localStorage.getItem('username'),
        //             'session-token': localStorage.getItem('session_token')
        //         },
        //     })
        //         .then((res) => {
        //             if (res.status === 401) {
        //                 this.props.logOut(1);
        //             } else if (res.status === 200) {
        //                 return res.text();
        //             } else {
        //                 return null;
        //             }
        //         })
        //         .then((data) => {
        //             let guest = JSON.parse(data);
        //             title = guest.name;
        //         })
        //         .catch(e => console.log(e));
        // }

        // fetch(fetchUrl, {
        //     method: 'GET',
        //     headers: {
        //         'user': localStorage.getItem('username'),
        //         'session-token': localStorage.getItem('session_token')
        //     },
        // })
        //     .then((res) => {
        //         if (res.status === 401) {
        //             this.props.logOut(1);
        //         } else if (res.status === 200) {
        //             return res.text();
        //         } else {
        //             return null;
        //         }
        //     })
        //     .then((data) => {
        //         let scenes = sortScenes(JSON.parse(data));
        //         isLoading = false;
        //
        //         if (data === null || scenes.length === 0) {
        //             isDataFound = false;
        //         }
        //         dispatch({type: 'POPULATE_DEVICES', scenes: scenes});
        //     })
        //     .catch(e => console.log(e));

    }, []);

    // Extracts scenes from next state
    useEffect(() => {
        console.log('Scenes were updated')
    }, [scenes]);

    // try {
    //     scenes.sort(function (a, b) {
    //         let keyA = a.name;
    //         let keyB = b.name;
    //         if (keyA < keyB) return -1;
    //         if (keyA > keyB) return 1;
    //         return 0;
    //     });
    // } catch (e) {
    //     throw e;
    // }

    return (
        <ScenesContext.Provider value={{scenes, dispatch, isGuest, myScenes}}>
            <div id="wrapper" className="scenes">
                <div className="container">
                    <article className="row row-scene row-scene-custom">
                        <div id="content">
                            <section
                                className="scene-content-box z-depth-2">
                                <div className="headline-box row row-custom">
                                    <h2 className="col col-scene l8 left-align headline-title">{(isGuest) ? title : "My Scenes"}</h2>
                                    <a href="/addScene"><i
                                        className="col col-scene l1 btn waves-effect waves-light btn-primary-circular right material-icons">add</i></a>
                                </div>
                                <div className={(isLoading) ? "centered-loading-data-message" : "hidden"}>
                                    <ColorCircularProgress/>
                                </div>
                                <div className={(!isDataFound) ? "centered-loading-data-message" : "hidden"}>
                                    <p>You haven't added any scenes yet. Please add a new one.</p>
                                </div>
                                <ul className="scene">
                                    <li className="row">
                                        <div className="row">
                                            <div className="col l1">
                                                <a href="/addRoom"><i className="waves-effect waves-light material-icons">play_circle_filled_outline</i></a>
                                            </div>
                                            <div className="col l1">
                                                <img alt="Scene" className="dashboard-nav-img" src="/img/icons/scenes/sunset"/>
                                            </div>
                                            <div className="col l7">
                                                name
                                            </div>
                                            <div className="col l1">
                                                <a href="/addRoom"><i className="waves-effect waves-light material-icons">edit</i></a>
                                            </div>
                                            <div className="col l1">
                                                <a href="/addRoom"><i className="waves-effect waves-light material-icons">file_copy</i></a>

                                            </div>
                                            <div className="col l1">
                                                <a href="/addRoom"><i className="waves-effect waves-light material-icons">highlight_off</i></a>
                                            </div>
                                        </div>
                                        {/*<SceneList />*/}
                                    </li>
                                </ul>
                            </section>
                        </div>
                    </article>
                </div>
            </div>
        </ScenesContext.Provider>
    )
};

function sortScenes(scenes) {
    try {
        return scenes.sort(function (a, b) {
            let keyA = a.name;
            let keyB = b.name;
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });
    } catch (e) {
        throw e;
    }
}

// Temporary mock scenes
const myScenes = [
    {
        name: 'Sunset',
        effects: [
            {
                type: 1,
                name: 'Light intensity',
                value: 30,
                devices: [1]
            }
        ],
        shared: true
    }
];

export {ScenesPanel as default}
