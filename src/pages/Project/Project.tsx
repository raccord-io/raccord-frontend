import React, { useState } from 'react';
import './Project.css';
import { useParams } from 'react-router-dom';
import { useProjectQuery } from '../../services/projectApi';
import parse from 'html-react-parser';
import { Button, UploadProps, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { AddSequenceFormModal } from '../../components/AddSequenceFormModal/AddSequenceFormModal';
import { useAddSequenceMutation } from '../../services/projectApi';

import { SequencesCollapse } from '../../components';
import { ScriptContainer } from '../../components/ScriptContainer/ScriptContainer';

function Project() {
  const { projectId } = useParams();
  const { data, isLoading, isError } = useProjectQuery(projectId!);
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

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const text = parse(data?.html ? data?.html : '');

  const addScript = () => {
    if (!data?.html) {
      return (
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Ajouter un scénario</Button>
        </Upload>
      );
    }
  };

  const [currentSequenceSelected, setCurrentSequenceSelected] = useState<string>('');

  return (
    <div className="main-container">
      <div className="header-page-project">
        <h1>{data?.name}</h1>
        {addScript()}
      </div>
      <div className="columns">
        <div className="script-pages-previews"></div>
        <div className="script-container">
          <ScriptContainer
            content={text}
            projectId={projectId!}
            currentSequenceSelected={currentSequenceSelected}
          />
        </div>
        <div className="collapse">
          <SequencesCollapse
            currentSequenceSelected={currentSequenceSelected}
            setCurrentSequenceSelected={setCurrentSequenceSelected}
          />
          <Button type="primary" onClick={showModal}>
            Ajouter une séquence
          </Button>
          <AddSequenceFormModal
            isModalOpen={isModalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
          />
        </div>
      </div>
      <div className="footer-page-project"></div>
    </div>
  );
}

export default Project;
