import React, {useContext, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import DevicesContext from '../../context/devicesContext'
import Typography from '@material-ui/core/Typography';
import PowerOnIcon from '@material-ui/icons/PowerSettingsNew';
import CoolingIcon from '@material-ui/icons/AcUnit';
import HeatingIcon from '@material-ui/icons/Whatshot';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import '../../css/toggle-buttons.css';
import Slider from "@material-ui/core/Slider";
import {getSliderMarks} from "../../helpers/getDeviceMetadataHelper";


function Thermostat({device}) {
    const {dispatch, setActionCompleted} = useContext(DevicesContext);
    const [intensity, setIntensity] = useState(device.averageTemp * 100);
    const [source, setSource] = React.useState(device.source.toString());
    const [modes, setModes] = React.useState(getModes(device.stateTemp));
    const [disabled, setDisabled] = useState(device.disabled);
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
    const classes = useStyles();

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
     * Synchronizes and re-renders devices state for view purposes dispatching the action to the devices reducer
     * @param e {event}
     * @param val {int}
     */
    const handleChange = (e, val) => {
        setIntensity(val);
        device.averageTemp = val;
        dispatch({type: 'SYNC_DEVICES', device: device});
    };

    /**
     * Updates only the affected device's state into the back-end
     * @param e {event}
     * @param val {int}
     */
    const handleChangeCommitted = (e, val) => {
        setIntensity(val);
        device.averageTemp = val;
        dispatch({type: 'MODIFY_DEVICE', device: device, setActionCompleted: setActionCompleted});
    };

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
            device.stateTemp = 0;
        } else if (incomingModes.length === 1 && incomingModes[0] !== "1") {
            incomingModes = ["0"];
            device.stateTemp = 0;
        } else if (incomingModes.length > 1 && incomingModes[0] === "0") {
            incomingModes.shift();
            device.stateTemp = 1;
        } else if (incomingModes.length > 2 && incomingModes[0] === "1") {
            if (incomingModes[1] === "2") {
                incomingModes = ["1", "3"];
                device.stateTemp = 3;
            } else {
                incomingModes = ["1", "2"];
                device.stateTemp = 2;
            }
        }
        setModes(incomingModes);
        updateTargetTemp(device);
    };

    // Triggers the synchronization (render) and updating of devices (backend)
    const updateTargetTemp = (device) => {
        dispatch({type: 'MODIFY_DEVICE', device: device, setActionCompleted: setActionCompleted});
    };

    /**
     * Gets the either the temperature read by a thermostat or the average temperature of the room
     * @param d {device}
     * @returns {{src, options: {sourceMap: boolean, sourceMapStyle: string}, dest: string}|{src: [string]}|number}
     */
    function getThermostatTemp(d) {
        if (d.source === 0) {
            return Number((d.quantity).toFixed(2)) + " ˚C"
        }
        if (d.source === 1) {
            return Number((d.averageTemp).toFixed(2)) + " ˚C"
        }
    }

    /**
     * Disables the Thermostat slider on state 0 === Off
     */
    useEffect(() => {
        if (device.stateTemp === 0) {
            device.disabled = true;
            setDisabled(true)
        } else {
            device.disabled = false;
            setDisabled(false)
        }
    }, [device, device.stateTemp]);

    // Manages the state of the thermostats dynamically according to the target temp - temp relation
    useEffect(() => {
        // let selfTemp = device.temp.split(' ')
        // let averageTemp = device.averageTemp.split(' ')
        let selfTemp = device.temp
        let averageTemp = device.averageTemp
        let evalTemp;

        if (source === "0") {
            // evalTemp = parseFloat(selfTemp[0])
            evalTemp = parseFloat(selfTemp)
        } else {
            // evalTemp = parseFloat(averageTemp[0])
            evalTemp = parseFloat(averageTemp)           
        }

        if (intensity < evalTemp) {
            device.stateTemp = 2
            setModes(["1", "2"])
        } else if (intensity > evalTemp) {
            device.stateTemp = 3
            setModes(["1", "3"])
        } else {
            setModes(["1"])
            device.stateTemp = 1
        }
    }, [device, device.averageTemp, source, intensity]);

    return (
        <div className="row">
            <div className="col l9">
                <Slider name={"slider"}
                        onChange={(e, val) => {
                            handleChange(e, val)
                        }}
                        onChangeCommitted={(e, val) => {
                            handleChangeCommitted(e, val)
                        }}
                        valueLabelDisplay="auto"
                        value={intensity}
                        min={0}
                        max={100}
                        disabled={disabled}
                        marks={getSliderMarks(device)}/>
                <div
                    className={"col l12 col-custom display-info-thermostat" + (device.stateTemp !== 0 ? " display-active" : " display-inactive")}>
                    <span>{device.stateTemp !== 0 ? getThermostatTemp(device) : "- - - - - -"}</span>
                </div>
            </div>
            <div className="col l2">
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
                                <ToggleButton value="2" className="btn-thermostat btn-false-disabled"
                                              aria-label="cooling"
                                              disabled={modes[0] === "0"}>
                                    <CoolingIcon/>
                                </ToggleButton>
                                {/*<ToggleButton value="3" className="btn-thermostat btn-false-disabled" aria-label="heating"*/}
                                <ToggleButton value="3" className="btn-thermostat btn-false-disabled"
                                              aria-label="heating"
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
            </div>
        </div>
    );
}

export {Thermostat as default}

