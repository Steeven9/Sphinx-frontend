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
 */

/**
 * Gets a SVG icon object for the corresponding device
 * @param {string} deviceType
 * @returns {icon} SVG imported icon
 * @author Erick Garro Elizondo
 */
export function getDeviceIcon(deviceType) {
    switch(deviceType){

        // Regular lights (w/o intensity)
        case 1:
            return '/img/icons/devices/bulb-regular.svg';

        // Smart lights (with intensity state)
        case 2:
            return '/img/icons/devices/bulb-led.svg';

        // Light controllers
        case 3:
            return '/img/icons/devices/switch.svg';
        case 4:
            return '/img/icons/devices/dimmer-state.svg';
        case 5:
            return '/img/icons/devices/dimmer-regular.svg';
        case 6:
            return '/img/icons/devices/smart-plug.svg';

        // Sensors
        case 7:
            return '/img/icons/devices/sensor-humidity.svg';
        case 8:
            return '/img/icons/devices/sensor-light.svg';
        case 9:
            return '/img/icons/devices/sensor-temperature.svg';
        case 10:
            return '/img/icons/devices/sensor-motion.svg';

        default:
            return '/img/icons/devices/unknown-device.svg';
    }
}

/**
 * Gets a SVG icon object for the corresponding device
 * @param {object} device
 * @returns {string} SVG imported icon
 * @author Erick Garro Elizondo
 */
export function getRowIcon(device) {
    if (device.parent) {
        return 'more_vert';
    } else if (device.child) {
        return 'arrow_drop_up';
    }
}
