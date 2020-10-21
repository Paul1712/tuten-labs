import React, { Component } from 'react';
import logo from '../assets/images/tuten-labs-logo.png';

class Header extends Component {
    render() {

        return (
            <header id="header">
                <div className="center">
                    {/* LOGO */}
                    <div id="logo">
                        <img src={logo} className="app-logo" alt="Logotipo" />
                        <span id="brand">
                            <strong>Web</strong>App
                        </span>
                    </div> 

                    {/* LIMPIAR FLOTADOS */}
                    <div className="clearfix"></div>
                </div>
            </header>
        );
    }
}

export default Header;