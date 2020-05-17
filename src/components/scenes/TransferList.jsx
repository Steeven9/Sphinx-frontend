import React, { useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import '../../css/scenes.css';
import ScenesContext from '../../context/scenesContext';


const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
  },
  cardHeader: {
    backgroundColor: '#f1f1f1',
    padding: theme.spacing(1, 2),
  },
  list: {
    width: 200,
    height: 230,
    backgroundColor: '#f8f8f8',
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

const useGridStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    borderRadius: 10,
    paddingTop: 40,
    paddingBottom: 40,
    color: '#000000',
    background: '#FFFFFF',
  },
  textInput: {
    margin: theme.spacing(1),
    width: '30ch',
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

function getMeasureUnit(effectConfig) {
  switch (effectConfig.type) {
    case 2: // Temperature
      return '°C';
    case 3: // Power
      return effectConfig.on ? 'On' : 'Off';
    case 1: // Light intensity
    case 4: // Curtains aperture
    default:
      return '%';
  }
}

/**
 * Compares two arrays and returns the difference
 * @param {} otherArray
 */
function compareArrays(otherArray) {
  return (current) => otherArray.filter((other) => other.id === current.id
                                                   || other === current.id).length === 0;
}

function getNotUsedDevices(allDevices, currentDevices) {
  return allDevices.filter(compareArrays(currentDevices));
}

function getUsedDevices(allDevices, currentDevices) {
  return allDevices.filter(compareArrays(allDevices.filter(compareArrays(currentDevices))));
}

function getDevicesTypesByEffectType(effectConfig) {
  switch (effectConfig.type) {
    case 1: // Light intensity
      return [2, 4];
    case 2: // Temperature
      return [11];
    case 3: // Power
      return [1, 2, 3, 4, 6, 11, 13];
    case 4: // Curtains aperture
      return [12];
    default:
      return [];
  }
}

function getDevicesByEffectType(devices, types) {
  const filteredDevices = [];
  for (const type of types) {
    for (const device of devices) {
      if (device.type === type) {
        filteredDevices.push(device);
      }
    }
  }
  return filteredDevices;
}

const TransferList = (config) => {
  const {
    devices,
    dispatchScenes,
    dispatchEffects,
    isEditing,
    globalLeft,
    setGlobalLeft,
    globalRight,
    setGlobalRight,
  } = useContext(ScenesContext);
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);
  const { effectConfig } = config;
  const leftLength = left.length;
  const rightLength = right.length;

  /**
   * Filters all devices that are not available for a same type of effect
   * @param rightDevices
   * @returns {*}
   */
  function getAvailableDevices(rightDevices) {
    const unavailableDevices = globalLeft.filter((g) => g.effectType === effectConfig.type
                                                        && g.effectId !== effectConfig.id);
    const availableDevices = getNotUsedDevices(rightDevices, unavailableDevices);
    availableDevices.sort((a, b) => {
      const keyA = a.name.toLowerCase();
      const keyB = b.name.toLowerCase();
      if (keyA === keyB) {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
      }
      if (keyA < keyB) {
        return -1;
      }
      return 1;
    });

    console.log(`configId: ${config.effectConfig.id} | type: ${effectConfig.type} | name: ${effectConfig.name} | value: ${effectConfig.slider}`);
    availableDevices.forEach((d) => console.log(`id: ${d.id} | name: ${d.name}`));
    return availableDevices;
  }

  // Loads the devices to the left or right sides of the Transfer List on page load
  useEffect(() => {
    const devicesTypes = getDevicesTypesByEffectType(config.effectConfig);
    const filteredDevices = getDevicesByEffectType(devices, devicesTypes);

    if (isEditing) {
      const usedDevices = getUsedDevices(filteredDevices, config.effectConfig.devices);
      const unusedDevices = getNotUsedDevices(filteredDevices, config.effectConfig.devices);
      setLeft(usedDevices);
      setRight(unusedDevices);
    } else if (leftLength === 0 && rightLength === 0) {
      // setRight(filteredDevices);
      setRight(getAvailableDevices(filteredDevices));
    }
  }, [config, devices, leftLength, rightLength, isEditing]);

  useEffect(() => {
  }, [left, right]);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatchEffects({ type: 'DELETE_SCENE_EFFECT', effectConfig });
  };

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedLeft = () => {
    const leftDevices = left.concat(rightChecked);
    const rightDevices = not(right, rightChecked);
    const checkedDevices = not(checked, rightChecked);
    const toGlobalLeft = [];

    leftDevices.forEach((device) => {
      const newDevice = {
        id: device.id,
        effectId: effectConfig.id,
        effectType: effectConfig.type,
        on: effectConfig.on,
      };
      toGlobalLeft.push(newDevice);
    });

    const newGlobalLeft = getNotUsedDevices(globalLeft, toGlobalLeft);
    setGlobalLeft([...toGlobalLeft, ...newGlobalLeft]);
    setLeft(leftDevices);
    // setRight(rightDevices);
    setRight(getAvailableDevices(rightDevices));
    setChecked(checkedDevices);

    dispatchScenes({
      type: 'UPDATE_TRANSFER_LIST_STATE',
      devices: leftDevices,
      config: effectConfig,
    });
  };

  const handleCheckedRight = () => {
    const leftDevices = not(left, leftChecked);
    const rightDevices = right.concat(leftChecked);
    const checkedDevices = not(checked, leftChecked);
    const newGlobalLeft = getNotUsedDevices(globalLeft, rightDevices);

    setGlobalRight(leftChecked);
    setGlobalLeft(newGlobalLeft);
    setRight(rightDevices);
    setLeft(leftDevices);
    setChecked(checkedDevices);
    dispatchScenes({
      type: 'UPDATE_TRANSFER_LIST_STATE',
      devices: leftDevices,
      config: effectConfig,
    });
  };

  // useEffect(() => {
  //   console.log('re-rendering...')
  // const filteredRight = getNotUsedDevices(right, globalLeft);

  // const filteredRight = right.filter((notUsedDevice) =>
  //   globalLeft.filter((usedDevice) => {
  //     console.log(!usedDevice.effectType)
  //     return !usedDevice.effectType
  //   }));

  // const filteredGlobalLeft = globalLeft.filter((g) => {
  //   // console.log(g)
  //   // console.log(effectConfig)
  //   return g.effectType === effectConfig.type;
  // });

  //   const unavailableDevices = globalLeft.filter((g) => g.effectType === effectConfig.type && g.effectId !== effectConfig.id);
  //   const availableDevices = getNotUsedDevices(right, unavailableDevices);
  //   availableDevices.sort((a, b) => {
  //     const keyA = a.name.toLowerCase();
  //     const keyB = b.name.toLowerCase();
  //     if (keyA === keyB) {
  //       if (a.id < b.id) {
  //         return -1;
  //       }
  //       if (a.id > b.id) {
  //         return 1;
  //       }
  //     }
  //     if (keyA < keyB) {
  //       return -1;
  //     }
  //     return 1;
  //   });
  //
  //   console.log(`configId: ${config.effectConfig.id} | type: ${effectConfig.type} | name: ${effectConfig.name} | value: ${effectConfig.slider}`);
  //   availableDevices.forEach((d) => console.log(`id: ${d.id} | name: ${d.name}`))
  //   // console.log(JSON.stringify(availableDevices));
  //   // console.log(JSON.stringify(sort(availableDevices)));
  //
  //   // setRight(filteredRight);
  //   // console.log(`configId: ${config.effectConfig.id} | type: ${config.effectConfig.type}  | name: ${config.effectConfig.name} | value: ${config.effectConfig.slider}`);
  //   // console.log(JSON.stringify(filteredRight));
  // }, [globalLeft]);

  const gridClasses = useGridStyles();

  const customList = (title, items) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={(
          <Checkbox
            color="default"
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        )}
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${`${value}-${value.id}`}-label`;
          return (
            <ListItem
              key={value.id}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  color="default"
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.name} secondary={value.roomName} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <Grid item xs={12} sm={12} md={6} lg={6} className={!effectConfig.visible ? 'display-none' : undefined}>
      <Paper elevation={3} className={gridClasses.paper}>
        <Grid container spacing={0}>
          <div className="transfer-list-header-max-width">
            <div className="transfer-list-header">
                <span>
                  {effectConfig.name}
                  {' '}
                  {(effectConfig.type !== 3) ? effectConfig.slider : undefined}
                  {' '}
                  {getMeasureUnit(effectConfig)}
                </span>
              <i
                className="material-icons btn-icon-transfer-list right"
                onClick={(e) => handleDelete(e)}
              >
                {' '}
                highlight_off
              </i>
            </div>
          </div>
        </Grid>
        <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
          <Grid item>{customList('Controlling', left)}</Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handleCheckedRight}
                disabled={leftChecked.length === 0}
                aria-label="move selected right"
              >
                &gt;
              </Button>
              <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handleCheckedLeft}
                disabled={rightChecked.length === 0}
                aria-label="move selected left"
              >
                &lt;
              </Button>
            </Grid>
          </Grid>
          <Grid item>{customList('Not controlling', right)}</Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};
export { TransferList as default };
