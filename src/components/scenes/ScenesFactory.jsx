import React, {useEffect, useReducer} from 'react'
import ScenesContext from '../../context/scenesContext'
import scenesReducer from '../../reducers/scenesReducer'
import effectsReducer from '../../reducers/scenesReducer'
import devicesReducer from '../../reducers/devicesReducer'
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
import SceneEffectConfig from './SceneEffectConfig'


const params = (new URL(document.location)).searchParams;
const path = window.location.pathname.toLowerCase().split('/');
// const host = window.location.protocol + '//' + window.location.hostname + ':8888';
// const scenesFetchUrl = host + '/scenes';
// const guestScenesFetchUrl = host + '/shared/' + params.get('id') + '/scenes';
// const fetchUrl = path[1] === 'guest' && +params.get('id') ? guestScenesFetchUrl : scenesFetchUrl;

// let isLoading = false;
// let isGuest = false;
let hasName = false;

// const headers = {
//     'user': localStorage.getItem('username'),
//     'session-token': localStorage.getItem('session_token'),
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
// };

/**
 * Creates customizable scenes
 * @returns {*}
 * @constructor
 */
const ScenesFactory = () => {
        const [scenes, dispatchScenes] = useReducer(scenesReducer, []);
        const [effects, dispatchEffects] = useReducer(effectsReducer, []);
        const [devices, dispatchDevices] = useReducer(devicesReducer, []);
        const [confirmation, setConfirmation] = React.useState(false);
        const [open, setOpen] = React.useState(false);
        const [icon, setIcon] = React.useState("/img/icons/scenes/icon-unknown.svg");
        const [sceneName, setSceneName] = React.useState("");
        const [shared, setShared] = React.useState(false);
        const [isValid, setValid] = React.useState(false);
        const [isLoading, setLoading] = React.useState(false);
        const [actionCompleted, setActionCompleted] = React.useState(false);
        const [id, setId] = React.useState(0);
        const isEditing = path[1].toLowerCase() === "editscene";
        const ColorCircularProgress = withStyles({root: {color: '#580B71'},})(CircularProgress);

        let effectConfig = {
            id: id,
            type: 0,
            name: '',
            slider: '',
            on: false,
            devices: [],
            visible: false
        }

        // // Controls if a guest is accessing this view
        // if (path[1] === 'guest' && params.get('id')) {
        //     isGuest = true
        // }

        // function getDeviceById(id) {
        //     return devices.filter(device => {
        //         console.log(device.id)
        //         return device.id === id
        //     })
        // }

        // Validates if all data necessary for a POST or PUT is available and enables or disables the 'Save' button
        useEffect(() => {
            let countElements = effects.map(effect => effect.devices.length) //Maps sizes of devices[] in every effect
            countElements.push(sceneName.length) //Pushes characters count from scene name
            let canContinue = countElements.every(effect => effect > 0 && countElements.length > 1) //Evaluates that each one has at least one element, and that there are at least two indexes in countElements[]
            setValid(canContinue)
        }, [effects, scenes, sceneName, setValid]);

        // Fetches user's devices just once
        useEffect(() => {
            const fetchUrl = window.location.protocol + '//' + window.location.hostname;
            const method = 'GET';
            const headers = {
                'user': localStorage.getItem('username'),
                'session-token': localStorage.getItem('session_token')
            };
            let fetchedDevices = []

            fetch(fetchUrl + ':8080/devices', {
                method: method,
                headers: headers,
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
                } else {
                    fetchedDevices = JSON.parse(data).sort(function (a, b) {
                        let keyA = a.name;
                        let keyB = b.name;
                        if (keyA < keyB) return -1;
                        if (keyA > keyB) return 1;
                        return 0;
                    });
                    dispatchDevices({type: 'POPULATE_DEVICES', devices: fetchedDevices});
                }
            })
            .catch(e => {
                console.log(e);
            });

            if (isEditing) {
                setLoading(true)
                fetch(fetchUrl + ':8888/scenes/' + params.get('id'), {
                    method: method,
                    headers: headers,
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
                    } else {
                        // Sets the scene data into the form
                        let scene = JSON.parse(data)
                        setSceneName(scene.name)
                        setIcon(scene.icon)
                        setShared(scene.shared)

                        // Mutates the devices[] content into actual devices
                        scene.effects.forEach(effect => {
                            let newDevices = effect.devices.map(id => fetchedDevices.find(device => device.id === id))
                            effect.devices = newDevices
                        })

                        setLoading(false)
                        // Adds a boolean label to trigger visibility of the effects and dispatches one at a time
                        scene.effects.forEach(effect => {
                                effect.visible = true
                                effect.preexisting = true
                                dispatchEffects({
                                    type: 'LOAD_SCENE',
                                    effectConfig: effect,
                                });
                            }
                        )
                    }
                })
                .catch(e => {
                    console.log(e);
                });
            }
        }, [isEditing]);


        // Gets rid of cached state and extracts the next one
        useEffect(() => {
        }, [scenes]);

        // Discards cached state and extract the next one
        useEffect(() => {
        }, [effects]);

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

        const handleClose = () => {
            setOpen(false);
        };

        const handleRedirect = () => {
            window.location.href = '/scenes'
        };

        /**
         * Generates a modal to choose the effect icon
         * @returns {IconModal}
         **/
        function IconModal() {
            return (
                <div>
                    <Dialog
                        maxWidth="md"
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
                                    onClick={handleClose}>Cancel
                            </button>
                        </DialogActions>
                    </Dialog>
                </div>
            );
        }

        // Gets rid of cached state and extracts the next one
        useEffect(() => {
        }, [shared]);

        const toggleShared = (e) => {
            setShared(e.target.checked);
            dispatchScenes({
                type: 'UPDATE_STATE',
                name: sceneName,
                icon: icon,
                shared: e.target.checked,
                effects: effects
            });
        };

        /**
         * Initializes a blank scene configuration to start working
         * @returns void
         **/
        function createBlankEffectConfig() {
            setId((prevState) => prevState + 1)
            dispatchEffects({
                type: 'CREATE_BLANK_EFFECT',
                effectConfig: effectConfig,
            });
        }

        function getSceneIcons() {
            const imageRoute = "/img/icons/scenes/";
            const sceneIcons = ["coconut-drink", "beach", "cloud", "cloudy-moon", "cloudy-night", "cocktail", "cyclone",
                "desert", "igloo", "mountain", "park", "rain-drops", "rain", "rainbow", "sandals", "snow",
                "snowflake", "snowman", "storm", "stormy", "sunrise", "sunset", "thunder", "ukulele", "waves",
                "weather", "windy"];

            return sceneIcons.map((iconName) => {
                return (
                    <button key={iconName}
                            className="selectionIconBtn"
                            onClick={() => {
                                let iconPath = imageRoute + "icon-" + iconName + ".svg"
                                setIcon(iconPath);
                                dispatchScenes({
                                    type: 'UPDATE_STATE',
                                    name: sceneName,
                                    icon: iconPath,
                                    shared: shared,
                                    effects: effects
                                });
                                setOpen(false)
                            }}>
                        <img src={imageRoute + "icon-" + iconName + ".svg"} alt={iconName}/>
                    </button>
                )
            })
        }

        function getTitle() {
            let mode = path[1].toLowerCase();

            if (mode === "editscene") {
                return "Edit scene"
            }

            if (mode === "addscene") {
                return "Add scene"
            }
        }

        function ConfirmationModal() {
            return (
                <div>
                    <Dialog
                        open={confirmation}
                        onClose={handleRedirect}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {actionCompleted ?
                                    <span
                                        className="center-text bold">{!isEditing ? "Creation successful!" : "Modification successful!"}</span>
                                    :
                                    <div>
                                        <span
                                            className="center-tex bold">{!isEditing ? "Creation failed!" : "Modification failed!"}</span>
                                        <span className="center-text">Please review your scene and try again.</span>
                                    </div>
                                }
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <button type="button" name="button"
                                    className="btn-secondary btn waves-effect waves-light center"
                                    onClick={() => {
                                        if (actionCompleted) {
                                            handleRedirect()
                                        } else {
                                            setConfirmation(false)
                                        }
                                    }}>OK
                            </button>
                        </DialogActions>
                    </Dialog>
                </div>
            );
        }

        return (
            <ScenesContext.Provider
                value={{scenes, dispatchScenes, effects, dispatchEffects, devices, setValid, isEditing}}>
                <div className="container scene-factory-box">
                    <form noValidate autoComplete="off">
                        <Grid container spacing={3} className="scene-content-box-top">
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Paper xs={12} sm={12} md={12} lg={12} elevation={3} className={classes.paper}>
                                    <h3 className="left-align headline-title">{getTitle()}</h3>

                                    <div className="row">
                                        <div className="col l4">
                                            <div>
                                                <label>
                                                        <span
                                                            className="row align-left lbl-scene-name-align">Scene name</span>
                                                    <input className="row scenes-factory-name-input" type="text"
                                                           name="name"
                                                           placeholder="Type a name"
                                                           onChange={(e) => {
                                                               hasName = e.target.value < 1
                                                               setSceneName(e.target.value)
                                                               dispatchScenes({
                                                                   type: 'UPDATE_STATE',
                                                                   name: e.target.value,
                                                                   icon: icon,
                                                                   shared: shared,
                                                                   effects: effects
                                                               });
                                                           }}
                                                           value={sceneName} required/>
                                                </label>
                                            </div>
                                            <span
                                                className={hasName ? "float-left l12 error-message align-error-message-scene-name" : "hidden"}>Scenes must have a name</span>

                                        </div>

                                        <div className="col l2 scene-icon">
                                            <label className="row">Icon</label>
                                            <div className="row">
                                                <img className="fixedSizeIcon btn-icon" src={icon}
                                                     alt="icon error"
                                                     onClick={() => setOpen(true)}/>
                                            </div>
                                            <div>
                                                <i className="material-icons btn-icon btn-icon-edit-fix"
                                                   onClick={() => setOpen(true)}> edit </i>
                                            </div>
                                            {open && <IconModal/>}
                                            {confirmation && <ConfirmationModal/>}
                                        </div>
                                        <div className="col l6">
                                            <div className="row switch shared-scene-switch">
                                                <label className="col">
                                                    <span className="col">Shared with guests:</span>
                                                    <input className="col" type="checkbox" checked={shared}
                                                           onChange={(e) => toggleShared(e)}/>
                                                    <span className="lever"/>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col l8 center">
                                            <div className="loading-spinner-container">
                                                {isLoading && <ColorCircularProgress
                                                    className="loading-spinner"/>}
                                            </div>
                                        </div>
                                        <div className="col l12">
                                            <div className="row right-text">
                                                <button type="button" name="button"
                                                        className="btn-secondary btn waves-effect waves-light"
                                                        onClick={() => {
                                                            handleRedirect()
                                                        }}>Cancel
                                                </button>
                                                <button type="button" name="button"
                                                        className={isEditing ? "btn-secondary btn waves-effect waves-light" : "hidden"}
                                                        onClick={() => {
                                                        }}>Delete
                                                </button>
                                                <button type=" button" name=" button" disabled={!isValid || isLoading}
                                                        className="btn-primary btn waves-effect waves-light"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setActionCompleted(!actionCompleted)
                                                            setLoading(true)

                                                            if (isEditing) {
                                                                dispatchScenes({
                                                                    id: id,
                                                                    type: 'MODIFY_SCENE',
                                                                    name: sceneName,
                                                                    icon: icon,
                                                                    shared: shared,
                                                                    effects: effects,
                                                                    setActionCompleted: setActionCompleted,
                                                                    setConfirmation: setConfirmation,
                                                                    setLoading: setLoading
                                                                });
                                                            } else {
                                                                dispatchScenes({
                                                                    type: 'CREATE_SCENE',
                                                                    name: sceneName,
                                                                    icon: icon,
                                                                    shared: shared,
                                                                    effects: effects,
                                                                    setActionCompleted: setActionCompleted,
                                                                    setConfirmation: setConfirmation,
                                                                    setLoading: setLoading
                                                                });
                                                            }
                                                        }}>{isEditing ? "Modify" : "Save"}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Paper>
                            </Grid>

                            <Grid item lg={12} className=" scene-content-box-instructions">
                                <span className=" bold">Step 1: </span> <span>Set your scene configuration</span> <span
                                className="text-emphasis">(every effect must have at least one device assigned)</span>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Paper xs={12} sm={12} md={12} lg={12} elevation={3} className={classes.paper}>
                                    <Grid className=" row" container spacing={0}>
                                        <div className=" steps-header col l11">Configure effects</div>
                                        <div className=" steps-header col l1">
                                            <i onClick={() => {
                                                hasName = sceneName.length < 1
                                                createBlankEffectConfig()
                                            }}
                                               className="col col-custom btn waves-effect waves-light btn-primary-circular
                                     right material-icons btn-circular-fix-margin">add</i>
                                        </div>
                                    </Grid>

                                    {/* Configure effects */}
                                    <Grid className="row" container>
                                        {effects.map((config) => <SceneEffectConfig key={config.id}
                                                                                    effectConfig={config}/>)}
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item lg={12} className=" scene-content-box-instructions">
                                <span className=" bold">Step 2: </span> <span>Choose the devices to which you want to apply an effect</span>
                                {!effects[0] || effects[0].type === 0 || !effects[0].visible ?
                                    <p className="text-emphasis">Add an effect to see the available devices for
                                                                 it.</p> : undefined}
                            </Grid>
                            {effects.map((config) => <TransferList key={config.id} effectConfig={config}/>)}
                        </Grid>
                    </form>
                </div>
            </ScenesContext.Provider>
        )
    }
;

export {ScenesFactory as default}
