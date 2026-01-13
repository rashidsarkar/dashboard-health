import React, { useState, useMemo } from "react"; // Added useMemo
import { Table, Select, message, Spin } from "antd";
import { IoArrowBackOutline } from "react-icons/io5";
import { LuEye } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import {
  useGetProvidersQuery,
  useGetProviderTypesQuery,
  useToggleProviderBlockMutation,
} from "../redux/api/providerApi";
import { imageUrl } from "../../page/redux/api/baseApi";
import { Navigate } from "../../Navigate";

const ProviderManagement = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("active");
  const [selectedTypeId, setSelectedTypeId] = useState(null);
  const pageSize = 10;

  // 1. Fetch Provider Types
  const { data: typeData } = useGetProviderTypesQuery();

  // 2. Prepare Query Params (We don't send 'status' to the API anymore for filtering)
  const queryParams = {
    page: currentPage,
    limit: pageSize,
    ...(selectedTypeId && { providerTypeId: selectedTypeId }),
  };

  const { data, isLoading } = useGetProvidersQuery(queryParams);
  const [toggleBlock] = useToggleProviderBlockMutation();

  const providers = data?.data?.data || [];
  const meta = data?.data?.meta || {};

  // 3. Client-side filtering logic based on providers[0]?.user[0]?.isBlocked
  const filteredProviders = useMemo(() => {
    return providers.filter((item) => {
      const isBlocked = item?.user?.[0]?.isBlocked;
      if (activeTab === "active") return isBlocked === false;
      if (activeTab === "blocked") return isBlocked === true;
      return true;
    });
  }, [providers, activeTab]);

  const handleToggle = async (id, name) => {
    try {
      await toggleBlock(id).unwrap();
      message.success(`Status updated for ${name}`);
    } catch (err) {
      message.error("Failed to update status");
    }
  };

  const columns = [
    {
      title: "Provider Name",
      key: "name",
      render: (_, record) => {
        const profileImg = record.user?.[0]?.profile_image
          ? `${imageUrl}/${record.user[0].profile_image.replace(/\\/g, "/")}`
          : "https://cdn-icons-png.flaticon.com/512/149/149071.png";

        return (
          <div className="flex items-center gap-3">
            <img
              src={profileImg}
              className="object-cover w-10 h-10 border rounded-lg"
              alt="p"
            />
            <span className="font-medium text-gray-700">{record.fullName}</span>
          </div>
        );
      },
    },
    {
      title: "Provider type",
      dataIndex: ["providerType", "label"],
      key: "type",
      render: (text) => (
        <span className="text-[#10A4B2] font-medium">{text}</span>
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
        <div className="flex justify-end gap-2 pr-2">
          <button
            onClick={() =>
              navigate(`/dashboard/provider-details/${record._id}`)
            }
            className="w-8 h-8 flex justify-center items-center bg-[#10A4B2] text-white rounded-md hover:bg-[#0d8c99]"
          >
            <LuEye size={18} />
          </button>
          <button
            onClick={() => handleToggle(record.user?.[0]?._id, record.fullName)}
            className={`w-8 h-8 flex justify-center items-center text-white rounded-md ${
              activeTab === "active" ? "bg-[#EF4444]" : "bg-green-500"
            }`}
          >
            {/* If tab is active, show X (to block). If tab is blocked, show same icon or unblock icon */}
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
            {/* <IoArrowBackOutline
              className="text-2xl cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <h1 className="text-lg font-bold text-gray-800">
              Provider Management
            </h1> */}
            <Navigate title="Provider Management" />
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("active")}
              className={`px-5 py-2 border rounded-xl font-medium transition-all ${
                activeTab === "active"
                  ? "bg-white border-[#10A4B2] text-[#10A4B2] shadow-sm"
                  : "text-gray-400 border-gray-200"
              }`}
            >
              Active Provider
            </button>
            <button
              onClick={() => setActiveTab("blocked")}
              className={`px-6 py-2 border rounded-xl font-medium transition-all ${
                activeTab === "blocked"
                  ? "bg-white border-red-500 text-red-500 shadow-sm"
                  : "text-gray-400 border-gray-200"
              }`}
            >
              Blocked Provider
            </button>

            <Select
              placeholder="Sort by Type"
              allowClear
              className="w-40 custom-select"
              onChange={(v) => {
                setSelectedTypeId(v);
                setCurrentPage(1);
              }}
              options={typeData?.data?.map((t) => ({
                value: t._id,
                label: t.label,
              }))}
            />
          </div>
        </div>

        <div className="p-4 bg-white border border-gray-100 shadow-sm rounded-xl">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Spin />
            </div>
          ) : (
            <Table
              dataSource={filteredProviders} // Using the filtered list here
              columns={columns}
              pagination={false}
              rowKey="_id"
              className="custom-provider-table"
            />
          )}
        </div>
      </div>

      <CustomPagination
        total={meta.total || 0}
        pageSize={pageSize}
        current={currentPage}
        onChange={setCurrentPage}
      />

      <style>{`
        .custom-provider-table .ant-table { background: transparent !important; }
        .custom-provider-table .ant-table-thead > tr > th {
          background: transparent !important;
          color: #10A4B2 !important; 
          font-weight: 600 !important;
          border-bottom: 1px solid #f9f9f9 !important;
        }
        .custom-provider-table .ant-table-tbody > tr > td {
          border-bottom: 1px solid #f9f9f9 !important;
          padding: 14px 8px !important;
        }
        .custom-select .ant-select-selector {
            border-radius: 12px !important;
            border-color: #10A4B2 !important;
            height: 40px !important;
            display: flex !important;
            align-items: center !important;
        }
      `}</style>
    </div>
  );
};

export default ProviderManagement;
