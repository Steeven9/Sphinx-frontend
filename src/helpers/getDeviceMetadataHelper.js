/*
 ** Code references for devices **
 1: Light
 2: DimmableLight
 3: Switch
 4: DimmableSwitch
 5: StatelessDimmableSwitch
 6: SmartPlug
 7: HumiditySensor
 8: LightSensor
 9: TempSensor
 10: MotionSensor
 11: Thermostat
 12: SmartCurtains
 13: SecurityCamera
 */

// /**
//  * Gets a SVG icon'a relative URL for the corresponding device type
//  * @param {int} deviceType
//  * @returns {icon} SVG imported icon
//  */
// export function getDeviceIcon(type) {
//     switch (type) {
//
//         // Regular lights (w/o intensity)
//         case 1:
//             return '/img/icons/devices/bulb-regular.svg';
//
//         // Smart lights (with intensity state)
//         case 2:
//             return '/img/icons/devices/bulb-led.svg';
//
//         // Light controllers
//         case 3:
//             return '/img/icons/devices/switch.svg';
//         case 4:
//             return '/img/icons/devices/dimmer-state.svg';
//         case 5:
//             return '/img/icons/devices/dimmer-regular.svg';
//         case 6:
//             return '/img/icons/devices/smart-plug.svg';
//
//         // Sensors
//         case 7:
//             return '/img/icons/devices/sensor-humidity.svg';
//         case 8:
//             return '/img/icons/devices/sensor-light.svg';
//         case 9:
//             return '/img/icons/devices/sensor-temperature.svg';
//         case 10:
//             return '/img/icons/devices/sensor-motion.svg';
//
//         // Automation
//         case 11:
//             return '/img/icons/devices/automation-thermostat.svg';
//
//         // Other
//         case 12:
//             return '/img/icons/devices/smart-curtains.svg';
//
//         // Surveillance
//         case 13:
//             return '/img/icons/devices/security-camera.svg';
//
//
//         default:
//             return '/img/icons/devices/unknown-device.svg';
//     }
// }

/**
 * Gets a Material-UI icon name for parent or child devices
 * @param {object} device
 * @returns {string} SVG imported icon
 */
export function getRowIcon(device) {
    if (device.parent) {
        return 'more_vert';
    } else if (device.child) {
        return 'arrow_drop_up';
    }
}

/**
 * Returns the device type name
 * @param type {int}
 * @returns {string}
 */
export function getDeviceTypeName(type) {
    switch (type) {
        // Regular lights (w/o intensity)
        case 1:
            return 'Light';

        // Smart lights (with intensity state)
        case 2:
            return 'Smart light';

        // Light controllers
        case 3:
            return 'Switch';
        case 4:
            return 'Smart dimmer';
        case 5:
            return 'Dimmer';
        case 6:
            return 'SmartPlug';

        // Sensors
        case 7:
            return 'Humidity sensor';
        case 8:
            return 'Light sensor';
        case 9:
            return 'Temperature sensor';
        case 10:
            return 'Motion sensor';

        // Automation
        case 11:
            return 'Thermostat';

        // Other
        case 12:
            return 'Smart curtains';

        // Surveillance
        case 13:
            return 'Security camera';

        default:
            return 'Unknown device';
    }
}

/**
 * Returns the range for a slider according to device type
 * @param type
 * @returns {number[]} [min][max]
 */
export function getMinMax(device) {
    switch (device.type) {
        case 11:
            return [0, 100];
        default:
            return [0, 100]
    }
}

/**
 * Returns the min and max marks to show on a slider according to device type
 * @returns {[{label: string, value: number}, {label: string, value: number}]}
 * @param device
 */
export function getSliderMarks(device) {
    const lightMarks = [
        {
            value: 0,
            label: '0%',
        },
        {
            value: 100,
            label: '100%',
        },
    ];

    const temperatureMarks = [
        {
            value: 0,
            label: '0°C',
        },
        {
            value: 100,
            label: '100°C',
        },
    ];

    const curtainsMarks = [
        {
            value: 0,
            label: 'Closed',
        },
        {
            value: 100,
            label: 'Open',
        },
    ];

    switch (device.type) {
        case 11:
            return temperatureMarks;
        case 12:
            return curtainsMarks;
        default:
            return lightMarks;
    }
}
