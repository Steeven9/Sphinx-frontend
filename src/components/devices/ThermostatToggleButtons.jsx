import React, {useContext, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PowerOnIcon from '@material-ui/icons/PowerSettingsNew';
import CoolingIcon from '@material-ui/icons/AcUnit';
import HeatingIcon from '@material-ui/icons/Whatshot';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import '../../css/toggle-buttons.css';
import DevicesContext from "../../context/devicesContext";


const useStyles = makeStyles((theme) => ({
    toggleContainer: {
        margin: theme.spacing(0.5, 0),
    },
    typography: {
        thermostatSources: {
            fontFamily: 'Open Sans Condensed',
            fontSize: '0.75rem'
        }
    }
}));

/**
 * Gets a string array to set the mode/state of a thermostat,
 * just for re-rendering purposes
 * @param originalState
 * @returns {string[]}
 */
function getModes(originalState) {
    switch (originalState) {
        case 1:
            return ["1"];
        case 2:
            return ["1", "2"];
        case 3:
            return ["1", "3"];
        default:
            return ["0"];
    }
}

/**
 * Stringyfies the number of the source of temperature values of the thermostat
 * @param initSource
 * @returns {string}
 */
function getInitialSource(initSource = 0) {
    return initSource.toString();
}

/**
 * Returns a group of toggle buttons to operate a thermostat
 * @param device
 * @returns {*}
 * @constructor
 */
function ThermostatToggleButtons({device}) {
    const [source, setSource] = React.useState(getInitialSource("0"));
    const [modes, setModes] = React.useState(getModes(device.state));
    const {dispatch, setActionCompleted} = useContext(DevicesContext);
    const classes = useStyles();

    const handleSource = (event, newSource) => {
        if (newSource !== null) {
            setSource(newSource);
            device.source = parseInt(newSource);
        }
        updateTargetTemp(device);
    };

    // Controls the fours states of the thermostat and avoids forbidden combinations
    const handleMode = (event, incomingModes) => {
        if (incomingModes.length === 0) {
            incomingModes = ["0"];
            device.state = 0;
        } else if (incomingModes.length === 1 && incomingModes[0] !== "1") {
            incomingModes = ["0"];
            device.state = 0;
        } else if (incomingModes.length > 1 && incomingModes[0] === "0") {
            incomingModes.shift();
            device.state = 1;
        } else if (incomingModes.length > 2 && incomingModes[0] === "1") {
            if (incomingModes[1] === "2") {
                incomingModes = ["1", "3"];
                device.state = 3;
            } else {
                incomingModes = ["1", "2"];
                device.state = 2;
            }
        }
        setModes(incomingModes);
        updateTargetTemp(device);
    };

    // Manages the state of the thermostats dynamically according to the target temp - temp relation
    useEffect(() => {
        let selfTemp = device.temp.split(' ')
        let averageTemp = device.averageTemp.split(' ')
        let evalTemp;

        if (source === "0") {
            evalTemp = parseInt(selfTemp[0])
        } else {
            evalTemp = parseInt(averageTemp[0])
        }

        if (device.slider < evalTemp) {
            device.state = 3
            setModes(["1", "3"])
        } else if (device.slider > evalTemp) {
            device.state = 2
            setModes(["1", "2"])
        } else {
            console.log('evalTemp === device.slider')

            setModes(["1"])
            device.state = 1
        }
    }, [device, device.slider]);


    // Triggers the synchronization (render) and updating of devices (backend)
    const updateTargetTemp = (device) => {
        dispatch({type: 'MODIFY_DEVICE', device: device, setActionCompleted: setActionCompleted});
    };

    // Extracts next state
    useEffect(() => {
    }, [device, modes, source]);

    return (
        <Grid container spacing={2}>
            <Grid item sm={12} md={6}>

                {/* Mode 0: cooling, 1: heating */}
                <div className={classes.toggleContainer}>
                    <ToggleButtonGroup
                        value={modes}
                        onChange={handleMode}
                        size="small"
                        aria-label="temperature control"
                    >
                        {/*<ToggleButton value="2" className="btn-thermostat btn-false-disabled" aria-label="cooling"*/}
                        <ToggleButton value="2" className="btn-thermostat btn-false-disabled" aria-label="cooling"
                                      disabled={modes[0] === "0"}>
                            <CoolingIcon/>
                        </ToggleButton>
                        {/*<ToggleButton value="3" className="btn-thermostat btn-false-disabled" aria-label="heating"*/}
                        <ToggleButton value="3" className="btn-thermostat btn-false-disabled" aria-label="heating"
                                      disabled={modes[0] === "0"}>
                            <HeatingIcon/>
                        </ToggleButton>
                        <ToggleButton value="1" className="btn-thermostat" aria-label="on/idle">
                            <PowerOnIcon/>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>

                {/* Value source 0: self, 1: average */}
                <div className={classes.toggleContainer}>
                    <ToggleButtonGroup
                        value={source}
                        exclusive
                        onChange={handleSource}
                        size="small"
                        aria-label="temperature value source"
                    >
                        <ToggleButton value="0" aria-label="self">
                            <Typography className="temperatureSource">Self</Typography>
                        </ToggleButton>
                        <ToggleButton value="1" aria-label="room average">
                            <Typography className="temperatureSource">Room</Typography>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </Grid>
        </Grid>
    );
}

export {ThermostatToggleButtons as default}

