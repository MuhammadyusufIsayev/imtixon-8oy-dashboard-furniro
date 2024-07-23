import React, { useEffect, useState } from 'react';
import { Button, List, Input, Form, Modal, Spin, notification, Image } from 'antd';
import axios from 'axios';
import { Category, CategoryFormValues } from '../types';

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://ecommerce-backend-fawn-eight.vercel.app/api/categories');
      setCategories(response.data);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to fetch categories',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (values: CategoryFormValues) => {
    try {
      await axios.post('https://ecommerce-backend-fawn-eight.vercel.app/api/categories', values, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      fetchCategories();
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to add category',
      });
    }
  };

  const handleEdit = async (values: CategoryFormValues) => {
    if (editingCategory?._id) {
      try {
        await axios.put(`https://ecommerce-backend-fawn-eight.vercel.app/api/categories/${editingCategory._id}`, values, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        fetchCategories();
        setIsModalVisible(false);
        form.resetFields();
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'Failed to update category',
        });
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://ecommerce-backend-fawn-eight.vercel.app/api/categories/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      fetchCategories();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to delete category',
      });
    }
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setIsModalVisible(true);
    form.setFieldsValue(category);
  };

  const handleModalCancel = () => {
    setEditingCategory(null);
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <h2>Categories</h2>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>Add Category</Button>

      <List
        dataSource={categories}
        renderItem={category => (
          <List.Item
            actions={[
              <Button onClick={() => openEditModal(category)}>Edit</Button>,
              <Button onClick={() => handleDelete(category._id!)} danger>Delete</Button>
            ]}
          >
            <List.Item.Meta
              title={category.name}
              description={<Image width={100} src={category.image} />}
            />
          </List.Item>
        )}
      />

      <Modal
        title={editingCategory ? 'Edit Category' : 'Add Category'}
        visible={isModalVisible}
        onOk={() => form.submit()}
        onCancel={handleModalCancel}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values: CategoryFormValues) => {
            if (editingCategory) {
              handleEdit(values);
            } else {
              handleAdd(values);
            }
          }}
        >
          <Form.Item
            name="name"
            label="Category Name"
            rules={[{ required: true, message: 'Please input the category name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="image"
            label="Image URL"
            rules={[{ required: true, message: 'Please input the image URL!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {loading && <Spin size="large" />}
    </div>
  );
};

export default Categories;
