import './AddSequenceFormModal.css';

import { Modal, Form, Input } from 'antd';

interface Props {
  isModalOpen: boolean;
  handleOk: (value: any) => void;
  handleCancel: () => void;
}

export function AddSequenceFormModal(this: any, { isModalOpen, handleOk, handleCancel }: Props) {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Ajouter une séquence"
      open={isModalOpen}
      onCancel={handleCancel}
      cancelText="Annuler"
      okText="Ajouter"
      onOk={() => {
        form
          .validateFields()
          .then((values: any) => {
            handleOk(values);
            form.resetFields();
          })
          .catch((info: any) => {
            console.log('Validate Failed:', info);
          });
      }}>
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: 'public' }}>
        <Form.Item
          label="Nom de la séquence"
          name="name"
          rules={[{ required: true, message: 'Ajoutez un nom de séquence!' }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
