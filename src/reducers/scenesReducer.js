/**
 * This reducer controls the actions triggered by the events
 * handled by the scene components and its children
 * @param state
 * @param action
 * @returns {state[]}
 */

const scenesReducer = (state, action) => {
    const host = window.location.protocol + '//' + window.location.hostname + ':8888';
    // const params = (new URL(document.location)).searchParams;
    // const path = window.location.pathname.toLowerCase().split('/');
    // const sharedScenesFetchUrl = host + '/scenes?id=' + params.get('id');
    // let body = {};
    let scenesFetchUrl = '';
    let fetchUrl = '';

    const headers = {
        'user': localStorage.getItem('username'),
        'session-token': localStorage.getItem('session_token'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    switch (action.type) {
        case 'POPULATE_SCENES':
            console.log('Dispatch: POPULATE_SCENES');
            return action.scenes;

        case 'REFRESH_SCENES':
            console.log('Dispatch: REFRESH_SCENES');
            scenesFetchUrl = host + '/scenes';
            // fetchUrl = path[1] === 'shared' && params.get('id') ? sharedScenesFetchUrl : scenesFetchUrl;
            fetchUrl = scenesFetchUrl;

            fetch(fetchUrl, {
                method: 'GET',
                headers: headers,
            })
                .then((res) => {
                    if (res.status === 200) {
                        return res.text();
                    } else {
                        return null;
                    }
                })
                .then((data) => {
                    let response = JSON.parse(data);
                    state = response
                })
                .catch(e => console.log(e));
            return state;

        case 'RUN_SCENE':
            console.log('Dispatch: RUN_SCENE');
            scenesFetchUrl = host + '/scenes';

            fetch(scenesFetchUrl + '/run/' + action.scene.id, {
                method: 'PUT',
                headers: headers
            })
                .then(res => {
                    action.setPlaying(false);
                    action.setResultTriggered(true);

                    if (res.status === 200) {
                        action.setSuccess(true);
                    } else {
                        action.setSuccess(false);
                    }
                })
                .catch(e => console.log(e));
            return state;

        case 'DUPLICATE_SCENE':
            console.log('Dispatch: DUPLICATE_SCENE');
            let copyCount = 1;

            for (let scene of state) {
                let sceneName = scene.name.split(' ');
                let sceneCopyNumber = 0;

                if (sceneName.length > 3 && sceneName[0] === 'Copy' && sceneName[1] === 'of') {
                    sceneName.splice(0, 2);
                    sceneCopyNumber = parseInt(sceneName[sceneName.length - 1])
                }
                sceneName.pop();
                sceneName = sceneName.join(' ');

                if (sceneName === action.scene.name) {
                    if (copyCount === sceneCopyNumber) {
                        copyCount++;
                    }
                }
            }

            let duplicatedScene = {
                name: 'Copy of ' + action.scene.name + ' ' + copyCount,
                id: Math.random(),
                icon: action.scene.icon,
                shared: action.scene.shared,
                effects: action.scene.effects
            };
            return [duplicatedScene, ...state];

        case 'DELETE_SCENE':
            console.log('Dispatch: DELETE_SCENE');
            scenesFetchUrl = host + '/scenes';

            state = state.filter((s) => s.id !== action.scene.id);

            fetch(scenesFetchUrl + '/' + action.scene.id, {
                method: 'DELETE',
                headers: headers
            })
                .then(res => {
                    if (res.status === 200) {
                        console.log('Scene deleted form DB')
                    }
                })
                .catch(e => console.log(e));
            return state;

        case 'MODIFY_SCENE':
            console.log('Dispatch: MODIFY_SCENE');
            // const params = (new URL(document.location)).searchParams;
            // const path = window.location.pathname.toLowerCase().split('/');
            // const scenesFetchUrl = 'http://localhost:8888/scenes/';
            // const roomScenesFetchUrl = 'http://localhost:8888/rooms/' + params.get('id') + '/scenes';
            // let fetchUrl = path[1] === 'room' && params.get('id') ? roomScenesFetchUrl : scenesFetchUrl;
            // let body;
            //
            //     if(action.scene.slider !== undefined) {
            //         body = {
            //             slider: action.scene.slider,
            //             on: action.scene.on
            //         }
            //     } else {
            //         body = {
            //             on: action.scene.on
            //         }
            //     }
            //
            //     let headers = {
            //         'user': localStorage.getItem('username'),
            //         'session-token': localStorage.getItem('session_token'),
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //     };
            //
            //     fetchUrl = fetchUrl + action.scene.id;
            //
            //     fetch(scenesFetchUrl, {
            //     method: 'PUT',
            //     headers: headers,
            //     body: JSON.stringify(body)
            // })
            //     .then(res => {
            //         if (res.status === 200){
            //             fetch(fetchUrl, {
            //                 method: 'GET',
            //                 headers: headers,
            //             })
            //                 .then( (res) => {
            //                     if (res.status === 200) {
            //                         return res.text();
            //                     } else {
            //                         return null;
            //                     }
            //                 })
            //                 .then( (data) => {
            //                     let response = JSON.parse(data);
            //                     console.log(response);
            //                     state = response
            //                 })
            //                 .catch(e => console.log(e));
            //
            //         }})
            //     .catch(e => console.log(e));
            return state;

        default:
            console.log('Dispatch: DEFAULT');
            return state;
    }
};

export {scenesReducer as default}