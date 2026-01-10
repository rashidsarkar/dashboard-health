import React, { useState } from "react";
import { Table, message, Spin } from "antd";
import { LuEye } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import { useGetAppointmentQuery } from "../redux/api/BookingApi"; // Ensure path is correct
import { imageUrl } from "../redux/api/baseApi"; // Ensure path is correct

function BookingManagement() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [activeTab, setActiveTab] = useState("requested");

  // 1. Fetch real data from API
  const { data, isLoading, isError } = useGetAppointmentQuery({
    page: currentPage,
    limit: pageSize,
  });

  const appointments = data?.data?.data || [];
  const meta = data?.data?.meta || {};

  // 2. Filter data based on tabs to match backend status
  const filteredData = appointments.filter((item) => {
    if (activeTab === "requested") return item.status === "PENDING";
    if (activeTab === "cancelled") return item.status === "CANCELLED";
    return true;
  });

  const columns = [
    {
      title: "User Name",
      key: "name",
      render: (_, record) => {
        // Handle Windows-style backslashes in image paths
        const profileImg = record.normalUser?.profile_image
          ? `${imageUrl}/${record.normalUser.profile_image.replace(/\\/g, "/")}`
          : "https://cdn-icons-png.flaticon.com/512/149/149071.png";

        return (
          <div className="flex items-center gap-3">
            <img
              src={profileImg}
              className="object-cover w-10 h-10 border border-gray-100 rounded-lg shadow-sm"
              alt="User"
            />
            <span className="font-medium text-gray-700">
              {record.normalUser?.fullName || "N/A"}
            </span>
          </div>
        );
      },
    },
    {
      title: "Provider type",
      dataIndex: ["provider", "providerTypeKey"], // Access nested object keys
      key: "providerType",
      render: (text) => (
        <span className="text-gray-600 capitalize">{text?.toLowerCase()}</span>
      ),
    },
    {
      title: "Request date",
      dataIndex: "createdAt",
      key: "requestDate",
      render: (date) =>
        new Date(date).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
    },
    {
      title: "Appointment slot",
      dataIndex: "appointmentDateTime",
      key: "slot",
      render: (date) => (
        <div className="text-sm">
          <p className="font-semibold text-gray-700">
            {new Date(date).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className="text-xs text-gray-400">
            {new Date(date).toDateString()}
          </p>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`font-bold px-3 py-1 rounded-full text-xs ${
            status === "PENDING"
              ? "bg-orange-50 text-orange-500"
              : "bg-red-50 text-red-500"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "right",
      render: (_, record) => (
        <div className="flex justify-end gap-2 pr-4">
          {/* Eye Button: Navigates and passes the WHOLE record object as state */}
          <button
            onClick={() =>
              navigate(`/dashboard/booking-details/${record._id}`, {
                state: { booking: record },
              })
            }
            className="w-8 h-8 flex justify-center items-center bg-[#10A4B2] text-white rounded-md hover:bg-[#0d8c99] transition-all"
          >
            <LuEye size={18} />
          </button>

          <button
            onClick={() =>
              message.error(
                `Cancelled action for ${record.normalUser?.fullName}`
              )
            }
            className="w-8 h-8 flex justify-center items-center bg-[#EF4444] text-white rounded-md hover:bg-red-600 transition-all"
          >
            <RxCross2 size={18} />
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

  if (isError)
    return (
      <div className="mt-20 font-medium text-center text-red-500">
        Error loading bookings. Please check your connection.
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
      <div className="flex-1 p-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <IoArrowBackOutline
              className="text-[#10A4B2] text-2xl cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <h1 className="text-xl font-bold text-gray-800">
              Booking management
            </h1>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("requested")}
              className={`px-6 py-2 rounded-xl border transition-all font-semibold ${
                activeTab === "requested"
                  ? "bg-white border-[#10A4B2] text-[#10A4B2] shadow-sm"
                  : "bg-white border-gray-200 text-gray-400"
              }`}
            >
              Requested
            </button>
            <button
              onClick={() => setActiveTab("cancelled")}
              className={`px-6 py-2 rounded-xl border transition-all font-semibold ${
                activeTab === "cancelled"
                  ? "bg-white border-red-500 text-red-500 shadow-sm"
                  : "bg-white border-gray-200 text-gray-400"
              }`}
            >
              Cancelled
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="w-full overflow-x-auto bg-white border border-gray-100 shadow-sm rounded-xl">
          <Table
            dataSource={filteredData}
            columns={columns}
            pagination={false}
            rowKey="_id"
            className="custom-booking-table"
          />
        </div>
      </div>

      {/* Reusable Custom Pagination Component */}
      <CustomPagination
        total={meta.total || 0}
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
          border-bottom: 1px solid #f9f9f9 !important;
          font-size: 15px;
          position: relative;
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
          border-bottom: 1px solid #f9f9f9 !important;
          padding: 18px 8px !important;
          color: #4B5563;
        }
        .custom-booking-table .ant-table-tbody > tr:last-child > td {
          border-bottom: none !important;
        }
      `}</style>
    </div>
  );
}

export default BookingManagement;
