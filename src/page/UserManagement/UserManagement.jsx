import React, { useState } from "react";
import { Table, message } from "antd";
import { LuEye } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom"; // Added for navigation
import CustomPagination from "../../components/CustomPagination/CustomPagination";

const UserManagement = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const names = [
    "Kathryn Murp",
    "Devon Lane",
    "Foysal Rahman",
    "Hari Danang",
    "Floyd Miles",
    "Eleanor Pena",
    "Devon Lane",
    "Hari Danang",
    "Hari Danang",
    "Hari Danang",
  ];

  const dummyUsers = Array.from({ length: 50 }, (_, index) => ({
    key: index + 1,
    name: names[index % names.length],
    phone: index % 2 === 0 ? "(201) 555-0124" : "(219) 555-0114",
    email: index % 2 === 0 ? "bockely@att.com" : "xterris@gmail.com",
    image: `https://avatar.iran.liara.run/public/${index + 1}`,
  }));

  const columns = [
    {
      title: "User’s Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center gap-3">
          <img src={record.image} className="w-10 h-10 rounded-lg" alt="User" />
          <span className="font-medium text-gray-700">{text}</span>
        </div>
      ),
    },
    { title: "Contact Number", dataIndex: "phone", key: "phone" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Action",
      key: "action",
      align: "right",
      render: (_, record) => (
        <div className="flex justify-end gap-2 pr-4">
          <button
            onClick={() => navigate(`/user-details/${record.key}`)} // Navigates instead of modal
            className="w-8 h-8 flex justify-center items-center bg-[#10A4B2] text-white rounded-md hover:bg-[#0d8c99] transition-all"
          >
            <LuEye size={18} />
          </button>
          <button
            onClick={() => message.error(`Blocked ${record.name}`)}
            className="w-8 h-8 flex justify-center items-center bg-[#EF4444] text-white rounded-md hover:bg-red-600 transition-all"
          >
            <RxCross2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <IoArrowBackOutline
              className="text-[#10A4B2] text-2xl cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <h1 className="text-lg font-bold text-gray-800">User management</h1>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-2 bg-white border border-[#10A4B2] text-[#10A4B2] rounded-xl font-medium">
              Active user
            </button>
            <button className="px-6 py-2 font-medium text-gray-400 bg-white border border-gray-200 rounded-xl">
              Block User
            </button>
          </div>
        </div>

        {/* Table */}
        <Table
          dataSource={dummyUsers.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )}
          columns={columns}
          pagination={false}
          className="custom-user-table"
        />
      </div>

      {/* REUSABLE PAGINATION COMPONENT */}
      <CustomPagination
        total={dummyUsers.length}
        pageSize={pageSize}
        current={currentPage}
        onChange={(page) => setCurrentPage(page)}
      />

      <style>{`
        .custom-user-table .ant-table { background: transparent !important; }
        .custom-user-table .ant-table-thead > tr > th {
          background: transparent !important;
          color: #10A4B2 !important; 
          border-bottom: none !important;
          font-size: 16px;
        }
        .custom-user-table .ant-table-tbody > tr > td {
          border-bottom: none !important;
          padding: 14px 8px !important;
        }
      `}</style>
    </div>
  );
};

export default UserManagement;
