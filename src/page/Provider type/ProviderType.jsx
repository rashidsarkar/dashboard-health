import React, { useState } from "react";
import { Table, message, Modal, Input, Form, Spin, Empty } from "antd";
import { CiEdit } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import {
  useAddProviderTypeMutation,
  useDeleteProviderTypeMutation,
  useGetProviderTypesQuery,
  useUpdateProviderTypeMutation,
} from "../redux/api/providerTypeApi";

const ProviderType = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // API hooks
  const { data: response, isLoading, refetch } = useGetProviderTypesQuery();
  const [addProviderType] = useAddProviderTypeMutation();
  const [updateProviderType] = useUpdateProviderTypeMutation();
  const [deleteProviderType] = useDeleteProviderTypeMutation();

  const providerTypes = response?.data || [];

  // Handlers
  const handleOpenModal = (record = null) => {
    if (record) {
      setEditingId(record._id);
      form.setFieldsValue({ label: record.label });
    } else {
      setEditingId(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleFinish = async (values) => {
    const payload = {
      key: values.label.toUpperCase().replace(/\s+/g, "_"),
      label: values.label,
    };

    try {
      if (editingId) {
        await updateProviderType({ id: editingId, data: payload }).unwrap();
        message.success("Provider type updated successfully");
      } else {
        await addProviderType(payload).unwrap();
        message.success("Provider type added successfully");
      }

      refetch(); // 👈 REFRESH DATA
      setIsModalOpen(false);
    } catch (err) {
      message.error(err?.data?.message || "Operation failed");
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Delete Provider Type",
      content: "Are you sure you want to delete this provider type?",
      centered: true,
      onOk: async () => {
        try {
          await deleteProviderType(id).unwrap();
          message.success("Deleted successfully");
          refetch(); // 👈 REFRESH DATA
        } catch {
          message.error("Failed to delete");
        }
      },
    });
  };

  const columns = [
    {
      title: "Provider Type",
      dataIndex: "label",
      key: "label",
      render: (text) => (
        <span className="text-[16px] font-bold text-gray-800 uppercase">
          {text}
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
            onClick={() => handleOpenModal(record)}
            className="w-8 h-8 flex justify-center items-center bg-[#10A4B2] text-white rounded-md hover:bg-[#0d8c99] transition-all"
          >
            <CiEdit size={20} />
          </button>
          <button
            onClick={() => handleDelete(record._id)}
            className="w-8 h-8 flex justify-center items-center border border-[#FF4D4D] text-[#FF4D4D] rounded-md hover:bg-red-50 transition-all"
          >
            <RxCross2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    /* flex-col ensures children like the header and table container flow correctly */
    <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
      {/* Container with full width padding */}
      <div className="flex-1 p-8">
        {/* Header - Stretches to full width of content area */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <IoArrowBackOutline
              className="text-[#10A4B2] text-2xl cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <h1 className="text-xl font-bold text-gray-800">Provider type</h1>
          </div>

          <button
            onClick={() => handleOpenModal()}
            className="bg-[#10A4B2] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#0d8c99] transition-all"
          >
            + Add Provider type
          </button>
        </div>

        {/* Table Area - w-full removes the limitation */}
        <div className="w-full p-6 overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Spin size="large" />
            </div>
          ) : providerTypes.length === 0 ? (
            <Empty description="No provider types found" />
          ) : (
            <Table
              dataSource={providerTypes}
              columns={columns}
              pagination={false}
              rowKey="_id"
              className="custom-full-width-table"
            />
          )}
        </div>
      </div>

      {/* Styles for Table Perfection */}
      <style>{`
        .custom-full-width-table .ant-table {
          background: transparent !important;
        }
        .custom-full-width-table .ant-table-thead > tr > th {
          background: transparent !important;
          color: #10A4B2 !important;
          font-weight: 600 !important;
          border-bottom: none !important;
          font-size: 16px;
          position: relative;
          padding: 16px 8px !important;
        }

        /* Vertical line between Provider Type and Action */
        .custom-full-width-table .ant-table-thead > tr > th:not(:last-child)::after {
          content: "";
          position: absolute;
          right: 0;
          top: 30%;
          height: 40%;
          width: 1px;
          background-color: #f0f0f0;
        }

        /* Airy layout - no horizontal borders */
        .custom-full-width-table .ant-table-tbody > tr > td {
          border-bottom: none !important;
          padding: 24px 8px !important;
        }
        
        .custom-full-width-table .ant-table-tbody > tr:hover > td {
          background-color: #fafafa !important;
        }
      `}</style>

      {/* Modal remains the same */}
      <Modal
        title={editingId ? "Edit Provider Type" : "Add Provider Type"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          className="mt-4"
        >
          <Form.Item
            name="label"
            label="Type Name"
            rules={[{ required: true, message: "Please enter provider type" }]}
          >
            <Input placeholder="e.g. DOCTOR" className="rounded-lg h-11" />
          </Form.Item>
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-6 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#10A4B2] text-white rounded-lg font-bold"
            >
              Save
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ProviderType;
