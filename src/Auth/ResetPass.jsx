
import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";

const ResetPass = () => {
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
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Set a New Password
        </h2>
        <p className="text-gray-600 mb-6 text-sm">
          Secure your account by creating a new password.
        </p>

        {/* Ant Design Form */}
        <Form form={form} layout="vertical" onFinish={onFinish}>
          {/* Email */}
        

          {/* Password */}
          <Form.Item
            label="Enter New Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input
            style={{height:'50px'}}
              type={showPassword ? "text" : "password"}
              placeholder="Enter New Password"
              suffix={
                <span
                  className="cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              }
            />
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item
            label="Confirm New Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input
            style={{height:'50px'}}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              suffix={
                <span
                  className="cursor-pointer text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              }
            />
          </Form.Item>

          {/* Continue Button */}
          <Form.Item>
          <Link to={'/'}>
           <button
              
              htmlType="submit"
              className="w-full bg-red-500 py-3 text-white rounded-md hover:bg-primary-dark transition-colors"
            >
              Continue
            </button></Link>
          </Form.Item>
        </Form>

    
      </div>
    </div>
  );
};

export default ResetPass;
