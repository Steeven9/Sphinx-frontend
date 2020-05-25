import React, { useEffect } from 'react';
import '../css/App.css';
import '../css/devices.css';
import '../css/editPages.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';
import { getDeviceTypeName } from '../helpers/getDeviceMetadataHelper';

const ColorCircularProgress = withStyles({ root: { color: '#580B71' } })(CircularProgress);

const EditSensor = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [isValid, setIsValid] = React.useState(false);
  const [showMessage, setShowMessage] = React.useState(false);
  const [device, setDevice] = React.useState({});
  const [value, setValue] = React.useState(0);
  const [tolerance, setTolerance] = React.useState(0);

  // Get's measure unit for values according to sensor type
  function getMeasureUnit(type) {
    switch (type) {
      case 9: // TempSensor
      case 11: // Thermostat
        return '°C';
      case 8: // LightSensor
        return 'lm';
      case 7: // HumiditySensor
      case 10: // MovementSensor
      default:
        return '%';
    }
  }

  // Checks validity to save
  useEffect(() => {
      if (showMessage) {
        if (device.type !== 10) {
          if (value > 0 && tolerance > 0 && value <= 100 && tolerance <= 100) {
            setIsValid(true);
          } else if (value <= 0 || tolerance <= 0) {
            setShowMessage(false);
          } else {
            setIsValid(false);
          }
        }

        if (device.type === 10) {
          if (value > 0 && value <= 100) {
            setIsValid(true);
          }
          if (isError) {
            setShowMessage(true);
          }
        }
      }
    },
    [device, value, tolerance, isError, showMessage]);

  // Extracts value is isLoading on change
  useEffect(() => {
    setShowMessage(false);
  }, [isLoading]);

  // Fetches devices and room info on page load
  useEffect(() => {
    const params = (new URL(document.location)).searchParams;
    const fetchUrl = `${window.location.protocol}//${window.location.hostname}:8080/devices/${params.get('id')}`;
    const headers = {
      user: localStorage.getItem('username'),
      'session-token': localStorage.getItem('session_token'),
    };

    fetch(fetchUrl, {
      method: 'GET',
      headers,
    })
    .then((res) => {
      if (res.status === 401) {
        this.props.logOut(1);
      } else if (res.status === 200) {
        return res.text();
      } else if (res.status === 404) {
        return null;
      }
      return null;
    })
    .then((data) => {
      const fetchedDevice = JSON.parse(data);
      if (fetchedDevice === null) {
        setIsError(true);
        setIsLoading(false);
      } else {
        setDevice(fetchedDevice);
        setIsLoading(false);
      }
    })
    .catch((e) => {
      console.log(e);
    });
  }, []);

  function updateDevice() {
    if (isValid) {
      const params = (new URL(document.location)).searchParams;
      const fetchUrl2 = `${window.location.protocol}//${window.location.hostname}:8080/devices/${params.get('id')}`;
      // const fetchUrl = `${window.location.protocol}//${window.location.hostname}:8080/devices/${params.get('id')}`;
      const headers = {
        user: localStorage.getItem('username'),
        'session-token': localStorage.getItem('session_token'),
      };

      setIsLoading(true);
      setIsValid(false);
      fetch(fetchUrl2, {
        // fetch(fetchUrl, {
        method: 'PUT',
        headers,
        body: {
          sensorValue: value,
          sensorTolerance: tolerance,
        },
      })
      .then((res) => {
        setIsLoading(false);
        if (res.status === 401) {
          this.props.logOut(1);
        } else if (res.status === 200) {
          setSuccess(true);
          setShowMessage(true);
          return res.text();
        } else if (res.status === 400) {
          setSuccess(false);
        } else if (res.status === 404) {
          setIsError(true);
        }
        setShowMessage(true);
        return null;
      })
      .catch((e) => {
        setIsLoading(false);
        setIsError(true);
        setShowMessage(true);
        console.log(e);
      });
    }
  }

  /**
   * Display feedback message
   */
  function showFeedbackMessage() {
    if (showMessage) {
      if (!isValid && !isError) {
        if (device.type === 10) {
          return (
            <p className="enter-text error-message">Please fill with values between 0.01 and 100.00</p>
          );
        }
      }

      if (isValid || !isValid) {
        if (isError) {
          return (
            <p className="enter-text error-message">There was an error!</p>
          );
        }
      }

      if (success) {
        return (
          <p className="enter-text success-message">Values successfully saved!</p>
        );
      }
    }
    return (<p>&nbsp;</p>);
  }

  return (
    <div>
      <div id="addDeviceInfo" className="device-content-box z-depth-2">
        <h2 className="title">Set sensor custom values</h2>

        <div id={device.id} className="collapsible-header no-border">
          <form id="devicesForm" className="device-form row">

            <div className="col col-custom l7 icons-wrapper">
              <i className="material-icons l1" />
              <div className="icon-device l1">
                <img src={device.icon} alt={device.name} />
              </div>

              <div className="device-info col col-custom l12 left-align">
                <p className="device-name">{device.name}</p>
                <p className="device-location">{device.roomName}</p>
                <p className="device-type-name">{getDeviceTypeName(device.type)}</p>
              </div>
            </div>

            <div className="device-control col col-custom l5">
              {device.type === 10 && <div className="col l4" />}
              <div className="col l4">
                <label>Value</label>
                <input
                  className="scenes-factory-effect-value-input"
                  type="number"
                  min="0"
                  max="100"
                  onChange={(e) => {
                    setValue(e.target.value);
                    setShowMessage(true);
                  }}
                  placeholder="0.0"
                  required
                />
              </div>
              <label className="col l1 scene-effect-value-label">{getMeasureUnit(device.type)}</label>
              <div className="col l1 scene-effect-value-label">
                &nbsp;
              </div>
              {device.type !== 10
               && (
                 <>
                   <div className="col l4">
                     <label>&plusmn;Tolerance</label>
                     <input
                       className="scenes-factory-effect-value-input"
                       type="number"
                       onChange={(e) => {
                         setTolerance(e.target.value);
                         setShowMessage(true);
                       }}
                       min="0"
                       max="100"
                       placeholder="&plusmn; 0.0"
                       required
                     />
                   </div>
                   <label className="col l1 scene-effect-value-label">{getMeasureUnit(device.type)}</label>
                 </>
               )}
            </div>

          </form>
        </div>
        <div className="message-one-lines center-text center row">
          <div className="col l12 loading-spacer">
            <ColorCircularProgress className={isLoading ? 'loading-spinner' : 'loading-spinner hidden'} />
          </div>
          <div className="col l12">
            {showFeedbackMessage()}
          </div>
        </div>

        <div className="col l12 center">
          <button
            type="button"
            name="button"
            className="btn-secondary waves-effect waves-light btn"
            onClick={() => {
              window.location.href = '/simulations';
            }}
          >
            {success ? 'Go back' : 'Cancel'}
          </button>

          <button
            type="button"
            disabled={!isValid || isLoading}
            name=" button"
            className=" btn-primary waves-effect waves-light btn"
            onClick={() => updateDevice()}
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditSensor;
