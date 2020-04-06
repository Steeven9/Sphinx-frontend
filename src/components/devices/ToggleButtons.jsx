import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PowerOnIcon from '@material-ui/icons/PowerSettingsNew';
import CoolingIcon from '@material-ui/icons/AcUnit';
import HeatingIcon from '@material-ui/icons/Whatshot';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import '../../css/toggle-buttons.css';


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

function getInitialSource(initSource = 0) {
    return initSource.toString();
}

function ToggleButtons({device}) {
    const [source, setSource] = React.useState(getInitialSource(device.source));
    const [modes, setModes] = React.useState(getModes(device.state));
    const classes = useStyles();

    const handleSource = (event, newSource) => {
        if (newSource !== null) {
            setSource(newSource);
        }
    };

    // Controls the fours states of the thermostat and avoids forbidden combinations
    const handleMode = (event, incomingModes) => {
        if (incomingModes.length === 0) {
            incomingModes = ["0"];
        } else if (incomingModes.length === 1 && incomingModes[0] !== "1") {
            incomingModes = ["0"];
        } else if (incomingModes.length > 1 && incomingModes[0] === "0") {
            incomingModes.shift();
        } else if (incomingModes.length > 2 && incomingModes[0] === "1") {
            if (incomingModes[1] === "2") {
                incomingModes = ["1", "3"]
            } else {
                incomingModes = ["1", "2"]
            }
        }
        setModes(incomingModes);
    };

    // Extracts next state
    useEffect(() => {
        console.log('Thermostat source was updated')
    }, [source]);

    useEffect(() => {
        console.log('Thermostat modes were updated')
        console.log('Modes: ' + modes)
    }, [modes]);

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
                        <ToggleButton value="2" className="btn-thermostat" aria-label="cooling"
                                      disabled={modes[0] === "0" ? true : false}>
                            <CoolingIcon/>
                        </ToggleButton>
                        <ToggleButton value="3" className="btn-thermostat" aria-label="heating"
                                      disabled={modes[0] === "0" ? true : false}>
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
                            <Typography  className="temperatureSource">Room</Typography>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </Grid>
        </Grid>
    );
}

export {ToggleButtons as default}
