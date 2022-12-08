import React, { Component } from 'react';
import './Project-Card.css';
import { Card } from 'antd';

const { Meta } = Card;

type Props = {
  picture: string;
  title: string;
  description: string;
};

class ProjectCard extends Component<Props> {
  render() {
    return (
      <Card hoverable className="card" cover={<img alt="cover" src={this.props.picture} />}>
        <Meta title={this.props.title} description={this.props.description} />
      </Card>
    );
  }
}

export default ProjectCard;
