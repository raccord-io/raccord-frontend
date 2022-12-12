import React from 'react';
import './ProjectCard.css';

import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

interface Props {
  picture: string;
  title: string;
  description: string;
  uuid: string;
}

export function ProjectCard(props: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/project/' + props.uuid);
  };

  return (
    <div className="project-card-container">
      <Card
        onClick={handleClick}
        hoverable
        className="card"
        cover={<img alt="cover" className="filmPicture" src={props.picture} />}
      >
        <Meta className="description" title={props.title} description={props.description} />
      </Card>
    </div>
  );
}
