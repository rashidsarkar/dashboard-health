import { Form, Input, message } from "antd";
import React, { useState } from "react";
import { useChangePasswordMutation } from "../redux/api/userApi";

export const PasswordTab = () => {
  const [form] = Form.useForm();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [passError, setPassError] = useState("");

  const handlePasswordChange = async (values) => {
    // 1. Client-side Validation: Old vs New
    if (values.currentPassword === values.newPassword) {
      setPassError("New password cannot be the same as your old password.");
      return;
    }

    setPassError(""); // Clear local errors

    // 2. Map form values to API expected format
    const payload = {
      oldPassword: values.currentPassword,
      newPassword: values.newPassword,
    };

    try {
      // 3. Execute Mutation
      const response = await changePassword(payload).unwrap();

      message.success(response.message || "Password changed successfully!");

      // 4. Reset form on success
      form.resetFields();
    } catch (error) {
      console.error("Change Password Error:", error);
      // Show error from backend
      message.error(
        error?.data?.message || "Failed to change password. Please try again."
      );
    }
  };

  return (
    <div className="max-w-md py-4 mx-auto">
      <Form form={form} layout="vertical" onFinish={handlePasswordChange}>
        <h2 className="mb-6 text-xl font-bold text-center text-gray-800">
          Change Your Password
        </h2>

        {/* Current Password */}
        <Form.Item
          name="currentPassword"
          label="Old Password"
          rules={[
            { required: true, message: "Please enter your current password!" },
          ]}
        >
          <Input.Password
            style={{ padding: "10px", borderRadius: "8px" }}
            placeholder="Enter old password"
          />
        </Form.Item>

        {/* New Password */}
        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[
            { required: true, message: "Please enter a new password!" },
            { min: 6, message: "Password must be at least 6 characters" },
          ]}
        >
          <Input.Password
            style={{ padding: "10px", borderRadius: "8px" }}
            placeholder="Enter new password"
          />
        </Form.Item>

        {/* Confirm Password */}
        <Form.Item
          name="confirmPassword"
          label="Confirm New Password"
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "Please confirm your new password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            style={{ padding: "10px", borderRadius: "8px" }}
            placeholder="Confirm new password"
          />
        </Form.Item>

        {/* Local Validation Error Message */}
        {passError && (
          <p className="p-2 mb-4 text-sm font-medium text-red-500 border border-red-100 rounded bg-red-50">
            {passError}
          </p>
        )}

        <Form.Item className="mt-8">
          <button
            disabled={isLoading}
            type="submit"
            className={`w-full py-3 rounded-lg font-semibold text-white transition-all 
              ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#10A4B2] hover:bg-[#0d8c99] shadow-md"
              }
            `}
          >
            {isLoading ? "Updating..." : "Update Password"}
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};
