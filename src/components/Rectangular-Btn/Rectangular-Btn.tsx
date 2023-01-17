import React from 'react';
import './Rectangular-Btn.css';

import { Link } from 'react-router-dom';
import { Button } from 'antd';

type Props = {
  children: string;
  color: string;
};

export function RectangularBtn(props: Props) {
  return (
    <Link to="#">
      <Button type="primary" className="rectangular-btn" style={{ backgroundColor: props.color }}>
        {props.children}
      </Button>
    </Link>
  );
}
