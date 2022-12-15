import React, { useState } from 'react';
import './Project.css';
import { useParams } from 'react-router-dom';
import { useProjectQuery } from '../../services/projectApi';
import parse from 'html-react-parser';
import { Button, UploadProps, message, Upload } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { AddSequenceFormModal } from '../../components/AddSequenceFormModal/AddSequenceFormModal';
import { useAddSequenceMutation } from '../../services/projectApi';
import { useGetCategoriesQuery } from '../../services/projectApi';
import { Empty } from 'antd';

import { SequencesCollapse } from '../../components';
import { ScriptContainer } from '../../components/ScriptContainer/ScriptContainer';

function Project() {
  const { projectId } = useParams();
  const {
    data: project,
    isLoading: isProjectLoading,
    isError: isProjectError
  } = useProjectQuery(projectId!);
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError
  } = useGetCategoriesQuery(projectId!);
  const [addSequence] = useAddSequenceMutation();

  const types = ['application/pdf'];

  const props: UploadProps = {
    maxCount: 1,
    accept: '.pdf',
    name: 'file',
    action: `http://localhost:3000/project/${projectId}/upload`,
    showUploadList: false,
    headers: {
      authorization: 'authorization-text'
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = (value: any) => {
    setIsModalOpen(false);
    console.log(value);
    addSequence({ projectId: projectId!, name: value.name });
    //CreateSequence()
  };

  console.log('categories', categories);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const text = parse(project?.html ? project?.html : '');

  const addScript = () => {
    if (!project?.html) {
      return (
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Ajouter un scénario</Button>
        </Upload>
      );
    }
  };

  // const displayCollapse = () => {
  //   if (project?.html) {

  const [currentSequenceSelected, setCurrentSequenceSelected] = useState<string>('');

  return (
    <div className="main-container">
      <div className="header-page-project">
        <h1>{project?.name}</h1>
        {addScript()}
      </div>
      <div className="columns">
        <div className="script-pages-previews"></div>
        <div className="script-container">
          {project?.html ? (
            <ScriptContainer
              content={text}
              projectId={projectId!}
              currentSequenceSelected={currentSequenceSelected}
              categories={categories}
              metadata={project.metadata}
            />
          ) : (
            <Empty description={'Veuillez uploader un scénario'} />
          )}
        </div>
        <div className="collapse">
          {project?.html ? (
            <div>
              <SequencesCollapse
                currentSequenceSelected={currentSequenceSelected}
                setCurrentSequenceSelected={setCurrentSequenceSelected}
              />
              <Button
                className="add-sequence-button"
                icon={<PlusOutlined />}
                type="dashed"
                onClick={showModal}></Button>
              <AddSequenceFormModal
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
              />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div className="footer-page-project"></div>
    </div>
  );
}

export default Project;
