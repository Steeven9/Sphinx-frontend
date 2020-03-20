// state is an array of devices
const devicesReducer = (state, action) => {
    switch (action.type) {
        case 'POPULATE_DEVICES':
            return action.devices;
        case 'UPDATE_DEVICE':
            return [
                ...state,
                { id: action.id, body: action.body }
            ];
        default:
            return state;
    }
};

export { devicesReducer as default }