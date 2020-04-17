/**
 * This reducer controls the actions triggered by the events
 * handled by the device components and its children
 * @param state
 * @param action
 * @returns {state[]}
 */
const devicesReducer = (state, action) => {
    const host = window.location.protocol + '//' + window.location.hostname + ':8080';
    const params = (new URL(document.location)).searchParams;
    const path = window.location.pathname.toLowerCase().split('/');
    const roomDevicesFetchUrl = host + '/rooms/' + params.get('id') + '/devices';
    let body = {};
    let devicesFetchUrl = '';
    let fetchUrl = '';

    const headers = {
        'user': localStorage.getItem('username'),
        'session-token': localStorage.getItem('session_token'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    switch (action.type) {
        case 'POPULATE_DEVICES':
            console.log('Dispatch: POPULATE_DEVICES');
            return action.devices;

        case 'REFRESH_DEVICES':
            console.log('Dispatch: REFRESH_DEVICES');
            devicesFetchUrl = host + '/devices';
            fetchUrl = path[1] === 'room' && params.get('id') ? roomDevicesFetchUrl : devicesFetchUrl;

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
                    console.log(response);
                    state = response
                })
                .catch(e => console.log(e));
            return state;

        case 'MODIFY_DEVICE':
            console.log('Dispatch: MODIFY_DEVICE');
            devicesFetchUrl = host + '/devices/' + action.device.id;
            fetchUrl = path[1] === 'room' && params.get('id') ? roomDevicesFetchUrl : devicesFetchUrl;

            switch(action.device.type) {
                case 2:  //DimmableLight
                case 4:  //DimmableSwitch
                case 5:  //StatelessDimmableSwitch
                case 11: //Thermostat
                    body.slider = action.device.slider;
                    body.on = action.device.on;
                    break;
                case 12: //SmartCurtains
                    body.slider = action.device.slider;
                    body.state = action.device.state;
                    body.source = action.device.source;
                    break;
                default:  //Light, Switch, SmartPlug, SecurityCamera
                    body.on = action.device.on;
                    break;

            }

            // Resets SmartPlug
            if (action.device.reset) {
                devicesFetchUrl = host + '/devices/reset/' + action.device.id;
                action.device.reset = false;
                body = {};
            }

            fetchUrl = fetchUrl + action.device.id;

            fetch(devicesFetchUrl, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(body)
            })
                .then(res => {
                    if (res.status === 200) {
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
                                console.log(response);
                                state = response
                            })
                            .catch(e => console.log(e));

                    }
                })
                .catch(e => console.log(e));

            return state;

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
                    } else if (d.id === action.device.id) {
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

export {devicesReducer as default}
