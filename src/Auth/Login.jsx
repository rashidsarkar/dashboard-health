
import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {

    const [form] = Form.useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onFinish = (values) => {
    console.log("Form Values:", values);
  };
  
  // const onFinish = async (values) => {
  //   setLoading(true);
  //   try {
  //     console.log("Form Values:", values);
  //     const payload = await loginAdmin(values).unwrap();
  //     console.log("API Response:", payload);
  //     if (payload?.success) {
  //       // localStorage.setItem("accessToken", payload?.data?.accessToken);
  //       dispatch(setToken(payload?.data?.accessToken))
  //       message.success("Login successful!");
  //       navigate("/");
  //     } else {
  //       message.error(payload?.message || "Login failed!");
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     message.error(error?.data?.message || "Something went wrong. Try again!");
  //   } finally {
  //     setLoading(false);
  //     console.log("Login attempt finished.");
  //   }
  // };

  
  return (
 <div className="flex justify-center items-center min-h-screen px-4 lg:px-0">
      <div className="w-full max-w-lg  lg:p-8 p-4 border">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Sign In</h2>
        <p className="text-gray-600 mb-6 text-sm">
          Enter your email address or choose a different way to sign in to
          Custom Ink.
        </p>

        {/* Ant Design Form */}
        <Form form={form} layout="vertical" onFinish={onFinish}>
          {/* Email */}
          <Form.Item
            label="Enter Email Address"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Enter a valid email!" },
            ]}
          >
            <Input
              style={{ height: "50px" }}
              placeholder="Enter Email Address"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              style={{ height: "50px" }}
              className=""
              placeholder="••••••••"
            />
          </Form.Item>

          <div className="flex items-center justify-between mb-4">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="text-gray-700">Remember me</Checkbox>
            </Form.Item>
            <Link
              to={"/forgot-password"}
              className="text-sm text-[#2F799E] hover:underline focus:outline-none"
            >
              Forget password?
            </Link>
          </div>

          {/* Continue Button */}
          <Form.Item>
            <button
              htmlType="submit"
              className="w-full bg-red-500 py-3 text-white rounded-md hover:bg-primary-dark transition-colors"
            >
              Continue
            </button>
          </Form.Item>
        </Form>


       
      </div>
    </div>
  );
};

export default Login;
