/**
 * This reducer controles the actions triggered by the events
 * handled by the device components and its children
 * @param state
 * @param action
 * @returns {state[]}
 */
const devicesReducer = (state, action) => {
    switch (action.type) {
        case 'POPULATE_DEVICES':
            console.log('Dispatch: POPULATE_DEVICES');
            return action.devices;

        case 'MODIFY_DEVICE':
            console.log('Dispatch: MODIFY_DEVICE');
            let body;

                if(action.device.slider !== undefined) {
                    body = {
                        slider: action.device.slider,
                        on: action.device.on
                    }
                } else {
                    body = {
                        on: action.device.on
                    }
                }

                fetch('http://localhost:8080/devices/' + action.device.id, {
                method: 'PUT',
                headers: {
                    'user': this.state.username,
                    'session-token': this.state.session_token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
                .then(res => {
                    if (res.status === 204){
                        fetch('http://localhost:8080/devices/', {
                            method: 'GET',
                            headers: {
                                'user': localStorage.getItem('username'),
                                'session-token': localStorage.getItem('session_token')
                            },
                        })
                            .then( (res) => {
                                if (res.status === 401) {
                                    this.props.logOut(1);
                                } else if (res.status === 200) {
                                    return res.text();
                                } else {
                                    return null;
                                }
                            })
                            .then( (data) => {
                                let response = JSON.parse(data);
                                console.log(response);
                                state = response
                            })
                            .catch(e => console.log(e));

                    }})
                .catch(e => console.log(e));
            return [state];

        case 'SYNC_DEVICES':
            console.log('Dispatch: SYNC_DEVICES');

            if (action.device.on !== undefined) {
                state.forEach((d) => {
                    if (action.device.switches && action.device.type !== 3) {
                        // If parent is ON: powers children on and sets their slider value to the parent's
                        if (action.device.on && action.device.clicked && d.switched === action.device.id) {
                            d.on = action.device.on;
                            d.slider = action.device.slider
                        }

                        // Syncs parent-children sliders
                        if (action.device.on && d.on && d.switched === action.device.id) {
                            d.slider = action.device.slider
                        }

                        // If parent is OFF: allows children to set their own power switch
                        if (!action.device.on && action.device.clicked && d.switched === action.device.id) {
                            d.on = action.device.on;

                            // Sets stateless dimmable switch's slider to 0 on self-power OFF
                            if (action.device.type === 5) {
                                action.device.slider = 0
                            }
                        }

                        // Allows self-power OFF of child
                    } else if (d.id === action.device.id){
                        d.on = action.device.on;

                        // Forbids regular switch to set a dimmable light's slider to 0 on power ON
                    } else if (d.switched === action.device.id && action.device.switches && action.device.type === 3) {
                        d.on = action.device.on;
                    }
                });
                action.device.clicked = false
            }

            return [...state];

        default:
            console.log('Dispatch: DEFAULT');
            return state;
    }
};

export { devicesReducer as default }
