import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import React, { useEffect, useMemo, useState } from "react";
import { Select } from "antd";

const ProviderGrowth = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [years, setYears] = useState([]);

  useEffect(() => {
    const startYear = 2024;
    const yearsArray = Array.from(
      { length: currentYear - startYear + 1 },
      (_, index) => startYear + index
    );
    setYears(yearsArray);
  }, [currentYear]);

  const { monthlyData, maxUsers } = useMemo(() => {
    const monthMap = {
      Jan: 700,
      Feb: 300,
      Mar: 900,
      Apr: 600,
      may: 400, // lowercase 'm' to match your image
      Jun: 750,
      Jul: 350,
      Aug: 500,
      Sep: 650,
      Oct: 850,
      Nov: 200,
      Dec: 700,
    };

    // Calculate a nice round number for the Y-axis top
    const maxVal = Math.max(...Object.values(monthMap));
    const maxUsers = Math.ceil(maxVal / 400) * 400 + 400;

    return {
      monthlyData: Object.keys(monthMap).map((month) => ({
        name: month,
        totalUser: monthMap[month],
      })),
      maxUsers,
    };
  }, []);

  return (
    <div className="w-full h-[350px]">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-700">Provider growth</h3>
        <Select
          value={year}
          onChange={setYear}
          className="w-24"
          options={years.map((item) => ({ value: item, label: item }))}
          // Customizing AntD select style to match dashboard
          style={{ borderRadius: "6px" }}
        />
      </div>

      {/* Chart Section */}
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={monthlyData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          {/* Grid: Only horizontal lines as per your reference image */}
          <CartesianGrid
            vertical={false}
            strokeDasharray="3 3"
            stroke="#E5E7EB"
          />

          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#6B7280" }}
            dy={10}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#6B7280" }}
            domain={[0, 1600]} // Matching the 0-1600 scale in your image
            ticks={[0, 100, 200, 400, 800, 1600]} // Custom ticks based on your image
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
            fill="#10A4B2" // <--- Your requested color
            barSize={32}
            radius={[4, 4, 0, 0]} // Slightly rounded top
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProviderGrowth;
