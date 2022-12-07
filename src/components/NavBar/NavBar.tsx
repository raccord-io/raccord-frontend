import React, { Component } from 'react';
import './index.css';
import { theme } from '../../constants/theme';
import { Button } from 'antd';
import logo from '../../assets/logo192.png';

class NavBar extends Component {
  render(): React.ReactNode {
    return (
      <div className="NavBar" style={{ backgroundColor: theme.palette.primary }}>
        <div className="NavBar-logo">
          <img className="logo" src={logo} alt="Fast Clap logo" />
        </div>
        <div className="NavBar-menu">
          <a className="NavBar-menu-item" href="#">
            Accueil
          </a>
          <a className="NavBar-menu-item" href="#">
            À propos
          </a>
          <a className="NavBar-menu-item" href="#">
            Contact
          </a>
        </div>
        <Button type="primary" href="/projects">
          Se Connecter
        </Button>
      </div>
    );
  }
}

export default NavBar;
