import React, { useState } from 'react';
import './ProjectsGallery.css';

import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

import { ProjectCard, CreateProjectFormModal } from '../../components';

import landscape from '../../assets/images/landscape.svg';

function ProjectsGallery() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      picture: landscape,
      title: 'Project 1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    },
    {
      picture: landscape,
      title: 'Project 2',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    },
    {
      picture: landscape,
      title: 'Project 3',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    },
    {
      picture: landscape,
      title: 'Project 4',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
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

      <ul className="gallery-list">
        {projects.map((project, key) => (
          <ProjectCard
            picture={project.picture}
            title={project.title}
            description={project.description}
            key={key}
          />
        ))}
      </ul>
    </div>
  );
}

export default ProjectsGallery;
