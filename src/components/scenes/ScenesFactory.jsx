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
const host = window.location.protocol + '//' + window.location.hostname + ':8888';
const scenesFetchUrl = host + '/scenes';
const guestScenesFetchUrl = host + '/guests/' + params.get('id') + '/scenes';
const fetchUrl = path[1] === 'guest' && +params.get('id') ? guestScenesFetchUrl : scenesFetchUrl;
let isLoading = true;
let isDataFound = true;
let isGuest = false;

const ScenesFactory = () => {
        const [scenes, dispatchScenes] = useReducer(scenesReducer, []);
        const [effects, dispatchEffects] = useReducer(effectsReducer, []);
        const [devices, dispatchDevices] = useReducer(devicesReducer, []);
        const [open, setOpen] = React.useState(false);
        const [icon, setIcon] = React.useState("/img/icons/scenes/icon-unknown.svg");
        const [sceneName, setSceneName] = React.useState("");
        const [shared, setShared] = React.useState(false);
        const [isValid, setValid] = React.useState(false);
        const [id, setId] = React.useState(0);
        const isEditing = path[1].toLowerCase() === "editscene";
        const ColorCircularProgress = withStyles({root: {color: '#580B71'},})(CircularProgress);

        let effectConfig = {
            id: id,
            type: 0,
            name: '',
            slider: '',
            on: false,
            state: 0,
            devices: [],
            visible: false
        }

        // Controls if a guest is accessing this view
        if (path[1] === 'guest' && params.get('id')) {
            isGuest = true
        }

        // Fetches user's devices just once
        useEffect(() => {
            const fetchUrl = window.location.protocol + '//' + window.location.hostname + ':8080/devices'
            const method = 'GET';
            const headers = {
                'user': localStorage.getItem('username'),
                'session-token': localStorage.getItem('session_token')
            };

            console.log('Fetching user devices...')

            fetch(fetchUrl, {
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
                    isLoading = false;
                    let fetchedDevices = []
                    if (data === null || data.length === 0) {
                        isDataFound = false;
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
        }, []);


        // Gets rid of cached state and extracts the next one
        useEffect(() => {
            console.log(scenes)
        }, [scenes]);

        // Fetches scenes on page load
        // useEffect(() => {
        //     fetch(fetchUrl, {
        //         method: 'GET',
        //         headers: {
        //             'user': localStorage.getItem('username'),
        //             'session-token': localStorage.getItem('session_token')
        //         },
        //     })
        //         .then((res) => {
        //             if (res.status === 401) {
        //                 this.props.logOut(1);
        //             } else if (res.status === 200) {
        //                 return res.text();
        //             } else {
        //                 return null;
        //             }
        //         })
        //         .then((data) => {
        //             if (data === null || data.length === 0) {
        //                 isDataFound = false;
        //             } else {
        //                 let scenes = JSON.parse(data).sort(function (a, b) {
        //                     let keyA = a.name;
        //                     let keyB = b.name;
        //                     if (keyA < keyB) return -1;
        //                     if (keyA > keyB) return 1;
        //                     return 0;
        //                 });
        //                 isLoading = false;
        //                 dispatchScene({type: 'POPULATE_SCENES', scenes: scenes});
        //             }
        //         })
        //         .catch(e => console.log(e));
        //     setActionCompleted(false)
        // }, []);

        // Fetches scenes on state change, on Reducer's actions completion
        // useEffect(() => {
        //     if (actionCompleted) {
        //         fetch(fetchUrl, {
        //             method: 'GET',
        //             headers: {
        //                 'user': localStorage.getItem('username'),
        //                 'session-token': localStorage.getItem('session_token')
        //             },
        //         })
        //             .then((res) => {
        //                 if (res.status === 401) {
        //                     this.props.logOut(1);
        //                 } else if (res.status === 200) {
        //                     return res.text();
        //                 } else {
        //                     return null;
        //                 }
        //             })
        //             .then((data) => {
        //                 if (data === null || data.length === 0) {
        //                     isDataFound = false;
        //                 } else {
        //                     let scenes = JSON.parse(data).sort(function (a, b) {
        //                         let keyA = a.name;
        //                         let keyB = b.name;
        //                         if (keyA < keyB) return -1;
        //                         if (keyA > keyB) return 1;
        //                         return 0;
        //                     });
        //                     isLoading = false;
        //                     dispatchScene({type: 'POPULATE_SCENES', scenes: scenes});
        //                 }
        //             })
        //             .catch(e => console.log(e));
        //         setActionCompleted(false)
        //     }
        // }, [actionCompleted]);

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

        // function DevicesEffect() {
        //     return (
        //         <>
        //             {transferLists}
        //         </>
        //     );
        // }

        const handleClose = () => {
            setOpen(false);
        };

        /**
         * Generates a modal to choose the effect icon
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
            dispatchScenes({
                type: 'UPDATE_STATE',
                name: sceneName,
                icon: icon,
                shared: e.target.checked,
                effects: effects
            });
        };

        function createBlankEffectConfig() {
            setId((prevState) => prevState + 1)
            dispatchEffects({type: 'CREATE_BLANK_EFFECT', effectConfig: effectConfig});
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
                                        <div className="col l8">
                                            <div className="row">
                                                <div>
                                                    <label>
                                                        <span className="row align-left">Scene name</span>
                                                        <input className="row col scenes-factory-name-input" type="text"
                                                               name="name"
                                                               placeholder="Type a name"
                                                               onChange={(e) => {
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
                                                <div className="col scene-icon">
                                                    <div className="col"/>
                                                    <label className="row">Icon</label>
                                                    <div className="row">
                                                        <img className="fixedSizeIcon btn-icon" src={icon}
                                                             alt="icon error"
                                                             onClick={() => setOpen(true)}/>
                                                    </div>

                                                    <div className="">
                                                        <i className="material-icons btn-icon btn-icon-edit-fix"
                                                           onClick={() => setOpen(true)}> edit </i>
                                                    </div>
                                                    {open && <IconModal/>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col l4">
                                            <div className="row switch shared-scene-switch">
                                                <label>
                                                    <span>Shared with guests:</span>
                                                    <input type="checkbox" checked={shared}
                                                           onChange={(e) => toggle(e)}/>
                                                    <span className="lever"/>
                                                </label>
                                            </div>
                                            <div className="row right-text">
                                                <button type="button" name="button"
                                                        className="btn-secondary btn waves-effect waves-light"
                                                        onClick={() => {
                                                        }}>Cancel
                                                </button>
                                                <button type="button" name="button"
                                                        className={isEditing ? "btn-secondary btn waves-effect waves-light" : "hidden"}
                                                        onClick={() => {
                                                        }}>Delete
                                                </button>
                                                <button type=" button" name=" button" disabled={!isValid}
                                                        className="btn-primary btn waves-effect waves-light"
                                                        onClick={() => {
                                                        }}>Save
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Paper>
                            </Grid>

                            <Grid item lg={12} className=" scene-content-box-instructions">
                                <span className=" bold">Step 1: </span> <span>Set your scene configuration:</span>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Paper xs={12} sm={12} md={12} lg={12} elevation={3} className={classes.paper}>
                                    <Grid className=" row" container spacing={0}>
                                        <div className=" steps-header col l11">Configure effects</div>
                                        <div className=" steps-header col l1">
                                            <i onClick={() => createBlankEffectConfig()}
                                               className=" col col-custom btn waves-effect waves-light btn-primary-circular
                                     right material-icons btn-circular-fix-margin">add</i>
                                        </div>
                                    </Grid>

                                    {/* Configure effects */}
                                    <Grid className=" row" container>
                                        {effects.map((config) => <SceneEffectConfig key={config.id}
                                                                                    effectConfig={config}/>)}
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item lg={12} className=" scene-content-box-instructions">
                                <span className=" bold">Step 2: </span> <span>Choose the devices to which you want to apply an effect:</span>
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
