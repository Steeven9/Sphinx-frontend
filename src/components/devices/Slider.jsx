import React, {useState, useContext} from 'react'
import DevicesContext from '../../context/devices-context'

const Slider = (props) => {
    const [intensity, setIntensity] = useState(props.on);

    return(
        <div className="">
        </div>
    )
};

export {Slider as default}

Slider.defaultProps = {
    intensity: 0
};