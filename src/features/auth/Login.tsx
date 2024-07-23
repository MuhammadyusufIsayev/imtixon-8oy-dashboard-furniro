import React from "react";
import { Input, Typography, Button, Form } from "antd";
import { useForm, Controller } from "react-hook-form";
import { SignIn } from "../../api";
import { useNavigate, Link } from "react-router-dom";

const { Text } = Typography;

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<LoginForm>();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    const token = await SignIn(data);
    console.log(token);
    if (token) {
      localStorage.setItem("token", token);
      reset();
      navigate("/dashboard");
      alert("Login Successful");
    }
  };

  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Form
        onFinish={handleSubmit(onSubmit)}
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
        <Typography.Title level={2} style={{ textAlign: "center" }}>
          Login
        </Typography.Title>
        <Form.Item
          label="Email"
          validateStatus={errors.email ? "error" : ""}
          help={errors.email ? errors.email.message : ""}
        >
          <Controller
            name="email"
            control={control}
            rules={{ required: "Email is required" }}
            render={({ field }) => <Input placeholder="Email Address" {...field} />}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          validateStatus={errors.password ? "error" : ""}
          help={errors.password ? errors.password.message : ""}
        >
          <Controller
            name="password"
            control={control}
            rules={{ required: "Password is required" }}
            render={({ field }) => <Input.Password placeholder="Password" {...field} />}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
        <div style={{ textAlign: "center" }}>
          <Text>Don't have an account? <Link to="/register">Register</Link></Text>
        </div>
      </Form>
    </div>
  );
};

export default Login;
