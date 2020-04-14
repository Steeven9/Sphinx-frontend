/**
 * This reducer controls the actions triggered by the events
 * handled by the scene components and its children
 * @param state
 * @param action
 * @returns {state[]}
 */
const scenesReducer = (state, action) => {
    switch (action.type) {
        case 'POPULATE_SCENES':
            console.log('Dispatch: POPULATE_SCENES');
            return action.scenes;

        case 'MODIFY_SCENE':
            console.log('Dispatch: MODIFY_SCENE');
            // const params = (new URL(document.location)).searchParams;
            // const path = window.location.pathname.toLowerCase().split('/');
            // const scenesFetchUrl = 'http://localhost:8080/scenes/';
            // const roomScenesFetchUrl = 'http://localhost:8080/rooms/' + params.get('id') + '/scenes';
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

        case 'SYNC_SCENES':
            console.log('Dispatch: SYNC_SCENES');

            // if (action.scene.on !== undefined) {
            //     state.forEach((d) => {
            //         if (action.scene.switches && action.scene.type !== 3) {
            //             // If parent is ON: powers children on and sets their slider value to the parent's
            //             if (action.scene.on && action.scene.clicked && d.switched === action.scene.id) {
            //                 d.on = action.scene.on;
            //                 d.slider = action.scene.slider
            //             }
            //
            //             // Syncs parent-children sliders
            //             if (action.scene.on && d.on && d.switched === action.scene.id) {
            //                 d.slider = action.scene.slider
            //             }
            //
            //             // If parent is OFF: allows children to set their own power switch
            //             if (!action.scene.on && action.scene.clicked && d.switched === action.scene.id) {
            //                 d.on = action.scene.on;
            //
            //                 // Sets stateless dimmable switch's slider to 0 on self-power OFF
            //                 if (action.scene.type === 5) {
            //                     action.scene.slider = 0
            //                 }
            //             }
            //
            //             // Allows self-power OFF of child
            //         } else if (d.id === action.scene.id){
            //             d.on = action.scene.on;
            //
            //             // Forbids regular switch to set a dimmable light's slider to 0 on power ON
            //         } else if (d.switched === action.scene.id && action.scene.switches && action.scene.type === 3) {
            //             d.on = action.scene.on;
            //         }
            //     });
            //     action.scene.clicked = false
            // }

            return [...state];

        default:
            console.log('Dispatch: DEFAULT');
            return state;
    }
};

export { scenesReducer as default }
