import React, { useEffect, useState } from 'react';
import { Button, List, Input, Form, Modal, Spin, notification, Image } from 'antd';
import axios from 'axios';
import { Product, ProductFormValues } from '../types';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://ecommerce-backend-fawn-eight.vercel.app/api/products');
      setProducts(response.data);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to fetch products',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (values: ProductFormValues) => {
    try {
      await axios.post('https://ecommerce-backend-fawn-eight.vercel.app/api/products', values, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      fetchProducts();
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to add product',
      });
    }
  };

  const handleEdit = async (values: ProductFormValues) => {
    if (editingProduct?._id) {
      try {
        await axios.put(`https://ecommerce-backend-fawn-eight.vercel.app/api/products/${editingProduct._id}`, values, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        fetchProducts();
        setIsModalVisible(false);
        form.resetFields();
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'Failed to update product',
        });
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://ecommerce-backend-fawn-eight.vercel.app/api/products/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      fetchProducts();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to delete product',
      });
    }
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsModalVisible(true);
    form.setFieldsValue(product);
  };

  const handleModalCancel = () => {
    setEditingProduct(null);
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <h2>Products</h2>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>Add Product</Button>

      <List
        dataSource={products}
        renderItem={product => (
          <List.Item
            actions={[
              <Button onClick={() => openEditModal(product)}>Edit</Button>,
              <Button onClick={() => handleDelete(product._id!)} danger>Delete</Button>
            ]}
          >
            <List.Item.Meta
              title={product.title}
              description={
                <>
                  <p>{product.subtitle}</p>
                  <Image width={100} src={product.image} />
                  <p>{product.description}</p>
                  <p>Rate: {product.rate}</p>
                  <p>Price: ${product.price}</p>
                  <p>Size: {product.size}</p>
                  <p>Color: {product.color}</p>
                </>
              }
            />
          </List.Item>
        )}
      />

      <Modal
        title={editingProduct ? 'Edit Product' : 'Add Product'}
        visible={isModalVisible}
        onOk={() => form.submit()}
        onCancel={handleModalCancel}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values: ProductFormValues) => {
            if (editingProduct) {
              handleEdit(values);
            } else {
              handleAdd(values);
            }
          }}
        >
          <Form.Item
            name="title"
            label="Product Title"
            rules={[{ required: true, message: 'Please input the product title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="subtitle"
            label="Product Subtitle"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="image"
            label="Image URL"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="rate"
            label="Rate"
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="size"
            label="Size"
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="color"
            label="Color"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {loading && <Spin size="large" />}
    </div>
  );
};

export default Products;
