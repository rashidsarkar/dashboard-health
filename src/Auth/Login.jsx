import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginAdminMutation } from "../page/redux/api/userApi";
import { setToken, setUser } from "../page/redux/features/auth/authSlice";
import logo from "../assets/header/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loginAdmin, { isLoading }] = useLoginAdminMutation();
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F0FDFF] px-4">
      <div className="w-full max-w-md p-8 bg-white border shadow-sm rounded-2xl border-cyan-100">
        <div className="mb-8 text-center">
          <img src={logo} alt="Logo" className="h-12 mx-auto mb-4" />{" "}
          {/* Replace with your logo */}
          <h2 className="text-2xl font-bold text-gray-800">Login to Account</h2>
          <p className="mt-2 text-sm text-gray-500">
            Please enter your email and password to continue
          </p>
        </div>

        <Form
          layout="vertical"
          form={form}
          onFinish={async (values) => {
            try {
              const response = await loginAdmin({
                email: values.email,
                password: values.password,
              }).unwrap();

              if (response.data && response.data.accessToken) {
                // Dispatch token and user to Redux
                dispatch(setToken(response.data.accessToken));
                if (response.data.user) {
                  dispatch(setUser(response.data.user));
                }

                message.success(response.message || "Login successful");

                // Redirect to dashboard
                navigate("/");
              }
            } catch (error) {
              const errorMessage =
                error?.data?.message || "Login failed. Please try again.";
              message.error(errorMessage);
            }
          }}
        >
          <Form.Item
            label="Email Address"
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input placeholder="admin@gmail.com" className="h-12 rounded-lg" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password
              placeholder="••••••••"
              className="h-12 rounded-lg"
            />
          </Form.Item>

          <div className="flex items-center justify-between mb-6">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="text-gray-600">Remember me</Checkbox>
            </Form.Item>
            <Link
              to="/forgot-password"
              name="forget"
              className="text-sm text-gray-500 hover:text-[#10A4B2]"
            >
              Forget password?
            </Link>
          </div>

          <Button
            htmlType="submit"
            loading={isLoading}
            disabled={isLoading}
            className="w-full h-12 bg-[#10A4B2] hover:bg-[#0d8c99] text-white border-none rounded-lg text-lg font-medium"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
