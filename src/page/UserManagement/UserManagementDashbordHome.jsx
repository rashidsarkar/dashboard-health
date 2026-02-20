import React from "react";
import { Table, message, Spin, Modal } from "antd"; // Added Modal
import { LuEye } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import {
  useGetAppointmentQuery,
  useDeleteAppointmentMutation,
} from "../redux/api/BookingApi";
import { imageUrl } from "../redux/api/baseApi";

const BookingManagementDashboardHome = () => {
  const navigate = useNavigate();

  // 1. Fetch only 4 data items
  const { data, isLoading, isError } = useGetAppointmentQuery({
    page: 1,
    limit: 4,
  });

  // 2. Hook for Deletion
  const [deleteAppointment, { isLoading: isDeleting }] =
    useDeleteAppointmentMutation();

  const appointments = data?.data?.data || [];

  // 3. Handle Delete logic
  const handleDelete = (record) => {
    Modal.confirm({
      title: "Are you sure you want to delete this appointment?",
      content: `User: ${record.normalUser?.fullName}`,
      centered: true,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await deleteAppointment(record._id).unwrap();
          message.success("Appointment deleted successfully");
        } catch (err) {
          message.error(err?.data?.message || "Failed to delete appointment");
        }
      },
    });
  };

  const columns = [
    {
      title: "User Name",
      key: "name",
      render: (_, record) => {
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
      dataIndex: ["provider", "providerTypeKey"],
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
          <p className="text-[10px] text-gray-400">
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
          className={`font-semibold ${
            status === "PENDING" ? "text-orange-500" : "text-red-500"
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

          {/* Corrected delete button */}
          <button
            onClick={() => handleDelete(record)}
            disabled={isDeleting}
            className="w-8 h-8 flex justify-center items-center bg-[#EF4444] text-white rounded-md hover:bg-red-600 transition-all disabled:opacity-50"
          >
            <RxCross2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  if (isLoading)
    return (
      <div className="flex justify-center p-10">
        <Spin size="large" />
      </div>
    );
  if (isError)
    return (
      <div className="py-4 font-medium text-center text-red-500">
        Failed to load appointments
      </div>
    );

  return (
    <div className="p-6 overflow-x-auto bg-white shadow-sm rounded-xl">
      <Table
        dataSource={appointments}
        columns={columns}
        pagination={false}
        rowKey="_id"
        className="custom-booking-table"
      />

      <style>{`
        .custom-booking-table .ant-table-thead > tr > th {
          background: transparent !important;
          color: #10A4B2 !important; 
          font-weight: 600 !important;
          border-bottom: none !important;
          font-size: 14px;
          position: relative;
          padding: 12px 8px !important;
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
          padding: 16px 8px !important;
          color: #4B5563;
        }

        .custom-booking-table .ant-table { background: transparent !important; }
      `}</style>
    </div>
  );
};

export default BookingManagementDashboardHome;
