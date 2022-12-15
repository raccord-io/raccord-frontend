import { useState } from 'react';
import './ProjectsGallery.css';

import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { useProjectsQuery } from '../../services/projectApi';
import { useAddProjectMutation } from '../../services/projectApi';
import asset from '../../assets/images/image.png';

import { ProjectCard, CreateProjectFormModal } from '../../components';

import { Skeleton } from 'antd';

function ProjectsGallery() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: projects,
    isLoading: isLoadingProjects,
    isError: isErrorProjects
  } = useProjectsQuery();
  const [addProject, { isLoading: isAdding }] = useAddProjectMutation();

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
        <Button
          className="add-project-button"
          icon={<PlusOutlined />}
          type="dashed"
          onClick={showModal}>
          Ajouter un projet
        </Button>
        <CreateProjectFormModal
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
        />
      </div>
      <div className="gallery-list">
        {isLoadingProjects ? (
          <Skeleton />
        ) : (
          <>
            {projects?.map((project, key) => (
              <ProjectCard
                picture={asset}
                title={project.name}
                description={project.description}
                uuid={project.uuid}
                key={key}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default ProjectsGallery;
