import React from 'react';
import { getDeviceTypeName } from '../../helpers/getDeviceMetadataHelper';


/**
 * Device factory that can create any type of device

 * @param device
 * @param isGuest
 * @returns {*}
 * @constructor
 */
const Device = ({ device }) => {
  /**
   * Calls the edit device page with the corresponding device ID
   * @param id {int}
   */
  function redirectToEdit(id) {
    if (device.type === 13) {
      window.location.href = `/editCamera?id=${id}`;
    } else {
      window.location.href = `/editDevice?id=${id}`;
    }
  }


  /**
   * Depending on device type, returns either an intensity slider, a SmartPlug's display or a Sensor's display
   * @param device {Device}
   * @returns {Slider|SmartPlug display|Sensor display}
   */
  function getButton() {
    switch (device.type) {
      case 7: // HumiditySensor
      case 8: // LightSensor
      case 9: // TempSensor
      case 10: // MotionSensor
        return (<></>);
      case 13: // SecurityCamera
        return (
          <div className="col col-custom l9 s8">
            <button
              type="button"
              name="button"
              disabled={!device.on}
              className={`waves-effect waves-light${device.on ? ' btn-video-active' : ' btn-video-inactive'}`}
              onClick={redirectToEdit(device.id)}
            >
              {(device.on ? 'Watch now' : 'No video feed')}
            </button>
          </div>
        );
      default:
        return (<></>);
    }
  }

  return (
    <div id={device.id}>
      <form id="devicesForm" className="device-form">
        <div className="col col-custom l6 m6 s12">
          <div className="col col-custom l12 s12 icons-wrapper">
            <i className="l1">
            </i>
            <div className="icon-device l1">
              <img src={device.icon} alt={device.name} />
            </div>
            <div className="device-info col col-custom l12 m6 s12 left-align">
              <p className="device-name">{device.name}</p>
              <p className="device-location">{device.roomName}</p>
              <p className="device-type-name">{getDeviceTypeName(device.type)}</p>
            </div>
          </div>
        </div>
        <div className="device-control col col-custom l6 m6 s12">
          <div className="col col-custom l8 m6 s8" />
          <div>
            hola
          </div>
        </div>
      </form>
    </div>
  );
};

export { Device as default };
