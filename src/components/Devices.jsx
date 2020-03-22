// import React from 'react';
import './css/App.css';
import './css/collapsible-component.css';
import './css/collapsible-devices.css';
import M from 'materialize-css';
import React, { Component, useState, useEffect, useReducer} from "react";
import DevicesPanel from './devices/DevicesPanel'


function Devices () {
    return(
        <div id="wrapper" className="devices">
            <main>
                <article className="row row-collapsible row row-collapsible-custom">
                    <div id="content" className="">
                        <section className="content-box-collapsible z-depth-2">
                            <div className="headline-box row row-collapsible row row-collapsible-custom">
                                <h3 className="col col-collapsible l8 left-align headline-title">My devices</h3>
                                <a href="/addDevices" className="col col-collapsible l1 btn waves-effect waves-light btn-primary-circular right">+</a>
                            </div>
                            <ul className="collapsible expandable expandable-component">
                                <DevicesPanel />
                            </ul>
                        </section>
                    </div>
                </article>
            </main>
        </div>
    )
}

class DeviceZ extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // placeholder
        };

        // Inits Materialize JS component
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.collapsible.expandable');
            M.Collapsible.init(elems, {accordion: false});
        });
    }

    /**
     * TODO
     */
    render() {
        return (
            <div id="wrapper" className="devices">
                <main>
                    <article className="row row-collapsible row row-collapsible-custom">
                        <div id="content" className="">
                            <section className="content-box-collapsible z-depth-2">
                                <div className="headline-box row row-collapsible row row-collapsible-custom">
                                    <h3 className="col col-collapsible l8 left-align headline-title">My devices</h3>
                                    <a href="/#" className="col col-collapsible l1 btn waves-effect waves-light btn-primary-circular right">+</a>
                                </div>

                                <ul className="collapsible expandable expandable-component">
                                    {/* Parent dimmable device */}
                                    <li className="row row-collapsible row row-collapsible-custom">
                                        <div id="" className="collapsible-header device-parent">
                                            <div className="col col-collapsible l6 m6 s12">
                                                <div className="col col-collapsible l12 s1 icons-wrapper">
                                                    <i className="material-icons l1">more_vert</i>
                                                    <div className="icon-device l1">
                                                        <img className="" src={iconDimmerState} alt="Dimmer with memory"></img>
                                                    </div>
                                                    <div className="device-info col col-collapsible l12 m6 s12 left-align">
                                                        <p className="device-name">Dimmer with memory</p>
                                                        <p className="device-location">Master bedroom</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="device-control col col-collapsible l6 m6 s12">
                                                <div className="col col-collapsible l8 m6 s8">
                                                    <Slider className="slider" valueLabelDisplay="auto" defaultValue={65}/>
                                                </div>
                                                <div className="col col-collapsible l4 device-control-switch">
                                                    <div className="switch col col-collapsible l2 m8 s11 right-align">
                                                        <PowerSwitch />
                                                    </div>
                                                    <div className="col col-collapsible l2 m1 s1 right-align">
                                                        <i className="material-icons btn-edit">edit</i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* If device is parent render here its nested devices */}
                                        <ul className="collapsible-body">
                                            {/* Child device */}
                                            <div id="" className="collapsible-header device-child">
                                                <div className="col col-collapsible l6 m6 s12">
                                                    <div className="col col-collapsible l12 s1 icons-wrapper">
                                                        <i className="material-icons l1 muted-icon">arrow_drop_up</i>
                                                        <div className="icon-device l1">
                                                            <img className="" src={iconLedBulb} alt="LED bulb"></img>
                                                        </div>
                                                        <div className="device-info col col-collapsible l12 m6 s12 left-align">
                                                            <p className="device-name">LED bulb</p>
                                                            <p className="device-location is-child">Master bedroom</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="device-control col col-collapsible l6 m6 s12">
                                                    <div className="col col-collapsible l8 m6 s8">
                                                        <Slider className="slider" valueLabelDisplay="auto" defaultValue={80}/>
                                                    </div>
                                                    <div className="col col-collapsible l4 device-control-switch">
                                                        <div className="switch col col-collapsible l2 m8 s11 right-align">
                                                            <PowerSwitch />
                                                        </div>
                                                        <div className="col col-collapsible l2 m1 s1 right-align">
                                                            <i className="material-icons btn-edit">edit</i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </ul>
                                    </li>

                                    {/* Parent switch device */}
                                    <li className="row row-collapsible row row-collapsible-custom">
                                        <div id="" className="collapsible-header device-parent">
                                            <div className="col col-collapsible l6 m6 s12">
                                                <div className="col col-collapsible l12 s1 icons-wrapper">
                                                    <i className="material-icons l1">more_vert</i>
                                                    <div className="icon-device l1">
                                                        <img className="" src={iconSwitch} alt="OriginalSwitch"></img>
                                                    </div>
                                                    <div className="device-info col col-collapsible l12 m6 s12 left-align">
                                                        <p className="device-name">OriginalSwitch</p>
                                                        <p className="device-location">Kitchen</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="device-control col col-collapsible l6 m6 s12">
                                                <div className="col col-collapsible l8 m6 s8">
                                                    <Slider className="no-slider" valueLabelDisplay="auto" defaultValue={0}/>
                                                </div>
                                                <div className="col col-collapsible l4 device-control-switch">
                                                    <div className="switch col col-collapsible l2 m8 s11 right-align">
                                                        <PowerSwitch />
                                                    </div>
                                                    <div className="col col-collapsible l2 m1 s1 right-align">
                                                        <i className="material-icons btn-edit">edit</i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* If device is parent render here its nested devices */}
                                        <ul className="collapsible-body">
                                            {/* Child device */}
                                            <div id="" className="collapsible-header device-child">
                                                <div className="col col-collapsible l6 m6 s12">
                                                    <div className="col col-collapsible l12 s1 icons-wrapper">
                                                        <i className="material-icons l1 muted-icon">arrow_drop_up</i>
                                                        <div className="icon-device l1">
                                                            <img className="" src={iconMicrowaveOven} alt="Microwaveoven"></img>
                                                        </div>
                                                        <div className="device-info col col-collapsible l12 m6 s12 left-align">
                                                            <p className="device-name">Microwave oven</p>
                                                            <p className="device-location is-child">Kitchen</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="device-control col col-collapsible l6 m6 s12">
                                                    <div className="col col-collapsible l8 m6 s8">
                                                        <Slider className="no-slider" valueLabelDisplay="auto" defaultValue={65}/>
                                                    </div>
                                                    <div className="col col-collapsible l4 device-control-switch">
                                                        <div className="switch col col-collapsible l2 m8 s11 right-align">
                                                            <PowerSwitch />
                                                        </div>
                                                        <div className="col col-collapsible l2 m1 s1 right-align">
                                                            <i className="material-icons btn-edit">edit</i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </ul>
                                    </li>

                                    {/* Independent device xxx */}
                                    <li className="row row-collapsible row row-collapsible-custom">
                                        <div id="" className="collapsible-header">
                                            <div className="col col-collapsible l6 m6 s12">
                                                <div className="col col-collapsible l12 s1 icons-wrapper">
                                                    <i className="material-icons l1"></i>
                                                    <div className="icon-device l1">
                                                        <img className="" src={iconBedSideLamp} alt="Dimmer with memory"></img>
                                                    </div>
                                                    <div className="device-info col col-collapsible l12 m6 s12 left-align">
                                                        <p className="device-name">Bed-side lamp</p>
                                                        <p className="device-location">Master bedroom</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="device-control col col-collapsible l6 m6 s12">
                                                <div className="col col-collapsible l8 m6 s8">
                                                    <Slider className="slider" valueLabelDisplay="auto" defaultValue={0}/>
                                                </div>
                                                <div className="col col-collapsible l4 device-control-switch">
                                                    <div className="switch col col-collapsible l2 m8 s11 right-align">
                                                        <PowerSwitch />
                                                    </div>
                                                    <div className="col col-collapsible l2 m1 s1 right-align">
                                                        <i className="material-icons btn-edit">edit</i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                    {/* Independent device */}
                                    <li className="row row-collapsible row row-collapsible-custom">
                                        <div id="" className="collapsible-header">
                                            <div className="col col-collapsible l6 m6 s12">
                                                <div className="col col-collapsible l12 s1 icons-wrapper">
                                                    <i className="material-icons l1"></i>
                                                    <div className="icon-device l1">
                                                        <img className="" src={iconReadingLamp} alt="reading lamp"></img>
                                                    </div>
                                                    <div className="device-info col col-collapsible l12 m6 s12 left-align">
                                                        <p className="device-name">Reading lamp</p>
                                                        <p className="device-location">Guest room</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="device-control col col-collapsible l6 m6 s12">
                                                <div className="col col-collapsible l8 m6 s8">
                                                    <Slider className="no-slider" valueLabelDisplay="auto" defaultValue={0}/>
                                                </div>
                                                <div className="col col-collapsible l4 device-control-switch">
                                                    <div className="switch col col-collapsible l2 m8 s11 right-align">
                                                        <PowerSwitch />
                                                    </div>
                                                    <div className="col col-collapsible l2 m1 s1 right-align">
                                                        <i className="material-icons btn-edit">edit</i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                    {/* SmartPlug device */}
                                    <li className="row row-collapsible row row-collapsible-custom">
                                        <div id="" className="collapsible-header">
                                            <div className="col col-collapsible l6 m6 s12">
                                                <div className="col col-collapsible l12 s1 icons-wrapper">
                                                    <i className="material-icons l1"></i>
                                                    <div className="icon-device l1">
                                                        <img className="" src={iconSmartPlug} alt="Smart plug"></img>
                                                    </div>
                                                    <div className="device-info col col-collapsible l12 m6 s12 left-align">
                                                        <p className="device-name">SmartPlug</p>
                                                        <p className="device-location">Kitchen</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="device-control col col-collapsible l6 m6 s12">
                                                <div className="col col-collapsible l8 m6 s8">
                                                    <div className="col col-collapsible l8 s8 display-info display-active">
                                                        <i className="col col-collapsible l2 s2 material-icons btn-reset">rotate_left</i>
                                                        <span>350 kWh</span>
                                                    </div>
                                                </div>
                                                <div className="col col-collapsible l4 device-control-switch">
                                                    <div className="switch col col-collapsible l2 m8 s11 right-align">
                                                        <PowerSwitch />
                                                    </div>
                                                    <div className="col col-collapsible l2 m1 s1 right-align">
                                                        <i className="material-icons btn-edit">edit</i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                    {/* Sensor device */}
                                    <li className="row row-collapsible">
                                        <div id="" className="collapsible-header">
                                            <div className="col col-collapsible l6 m6 s12">
                                                <div className="col col-collapsible l12 s1 icons-wrapper">
                                                    <i className="material-icons l1"></i>
                                                    <div className="icon-device l1">
                                                        <img className="" src={iconLightSensor} alt="Light sensor"></img>
                                                    </div>
                                                    <div className="device-info col col-collapsible l12 m6 s12 left-align">
                                                        <p className="device-name">Light sensor</p>
                                                        <p className="device-location">Living room</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="device-control col col-collapsible l6 m6 s12">
                                                <div className="col col-collapsible l8 m6 s8">
                                                    <div className="col col-collapsible l8 s8 display-info display-active">
                                                        <span>2'000 lm</span>
                                                    </div>
                                                </div>
                                                <div className="row row-collapsible l1">
                                                    <div className="">
                                                        {/*<div className="no-switch col col-collapsible l2 m8 s1 right-align">*/}
                                                        {/*    <PowerSwitch />*/}
                                                        {/*</div>*/}
                                                        <div className="col col-collapsible l2 m1 s1">
                                                            <i className="material-icons btn-edit btn-edit-no-switch">edit</i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                </ul>
                            </section>
                        </div>
                    </article>
                </main>
            </div>
        );
    }
}

export default Devices;
