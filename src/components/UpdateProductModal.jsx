import {
  Modal,
  Form,
  Row,
  Col,
  Input,
  Button,
  Space,
  notification,
} from "antd";
import { useState } from "react";
import { useUpdateProductMutation } from "../app/productsSlice.js";
const UpdateProductModal = ({
  showEdit,
  product,
  cancelEdit,
  setSelectProduct,
  setShowEdit,
}) => {
  const [changedKeys, setChangedKeys] = useState({
    name: undefined,
    price: undefined,
    brand: undefined,
    category: undefined,
  });
  const bindValues = (changedValues) => {
    setChangedKeys({ ...changedKeys, ...changedValues });
    let cloneProduct = { ...product, ...changedValues };
    setSelectProduct(cloneProduct);
  };
  const editProduct = () => {
    updateProductApi({ id: product.id, body: changedKeys }).then((res) => {
      console.log("res", res);
    });
    if (!isUpdated) {
      setShowEdit(false);
      setSelectProduct(null);
      notification.success({
        message: "updated",
      });
    }
  };
  const [updateProductApi, { isLoading: isUpdated }] =
    useUpdateProductMutation();
  return (
    <Modal
      title="Edit Product"
      open={showEdit}
      onCancel={cancelEdit}
      width="80%"
      destroyOnClose
      centered
      okText="Edit Product"
      okButtonProps={{ htmlType: "submit" }}
      footer={null}
    >
      {product && (
        <Form
          name="EditProduct"
          layout="vertical"
          initialValues={product}
          onValuesChange={bindValues}
          onFinish={editProduct}
        >
          <Row gutter={20}>
            <Col xs={24} sm={12} md={6}>
              <Form.Item
                name="title"
                label="Name"
                rules={[{ required: true, message: "Name Is Required" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Form.Item name="price" label="Price">
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Form.Item name="brand" label="Brand">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Form.Item name="category" label="Category">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Space size={8}>
                <Button type="primary" htmlType="submit">
                  Edit Product
                </Button>
                <Button onClick={cancelEdit}>Cancel</Button>
              </Space>
            </Col>
          </Row>
        </Form>
      )}
    </Modal>
  );
};

export default UpdateProductModal;
