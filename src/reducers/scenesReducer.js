/**
 * Generic fetch to POST and PUT
 * @param method
 * @param scene
 */
function doFetch(method, scene) {
    const host = window.location.protocol + '//' + window.location.hostname + ':8888';
    let fetchUrl = host + '/scenes';
    const headers = {
        'user': localStorage.getItem('username'),
        'session-token': localStorage.getItem('session_token'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    let body = null;

    if (method === 'POST' || method === 'PUT') {
        body = JSON.stringify({
            name: scene.name,
            icon: scene.icon,
            ownerId: scene.ownerId,
            shared: scene.shared,
            effects: scene.effects
        });
    }

    if (method === 'PUT' || method === 'DELETE') {
        fetchUrl += '/' + scene.id;
    }

    fetch(fetchUrl, {
        method: method,
        headers: headers,
        body: body
    })
        .then((res) => {
            if (res.status === 200 || res.status === 203) {
                console.log(method + ' successful!');
                return res
            } else {
                console.log(method + ' unsuccessful!');
                return res
            }
        })
        .catch(error => console.log(error))
}

/**
 * This reducer controls the actions triggered by the events
 * handled by the scene components and its children
 * @param state
 * @param action
 * @returns {state[]}
 */

const scenesReducer = (state, action) => {
    const host = window.location.protocol + '//' + window.location.hostname + ':8888';
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

        case 'RUN_SCENE':
            console.log('Dispatch: RUN_SCENE');
            fetchUrl = host + '/scenes';

            fetch(fetchUrl + '/run/' + action.scene.id, {
                method: 'PUT',
                headers: headers
            })
                .then(res => {
                    action.setPlaying(false);
                    action.setResultTriggered(true);

                    if (res.status === 200 || res.status === 203) {
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

            // Renames a copy of a scene sequentially, respecting the existing copy numbers from 1 to n
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
                icon: action.scene.icon,
                shared: action.scene.shared,
                effects: action.scene.effects
            };

            doFetch('POST', action.scene);
            action.setActionCompleted(true);
            return [duplicatedScene, ...state];

        case 'DELETE_SCENE':
            console.log('Dispatch: DELETE_SCENE');

            state = state.filter((s) => s.id !== action.scene.id);
            doFetch('DELETE', action.scene);
            action.setActionCompleted(true);
            return state;

        case 'MODIFY_SCENE':
            console.log('Dispatch: MODIFY_SCENE');
            // const params = (new URL(document.location)).searchParams;
            // const path = window.location.pathname.toLowerCase().split('/');
            // const fetchUrl = 'http://localhost:8888/scenes/';
            // const roomfetchUrl = 'http://localhost:8888/rooms/' + params.get('id') + '/scenes';
            // let fetchUrl = path[1] === 'room' && params.get('id') ? roomfetchUrl : fetchUrl;
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
            //     fetch(fetchUrl, {
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