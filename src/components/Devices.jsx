// import React from 'react';
import '../App.css';
import './css/collapsible-component.css';
import './css/collapsible-devices.css';
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

export default Devices;
