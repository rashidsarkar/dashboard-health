import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";


const ForgetPass = () => {
  
  const [form] = Form.useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onFinish = (values) => {
    console.log("Form Values:", values);
  };
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
            <Input style={{height:'50px'}} placeholder="Enter Email Address" />
          </Form.Item>

       

          {/* Continue Button */}
          <Form.Item>
            <Link to={'/verification'}><button
              
              htmlType="submit"
              className="w-full bg-red-500 py-3 text-white rounded-md hover:bg-primary-dark transition-colors"
            >
              Continue
            </button></Link>
          </Form.Item>
        </Form>

        {/* Terms */}
      
      </div>
    </div>
  );
};

export default ForgetPass;
