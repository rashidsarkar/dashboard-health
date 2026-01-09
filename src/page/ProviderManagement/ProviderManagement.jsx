import React, { useState } from "react";
import { Table, Select, message } from "antd";
import { IoArrowBackOutline } from "react-icons/io5";
import { LuEye } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import CustomPagination from "../../components/CustomPagination/CustomPagination";

const ProviderManagement = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Dummy Data
  const providers = Array.from({ length: 50 }, (_, i) => ({
    key: i + 1,
    name: "Kathryn Murp",
    type: "Doctor",
    phone: "(201) 555-0124",
    email: "bockely@att.com",
    img: `https://avatar.iran.liara.run/public/${i + 1}`,
  }));

  const columns = [
    {
      title: "Provider Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record.img}
            className="object-cover w-10 h-10 rounded-lg"
            alt="p"
          />
          <span className="font-medium text-gray-700">{text}</span>
        </div>
      ),
    },
    {
      title: "Provider type",
      dataIndex: "type",
      key: "type",
      render: (text) => (
        <span className="text-[#10A4B2] font-medium">{text}</span>
      ),
    },
    { title: "Contact Number", dataIndex: "phone", key: "phone" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Action",
      key: "action",
      align: "right",
      render: (_, record) => (
        <div className="flex justify-end gap-2 pr-2">
          <button
            onClick={() => navigate(`/provider-details/${record.key}`)}
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
    <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
      <div className="flex-1 p-8">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <IoArrowBackOutline
              className="text-2xl cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <h1 className="text-lg font-bold text-gray-800">Provider</h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-5 py-2 bg-white border border-[#10A4B2] text-[#10A4B2] rounded-xl font-medium">
              Active Provider
            </button>
            <button className="px-5 py-2 font-medium text-red-500 bg-white border border-red-500 rounded-xl">
              Blocked Provider
            </button>
            <Select
              placeholder="Sort of"
              className="w-32 custom-select"
              options={[{ value: "newest", label: "Newest" }]}
            />
          </div>
        </div>

        <Table
          dataSource={providers.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )}
          columns={columns}
          pagination={false}
          className="custom-provider-table"
        />
      </div>

      {/* USE THE NEW PAGINATION COMPONENT HERE */}
      <CustomPagination
        total={providers.length}
        pageSize={pageSize}
        current={currentPage}
        onChange={(page) => setCurrentPage(page)}
      />

      <style>{`
        .custom-provider-table .ant-table { background: transparent !important; }
        .custom-provider-table .ant-table-thead > tr > th {
          background: transparent !important;
          color: #10A4B2 !important; 
          border-bottom: none !important;
        }
        .custom-provider-table .ant-table-tbody > tr > td {
          border-bottom: none !important;
          padding: 14px 8px !important;
        }
        .custom-select .ant-select-selector {
            border-radius: 12px !important;
            border-color: #10A4B2 !important;
        }
      `}</style>
    </div>
  );
};

export default ProviderManagement;
