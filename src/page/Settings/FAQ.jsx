import React, { useState } from "react";
import { message, Modal, Spin } from "antd";
import { FaRegQuestionCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { Navigate } from "../../Navigate";
import {
  useAddFaqMutation,
  useDeleteFaqMutation,
  useEditFaqMutation,
  useGetFaqQuery,
} from "../redux/api/manageWebApi";

const FAQ = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // 1. Fetch Data
  const { data: faqResponse, isLoading } = useGetFaqQuery();
  const faqs = faqResponse?.data || [];
  console.log(faqs);

  // 2. Mutations
  const [addFaq, { isLoading: isAdding }] = useAddFaqMutation();
  const [editFaq, { isLoading: isUpdating }] = useEditFaqMutation();
  const [deleteFaq, { isLoading: isDeleting }] = useDeleteFaqMutation();

  const handleClick = (index) => {
    setIsAccordionOpen((prevIndex) => (prevIndex === index ? null : index));
  };

  // Create logic
  const handleAddFaq = async () => {
    if (!question || !answer) return message.warning("Please fill all fields");
    try {
      await addFaq({ question, answer }).unwrap();
      message.success("FAQ added successfully");
      setAddModalOpen(false);
      setQuestion("");
      setAnswer("");
    } catch (err) {
      message.error(err?.data?.message || "Failed to add FAQ");
    }
  };

  // Update logic
  const handleUpdateFaq = async () => {
    if (!question || !answer) return message.warning("Please fill all fields");
    try {
      await editFaq({
        id: selectedFaq._id,
        data: { question, answer },
      }).unwrap();
      message.success("FAQ updated successfully");
      setUpdateModalOpen(false);
      setSelectedFaq(null);
      setQuestion("");
      setAnswer("");
    } catch (err) {
      message.error(err?.data?.message || "Failed to update FAQ");
    }
  };

  // Delete logic
  const handleDeleteFaq = async () => {
    try {
      await deleteFaq(selectedFaq._id).unwrap();
      message.success("FAQ deleted successfully");
      setDeleteModalOpen(false);
      setSelectedFaq(null);
    } catch (err) {
      message.error("Failed to delete FAQ");
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center mt-20">
        <Spin size="large" />
      </div>
    );

  return (
    <div className="relative bg-white p-3 h-[87vh] overflow-y-auto">
      <div className="flex items-center justify-between">
        <Navigate title={"Faq"} />
        <button
          onClick={() => setAddModalOpen(true)}
          className="bg-[#10A4B2] text-white font-semibold px-5 py-2 rounded hover:bg-[#0d8c99] transition"
        >
          + Add FAQ
        </button>
      </div>

      <div className="flex flex-col w-full gap-2 p-5 mt-5">
        {faqs.map((faq, index) => (
          <section
            key={faq._id}
            className="border-b border-[#e5eaf2] rounded py-3"
          >
            <div
              className="flex items-center justify-between w-full gap-2 cursor-pointer"
              onClick={() => handleClick(index)}
            >
              <h2 className="flex items-center gap-2 text-base font-bold text-gray-700 md:text-xl">
                <FaRegQuestionCircle className="w-5 h-5 text-[#10A4B2]" />
                {faq.question}
              </h2>
              <div className="flex items-center gap-2 md:gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFaq(faq);
                    setQuestion(faq.question);
                    setAnswer(faq.answer);
                    setUpdateModalOpen(true);
                  }}
                  className="p-1.5 border border-[#10A4B2] rounded bg-teal-50 text-[#10A4B2]"
                >
                  <CiEdit className="text-xl" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFaq(faq);
                    setDeleteModalOpen(true);
                  }}
                  className="p-1.5 border border-red-200 rounded bg-red-50 text-red-500"
                >
                  <RiDeleteBin6Line className="text-xl" />
                </button>
              </div>
            </div>
            <div
              className={`grid transition-all duration-300 overflow-hidden ease-in-out ${
                isAccordionOpen === index
                  ? "grid-rows-[1fr] opacity-100 mt-4"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <p className="overflow-hidden text-sm leading-relaxed text-gray-600">
                {faq.answer}
              </p>
            </div>
          </section>
        ))}
        {faqs.length === 0 && (
          <p className="mt-10 text-center text-gray-400">No FAQs found.</p>
        )}
      </div>

      {/* Modal Reused for Add/Update */}
      <Modal
        open={addModalOpen || updateModalOpen}
        centered
        onCancel={() => {
          setAddModalOpen(false);
          setUpdateModalOpen(false);
          setQuestion("");
          setAnswer("");
        }}
        footer={null}
      >
        <div className="p-5">
          <h2 className="mb-6 text-2xl font-bold text-center">
            {addModalOpen ? "Add FAQ" : "Update FAQ"}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Question</label>
              <input
                type="text"
                placeholder="Enter the FAQ"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10A4B2] outline-none"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Answer</label>
              <textarea
                placeholder="Enter the FAQ Answer"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10A4B2] outline-none"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <button
              onClick={() => {
                setAddModalOpen(false);
                setUpdateModalOpen(false);
              }}
              className="py-2 text-red-500 border border-red-500 rounded-lg hover:bg-red-50"
            >
              Cancel
            </button>
            <button
              disabled={isAdding || isUpdating}
              onClick={addModalOpen ? handleAddFaq : handleUpdateFaq}
              className="py-2 bg-[#10A4B2] text-white rounded-lg hover:bg-[#0d8c99]"
            >
              {isAdding || isUpdating ? <Spin size="small" /> : "Save"}
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal
        open={deleteModalOpen}
        centered
        onCancel={() => setDeleteModalOpen(false)}
        footer={null}
      >
        <div className="p-5 text-center">
          <h2 className="mb-6 text-xl font-bold">
            Are you sure you want to delete this FAQ?
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setDeleteModalOpen(false)}
              className="py-2 border border-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              disabled={isDeleting}
              onClick={handleDeleteFaq}
              className="py-2 text-white bg-red-500 rounded-lg"
            >
              {isDeleting ? <Spin size="small" /> : "Delete"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FAQ;
