import React, { useState } from 'react';
import './ProjectsGallery.css';

import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

import { useProjectsQuery } from '../../services/projectApi';

import { ProjectCard, CreateProjectFormModal } from '../../components';

import logo from '../../assets/images/logo192.png';
import landscape from '../../assets/images/landscape.svg';

function ProjectsGallery() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useProjectsQuery();

  console.log(data);

  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    navigate('/project');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const projects = [
    {
      picture: logo,
      title: 'Project 1',
      description: 'Description 1'
    },
    {
      picture: landscape,
      title: 'Project 2',
      description: 'Description 2'
    },
    {
      picture: logo,
      title: 'Project 3',
      description: 'Description 3'
    }
  ];

  return (
    <div className="project-gallery">
      <div className="header">
        <h1>Projets</h1>
        <Button type="primary" className="create-project-btn" onClick={showModal}>
          Créer un Projet
        </Button>
        <CreateProjectFormModal
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
        />
      </div>
      <div className="gallery">
        {data?.map((project, key) => (
          <ProjectCard
            picture={project.name}
            title={project.name}
            description={project.description}
            key={key}
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectsGallery;
