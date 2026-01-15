import React, { useState, useEffect } from "react";
import { message, Modal, Input, Form, Spin, Upload } from "antd";
import { IoArrowBackOutline, IoCameraOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import {
  useGetArticlesQuery,
  useAddArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} from "../redux/api/articleApi";
import { imageUrl } from "../../page/redux/api/baseApi";

const Articles = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [fileList, setFileList] = useState([]);

  // API Hooks
  const { data: response, isLoading } = useGetArticlesQuery({
    page: currentPage,
    limit: 9,
  });
  const [addArticle, { isLoading: isAdding }] = useAddArticleMutation();
  const [updateArticle, { isLoading: isUpdating }] = useUpdateArticleMutation();
  const [deleteArticle] = useDeleteArticleMutation();

  const articles = response?.data?.data || [];
  const meta = response?.data?.meta || {};

  // Normalize path
  const getImg = (path) =>
    path ? `${imageUrl}/${path.replace(/\\/g, "/")}` : "";

  // Handlers
  const handleOpenModal = (record = null) => {
    if (record) {
      setEditingId(record._id);
      form.setFieldsValue({ title: record.title, details: record.details });
      setFileList([{ url: getImg(record.article_image) }]);
    } else {
      setEditingId(null);
      form.resetFields();
      setFileList([]);
    }
    setIsModalOpen(true);
  };

  const handleFinish = async (values) => {
    const formData = new FormData();
    const dataJson = JSON.stringify({
      title: values.title,
      details: values.details,
    });

    formData.append("data", dataJson);
    if (fileList[0]?.originFileObj) {
      formData.append("article_image", fileList[0].originFileObj);
    }

    try {
      if (editingId) {
        await updateArticle({ id: editingId, formData }).unwrap();
        message.success("Article updated");
      } else {
        await addArticle(formData).unwrap();
        message.success("Article added");
      }
      setIsModalOpen(false);
    } catch (err) {
      message.error(err?.data?.message || "Operation failed");
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Delete Article",
      content: "Are you sure you want to delete this article?",
      centered: true,
      onOk: async () => {
        try {
          await deleteArticle(id).unwrap();
          message.success("Deleted");
        } catch {
          message.error("Delete failed");
        }
      },
    });
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB] p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <IoArrowBackOutline
            className="text-2xl cursor-pointer text-[#10A4B2]"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-lg font-bold text-gray-800">
            Health & Wellness Articles
          </h1>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-[#10A4B2] text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2"
        >
          + Add Articles
        </button>
      </div>

      {/* Grid Layout */}
      <div className="flex-1">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((item) => (
            <div
              key={item._id}
              className="relative overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl group"
            >
              {/* Image with overlay buttons */}
              <div className="relative w-full h-48">
                <img
                  src={getImg(item.article_image)}
                  className="object-cover w-full h-full"
                  alt="Article"
                />
                <div className="absolute flex gap-2 top-2 right-2">
                  <button
                    onClick={() => handleOpenModal(item)}
                    className="bg-[#10A4B2] text-white p-1.5 rounded-md shadow-md"
                  >
                    <CiEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-[#EF4444] text-white p-1.5 rounded-md shadow-md"
                  >
                    <RiDeleteBin6Line size={18} />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <h2 className="text-[#10A4B2] font-bold text-lg mb-1 truncate">
                  {item.title}
                </h2>
                <p className="mb-3 text-sm text-gray-500 line-clamp-2">
                  {item.details}
                </p>
                <span className="text-[#10A4B2] font-bold text-xs">
                  Nutrition
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-10">
        <CustomPagination
          total={meta.total || 0}
          pageSize={9}
          current={currentPage}
          onChange={setCurrentPage}
        />
      </div>

      {/* Add/Edit Modal */}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        width={500}
        closeIcon={null}
      >
        <div className="p-4">
          <div
            className="flex items-center gap-3 mb-8 cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          >
            <IoArrowBackOutline className="text-2xl" />
            <h2 className="text-xl font-bold text-gray-800">
              {editingId ? "Edit Articles" : "Add Articles"}
            </h2>
          </div>

          <Form form={form} layout="vertical" onFinish={handleFinish}>
            <Form.Item
              name="title"
              label={<span className="font-semibold text-gray-600">Title</span>}
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter the title" className="custom-input" />
            </Form.Item>

            <Form.Item
              name="details"
              label={
                <span className="font-semibold text-gray-600">
                  Introduction
                </span>
              }
              rules={[{ required: true }]}
            >
              <Input.TextArea
                placeholder="Enter service name"
                rows={4}
                className="custom-input"
              />
            </Form.Item>

            <div className="flex gap-4 mb-6">
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={({ fileList }) => setFileList(fileList)}
                beforeUpload={() => false}
                maxCount={1}
              >
                {fileList.length < 1 && (
                  <div className="flex flex-col items-center">
                    <IoCameraOutline size={24} className="text-[#10A4B2]" />
                  </div>
                )}
              </Upload>
            </div>

            <button
              disabled={isAdding || isUpdating}
              type="submit"
              className="w-full bg-[#10A4B2] text-white py-3 rounded-xl font-bold text-lg hover:bg-[#0d8c99] transition-all"
            >
              {isAdding || isUpdating ? (
                <Spin size="small" />
              ) : editingId ? (
                "Update Articles"
              ) : (
                "Add Articles"
              )}
            </button>
          </Form>
        </div>
      </Modal>

      <style>{`
        .custom-input { border-radius: 8px !important; border-color: #10A4B2 !important; }
        .ant-upload-select-picture-card { border-radius: 12px !important; border-style: dashed !important; border-color: #10A4B2 !important; width: 80px !important; height: 80px !important; }
      `}</style>
    </div>
  );
};

export default Articles;
