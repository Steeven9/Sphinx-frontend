import React, {useContext} from 'react'
import DevicesContext from '../context/devices-context'
import PowerSwitch from './PowerSwitch'
import Slider from '@material-ui/core/Slider'

// Light devices SVG icons
import iconDimmerState from "../img/icons/devices/dimmer-state.svg";
import iconDimmerRegular from "../img/icons/devices/dimmer-regular.svg";
import iconSmartPlug from "../img/icons/devices/smart-plug.svg"
import iconSwitch from "../img/icons/devices/switch.svg";
import iconRegularBulb from "../img/icons/devices/bulb-regular.svg";
import iconFluorescentBulb from "../img/icons/devices/bulb-fluorescent.svg";
import iconLedBulb from "../img/icons/devices/bulb-led.svg"
import iconLedStrip from "../img/icons/devices/strip-led.svg"
import iconBedSideLamp from "../img/icons/devices/lamp-bed-side.svg"
import iconFluorescentLamp from "../img/icons/devices/lamp-fluorescent.svg"
import iconHangingLamp from "../img/icons/devices/lamp-hanging.svg"
import iconStandingLamp from "../img/icons/devices/lamp-standing.svg"
import iconReadingLamp from "../img/icons/devices/lamp-reading.svg"
import iconLightSensor from "../img/icons/devices/sensor-light.svg";
import iconHumiditySensor from "../img/icons/devices/sensor-humidity.svg";
import iconMotionSensor from "../img/icons/devices/sensor-motion.svg";
import iconTemperatureSensor from "../img/icons/devices/sensor-temperature.svg";
import iconMicrowaveOven from "../img/icons/devices/other-microwave-oven.svg"
import iconUnknownDevice from "../img/icons/devices/unknown-device.svg"

const Device = ({device}) => {
    const {dispatch} = useContext(DevicesContext);

    return (
        <>
            // device code goes here
        </>
    )
};

// Object ENUMS implementation for all available devices
const deviceType = {
    DIMMER: {
        REGULAR: 'Regular dimmer',
        STATE: 'Dimmer with state'
    },
    LIGHT: {
        SMART: {
            BED_SIDE_LAMP: 'Bed-side lamp',
            BULB: 'Regular light bulb',
            HANGING_LAMP: 'Hanging lamp',
            LED: 'LED light bulb with intensity',
            LED_STRIP: 'LED strip light',
            STANDING_LAMP: 'Standing lamp',
            READING_LAMP: 'Reading lamp'
        },
        REGULAR: {
            FLUORESCENT_BULB: 'Fluorescent light bulb',
            FLUORESCENT_LAMP: 'Fluorescent lamp'
        },
    },
    OTHER: {
        MICROWAVE_OVEN: 'Microwave oven'
    },
    SENSOR: {
        HUMIDITY: 'Humidity sensor',
        LIGHT: 'Light sensor',
        MOTION: 'Motion sensor',
        TEMPERATURE: 'Temperature sensor'
    },
    SMART_PLUG: 'Smart plug',
    SWITCH: 'Switch'
};

/**
 * Gets a SVG icon object for the corresponding device
 * @param {deviceType} type
 * @returns {object} containing the relative URL for the corresponding SVG icon
 * @author Erick Garro Elizondo
 */

function getDeviceIcon(type) {
    // NOTE: Uncomment cases when different types of lights get implemented in the back-end
    switch(type){
        // Controllers
        case deviceType.DIMMER.REGULAR:
            return iconDimmerState;
        case deviceType.DIMMER.STATE:
            return iconDimmerRegular;
        case deviceType.SMART_PLUG:
            return iconSmartPlug;
        case deviceType.SWITCH:
            return iconSwitch;

        // Smart lights (with intensity state)
        case deviceType.LIGHT.SMART.BED_SIDE_LAMP:
            return iconBedSideLamp;
        case deviceType.LIGHT.SMART.BULB:
            return iconRegularBulb;
        case deviceType.LIGHT.SMART.HANGING_LAMP:
            return iconHangingLamp;
        case deviceType.LIGHT.SMART.LED:
            return iconLedBulb;
        case deviceType.LIGHT.SMART.LED_STRIP:
            return iconLedStrip;
        case deviceType.LIGHT.SMART.STANDING_LAMP:
            return iconStandingLamp;
        case deviceType.LIGHT.SMART.READING_LAMP:
            return iconReadingLamp;

        // Regular lights (w/o intensity state)
        case deviceType.LIGHT.REGULAR.FLUORESCENT_BULB:
            return iconFluorescentBulb;
        case deviceType.LIGHT.REGULAR.FLUORESCENT_LAMP:
            return iconFluorescentLamp;

        // Sensors
        case deviceType.SENSOR.HUMIDITY:
            return iconHumiditySensor;
        case deviceType.SENSOR.LIGHT:
            return iconLightSensor;
        case deviceType.SENSOR.MOTION:
            return iconMotionSensor;
        case deviceType.SENSOR.TEMPERATURE:
            return iconTemperatureSensor;

        // OTHER DEVICES
        case deviceType.OTHER.MICROWAVE_OVEN:
            return iconMicrowaveOven;

        default:
            return iconUnknownDevice;
    }
}

export {Device as default}
