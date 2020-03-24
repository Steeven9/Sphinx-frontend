const devicesReducer = (state, action) => {

    switch (action.type) {
        case 'POPULATE_DEVICES':
            console.log('Dispatch: POPULATE_DEVICES');
            return action.devices;

        case 'MODIFY_DEVICE':
            console.log('Dispatch: MODIFY_DEVICE');
            console.log(action.devices);
            return action.devices;

        case 'SYNC_DEVICES':
            console.log('Dispatch: SYNC_DEVICE');
            return action.devices;

        default:
            console.log('Dispatch: DEFAULT');
            return state;
    }
};

export { devicesReducer as default }