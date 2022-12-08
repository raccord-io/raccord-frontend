import React, { useState } from 'react';
import './Projects.css';

import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

import CreateProjectFormModal from '../../components/CreateProjectFormModal/CreateProjectFormModal';
import ProjectCard from '../../components/ProjectCard/ProjectCard';

import logo from '../../assets/images/logo192.png';

function Projects() {
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

  return (
    <>
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
      <ProjectCard picture={logo} title="Project" description="test" />
    </>
  );
}

export default Projects;
