import React, { Component } from 'react';
import './index.css';
import { theme } from '../../constants/theme';
import logo from '../../assets/logo192.png';

class NavBarApp extends Component {
  render(): React.ReactNode {
    return (
      <div className="NavBar" style={{ backgroundColor: theme.palette.primary }}>
        <div className="NavBar-logo">
          <img className="logo" src={logo} alt="Fast Clap logo" />
        </div>
        <div className="NavBar-menu">
          <a className="NavBar-menu-item" href="#">
            Projets
          </a>
        </div>
        <p>Clément</p>
      </div>
    );
  }
}

export default NavBarApp;
