import { useState } from 'react';
import './CreateProjectFormModal.css';

import { LoadingOutlined, CameraOutlined, InboxOutlined, FileOutlined } from '@ant-design/icons';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import type { UploadChangeParam } from 'antd/es/upload';
import { Modal, Input, Form, message, Upload } from 'antd';

interface Props {
  isModalOpen: boolean;
  handleOk: (value: any) => void;
  handleCancel: () => void;
}

export function CreateProjectFormModal(this: any, { isModalOpen, handleOk, handleCancel }: Props) {
  const { TextArea } = Input;
  const [loadingPicture, setLoadingPicture] = useState<boolean>(false);
  const [imageUrlPicture, setImageUrlPicture] = useState<string>();

  /* For the upload of the picture */
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
      {loadingPicture ? <LoadingOutlined /> : <CameraOutlined />}
      <div style={{ marginTop: 8 }}>Ajouter une photo</div>
    </div>
  );

  const { Dragger } = Upload;

  /* For the upload of the script */

  const types = ['application/pdf'];

  // const props: UploadProps = {
  //   maxCount: 1,
  //   accept: '.pdf',
  //   name: 'file',
  //   headers: {
  //     authorization: 'authorization-text'
  //   },
  //   beforeUpload(file) {
  //     if (!types.includes(file.type)) {
  //       message.error(`${file.name} is not a pdf file`);
  //       return false;
  //     } else {
  //       return false;
  //     }
  //   },
  //   onChange(info) {
  //     if (info.file.status !== 'uploading') {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (info.file.status === 'done') {
  //       message.success(`${info.file.name} file uploaded successfully`);
  //     } else if (info.file.status === 'error') {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  //   onDrop(e) {
  //     console.log('Dropped files', e.dataTransfer.files);
  //   }
  // };

  const [form] = Form.useForm();

  return (
    <Modal
      title="Créer un Projet"
      open={isModalOpen}
      onCancel={handleCancel}
      cancelText="Annuler"
      okText="Créer"
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            handleOk(values);
            form.resetFields();
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}>
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: 'public' }}>
        <div className="top-content">
          <div className="top-left-content">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
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
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Veuillez entrer un nom de projet!' }]}>
              <Input
                prefix={<FileOutlined className="site-form-item-icon" />}
                placeholder="Nom du Projet"
              />
            </Form.Item>
            <Form.Item name="description" rules={[{ required: false }]}>
              <TextArea style={{ height: '100%' }} rows={4} placeholder="Description" />
            </Form.Item>
          </div>
        </div>
        {/* <div className="bottom-content">
          <Form.Item
            name="pdf"
            rules={[{ required: true, message: 'Veuillez rentrer un scénario!' }]}
            valuePropName="filelist">
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Cliquez ou faites glisser votre scénario ici</p>
              <p className="ant-upload-hint">Types de fichiers pris en charge : .pdf</p>
            </Dragger>
          </Form.Item>
        </div> */}
      </Form>
    </Modal>
  );
}
