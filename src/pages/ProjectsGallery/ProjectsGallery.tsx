import { useState } from 'react';
import './ProjectsGallery.css';

import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

import { useProjectsQuery } from '../../services/projectApi';
import { useAddProjectMutation } from '../../services/projectApi';
import asset from '../../assets/images/image.png';

import { ProjectCard, CreateProjectFormModal } from '../../components';

function ProjectsGallery() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useProjectsQuery();
  const [addProject, { isLoading: isAdding }] = useAddProjectMutation();

  console.log(data);

  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (value: any) => {
    setIsModalOpen(false);
    console.log('New project created', value);
    const result = addProject(value);
    console.log(result);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
      <div className="gallery-list">
        {data?.map((project, key) => (
          <ProjectCard
            picture={asset}
            title={project.name}
            description={project.description}
            uuid={project.uuid}
            key={key}
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectsGallery;
