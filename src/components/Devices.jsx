// import React from 'react';
import '../App.css';
import './collapsible-component.css';
import M from 'materialize-css';
import React, { Component } from "react";

import Switch from "react-switch";
import Slider from '@material-ui/core/Slider';

import iconSwitch from "./img/icons/switch.svg";
import iconSensorLight from "./img/icons/sensor-light.svg";
import iconDimmerMemory from "./img/icons/dimmer-memory.svg";
import iconTemperatureSensor from "./img/icons/sensor-temperature.svg";
import iconLightLed from "./img/icons/led-bulb-intensity.svg"
import iconBedSideLamp from "./img/icons/lamp-bed-side.svg"
import iconReadingLamp from "./img/icons/lamp-reading.svg"
import iconSmartPlug from "./img/icons/smart-plug.svg"
import iconMicrowaveOven from "./img/icons/other-microwave-oven.svg"


class PowerSwitch extends Component {
    constructor() {
        super();
        this.state = {checked: false};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(checked) {
        this.setState({checked});
    }

    render() {
        return (
            <label>
                <Switch onChange={this.handleChange} checked={this.state.checked} />
            </label>
        );
    }
}

class Devices extends React.Component {
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

// function addEventPropagation() {
        // let buttons1 = document.getElementsByClassName('MuiSlider-track');
        // let buttons2 = document.getElementsByClassName('MuiSlider-rail');
        // let buttons3 = document.getElementsByClassName('MuiSlider-thumb');
        // let buttons4 = document.getElementsByClassName('react-switch-handle');
        // let buttons5 = document.getElementsByClassName('btn-edit');

        // let buttons4 = document.getElementsByClassName('react-switch-handle');
        //
        // for (let i = 1; i < buttons4.length; i++) {
        //     buttons4[i].addEventListener('click', (e) => alert());
        // }
        //
        // function addEventPropagation(i) {
        //     i.addEventListener('click', (e) => alert());
        // }

    }


    render() {
        return (
            <div id="wrapper" className="devices">
                <main>
                    <article className="row">
                        <div id="content" className="flex-container">
                            <section className="content-box z-depth-2">
                                <div className="row">
                                    <h3 className="col l8 left-align headline-box">My devices</h3>
                                    <a href="/#" className="col l1 btn waves-effect waves-light btn-primary-circular right">+</a>
                                </div>

                                    <ul className="collapsible expandable expandable-component">
                                        {/* Parent dimmable device */}
                                        <li className="row">
                                            <div id="" className="collapsible-header device-parent">
                                                <div className="col l6 m6 s12">
                                                    <div className="col l12 s1 icons-wrapper">
                                                        <i className="material-icons l1">more_vert</i>
                                                        <div className="icon-device l1">
                                                            <img className="" src={iconDimmerMemory} alt="Dimmer with memory"></img>
                                                        </div>
                                                        <div className="device-info col l12 m6 s12 left-align">
                                                            <p className="device-name">Dimmer with memory</p>
                                                            <p className="device-location">Master bedroom</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="device-control col l6 m6 s12">
                                                    <div className="col l8 m6 s6">
                                                        <Slider className="slider" valueLabelDisplay="auto" defaultValue={65}/>
                                                    </div>
                                                    <div className="col l4">
                                                        <div className="switch col l2 m8 s10 right-align">
                                                            <PowerSwitch />
                                                        </div>
                                                        <div className="col l2 m1 s1 right-align">
                                                            <i className="material-icons btn-edit">edit</i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* If device is parent render here its nested devices */}
                                            <ul className="collapsible-body">
                                                {/* Child device */}
                                                <div id="" className="collapsible-header device-child">
                                                    <div className="col l6 m6 s12">
                                                        <div className="col l12 s1 icons-wrapper">
                                                            <i className="material-icons l1 muted-icon">arrow_right</i>
                                                            <div className="icon-device l1">
                                                                <img className="" src={iconBedSideLamp} alt="Bed-side lamp"></img>
                                                            </div>
                                                            <div className="device-info col l12 m6 s12 left-align">
                                                                <p className="device-name">Bed-side lamp</p>
                                                                <p className="device-location is-child">Master bedroom</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="device-control col l6 m6 s12">
                                                        <div className="col l8 m6 s6">
                                                            <Slider className="no-slider" valueLabelDisplay="auto" defaultValue={65}/>
                                                        </div>
                                                        <div className="col l4">
                                                            <div className="switch col l2 m8 s10 right-align">
                                                                <PowerSwitch />
                                                            </div>
                                                            <div className="col l2 m1 s1 right-align">
                                                                <i className="material-icons btn-edit">edit</i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Child device */}
                                                <div id="" className="collapsible-header device-child">
                                                    <div className="col l6 m6 s12">
                                                        <div className="col l12 s1 icons-wrapper">
                                                            <i className="material-icons l1 muted-icon">arrow_right</i>
                                                            <div className="icon-device l1">
                                                                <img className="" src={iconLightLed} alt="LED bulb"></img>
                                                            </div>
                                                            <div className="device-info col l12 m6 s12 left-align">
                                                                <p className="device-name">LED bulb</p>
                                                                <p className="device-location is-child">Master bedroom</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="device-control col l6 m6 s12">
                                                        <div className="col l8 m6 s6">
                                                            <Slider className="slider" valueLabelDisplay="auto" defaultValue={90}/>
                                                        </div>
                                                        <div className="col l4">
                                                            <div className="switch col l2 m8 s10 right-align">
                                                                <PowerSwitch />
                                                            </div>
                                                            <div className="col l2 m1 s1 right-align">
                                                                <i className="material-icons btn-edit">edit</i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ul>
                                        </li>

