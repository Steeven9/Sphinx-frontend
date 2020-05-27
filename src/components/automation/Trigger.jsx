import React, { useContext } from 'react';
import '../../css/scenes.css';
import AutomationsContext from '../../context/automationsContext';
import { parse } from "query-string";

/**
 * Configurator to set scene conditionType and target values
 * @returns {*}
 * @constructor
 * @param blankTrigger
 * @param fetchedDevices
 */
const Trigger = (blankTrigger) => {
  const { trigger } = blankTrigger;
  const { devices } = blankTrigger;
  const { getRandomKey, dispatchTriggers } = useContext(AutomationsContext);
  const [device, setDevice] = React.useState({});
  const [sourceId, setSourceId] = React.useState(trigger.sourceId);
  const [conditionType, setConditionType] = React.useState(trigger.conditionType);
  const [value, setValue] = React.useState(trigger.value);
  const handleDelete = (e) => {
    e.preventDefault();
    dispatchTriggers({ type: 'DELETE_TRIGGER', trigger });
  };

  /**
   * Returns a device by its ID
   * @param deviceId
   * @returns {*}
   */
  function getDevice(deviceId) {
    return devices.filter((d) => d.id === deviceId)[0];
  }

  /**
   * Gets effect name by conditionType
   * @param conditionType
   * @returns {string}
   */
  function getEffectName() {
    switch (conditionType) {
      case 1:
        return 'Light intensity';
      case 2:
        return 'Temperature';
      case 3:
        return 'Power';
      case 4:
        return 'Curtains aperture';
      default:
        return 'Unknown effect conditionType';
    }
  }

  // Get's measure unit for values according to conditionType
  function getMeasureUnit(type) {
    switch (type) {
      case 8: // Light Sensors
        return 'lm';
      case 9: // Temp Sensors
        return '°C';
      default:
        return '%';
    }
  }

  /**
   * Gets input element according to scene conditionType
   * @returns {*}
   */
  function getValueInput() {
    if (conditionType === 5 || conditionType === 6) {
      return (
        <>
          <div className="col l7">
            <label>Value</label>
            <input
              className="scenes-factory-effect-value-input"
              type="number"
              min="0"
              // max="100"
              placeholder="0.0"
              value={trigger.value}
              required
              onChange={(e) => {
                setValue(e.target.value);
                trigger.value = e.target.value;
                trigger.effectValue = parseInt(e.target.value, 10);
                trigger.visible = true;

                dispatchTriggers({ conditionType: 'UPDATE_TRIGGER_STATE', trigger });
              }}
            />
          </div>
          <label className="col l1 scene-effect-value-label"> {getMeasureUnit()}</label>
        </>
      );
    }
    return (
      <div className=" col l7 scenes-factory-value-input" />
    );
  }

  /**
   * Generates drop down to select trigger
   * @returns {*}
   */
  function getTriggerFilter() {
    return (
      <div className=" col l12 effect-configuration">
        <div className=" col l5">
          <label>Source</label>
          <select
            required
            className=" browser-default"
            key={getRandomKey()}
            value={trigger.sourceId.toString()}
            // disabled={trigger.preexisting}
            onChange={(e) => {
              trigger.device = getDevice(parseInt(e.target.value, 10));
              trigger.sourceId = parseInt(e.target.value, 10);
              setDevice(trigger.device);
              setSourceId(trigger.device.id);
              setConditionType(parseInt(e.target.value, 10));
              dispatchTriggers({ conditionType: 'UPDATE_STATE' });
              trigger.preexisting = true;
            }}
          >
            <option value="0" disabled>Choose a device</option>
            {devices.map((d) =>
              <option key={getRandomKey()} value={d.id.toString()}>{`${d.name} - ${d.roomName}`}</option>)}
          </select>
        </div>
        {device
         && <div className=" col l4">
           <label>Trigger when</label>
           <select
             required
             className=" browser-default"
             key={getRandomKey()}
             value={trigger.conditionType.toString()}
             // disabled={trigger.conditionType}
             onChange={(e) => {
               console.log(trigger.conditionType)
               trigger.conditionType = parseInt(e.target.value, 10);
               setConditionType(trigger.conditionType);
               dispatchTriggers({ conditionType: 'UPDATE_STATE' });
               trigger.preexisting = true;
             }}
           >
             <option value="0" disabled>Choose a condition</option>
             {console.log('device.type: ' + device.type)}
             {(device.type === 1
               || device.type === 2
               || device.type === 3
               || device.type === 4
               || device.type === 6
               || device.type === 11
               || device.type === 13)
              && (
                <>
                  <option value="1">Power On</option>
                  <option value="2">Power Off</option>
                </>
              )}
             {device.type === 10
              && (
                <>
                  <option value="3">Motion detected</option>
                  <option value="4">Motion not detected</option>
                </>
              )}
             {(device.type === 2
               || device.type === 4
               || device.type === 7
               || device.type === 8
               || device.type === 9
               || device.type === 11
               || device.type === 12)
              && (
                <>
                  <option value="5">Over or equal to</option>
                  <option value="6">Under or equal to</option>
                </>
              )}
           </select>
         </div>
        }
        <div className="col l3">
          <div className="row">
            <div className="row">
              {getValueInput()}
              <div className="col l1">
                <i
                  className="scene-item material-icons btn-icon scene-effect-item"
                  onClick={(e) => handleDelete(e)}
                >
                  highlight_off
                </i>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }

  console.log(trigger.value)

  return (
    <>
      {getTriggerFilter()}
    </>
  );
};

export { Trigger as default };
