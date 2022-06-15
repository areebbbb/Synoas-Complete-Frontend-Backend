import { Modal, Button, Form, Input } from "antd";
import { patchQuotePost } from "store/feature/Dashboard/DashboardService";

const EditModal = ({ editMode, onCloseHandler, item }) => {
  const onFinish = (values) => {
    item.PostID.value = values.value;
    patchQuotePost(item.PostID);
    onCloseHandler();
  };
  return (
    <Modal
      visible={editMode}
      title="Edit Quotes"
      footer={[
        <Button onClick={onCloseHandler} key="modalCloseEDIT">
          Close
        </Button>,
      ]}
      centered
      onCancel={onCloseHandler}
    >
      <Form initialValues={{ value: item.PostID.value }} onFinish={onFinish}>
        <Form.Item
          name="value"
          rules={[
            {
              required: true,
              message: "Please input a Quote!",
              whitespace: true,
            },
            {
              max: 254,
              message: "Please input a Quote within 254 letters!",
              whitespace: true,
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button
            style={{ minWidth: "100%" }}
            type="primary"
            htmlType="antdSubmit"
          >
            Update
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
