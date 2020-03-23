const devicesReducer = (state, action) => {

    switch (action.type) {
        case 'POPULATE_DEVICES':
            console.log('Dispatch: POPULATE_DEVICES');
            return action.devices;
        case 'MODIFY_DEVICE':
            console.log('Dispatch: MODIFY_DEVICE');
            // return state.filter((device) => {
            //     if (device.deviceId === state.deviceId) {
            //         device.slider = action.slider;
            //         device.on = action.on
            //     }
            // });
            console.log ('action ' + JSON.stringify(action));
            return state.filter((device) =>
                device.id !== action.key
            );
            // return state;
        default:
            console.log('Dispatch: DEFAULT');
            return state;
    }
};

export { devicesReducer as default }