import React, {useEffect, useReducer} from 'react'
import ScenesContext from '../../context/scenesContext'
import scenesReducer from '../../reducers/scenesReducer'
import SceneList from './SceneList'
import '../../css/scenes.css';
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";


const params = (new URL(document.location)).searchParams;
const path = window.location.pathname.toLowerCase().split('/');
const scenesFetchUrl = 'http://localhost:8888/scenes';
const guestScenesFetchUrl = 'http://localhost:8888/guests/' + params.get('id') + '/scenes';
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
    const [actionCompleted, setActionCompleted] = React.useState(false);
    const [scenes, dispatch] = useReducer(scenesReducer, []);
    const ColorCircularProgress = withStyles({root: {color: '#580B71'},})(CircularProgress);

    // Controls if a guest is accessing this view
    if (path[1] === 'guest' && params.get('id')) {
        isGuest = true
    }

    // Fetches scenes on page load
    useEffect(() => {
        fetch(fetchUrl, {
            method: 'GET',
            headers: {
                'user': localStorage.getItem('username'),
                'session-token': localStorage.getItem('session_token')
            },
        })
            .then((res) => {
                if (res.status === 401) {
                    this.props.logOut(1);
                } else if (res.status === 200) {
                    return res.text();
                } else {
                    return null;
                }
            })
            .then((data) => {
                isLoading = false;

                if (data === null || data.length === 0) {
                    isDataFound = false;
                } else {
                    let scenes = JSON.parse(data).sort(function (a, b) {
                        let keyA = a.name;
                        let keyB = b.name;
                        if (keyA < keyB) return -1;
                        if (keyA > keyB) return 1;
                        return 0;
                    });
                    dispatch({type: 'POPULATE_SCENES', scenes: scenes});
                    isLoading = false;
                }
            })
            .catch(e => console.log(e));
        setActionCompleted(false)
    }, []);

    // Fetches scenes on state change, on Reducer's actions completion
    useEffect(() => {
        if (actionCompleted) {
            fetch(fetchUrl, {
                method: 'GET',
                headers: {
                    'user': localStorage.getItem('username'),
                    'session-token': localStorage.getItem('session_token')
                },
            })
                .then((res) => {
                    if (res.status === 401) {
                        this.props.logOut(1);
                    } else if (res.status === 200) {
                        return res.text();
                    } else {
                        return null;
                    }
                })
                .then((data) => {
                    isLoading = false;

                    if (data === null || data.length === 0) {
                        isDataFound = false;
                    } else {
                        let scenes = JSON.parse(data).sort(function (a, b) {
                            let keyA = a.name;
                            let keyB = b.name;
                            if (keyA < keyB) return -1;
                            if (keyA > keyB) return 1;
                            return 0;
                        });
                        dispatch({type: 'POPULATE_SCENES', scenes: scenes});
                        isLoading = false;
                    }
                })
                .catch(e => console.log(e));
            setActionCompleted(false)
        }
    }, [actionCompleted]);


    return (
        <ScenesContext.Provider value={{scenes, dispatch, isGuest, setActionCompleted}}>
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
                                <ul>
                                    <li className="scenes-panel row">
                                        <SceneList/>
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

export {ScenesPanel as default}
