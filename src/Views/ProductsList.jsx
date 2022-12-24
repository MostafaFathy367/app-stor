import { useEffect, useState } from "react";
import { Table, Button, Space, notification, Popconfirm, Spin } from "antd";
import { DeleteOutlined, EditFilled } from "@ant-design/icons";
import { productsApi } from "../app/productsSlice.js";
import UpdateProductModal from "../components/UpdateProductModal.jsx";
import FilterProducts from "../components/FilterProducts.jsx";
const ProductList = () => {
  const columns = [
    { title: "#", render: (text, record, index) => <span>{index + 1}</span> },
    { title: "Name", dataIndex: "title" },
    { title: "Price", dataIndex: "price" },
    { title: "Brand", dataIndex: "brand" },
    // { title: "Description", dataIndex: "description" },
    { title: "Category", dataIndex: "category" },
    {
      title: "action",
      render: (text, record) => {
        return (
          <>
            <Space size={[10, 10]}>
              <Button
                onClick={() => openEdit(record)}
                type="primary"
                icon={<EditFilled />}
              >
                Edit
              </Button>
              <Popconfirm
                title="confirm"
                description={`are you sure to delete ${record.title}`}
                onConfirm={() => deleteProduct(record.id)}
                okText="yse"
                cancelText="no"
              >
                <Button danger type="primary" icon={<DeleteOutlined />}>
                  Delete
                </Button>
              </Popconfirm>
            </Space>
          </>
        );
      },
    },
  ];
  const [searchKey, setSearch] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [selectProduct, setSelectProduct] = useState(null);
  const openEdit = (product) => {
    console.log("product", product);
    setSelectProduct(product);
    setShowEdit(true);
  };
  const cancelEdit = () => {
    setSelectProduct(null);
    setShowEdit(false);
  };
  const deleteProduct = (id) => {
    fetch(`https://dummyjson.com/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        notification.success({
          message: "Deleted product",
        });
      });
  };
  const { products, isLoading, total } = productsApi.useGetProductsQuery(
    searchKey,
    {
      selectFromResult: ({ data, isLoading }) => ({
        products: data ? data.products : [],
        isLoading,
        total: data ? data.total : 0,
      }),
    }
  );

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);
  return (
    <>
      <Spin spinning={isLoading}>
        <Space size={[10, 15]} direction="vertical">
          <FilterProducts handelSearch={setSearch} />
          <Table
            scroll={{ y: 450 }}
            rowKey="id"
            columns={columns}
            dataSource={products}
            bordered
            pagination={{ pageSize: 30, total: total }}
          />
        </Space>
      </Spin>
      <UpdateProductModal
        product={selectProduct}
        showEdit={showEdit}
        setShowEdit={setShowEdit}
        setSelectProduct={setSelectProduct}
        cancelEdit={cancelEdit}
      />
    </>
  );
};

export default ProductList;
