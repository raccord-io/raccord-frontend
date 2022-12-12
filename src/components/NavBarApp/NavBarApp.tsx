import React from 'react';
import './NavBarApp.css';
import { theme } from '../../constants/theme';

import { Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';

import logo from '../../assets/images/logo.png';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="/">
        Mes Projets
      </a>
    )
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="/">
        Paramètres
      </a>
    )
  },
  {
    type: 'divider'
  },
  {
    key: '3',
    danger: true,
    label: (
      <a rel="noopener noreferrer" href="/">
        Se déconnecter
      </a>
    )
  }
];

export function NavBarApp() {
  return (
    <div className="NavBar" style={{ backgroundColor: theme.palette.primary }}>
      <div className="NavBar-logo">
        <img className="logo" src={logo} alt="Fast Clap logo" />
      </div>
      {/* <div className="NavBar-menu">
        <a className="NavBar-menu-item" href="#">
          Projets
        </a>
      </div> */}
      <Dropdown menu={{ items }} placement="bottomRight" arrow trigger={['click']}>
        <Button>Clément</Button>
      </Dropdown>
    </div>
  );
}
