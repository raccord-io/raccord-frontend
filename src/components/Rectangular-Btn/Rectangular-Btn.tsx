import React from 'react';
import './Rectangular-Btn.css';

import { Link } from 'react-router-dom';
import { Button } from 'antd';

type Props = {
  children: string;
};

export function RectangularBtn(props: Props) {
  return (
    <Link to="#">
      <Button type="primary" className="rectangular-btn">
        {props.children}
      </Button>
    </Link>
  );
}
