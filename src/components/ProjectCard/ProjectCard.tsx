import React from 'react';
import './ProjectCard.css';

import { Card } from 'antd';

const { Meta } = Card;

type Props = {
  picture: string;
  title: string;
  description: string;
};

export function ProjectCard(props: Props) {
  return (
    <Card hoverable className="card" cover={<img alt="cover" src={props.picture} />}>
      <Meta title={props.title} description={props.description} />
    </Card>
  );
}
