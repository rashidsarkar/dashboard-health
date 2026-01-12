import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Select, Spin } from "antd";
import { useGetUserChartDataQuery } from "../../page/redux/api/metaDataApi";

const UserGrowthChart = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const { data: response, isLoading } = useGetUserChartDataQuery(year);

  const chartData = response?.data?.chartData || [];
  const yearsDropdown = response?.data?.yearsDropdown || [year];

  return (
    <div className="w-full h-[350px]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-700">Users growth</h3>
        <Select
          value={year}
          onChange={setYear}
          className="w-28"
          options={yearsDropdown.map((y) => ({ value: y, label: y }))}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-[280px]">
          <Spin />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="90%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="#E5E7EB"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6B7280" }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6B7280" }}
            />
            <Tooltip
              cursor={{ fill: "#f3f4f6" }}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Bar
              dataKey="totalUser"
              fill="#10A4B2"
              barSize={32}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default UserGrowthChart;
