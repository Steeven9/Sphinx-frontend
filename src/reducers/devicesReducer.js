/**
 * Generic fetch to POST and PUT
 * @param fetchUrl
 * @param method
 * @param body
 */
function doFetch(fetchUrl, method, body) {
    const host = window.location.protocol + '//' + window.location.hostname + ':8080';
    const headers = {
        'user': localStorage.getItem('username'),
        'session-token': localStorage.getItem('session_token'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    const devicesFetchUrl = host + '/devices' + fetchUrl;

    fetch(devicesFetchUrl, {
        method: method,
        headers: headers,
        body: body
    })
        .then((res) => {
            if (res.status === 200 || res.status === 204) {
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
 * handled by the device components and its children
 * @param state
 * @param action
 * @returns {state[]}
 */
const devicesReducer = (state, action) => {
    switch (action.type) {

        case 'POPULATE_DEVICES':
            console.log('Dispatch: POPULATE_DEVICES');
            action.devices.forEach(device => {
                if (device.slider !== null && device.type !== 11) { //Does not apply to Thermostat
                    device.slider = device.slider * 100
                }
            })
            return action.devices;

        case 'UPDATE_STATE':
            console.log('Dispatch: UPDATE_STATE');
            return state;

        case 'MODIFY_DEVICE':
            console.log('Dispatch: MODIFY_DEVICE');
            let fetchUrl = '';
            let body = {};

            if (action.device.reset) {
                fetchUrl = '/reset/' + action.device.id;
                action.device.reset = false;
                body = {};
            } else {
                fetchUrl = '/' + action.device.id;

                switch (action.device.type) {
                    case 2:  //DimmableLight
                    case 4:  //DimmableSwitch
                        body.on = action.device.on;
                        body.slider = action.device.slider / 100;
                        break;
                    case 5:  //StatelessDimmableSwitch
                        body.slider = action.device.slider / 100;
                        break;
                    case 11: //Thermostat
                        body.slider = action.device.slider;
                        body.state = action.device.state;
                        body.source = action.device.source;
                        break;
                    case 12: //SmartCurtains
                        body.slider = action.device.slider / 100;
                        break;
                    default:  //Light, Switch, SmartPlug, SecurityCamera
                        body.on = action.device.on;
                        break;
                }
            }

            doFetch(fetchUrl, 'PUT', JSON.stringify(body));
            action.setActionCompleted(true);
            return state;

        case 'SYNC_DEVICES':
            console.log('Dispatch: SYNC_DEVICES');

            for (let device of state) {
                if (device.id === action.device.id) {

                    if (device.slider !== null && !device.on) {
                        device.slider = action.device.slider
                    }

                    if (device.on !== null) {
                        device.on = action.device.on
                    }

                    if (!device.clicked && !device.child) {
                        device.on = action.device.on;
                    }

                    if (device.type === 11) { //Thermostat
                        device.slider = action.device.slider
                        device.state = action.device.state
                        device.source = action.device.source
                    }

                } else if (device.switched) {
                    for (let parent of device.switched) {
                        if (parent === action.device.id) {

                            if (device.slider !== null && action.device.type !== 5) {
                                if (device.on && action.device.on) {
                                    device.slider = action.device.slider
                                }
                            }

                            if (device.on && action.device.type === 5) {
                                let newSlider = device.slider + action.device.slider;
                                if (newSlider > 100) {
                                    device.slider = 100
                                } else if (newSlider < 0) {
                                    device.slider = 0
                                } else {
                                    device.slider = newSlider
                                }
                            }

                            if (action.device.clicked) {
                                if (device.type !== 11) { //Not thermostat
                                    device.on = action.device.on
                                    device.slider = action.device.slider
                                } else {
                                    if (action.device.on === true) {
                                        device.state = 1
                                        device.disabled = false;
                                    } else {
                                        device.state = 0
                                        device.disabled = true;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            action.device.clicked = false
            return [...state];

        default:
            return state;
    }
};

export {devicesReducer as default}
