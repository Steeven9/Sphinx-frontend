import React, {useEffect, useReducer} from 'react'
import ScenesContext from '../../context/scenesContext'
import scenesReducer from '../../reducers/scenesReducer'
import SceneList from './SceneList'
import '../../css/scenes.css';
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";


const params = (new URL(document.location)).searchParams;
const path = window.location.pathname.toLowerCase().split('/');
const host = window.location.protocol + '//' + window.location.hostname + ':8080';
const scenesFetchUrl = host + '/scenes';
const guestScenesFetchUrl = host + '/guests/' + params.get('id') + '/scenes';
const fetchUrl = path[1] === 'guest' && +params.get('id') ? guestScenesFetchUrl : scenesFetchUrl;
let isLoading = true;
let isDataFound = true;
let isGuest = false;
let title = "";

const SceneFactory = () => {
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
                    isLoading = false;
                    dispatch({type: 'POPULATE_SCENES', scenes: scenes});
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
                    isLoading = false;
                    dispatch({type: 'POPULATE_SCENES', scenes: scenes});
                }
            })
            .catch(e => console.log(e));
            setActionCompleted(false)
        }
    }, [actionCompleted]);

    return (
        <div className="container row">
                    <div className="item l12 container-box z-depth-2">

                    </div>

                    <div className="item l12">
                        <span className="bold">Step 1: </span> <span>Set your scene configuration</span>
                    </div>
                    <div className="item l12 container-box z-depth-2">
        </div>
                </div>
    )
};

export {SceneFactory as default}
