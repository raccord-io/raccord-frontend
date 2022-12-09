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
    <Card
      hoverable
      className="card"
      cover={
        <div className="container-img">
          <img alt="cover" className="filmPicture" src={props.picture} />
        </div>
      }
    >
      <Meta title={props.title} description={props.description} />
    </Card>
  );
}
