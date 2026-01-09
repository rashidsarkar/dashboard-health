import React, { useState } from "react";
import { Modal, Pagination, Table, message } from "antd";
import { LuEye } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { IoArrowBackOutline } from "react-icons/io5";
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";

const UserManagement = () => {
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

  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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
            onClick={() => {
              setSelectedUser(record);
              setIsModalOpen2(true);
            }}
            className="w-8 h-8 flex justify-center items-center bg-[#10A4B2] text-white rounded-md"
          >
            <LuEye size={18} />
          </button>
          <button
            onClick={() => message.error(`Blocked ${record.name}`)}
            className="w-8 h-8 flex justify-center items-center bg-[#EF4444] text-white rounded-md"
          >
            <RxCross2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    /* Flex container to push pagination to the bottom */
    <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
      {/* Top Header & Content Area */}
      <div className="flex-1 p-8">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <IoArrowBackOutline className="text-[#10A4B2] text-2xl cursor-pointer" />
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

      {/* FULL WIDTH PAGINATION BAR */}
      <div className="w-full bg-[#E6E7E8] py-4 flex justify-center border-t border-gray-200">
        <Pagination
          current={currentPage}
          total={dummyUsers.length}
          pageSize={pageSize}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
          itemRender={(page, type, originalElement) => {
            if (type === "prev")
              return <span className="px-2 text-gray-400">{"<"}</span>;
            if (type === "next")
              return <span className="px-2 text-gray-400">{">"}</span>;
            return originalElement;
          }}
        />
      </div>

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

        /* Pagination Square Buttons */
        .ant-pagination-item, .ant-pagination-prev, .ant-pagination-next {
          background: white !important;
          border: none !important;
          border-radius: 4px !important;
          min-width: 32px !important;
          height: 32px !important;
          line-height: 32px !important;
        }
        .ant-pagination-item-active {
          background-color: #10A4B2 !important;
        }
        .ant-pagination-item-active a {
          color: white !important;
        }
      `}</style>

      {/* Modal */}
      <Modal
        open={isModalOpen2}
        centered
        onCancel={() => setIsModalOpen2(false)}
        footer={null}
      >
        {selectedUser && (
          <div className="p-4 text-center">
            <img
              src={selectedUser.image}
              className="w-24 h-24 mx-auto mb-4 rounded-full"
              alt="profile"
            />
            <h2 className="text-xl font-bold">{selectedUser.name}</h2>
            <p className="mt-2">
              <AiOutlineMail className="inline mr-2" />
              {selectedUser.email}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserManagement;
