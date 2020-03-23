// state is an array of devices
import {useState} from "react";

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
            // break;
            console.log ('action ' + JSON.stringify(action));
            return state.filter((device) =>
                device.id !== action.key
            );
            return state;
        case 'REMOVE_DEVICE':
            console.log('Dispatch: DELETE_DEVICE');
            return action.filter((device) => device.id !== action.id
            );
            return action;
        default:
            console.log('Dispatch: DEFAULT');
            return state;
    }
};

export { devicesReducer as default }