import React, {useState, useContext} from 'react'
import DevicesContext from '../../context/devices-context'

const Slider = (props) => {
    const [intensity, setIntensity] = useState(props.on);

    return(
        <p className="range-field">
            <input type="range" id="test5" min="0" max="100"/>
        </p>
    )
};

Slider.defaultProps = {
    intensity: 0
};

export {Slider as default}

