import React from "react";
import { HiUserAdd } from "react-icons/hi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { MdOutlineCalendarToday } from "react-icons/md";
import UserGrowthChart from "./UserGrowthChart";
import BookingGrowth from "./BookingGrowth";
import ShopRegistration from "./ShopRegister";
import ProviderGrowth from "./ProviderGrowthChart";

// Reusable Stat Card Component to keep code clean
const StatCard = ({ title, value, icon: Icon }) => (
  <div className="flex flex-col items-center justify-center p-8 bg-white border border-[#13A3B5]/40 rounded-xl shadow-sm">
    <h2 className="mb-4 text-xl font-semibold text-gray-700">{title}</h2>
    <div className="bg-[#13A3B5] w-[65px] h-[65px] rounded-full flex justify-center items-center mb-4">
      <Icon className="text-3xl text-white" />
    </div>
    <h1 className="text-3xl font-bold text-gray-800">{value}</h1>
  </div>
);

const Dashboard = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Top Cards Row - 3 Columns */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatCard
          title="Total Users"
          value="852,650"
          icon={HiOutlineUserGroup}
        />
        <StatCard title="Total Provider" value="4,782" icon={HiUserAdd} />
        <StatCard
          title="Total Appointments"
          value="4,782"
          icon={MdOutlineCalendarToday}
        />
      </div>

      {/* Charts Row - 2 Columns */}
      <div className="grid grid-cols-1 gap-6 mt-8 lg:grid-cols-2">
        <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
          <UserGrowthChart />
        </div>
        <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
          <ProviderGrowth />
        </div>
        {/* <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
          <BookingGrowth />
        </div> */}
      </div>

      {/* Bottom Section */}
      <div className="w-full p-6 mt-8 bg-white border border-gray-100 shadow-sm rounded-xl">
        <ShopRegistration />
      </div>
    </div>
  );
};

export default Dashboard;
