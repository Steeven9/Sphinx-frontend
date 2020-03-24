const devicesReducer = (state, action) => {
    switch (action.type) {
        case 'POPULATE_DEVICES':
            console.log('Dispatch: POPULATE_DEVICES');
            return action.devices;

        case 'MODIFY_DEVICE':
            console.log('Dispatch: MODIFY_DEVICE');

            //// Uncomment the following 6 lines to sync coupled sliders
            //  state.forEach((d) => {
            //     if (d.switched === action.device.id) {
            //         d.slider = action.device.slider;
            //         console.log(d.name + " " + d.slider)
            //     }
            // });

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