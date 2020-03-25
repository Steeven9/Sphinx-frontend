const devicesReducer = (state, action) => {
    switch (action.type) {
        case 'POPULATE_DEVICES':
            console.log('Dispatch: POPULATE_DEVICES');
            return action.devices;

        case 'MODIFY_DEVICE':
            console.log('Dispatch: MODIFY_DEVICE');

            // Uncomment the following lines to sync nested devices
            if (action.device.on !== undefined) {
                state.forEach((d) => {
                    if (d.switched === action.device.id) {
                        d.slider = action.device.slider;
                        d.on = action.device.on;
                        console.log(d.name + " " + d.slider)
                    }
                });
            }

            if (action.device.on !== undefined) {
                state.forEach((d) => {
                    if (d.id === action.device.id) {
                        d.on = action.device.on;
                        console.log(action.device.name + " " + action.device.on)
                    }});
            }

            localStorage.setItem('devices', JSON.stringify(state));
            return [...state];

        case 'SYNC_DEVICES':
            console.log('Dispatch: SYNC_DEVICE');
            // console.log(state)
            // console.log(action.devices)
            return state;

        default:
            console.log('Dispatch: DEFAULT');
            return state;
    }
};

export { devicesReducer as default }