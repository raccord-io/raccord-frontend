import React from 'react';
import './ProjectCard.css';

import { Card } from 'antd';

const { Meta } = Card;

interface Props {
  picture: string;
  title: string;
  description: string;
}

export function ProjectCard(props: Props) {
  return (
    <div className="project-card-container">
      <Card
        hoverable
        className="card"
        cover={<img alt="cover" className="filmPicture" src={props.picture} />}
      >
        <Meta className="description" title={props.title} description={props.description} />
      </Card>
    </div>
  );
}
