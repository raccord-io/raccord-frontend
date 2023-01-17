import React from 'react';
import './NavBar.css';
import { theme } from '../../constants/theme';

import { Button } from 'antd';

import logo from '../../assets/images/logo.png';
import { RectangularBtn } from '../Rectangular-Btn/Rectangular-Btn';

export function NavBar() {
  return (
    <div className="NavBar" style={{ backgroundColor: theme.palette.common.white }}>
      <div className="NavBar-logo">
        <img className="logo" src={logo} alt="Fast Clap logo" />
      </div>
      <div className="NavBar-menu" style={{ justifyContent: 'space-between' }}>
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
      <RectangularBtn color={theme.palette.green}>Se connecter</RectangularBtn>
    </div>
  );
}
