import React, { useState } from "react";
import { message, Modal } from "antd";
import { FaRegQuestionCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { Navigate } from "../../Navigate";

const FAQ = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // Dummy data
  const [faqs, setFaqs] = useState([
    {
      _id: "1",
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for all products. Items must be returned in their original condition with all tags attached. Please contact our support team to initiate a return request.",
    },
    {
      _id: "2",
      question: "How long does shipping take?",
      answer:
        "Standard shipping takes 3-7 business days within the continental US. Expedited shipping options are available at checkout. International shipping times vary by destination country.",
    },
    {
      _id: "3",
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to most countries worldwide. Please note that import duties, taxes, and shipping fees may apply. Check our shipping policy page for specific countries and rates.",
    },
    {
      _id: "4",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, and Google Pay. All transactions are securely processed through our payment gateway.",
    },
    {
      _id: "5",
      question: "How can I track my order?",
      answer:
        "Once your order ships, you'll receive a tracking number via email. You can also track your order status in your account dashboard under 'My Orders' section.",
    },
  ]);

  // Accordion click
  const handleClick = (index) => {
    setIsAccordionOpen((prevIndex) => (prevIndex === index ? null : index));
  };

  // Add FAQ
  const handleAddFaq = () => {
    if (!question || !answer) return message.warning("Please fill all fields");

    const newFaq = {
      _id: Date.now().toString(),
      question,
      answer,
    };

    setFaqs((prev) => [...prev, newFaq]);
    message.success("FAQ added successfully");
    setAddModalOpen(false);
    setQuestion("");
    setAnswer("");
  };

  // Update FAQ
  const handleUpdateFaq = () => {
    if (!question || !answer) return message.warning("Please fill all fields");

    setFaqs((prev) =>
      prev.map((faq) =>
        faq._id === selectedFaq._id ? { ...faq, question, answer } : faq
      )
    );

    message.success("FAQ updated successfully");
    setUpdateModalOpen(false);
    setSelectedFaq(null);
    setQuestion("");
    setAnswer("");
  };

  // Delete FAQ
  const handleDeleteFaq = () => {
    setFaqs((prev) => prev.filter((faq) => faq._id !== selectedFaq._id));
    message.success("FAQ deleted successfully");
    setDeleteModalOpen(false);
    setSelectedFaq(null);
  };

  return (
    <div className="relative bg-white p-3 h-[87vh]">
      <div className="flex items-center justify-between">
        <Navigate title={"Faq"} />
        <button
          onClick={() => setAddModalOpen(true)}
          className="bg-[#10A4B2] text-white font-semibold px-5 py-2 rounded transition duration-200"
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
              <h2 className="flex items-center gap-2 text-base font-normal md:font-bold md:text-2xl">
                <FaRegQuestionCircle className="hidden w-5 h-5 md:flex" />
                {faq.question}
              </h2>
              <div className="flex items-center gap-2 md:gap-4">
                <div className="border-2 px-1.5 py-1 rounded border-[#10A4B2] bg-[#f0fcf4]">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFaq(faq);
                      setQuestion(faq.question);
                      setAnswer(faq.answer);
                      setUpdateModalOpen(true);
                    }}
                  >
                    <CiEdit className="text-2xl cursor-pointer text-[#10A4B2] font-bold transition-all" />
                  </button>
                </div>
                <div className="border-2 px-1.5 py-1 rounded border-[#10A4B2] bg-[#f0fcf4]">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFaq(faq);
                      setDeleteModalOpen(true);
                    }}
                  >
                    <RiDeleteBin6Line className="text-2xl text-red-500 transition-all cursor-pointer" />
                  </button>
                </div>
              </div>
            </div>
            <div
              className={`grid transition-all duration-300 overflow-hidden ease-in-out ${
                isAccordionOpen === index
                  ? "grid-rows-[1fr] opacity-100 mt-4"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <p className="text-[#424242] text-[0.9rem] overflow-hidden">
                {faq.answer}
              </p>
            </div>
          </section>
        ))}
      </div>

      {/* Add FAQ Modal */}
      <Modal
        open={addModalOpen}
        centered
        onCancel={() => setAddModalOpen(false)}
        footer={null}
      >
        <div className="p-5">
          <h2 className="mb-2 text-2xl font-bold text-center">Add FAQ</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Question</label>
              <input
                type="text"
                placeholder="Enter the FAQ"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Answer</label>
              <textarea
                placeholder="Enter the FAQ Answer"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <button
              onClick={() => setAddModalOpen(false)}
              className="py-2 px-4 rounded-lg border border-[#EF4444] bg-red-50"
            >
              Cancel
            </button>
            <button
              onClick={handleAddFaq}
              className="py-2 px-4 rounded-lg bg-[#10A4B2] text-white"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>

      {/* Update FAQ Modal */}
      <Modal
        open={updateModalOpen}
        centered
        onCancel={() => setUpdateModalOpen(false)}
        footer={null}
      >
        <div className="p-5">
          <h2 className="mb-2 text-2xl font-bold text-center">Update FAQ</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Question</label>
              <input
                type="text"
                placeholder="Enter the FAQ"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Answer</label>
              <textarea
                placeholder="Enter the FAQ Answer"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <button
              onClick={() => setUpdateModalOpen(false)}
              className="py-2 px-4 rounded-lg border border-[#EF4444] bg-red-50"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateFaq}
              className="py-2 px-4 rounded-lg bg-[#10A4B2] text-white"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete FAQ Modal */}
      <Modal
        open={deleteModalOpen}
        centered
        onCancel={() => setDeleteModalOpen(false)}
        footer={null}
      >
        <div className="p-5 text-center">
          <h2 className="mb-6 text-2xl font-bold">
            Are you sure you want to delete?
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setDeleteModalOpen(false)}
              className="py-2 px-4 rounded-lg border border-[#EF4444] bg-red-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteFaq}
              className="py-2 px-4 rounded-lg bg-[#10A4B2] text-white"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FAQ;
