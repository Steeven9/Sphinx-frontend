import React, {useState} from "react";
import Slider from "@material-ui/core/Slider";


const IntensitySlider = (device) => {
    let intensityValue = () => {
        if(device.device.deviceType === 4) {
            console.log('Intensity: ' + device.device.slider);
            return device.device.slider;
        }
            return 0;
    };

    const [intensity, setIntensity] = useState(intensityValue(device));
    return(
        <Slider className="slider" onChangeCommitted={(e, val)=>console.log('slider: ' + val)} valueLabelDisplay="auto" defaultValue={intensity || 0}/>
    )
};

const a = () => {};
export {IntensitySlider as default}