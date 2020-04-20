import React, {useEffect, useReducer} from 'react'
import ScenesContext from '../../context/scenesContext'
import scenesReducer from '../../reducers/scenesReducer'
import SceneList from './SceneList'
import '../../css/scenes.css';
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TransferList from './TransferList'


const params = (new URL(document.location)).searchParams;
const path = window.location.pathname.toLowerCase().split('/');
const host = window.location.protocol + '//' + window.location.hostname + ':8888';
const scenesFetchUrl = host + '/scenes';
const guestScenesFetchUrl = host + '/guests/' + params.get('id') + '/scenes';
const fetchUrl = path[1] === 'guest' && +params.get('id') ? guestScenesFetchUrl : scenesFetchUrl;
let isLoading = true;
let isDataFound = true;
let isGuest = false;
let title = "";

const ScenesFactory = () => {
    const [actionCompleted, setActionCompleted] = React.useState(false);
    const [scenes, dispatch] = useReducer(scenesReducer, []);
    const [open, setOpen] = React.useState(false);
    const [icon, setIcon] = React.useState("/img/icons/scenes/icon-unknown.svg");
    const [name, setName] = React.useState("");
    const [effects, setEffects] = React.useState([]);
    const [shared, setShared] = React.useState(false);
    const ColorCircularProgress = withStyles({root: {color: '#580B71'},})(CircularProgress);
    let effectFilters = "";
    let effect = {};

    // Controls if a guest is accessing this view
    if (path[1] === 'guest' && params.get('id')) {
        isGuest = true
    }

    // Fetches scenes on page load
    useEffect(() => {
        fetch(fetchUrl, {
            method: 'GET',
            headers: {
                'user': localStorage.getItem('username'),
                'session-token': localStorage.getItem('session_token')
            },
        })
            .then((res) => {
                if (res.status === 401) {
                    this.props.logOut(1);
                } else if (res.status === 200) {
                    return res.text();
                } else {
                    return null;
                }
            })
            .then((data) => {
                if (data === null || data.length === 0) {
                    isDataFound = false;
                } else {
                    let scenes = JSON.parse(data).sort(function (a, b) {
                        let keyA = a.name;
                        let keyB = b.name;
                        if (keyA < keyB) return -1;
                        if (keyA > keyB) return 1;
                        return 0;
                    });
                    isLoading = false;
                    dispatch({type: 'POPULATE_SCENES', scenes: scenes});
                }
            })
            .catch(e => console.log(e));
        setActionCompleted(false)
    }, []);

    // Fetches scenes on state change, on Reducer's actions completion
    useEffect(() => {
        if (actionCompleted) {
            fetch(fetchUrl, {
                method: 'GET',
                headers: {
                    'user': localStorage.getItem('username'),
                    'session-token': localStorage.getItem('session_token')
                },
            })
                .then((res) => {
                    if (res.status === 401) {
                        this.props.logOut(1);
                    } else if (res.status === 200) {
                        return res.text();
                    } else {
                        return null;
                    }
                })
                .then((data) => {
                    if (data === null || data.length === 0) {
                        isDataFound = false;
                    } else {
                        let scenes = JSON.parse(data).sort(function (a, b) {
                            let keyA = a.name;
                            let keyB = b.name;
                            if (keyA < keyB) return -1;
                            if (keyA > keyB) return 1;
                            return 0;
                        });
                        isLoading = false;
                        dispatch({type: 'POPULATE_SCENES', scenes: scenes});
                    }
                })
                .catch(e => console.log(e));
            setActionCompleted(false)
        }
    }, [actionCompleted]);

    // Discards cached state and extract the next one
    useEffect(() => {
    }, [scenes]);

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            borderRadius: 10,
            padding: 40,
            color: '#000000',
            background: '#FFFFFF',
        },
        textInput: {
            margin: theme.spacing(1),
            width: '30ch',
        },
    }));

    const classes = useStyles();

    function DevicesEffect() {
        return (
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <Paper elevation={3} className={classes.paper}>
                    <TransferList/>
                </Paper>
            </Grid>
        );
    }

    const handleClose = () => {
        setOpen(false);
    };

    /**
     * Generates a modal to play the security cam video
     * @returns {IconModal}
     **/
    function IconModal() {
        return (
            <div>
                <Dialog
                    maxWidth
                    borderRadius={10}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <h3 className="center-text">Select your icon</h3>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {getSceneIcons()}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <button type="button" name="button" className="btn-secondary btn waves-effect waves-light"
                                onClick={handleClose}>Close
                        </button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    // Gets rid of cached state and extracts the next one
    useEffect(() => {
    }, [shared]);

    const toggle = (e) => {
        setShared(e.target.checked);
    };

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch({type: 'DELETE_SCENE_EFFECT', effect: effect});
    };

    function getEffectName(type) {
        switch (type) {
            case 1:
                return 'Light intensity'
            case 2:
                return 'Temperature'
            case 3:
                return 'Power'
            case 4:
                return 'Curtains aperture'
            default:
                return 'Unknown effect type'
        }
    }

    function createBlankEffect() {
        let effect = {
            id: effects.length + 1,
            type: 0,
            name: '',
            slider: null,
            on: null,
            state: null,
            devices: []
        }
        dispatch({type: 'CREATE_BLANK_EFFECT', effect: effect});
    }

    function getSceneIcons() {
        const imageRoute = "/img/icons/scenes/";
        const sceneIcons = ["coconut-drink", "beach", "cloud", "cloudy-moon", "cloudy-night", "cocktail", "cyclone",
            "desert", "igloo", "mountain", "park", "rain-drops", "rain", "rainbow", "sandals", "snow",
            "snowflake", "snowman", "storm", "stormy", "sunrise", "sunset", "thunder", "ukulele", "waves",
            "weather", "windy"];

        return sceneIcons.map((iconName) => {
            return (
                <button
                    className="selectionIconBtn"
                    onClick={() => {
                        setIcon(imageRoute + "icon-" + iconName + ".svg");
                        setOpen(false)
                    }}>
                    <img src={imageRoute + "icon-" + iconName + ".svg"} alt={iconName}/>
                </button>
            )
        })
    }

    function getEffectFilter(effect) {

        return (
            <div className="col l6 effect-configuration">
                <div className="col l8">
                    <label>Controlling</label>
                    <select required className="browser-default">
                        <option value="0" disabled selected>Choose an effect</option>
                        <option value="1">Light intensity</option>
                        <option value="2">Temperature</option>
                        <option value="3">Power</option>
                        <option value="4">Curtains aperture</option>
                    </select>
                </div>
                <div className="col l3">
                    <div className="row">
                        <div className="row">
                            <div className="col l6">
                                <label>Value</label>
                                <input className="scenes-factory-effect-value-input" type="number" min="0" max="100"
                                       name="value"
                                       placeholder="0.0" onChange={(e) => setName(e.value)} value={name} required/>
                            </div>
                            <label className="col l1 scene-effect-value-label">%</label>
                            <div className="col l1">
                                <i className="scene-item material-icons btn-icon scene-effect-item"
                                   onClick={(e) => handleDelete(e)}> highlight_off </i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

    return (
        <div className="container scene-factory-box">
            <form noValidate autoComplete="off">
                <Grid container spacing={3} className="scene-content-box-top">
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Paper xs={12} sm={12} md={12} lg={12} elevation={3} className={classes.paper}>
                            <h3 className="left-align headline-title">Add scene</h3>
                            <div className="row">
                                <div>
                                    <label>
                                        <span className="row align-left">Scene name</span>
                                        <input className="row col scenes-factory-name-input" type="text" name="name"
                                               placeholder="Type a name" onChange={(e) => setName(e.value)}
                                               value={name} required/>
                                    </label>
                                </div>
                                <div className="col roomNameAndIcon">
                                    <p>Icon</p>
                                    <img className="fixedSizeIcon btn-icon" src={icon} alt="icon error"
                                         onClick={() => setOpen(true)}/>
                                    <i className="material-icons btn-icon" onClick={() => setOpen(true)}> edit </i>
                                    {open && <IconModal/>}
                                </div>

                                <div className="col switch shared-scene-switch">
                                    <label>
                                        <span>Shared with guests:</span>
                                        <input type="checkbox" checked={shared} onChange={(e) => toggle(e)}/>
                                        <span className="lever"></span>
                                    </label>
                                </div>
                            </div>
                            <div className="center">
                                <button type="button" name="button"
                                        className="btn-secondary btn waves-effect waves-light" onClick={() => {
                                }}>Cancel
                                </button>
                                <button type="button" name="button"
                                        className="btn-secondary btn waves-effect waves-light" onClick={() => {
                                }}>Delete
                                </button>
                                <button type="button" name="button"
                                        className="btn-primary btn waves-effect waves-light"
                                        onClick={() => {
                                        }}>Save
                                </button>
                            </div>
                        </Paper>
                    </Grid>

                    <Grid item lg={12} className="scene-content-box-instructions">
                        <span className="bold">Step 1: </span> <span>Set your scene configuration:</span>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Paper xs={12} sm={12} md={12} lg={12} elevation={3} className={classes.paper}>
                            <Grid className="row" container spacing={0}>
                                <div className="steps-header col l11">Configure effects</div>
                                <div className="steps-header col l1">
                                    <i onClick={() => createBlankEffect()}
                                       className="col col-custom btn waves-effect waves-light btn-primary-circular right material-icons btn-circular-fix-margin">add</i>
                                </div>
                            </Grid>

                            {/* Configure effects */}
                            <Grid className="row" container>
                                {effects.map((effect) => getEffectFilter(effect))}
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item lg={12} className="scene-content-box-instructions">
                        <span className="bold">Step 2: </span> <span>Choose the devices to which you want to apply an effect:</span>
                    </Grid>
                    <DevicesEffect/>
                </Grid>
            </form>
        </div>
    )
};

export {ScenesFactory as default}
