import './Projects.css';
import { Button } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateProjectFormModal from '../../components/CreateProjectFormModal/CreateProjectFormModal';

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
  );
}

export default Projects;
