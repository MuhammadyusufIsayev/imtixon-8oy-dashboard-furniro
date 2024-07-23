import React from 'react';
import { Form, Input, Button, Typography, Alert } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const Register: React.FC = () => {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const onFinish = async (values: { name: string; email: string; password: string }) => {
        setLoading(true);
        setError(null);
        try {
            await axios.post('https://ecommerce-backend-fawn-eight.vercel.app/api/register', values);
        } catch (err) {
            setError('Registration failed. Please check your details and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                flexDirection: "column",
            }}
        >
            <Form
                name="register"
                onFinish={onFinish}
                layout="vertical"
                style={{
                    width: "100%",
                    maxWidth: "400px",
                    padding: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    backgroundColor: "#fff"
                }}
            >
                <Title level={2} style={{ textAlign: "center" }}>Register</Title>
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your Name!' }]}
                >
                    <Input placeholder="Name" />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your Email!' }]}
                >
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        Register
                    </Button>
                </Form.Item>
                <div style={{ textAlign: "center" }}>
                    <Text>Already have an account? <Link to="/login">Login</Link></Text>
                </div>
                {error && <Alert message={error} type="error" showIcon style={{ marginTop: 20 }} />}
            </Form>
        </div>
    );
};

export default Register;
