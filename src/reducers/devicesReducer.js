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

            /**
             * Uncomment the following IF statements to sync the state
             * of nested devices while not using a database
             */
            // if (action.device.on !== undefined) {
            //     state.forEach((d) => {
            //         if (d.switched === action.device.id) {
            //             d.slider = action.device.slider;
            //             d.on = action.device.on;
            //             console.log(d.name + " " + d.slider)
            //         }
            //     });
            // }
            //
            // if (action.device.on !== undefined) {
            //     state.forEach((d) => {
            //         if (d.id === action.device.id) {
            //             d.on = action.device.on;
            //             console.log(action.device.name + " " + action.device.on)
            //         }});
            // }

            // localStorage.setItem('devices', JSON.stringify(state));v

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
                    if (res.status == 204){
                        fetch('http://localhost:8080/rooms/', {
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
            console.log('Dispatch: SYNC_DEVICE');
            // To be coded if needed
            return state;

        default:
            console.log('Dispatch: DEFAULT');
            return state;
    }
};

export { devicesReducer as default }
