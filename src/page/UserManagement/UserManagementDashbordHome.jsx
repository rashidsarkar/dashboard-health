import React from "react";
import { Table, message } from "antd";
import { LuEye } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const BookingManagementDashboardHome = () => {
  const navigate = useNavigate();

  const dummyBookings = [
    {
      key: "1",
      name: "Alisha Lehmann",
      image: "https://avatar.iran.liara.run/public/girl?1",
      providerType: "Doctor",
      requestDate: "2 Aug 2025 2:30 PM",
      slot: "From 6:30 PM-To-10:30pm",
      status: "Requested",
    },
    {
      key: "2",
      name: "Dianne Russell",
      image: "https://avatar.iran.liara.run/public/girl?2",
      providerType: "Doctor",
      requestDate: "2 Aug 2025 2:30 PM",
      slot: "From 6:30 PM-To-10:30pm",
      status: "Requested",
    },
    {
      key: "3",
      name: "Robert Fox",
      image: "https://avatar.iran.liara.run/public/boy?3",
      providerType: "Pharmacy",
      requestDate: "2 Aug 2025 2:30 PM",
      slot: "From 6:30 PM-To-10:30pm",
      status: "Requested",
    },
    {
      key: "4",
      name: "Wade Warren",
      image: "https://avatar.iran.liara.run/public/girl?4",
      providerType: "Clinics",
      requestDate: "2 Aug 2025 2:30 PM",
      slot: "From 6:30 PM-To-10:30pm",
      status: "Requested",
    },
  ];

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
    <div className="p-6 overflow-x-auto bg-white shadow-sm rounded-xl">
      <Table
        dataSource={dummyBookings}
        columns={columns}
        pagination={false}
        className="custom-booking-table"
      />

      <style>{`
        /* Header styling with vertical dividers like the image */
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
};

export default BookingManagementDashboardHome;
