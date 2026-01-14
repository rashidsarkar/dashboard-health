import React, { useState } from "react";
import { Table, message, Modal, Input, Form, Select, Spin } from "antd";
import { CiEdit } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import { Navigate } from "../../Navigate";
import {
  useGetAdminServicesQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} from "../redux/api/serviceApi";
import { useGetProviderTypesQuery } from "../redux/api/providerApi";

const ServiceManagement = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // States for filter and modal
  const [selectedType, setSelectedType] = useState("DOCTOR");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // API Hooks
  const { data: typeData } = useGetProviderTypesQuery();
  const { data: serviceData, isLoading } =
    useGetAdminServicesQuery(selectedType);
  const [addService] = useAddServiceMutation();
  const [updateService] = useUpdateServiceMutation();
  const [deleteService] = useDeleteServiceMutation();

  const services = serviceData?.data || [];
  const meta = serviceData?.meta || { total: services.length };

  // Handlers
  const handleOpenModal = (record = null) => {
    if (record) {
      setEditingId(record._id);
      form.setFieldsValue({
        providerType: record.providerType,
        title: record.title,
        price: record.price,
      });
    } else {
      setEditingId(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleFinish = async (values) => {
    try {
      if (editingId) {
        await updateService({
          id: editingId,
          data: { title: values.title, price: Number(values.price) },
        }).unwrap();
        message.success("Service updated");
      } else {
        await addService(values).unwrap();
        message.success("Service added");
      }
      setIsModalOpen(false);
    } catch (err) {
      message.error(err?.data?.message || "Action failed");
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this service?",
      centered: true,
      onOk: async () => {
        try {
          await deleteService(id).unwrap();
          message.success("Deleted");
        } catch (err) {
          message.error("Delete failed");
        }
      },
    });
  };

  const columns = [
    {
      title: "Service Name",
      dataIndex: "title",
      key: "title",
      render: (text) => (
        <span className="font-medium text-gray-700">{text}</span>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <span className="font-semibold text-gray-700">€{price}</span>
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
            className="w-8 h-8 flex justify-center items-center bg-[#10A4B2] text-white rounded-md hover:bg-[#0d8c99]"
          >
            <CiEdit size={20} />
          </button>
          <button
            onClick={() => handleDelete(record._id)}
            className="w-8 h-8 flex justify-center items-center bg-[#EF4444] text-white rounded-md hover:bg-red-600"
          >
            <RxCross2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
      <div className="flex-1 p-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <IoArrowBackOutline
              className="text-2xl cursor-pointer text-[#10A4B2]"
              onClick={() => navigate(-1)}
            />
            <h1 className="text-lg font-bold text-gray-800">Add service</h1>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Select
              value={selectedType}
              onChange={setSelectedType}
              className="w-32 custom-header-select"
              options={typeData?.data?.map((t) => ({
                value: t.key,
                label: t.label,
              }))}
            />
            <button
              onClick={() => handleOpenModal()}
              className="bg-[#10A4B2] text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 shadow-sm"
            >
              + Add service
            </button>
          </div>
        </div>

        {/* Table Area */}
        <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl">
          <Table
            dataSource={services}
            columns={columns}
            pagination={false}
            rowKey="_id"
            loading={isLoading}
            className="custom-service-table"
          />
        </div>
      </div>

      <CustomPagination
        total={meta.total || 0}
        pageSize={pageSize}
        current={currentPage}
        onChange={setCurrentPage}
      />

      {/* ADD/EDIT MODAL - CUSTOM DESIGN */}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        width={450}
        closeIcon={null}
      >
        <div className="p-4">
          <div
            className="flex items-center gap-3 mb-8 cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          >
            <IoArrowBackOutline className="text-2xl" />
            <h2 className="text-xl font-bold text-gray-800">Add new service</h2>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            requiredMark={false}
          >
            <Form.Item
              name="providerType"
              label={
                <span className="font-semibold text-gray-500">
                  Provider Type
                </span>
              }
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select providerType"
                className="custom-modal-input"
                options={typeData?.data?.map((t) => ({
                  value: t.key,
                  label: t.label,
                }))}
              />
            </Form.Item>

            <Form.Item
              name="title"
              label={
                <span className="text-[#10A4B2] font-semibold">
                  Service Name
                </span>
              }
              rules={[{ required: true }]}
            >
              <Input
                placeholder="Enter service name"
                className="custom-modal-input"
                suffix={<span className="text-[#10A4B2] text-xl">+</span>}
              />
            </Form.Item>

            <Form.Item
              name="price"
              label={
                <span className="font-semibold text-gray-500">
                  Service price
                </span>
              }
              rules={[{ required: true }]}
            >
              <Input
                placeholder="Enter price"
                type="number"
                className="custom-modal-input"
              />
            </Form.Item>

            <button
              type="submit"
              className="w-full bg-[#10A4B2] text-white py-3 rounded-xl font-bold mt-6 text-lg hover:bg-[#0d8c99] transition-all"
            >
              Add Service
            </button>
          </Form>
        </div>
      </Modal>

      <style>{`
        .custom-service-table .ant-table-thead > tr > th {
          background: transparent !important;
          color: #10A4B2 !important; font-weight: 600 !important; border-bottom: none !important; position: relative;
        }
        .custom-service-table .ant-table-thead > tr > th:not(:last-child)::after {
          content: ""; position: absolute; right: 0; top: 30%; height: 40%; width: 1px; background-color: #f0f0f0;
        }
        .custom-service-table .ant-table-tbody > tr > td { border-bottom: none !important; padding: 16px 8px !important; }

        /* Modal Input Styling */
        .custom-modal-input {
            border-radius: 8px !important; border-color: #10A4B2 !important; height: 45px !important;
        }
        .custom-header-select .ant-select-selector {
            border-radius: 10px !important; border-color: #10A4B2 !important;
        }
      `}</style>
    </div>
  );
};

export default ServiceManagement;
