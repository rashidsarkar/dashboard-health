import React from "react";
import { HiUserAdd } from "react-icons/hi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { MdOutlineCalendarToday } from "react-icons/md";
import UserGrowthChart from "./UserGrowthChart";
import ProviderGrowth from "./ProviderGrowthChart";
import UserManagementDashbordHome from "../../page/UserManagement/UserManagementDashbordHome";
import { useGetMetaDataQuery } from "../../page/redux/api/metaDataApi";

const StatCard = ({ title, value, icon: Icon, loading }) => (
  <div className="flex flex-col items-center justify-center p-8 bg-white border border-[#13A3B5]/40 rounded-xl shadow-sm">
    <h2 className="mb-4 text-xl font-semibold text-gray-700">{title}</h2>
    <div className="bg-[#13A3B5] w-[65px] h-[65px] rounded-full flex justify-center items-center mb-4">
      <Icon className="text-3xl text-white" />
    </div>
    <h1 className="text-3xl font-bold text-gray-800">
      {loading ? "..." : value?.toLocaleString()}
    </h1>
  </div>
);

const Dashboard = () => {
  const { data: metaResponse, isLoading } = useGetMetaDataQuery();
  const stats = metaResponse?.data;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatCard
          title="Total Users"
          value={stats?.totalNormalUser || 0}
          icon={HiOutlineUserGroup}
          loading={isLoading}
        />
        <StatCard
          title="Total Provider"
          value={stats?.totalProvider || 0}
          icon={HiUserAdd}
          loading={isLoading}
        />
        <StatCard
          title="Total Appointments"
          value={stats?.activeAppointment || 0}
          icon={MdOutlineCalendarToday}
          loading={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 mt-8 lg:grid-cols-2">
        <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
          <UserGrowthChart />
        </div>
        <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
          <ProviderGrowth />
        </div>
      </div>

      <div className="w-full p-6 mt-8 bg-white border border-gray-100 shadow-sm rounded-xl">
        <p className="mb-4 text-2xl font-bold">Recent Appointments Request</p>
        <UserManagementDashbordHome />
      </div>
    </div>
  );
};

export default Dashboard;
