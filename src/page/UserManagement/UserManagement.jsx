import React, { useState } from "react";
import { Table, message, Spin } from "antd";
import { LuEye } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx"; // Block Icon
import { CgUnblock } from "react-icons/cg"; // Unblock Icon
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import {
  useGetNormalUsersQuery,
  useBlockUserMutation,
} from "../redux/api/normalUserApi";
import { imageUrl } from "../../page/redux/api/baseApi";

const UserManagement = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [activeTab, setActiveTab] = useState("active");

  // API Hooks
  const { data, isLoading } = useGetNormalUsersQuery({
    type: activeTab,
    page: currentPage,
    limit: pageSize,
  });

  const [toggleBlock, { isLoading: isBlocking }] = useBlockUserMutation();

  const users = data?.data?.data || [];
  const meta = data?.data?.meta || {};

  // Handle Block/Unblock
  const handleToggleBlock = async (id) => {
    try {
      const res = await toggleBlock(id).unwrap();
      message.success(res.message || "Status updated successfully");
    } catch (err) {
      message.error(err?.data?.message || "Failed to update status");
    }
  };

  const columns = [
    {
      title: "User’s Name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={
              record?.profile_image
                ? `${imageUrl}/${record.profile_image.replace(/\\/g, "/")}`
                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            className="object-cover w-10 h-10 rounded-lg"
            alt="User"
          />
          <span className="font-medium text-gray-700">{record.fullName}</span>
        </div>
      ),
    },
    {
      title: "Contact Number",
      render: (_, record) => record.user?.[0]?.phone || "N/A",
    },
    {
      title: "Email",
      render: (_, record) => record.user?.[0]?.email || "N/A",
    },
    {
      title: "Action",
      key: "action",
      align: "right",
      render: (_, record) => (
        <div className="flex justify-end gap-2 pr-4">
          <button
            onClick={() =>
              navigate(`/dashboard/user-details/${record._id}`, {
                state: { user: record },
              })
            }
            className="w-8 h-8 flex justify-center items-center bg-[#10A4B2] text-white rounded-md hover:bg-[#0d8c99]"
          >
            <LuEye size={18} />
          </button>

          {/* Toggle Button */}
          <button
            disabled={isBlocking}
            onClick={() => handleToggleBlock(record.user?.[0]?._id)}
            className={`w-8 h-8 flex justify-center items-center text-white rounded-md transition-all shadow-sm ${
              activeTab === "active"
                ? "bg-[#EF4444] hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
            title={activeTab === "active" ? "Block User" : "Unblock User"}
          >
            {activeTab === "active" ? (
              <RxCross2 size={18} />
            ) : (
              <CgUnblock size={20} />
            )}
          </button>
        </div>
      ),
    },
  ];

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Spin size="large" />
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
      <div className="flex-1 p-8">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <IoArrowBackOutline
              className="text-[#10A4B2] text-2xl cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <h1 className="text-xl font-bold text-gray-800">User management</h1>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => {
                setActiveTab("active");
                setCurrentPage(1);
              }}
              className={`px-6 py-2 rounded-xl border transition-all font-semibold ${
                activeTab === "active"
                  ? "bg-white border-[#10A4B2] text-[#10A4B2] shadow-sm"
                  : "bg-white border-gray-200 text-gray-400"
              }`}
            >
              Active user
            </button>
            <button
              onClick={() => {
                setActiveTab("blocked");
                setCurrentPage(1);
              }}
              className={`px-6 py-2 rounded-xl border transition-all font-semibold ${
                activeTab === "blocked"
                  ? "bg-white border-red-500 text-red-500 shadow-sm"
                  : "bg-white border-gray-200 text-gray-400"
              }`}
            >
              Block User
            </button>
          </div>
        </div>

        <div className="w-full overflow-x-auto bg-white border border-gray-100 shadow-sm rounded-xl">
          <Table
            dataSource={users}
            columns={columns}
            pagination={false}
            rowKey="_id"
          />
        </div>
      </div>

      <CustomPagination
        total={meta.total || 0}
        pageSize={pageSize}
        current={currentPage}
        onChange={setCurrentPage}
      />
    </div>
  );
};

export default UserManagement;
