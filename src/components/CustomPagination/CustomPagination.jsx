import React from "react";
import { Pagination } from "antd";

const CustomPagination = ({ total, pageSize, current, onChange }) => {
  return (
    <div className="w-full bg-[#E9E9E9] py-4 flex justify-center border-t border-gray-200">
      <div className="custom-pagination-wrapper">
        <Pagination
          current={current}
          total={total}
          pageSize={pageSize}
          onChange={onChange}
          showSizeChanger={false}
          itemRender={(page, type, originalElement) => {
            if (type === "prev")
              return <span className="text-gray-500">{"<"}</span>;
            if (type === "next")
              return <span className="text-gray-500">{">"}</span>;
            if (type === "jump-prev")
              return <span className="text-gray-500">{"<<"}</span>;
            if (type === "jump-next")
              return <span className="text-gray-500">{">>"}</span>;
            return originalElement;
          }}
        />
      </div>

      <style>{`
        .custom-pagination-wrapper .ant-pagination-item, 
        .custom-pagination-wrapper .ant-pagination-prev, 
        .custom-pagination-wrapper .ant-pagination-next, 
        .custom-pagination-wrapper .ant-pagination-jump-prev, 
        .custom-pagination-wrapper .ant-pagination-jump-next {
          min-width: 34px !important;
          height: 34px !important;
          line-height: 34px !important;
          border-radius: 6px !important;
          background: white !important;
          border: none !important;
          margin: 0 3px !important;
          display: inline-flex !important;
          align-items: center;
          justify-content: center;
        }
        .custom-pagination-wrapper .ant-pagination-item-active {
          background-color: #10A4B2 !important; /* Your Teal Color */
          border: none !important;
        }
        .custom-pagination-wrapper .ant-pagination-item-active a {
          color: white !important;
        }
        .custom-pagination-wrapper .ant-pagination-item:hover {
            background-color: #f0f0f0 !important;
        }
      `}</style>
    </div>
  );
};

export default CustomPagination;
