import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Rectangular-Btn.css';

import { Button } from 'antd';

type Props = {
  children: string;
};

class RectangularBtn extends Component<Props> {
  render() {
    return (
      <Link to="#">
        <Button type="primary" className="rectangular-btn">
          {this.props.children}
        </Button>
      </Link>
    );
  }
}

export default RectangularBtn;
