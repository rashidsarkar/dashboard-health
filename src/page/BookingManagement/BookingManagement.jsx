import React, { useState } from "react";
import { Table, message } from "antd";
import { LuEye } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import CustomPagination from "../../components/CustomPagination/CustomPagination";

function BookingManagement() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [activeTab, setActiveTab] = useState("requested");

  const dummyBookings = Array.from({ length: 25 }, (_, index) => ({
    key: (index + 1).toString(),
    name: index % 2 === 0 ? "Alisha Lehmann" : "Robert Fox",
    image: `https://avatar.iran.liara.run/public/${index + 1}`,
    providerType: index % 3 === 0 ? "Doctor" : "Pharmacy",
    requestDate: "2 Aug 2025 2:30 PM",
    slot: "From 6:30 PM-To-10:30pm",
    status: "Requested",
  }));

  const columns = [
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record.image}
            className="object-cover w-10 h-10 rounded-lg"
            alt="User"
          />
          <span className="font-medium text-gray-700">{text}</span>
        </div>
      ),
    },
    {
      title: "Provider type",
      dataIndex: "providerType",
      key: "providerType",
    },
    {
      title: "Request date",
      dataIndex: "requestDate",
      key: "requestDate",
    },
    {
      title: "Appointment slot",
      dataIndex: "slot",
      key: "slot",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span className="font-semibold text-gray-800">{status}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "right",
      render: (_, record) => (
        <div className="flex justify-end gap-2 pr-4">
          <button
            onClick={() => navigate(`/booking-details/${record.key}`)}
            className="w-8 h-8 flex justify-center items-center bg-[#10A4B2] text-white rounded-md hover:bg-[#0d8c99] transition-all"
          >
            <LuEye size={18} />
          </button>

          <button
            onClick={() =>
              message.error(`Cancelled booking for ${record.name}`)
            }
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
      {/* Header Section */}
      <div className="flex-1 p-8">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <IoArrowBackOutline
              className="text-[#10A4B2] text-2xl cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <h1 className="text-lg font-bold text-gray-800">
              Booking management
            </h1>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("requested")}
              className={`px-6 py-2 rounded-xl border transition-all font-medium ${
                activeTab === "requested"
                  ? "bg-white border-[#10A4B2] text-[#10A4B2]"
                  : "bg-white border-gray-200 text-gray-400"
              }`}
            >
              Requested
            </button>
            <button
              onClick={() => setActiveTab("cancelled")}
              className={`px-6 py-2 rounded-xl border transition-all font-medium ${
                activeTab === "cancelled"
                  ? "bg-white border-red-500 text-red-500"
                  : "bg-white border-gray-200 text-gray-400"
              }`}
            >
              Cancelled
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="w-full overflow-x-auto">
          <Table
            dataSource={dummyBookings.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )}
            columns={columns}
            pagination={false}
            className="custom-booking-table"
          />
        </div>
      </div>

      {/* Pagination Component */}
      <CustomPagination
        total={dummyBookings.length}
        pageSize={pageSize}
        current={currentPage}
        onChange={(page) => setCurrentPage(page)}
      />

      <style>{`
        .custom-booking-table .ant-table { background: transparent !important; }
        .custom-booking-table .ant-table-thead > tr > th {
          background: transparent !important;
          color: #10A4B2 !important; 
          font-weight: 600 !important;
          border-bottom: none !important;
          font-size: 15px;
          position: relative;
          padding: 16px 8px !important;
        }

        .custom-booking-table .ant-table-thead > tr > th:not(:last-child)::after {
          content: "";
          position: absolute;
          right: 0;
          top: 30%;
          height: 40%;
          width: 1px;
          background-color: #f0f0f0;
        }

        .custom-booking-table .ant-table-tbody > tr > td {
          border-bottom: none !important;
          padding: 20px 8px !important;
          color: #4B5563;
        }

        .custom-booking-table .ant-table {
          background: transparent !important;
        }
      `}</style>
    </div>
  );
}

export default BookingManagement;
