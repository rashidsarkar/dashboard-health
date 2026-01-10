import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { IoCameraOutline } from "react-icons/io5";
import { PasswordTab } from "./PasswordTab";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../redux/api/userApi";
import { imageUrl } from "../redux/api/baseApi";

// Update this with your actual Backend Base URL for images
// const BASE_URL = "http://10.10.20.3:3333";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [form] = Form.useForm();
  const [image, setImage] = useState(null); // Local preview file

  const { data: profile, isLoading } = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();

  // 1. Show Real Data in Form
  useEffect(() => {
    if (profile?.data) {
      form.setFieldsValue({
        name: profile.data.fullName,
        email: profile.data.email,
        phone: profile.data.phone,
      });
    }
  }, [profile, form]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // 2. Do Update
  const onEditProfile = async (values) => {
    const formData = new FormData();

    // Append fields (Using keys your backend expects)
    formData.append("fullName", values.name);
    formData.append("phone", values.phone);

    if (image) {
      formData.append("profile_image", image);
    }

    try {
      const response = await updateProfile(formData).unwrap();
      message.success(response.message || "Profile updated successfully!");
      setImage(null); // Clear local preview state after success
    } catch (error) {
      message.error(error?.data?.message || "Something went wrong");
      console.error(error);
    }
  };

  // Profile Image URL Logic
  const getProfileImg = () => {
    if (image) return URL.createObjectURL(image); // Show local upload preview
    if (profile?.data?.profile_image) {
      // Convert Windows backslashes to forward slashes
      const normalizedPath = profile.data.profile_image.replace(/\\/g, "/");
      return `${imageUrl}/${normalizedPath}`;
    }
    return "https://cdn-icons-png.flaticon.com/512/149/149071.png"; // Placeholder
  };

  if (isLoading) return <div className="p-10 text-center">Loading...</div>;

  const tabItems = [
    {
      key: "1",
      label: "Edit Profile",
      content: (
        <Form onFinish={onEditProfile} layout="vertical" form={form}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input
              style={{ padding: "9px", borderRadius: "8px" }}
              placeholder="Enter name"
            />
          </Form.Item>

          <Form.Item name="email" label="Email">
            <Input
              disabled
              style={{ padding: "9px", borderRadius: "8px" }}
              className="cursor-not-allowed bg-gray-50"
            />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: "Please enter phone number" }]}
          >
            <Input
              style={{ padding: "9px", borderRadius: "8px" }}
              placeholder="Enter Phone Number"
            />
          </Form.Item>

          <button
            type="submit"
            className="w-full bg-[#10A4B2] hover:bg-[#0d8c99] text-white py-3 rounded-lg font-medium transition-all"
          >
            Update Profile
          </button>
        </Form>
      ),
    },
    {
      key: "2",
      label: "Change Password",
      content: <PasswordTab />,
    },
  ];

  return (
    <div className="p-3 bg-[#F9FAFB] min-h-screen">
      <div className="max-w-xl p-8 mx-auto mt-8 bg-white border border-gray-100 shadow-sm rounded-2xl">
        {/* Profile Picture Section */}
        <div className="mb-8 text-center">
          <div className="relative w-32 h-32 mx-auto">
            <input
              type="file"
              onChange={handleImageChange}
              id="img-upload"
              accept="image/*"
              className="hidden"
            />
            <img
              className="object-cover w-full h-full border-4 rounded-full shadow-sm border-teal-50"
              src={getProfileImg()}
              alt="Profile"
            />
            {activeTab === "1" && (
              <label
                htmlFor="img-upload"
                className="absolute bottom-1 right-1 bg-[#10A4B2] text-white rounded-full w-9 h-9 flex items-center justify-center cursor-pointer border-2 border-white shadow-md hover:scale-105 transition-all"
              >
                <IoCameraOutline size={20} />
              </label>
            )}
          </div>
          <h2 className="mt-4 text-xl font-bold text-gray-800">
            {profile?.data?.fullName || "User Name"}
          </h2>
          <p className="text-sm text-gray-500">{profile?.data?.role}</p>
        </div>

        {/* Custom Tabs */}
        <div className="mb-4">
          <div className="flex justify-center mb-8 border-b border-gray-100">
            {tabItems.map((item) => (
              <button
                key={item.key}
                className={`px-6 py-3 font-semibold transition-all ${
                  activeTab === item.key
                    ? "border-b-2 border-[#10A4B2] text-[#10A4B2]"
                    : "text-gray-400 hover:text-gray-600"
                }`}
                onClick={() => setActiveTab(item.key)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="px-2">
            {tabItems.find((item) => item.key === activeTab)?.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
