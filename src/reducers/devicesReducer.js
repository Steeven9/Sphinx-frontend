/**
 * Generic fetch to POST and PUT
 * @param method
 * @param device
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
                        body.slider = action.device.slider / 100;
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
                    } else if (d.switched === action.device.id && action.device.switches !== null && action.device.type === 3) {
                        d.on = action.device.on;
                    }
                });
                action.device.clicked = false
            }
            return [...state];

        default:
            return state;
    }
};

export {devicesReducer as default}