                                        {/* Parent switch device */}
                                        <li className="row">
                                            <div id="" className="collapsible-header device-parent">
                                                <div className="col l6 m6 s12">
                                                    <div className="col l12 s1 icons-wrapper">
                                                        <i className="material-icons l1">more_vert</i>
                                                        <div className="icon-device l1">
                                                            <img className="" src={iconSmartPlug} alt="Smart plug"></img>
                                                        </div>
                                                        <div className="device-info col l12 m6 s12 left-align">
                                                            <p className="device-name">SmartPlug</p>
                                                            <p className="device-location">Kitchen</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="device-control col l6 m6 s12">
                                                    <div className="col l8 m6 s6">
                                                        <div className="col l8 s8 display-info display-active">
                                                            <i className="col l2 s2 material-icons btn-reset">rotate_left</i>
                                                            <span>350 kWh</span>
                                                        </div>
                                                    </div>
                                                    <div className="col l4">
                                                        <div className="switch col l2 m8 s10 right-align">
                                                            <PowerSwitch />
                                                        </div>
                                                        <div className="col l2 m1 s1 right-align">
                                                            <i className="material-icons btn-edit">edit</i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* If device is parent render here its nested devices */}
                                            <ul className="collapsible-body">
                                                {/* Child device */}
                                                <div id="" className="collapsible-header device-child">
                                                    <div className="col l6 m6 s12">
                                                        <div className="col l12 s1 icons-wrapper">
                                                            <i className="material-icons l1 muted-icon">arrow_right</i>
                                                            <div className="icon-device l1">
                                                                <img className="" src={iconMicrowaveOven} alt="Microwaveoven"></img>
                                                            </div>
                                                            <div className="device-info col l12 m6 s12 left-align">
                                                                <p className="device-name">Microwave oven</p>
                                                                <p className="device-location is-child">Kitchen</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="device-control col l6 m6 s12">
                                                        <div className="col l8 m6 s6">
                                                            <Slider className="no-slider" valueLabelDisplay="auto" defaultValue={65}/>
                                                        </div>
                                                        <div className="col l4">
                                                            <div className="no-switch col l2 m8 s10 right">
                                                            </div>
                                                            <div className="col l2 m1 s1 right">
                                                                <i className="material-icons btn-edit">edit</i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ul>
                                        </li>

                                        {/* Independent device */}
                                        <li className="row">
                                            <div id="" className="collapsible-header">
                                                <div className="col l6 m6 s12">
                                                    <div className="col l12 s1 icons-wrapper">
                                                        <i className="material-icons l1"></i>
                                                        <div className="icon-device l1">
                                                            <img className="" src={iconReadingLamp} alt="reading lamp"></img>
                                                        </div>
                                                        <div className="device-info col l12 m6 s12 left-align">
                                                            <p className="device-name">Reading lamp</p>
                                                            <p className="device-location">Guest room</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="device-control col l6 m6 s12">
                                                    <div className="col l8 m6 s6">
                                                        <Slider className="no-slider" valueLabelDisplay="auto" defaultValue={0}/>
                                                    </div>
                                                    <div className="col l4">
                                                        <div className="switch col l2 m8 s10 right-align">
                                                            <PowerSwitch />
                                                        </div>
                                                        <div className="col l2 m1 s1 right-align">
                                                            <i className="material-icons btn-edit">edit</i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>

                                        {/* Sensor device */}
                                        <li className="row">
                                            <div id="" className="collapsible-header">
                                                <div className="col l6 m6 s12">
                                                    <div className="col l12 s1 icons-wrapper">
                                                        <i className="material-icons l1"></i>
                                                        <div className="icon-device l1">
                                                            <img className="" src={iconSensorLight} alt="Light sensor"></img>
                                                        </div>
                                                        <div className="device-info col l12 m6 s12 left-align">
                                                            <p className="device-name">Light sensor</p>
                                                            <p className="device-location">Living room</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="device-control col l6 m6 s12">
                                                    <div className="col l8 m6 s6">
                                                        <div className="col l8 s8 display-info display-active">
                                                            <span>2'000 lm</span>
                                                        </div>
                                                    </div>
                                                    <div className="row l1">
                                                        <div className="col">
                                                            {/*<div className="no-switch col l2 m8 s1 right-align">*/}
                                                            {/*    <PowerSwitch />*/}
                                                            {/*</div>*/}
                                                            <div className="col l2 m1 s12">
                                                                <i className="material-icons btn-edit btn-edit-no-switch">edit</i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>

                                    </ul>
                            </section>

                                        {/*/!* Parent switch device *!/*/}
                                        {/*<li className="row">*/}
                                        {/*    <div id="" className="collapsible-header device-parent">*/}
                                        {/*        <div className="icons-wrapper">*/}
                                        {/*            <i className="material-icons l1">more_vert</i>*/}
                                        {/*            <div className="icon-device">*/}
                                        {/*                <img className="l1" src={iconSmartPlug} alt="Dimmer with memory"></img>*/}
                                        {/*            </div>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="col l4">*/}
                                        {/*            <p className="device-name">SmartPlug</p>*/}
                                        {/*            <p className="device-location">Kitchen</p>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="col l5">*/}
                                        {/*            <Slider className="no-slider" valueLabelDisplay="auto" defaultValue={0}/>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="col l1">*/}
                                        {/*            <PowerSwitch />*/}
                                        {/*        </div>*/}
                                        {/*        <div className="col l1">*/}
                                        {/*            <i className="material-icons btn-edit">edit</i>*/}
                                        {/*        </div>*/}
                                        {/*    </div>*/}
                                        {/*    /!* If device is parent render here its nested devices *!/*/}
                                        {/*    <ul className="collapsible-body">*/}

                                        {/*        /!* Child device *!/*/}
                                        {/*        <li id="" className="row">*/}
                                        {/*            <div className="collapsible-header device-child">*/}
                                        {/*                <div className="icons-wrapper l1">*/}
                                        {/*                    <i className="material-icons muted-icon">arrow_right</i>*/}
                                        {/*                    <div className="icon-device">*/}
                                        {/*                        <img className="" src={iconMicrowaveOven} alt="Bed-side lamp"></img>*/}
                                        {/*                    </div>*/}
                                        {/*                </div>*/}
                                        {/*                <div className="col l4">*/}
                                        {/*                    <p className="device-name">Microwave oven</p>*/}
                                        {/*                    <p className="device-location is-child">Kitchen</p>*/}
                                        {/*                </div>*/}
                                        {/*                <div className="col l5">*/}
                                        {/*                    <Slider className="no-slider" valueLabelDisplay="auto" defaultValue={0}/>*/}
                                        {/*                </div>*/}
                                        {/*                <div className="col l1 no-switch">*/}
                                        {/*                    <PowerSwitch class=""/>*/}
                                        {/*                </div>*/}
                                        {/*                <div className="col l1">*/}
                                        {/*                    <i className="material-icons btn-edit">edit</i>*/}
                                        {/*                </div>*/}
                                        {/*            </div>*/}
                                        {/*        </li>*/}
                                        {/*    </ul>*/}
                                        {/*</li>*/}

                                        {/*/!* Independent device *!/*/}
                                        {/*<li id="" className="row">*/}
                                        {/*    <div className="collapsible-header">*/}
                                        {/*        <div className="icons-wrapper l1">*/}
                                        {/*            <i className="material-icons"></i>*/}
                                        {/*            <div className="icon-device">*/}
                                        {/*                <img className="" src={iconReadingLamp} alt="reading lamp"></img>*/}
                                        {/*            </div>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="col l4">*/}
                                        {/*            <p className="device-name">Reading lamp</p>*/}
                                        {/*            <p className="device-location">Guest room</p>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="col l5">*/}
                                        {/*        </div>*/}
                                        {/*        <div className="col l1">*/}
                                        {/*            <PowerSwitch />*/}
                                        {/*        </div>*/}
                                        {/*        <div className="col l1">*/}
                                        {/*            <i className="material-icons btn-edit">edit</i>*/}
                                        {/*        </div>*/}
                                        {/*    </div>*/}
                                        {/*</li>*/}

                                        {/*/!* Sensor device *!/*/}
                                        {/*<li className="row">*/}
                                        {/*    <div className="collapsible-header">*/}
                                        {/*        <div className="icons-wrapper l1">*/}
                                        {/*            <i className="material-icons"></i>*/}
                                        {/*            <div className="icon-device">*/}
                                        {/*                <img className="" src={iconSensorLight} alt="switch"></img>*/}
                                        {/*            </div>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="col l4">*/}
                                        {/*            <p className="device-name">Light sensor</p>*/}
                                        {/*            <p className="device-location">Living room</p>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="col l4"></div>*/}
                                        {/*        <div className="col l2">*/}
                                        {/*            <div className="sensor-value display-active">2,000 lm</div>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="col l1">*/}
                                        {/*            <i className="material-icons btn-edit">edit</i>*/}
                                        {/*        </div>*/}
                                        {/*    </div>*/}
                                        {/*</li>*/}

                                        {/*/!* Sensor device (inactive) *!/*/}
                                        {/*<li id="" className="row">*/}
                                        {/*    <div className="collapsible-header">*/}
                                        {/*        <div className="icons-wrapper l1">*/}
                                        {/*            <i className="material-icons"></i>*/}
                                        {/*            <div className="icon-device">*/}
                                        {/*                <img className="" src={iconTemperatureSensor} alt="temperature sensor"></img>*/}
                                        {/*            </div>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="col l4">*/}
                                        {/*            <p className="device-name">Temperature sensor</p>*/}
                                        {/*            <p className="device-location">Guest room</p>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="col l4"></div>*/}
                                        {/*        <div className="col l2">*/}
                                        {/*            <div className="sensor-value display-inactive">---</div>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="col l1">*/}
                                        {/*            <i className="material-icons btn-edit">edit</i>*/}
                                        {/*        </div>*/}
                                        {/*    </div>*/}
                                        {/*</li>*/}
                                    {/*</ul>*/}
                                    {/*</ul>*/}
                                {/*<div className="center">*/}
                                {/*    <a href="/#" className="waves-effect waves-light btn btn-secondary col l5">Cancel</a>*/}
                                {/*    <a href="/#" className="waves-effect waves-light btn btn-secondary col l5">Secondary action</a>*/}
                                {/*    <a href="/#" className="waves-effect waves-light btn btn-primary col l5">Main action</a>*/}
                                {/*</div>*/}
                            {/*</section>*/}
                        </div>
                    </article>
                </main>
            </div>
        );
    }
}

export default Devices;