import React from 'react';
import './CreateProjectFormModal.css';
import { Modal, Input } from 'antd';
import { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { message, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { InboxOutlined } from '@ant-design/icons';

interface Props {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

const CreateProjectFormModal: React.FC<Props> = ({ isModalOpen, handleOk, handleCancel }) => {
  const { TextArea } = Input;
  const [loadingPicture, setLoadingPicture] = useState<boolean>(false);
  const [imageUrlPicture, setImageUrlPicture] = useState<string>();

  const handleChangePicture: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoadingPicture(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoadingPicture(false);
        setImageUrlPicture(url);
      });
    }
  };

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUploadPicture = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const uploadPicture = (
    <div>
      {loadingPicture ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Ajouter une photo</div>
    </div>
  );

  const { Dragger } = Upload;

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    }
  };

  return (
    <Modal title="Créer un Projet" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <div className="top-content">
        <div className="top-left-content">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUploadPicture}
            onChange={handleChangePicture}>
            {imageUrlPicture ? (
              <img src={imageUrlPicture} alt="avatar" style={{ width: '100%' }} />
            ) : (
              uploadPicture
            )}
          </Upload>
        </div>
        <div className="top-right-content">
          <Input size="small" placeholder="Nom du Projet" prefix={<UserOutlined />} />
          <br />
          <TextArea style={{ height: '100%' }} rows={4} placeholder="Description" />
        </div>
      </div>
      <div className="bottom-content">
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
        </Dragger>
      </div>
    </Modal>
  );
};

export default CreateProjectFormModal;
