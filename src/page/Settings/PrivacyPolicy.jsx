import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { useNavigate } from "react-router-dom";
import { message, Spin } from "antd";
import { Navigate } from "../../Navigate";
import {
  useGetPrivacyPolicyQuery,
  useAddPrivacyPolicyMutation,
  useEditPrivacyPolicyMutation,
} from "../redux/api/manageWebApi";

const PrivacyPolicy = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  // 1. Fetch real data
  const { data: privacyData, isLoading: isFetching } =
    useGetPrivacyPolicyQuery();

  // 2. Mutations
  const [addPrivacyPolicy, { isLoading: isAdding }] =
    useAddPrivacyPolicyMutation();
  const [editPrivacyPolicy, { isLoading: isUpdating }] =
    useEditPrivacyPolicyMutation();

  // 3. Set initial content when data arrives
  useEffect(() => {
    // Check if data exists and get the first item if it's an array
    const dataObj = Array.isArray(privacyData?.data)
      ? privacyData.data[0]
      : privacyData?.data;

    if (dataObj?.description) {
      // Changed from dataObj.content to dataObj.description to match backend
      setContent(dataObj.description);
    }
  }, [privacyData]);

  // 4. Handle Save logic
  const handleSave = async () => {
    // Basic validation for empty editor
    if (!content || content.trim() === "" || content === "<p><br></p>") {
      return message.warning("Please enter some content before saving.");
    }

    // Identify if an entry already exists to decide between Add or Edit
    const dataObj = Array.isArray(privacyData?.data)
      ? privacyData.data[0]
      : privacyData?.data;
    const existingId = dataObj?._id;

    try {
      if (existingId) {
        // Update existing - SENDING 'description' KEY
        await editPrivacyPolicy({
          id: existingId,
          data: { description: content }, // Changed key to description
        }).unwrap();
        message.success("Privacy Policy updated successfully!");
      } else {
        // Add new - SENDING 'description' KEY
        await addPrivacyPolicy({
          description: content, // Changed key to description
        }).unwrap();
        message.success("Privacy Policy created successfully!");
      }
    } catch (err) {
      // Improved error display
      const errorMsg =
        err?.data?.message ||
        err?.data?.errorSources?.[0]?.message ||
        "Something went wrong";
      message.error(errorMsg);
      console.error("Save Error:", err);
    }
  };

  const config = {
    readonly: false,
    placeholder: "Start typing privacy policy here...",
    style: {
      height: 400,
    },
    buttons: [
      "fontsize",
      "bold",
      "italic",
      "underline",
      "|",
      "font",
      "brush",
      "align",
      "list",
      "bullet",
    ],
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Spin size="large" tip="Loading Privacy Policy..." />
      </div>
    );
  }

  return (
    <div className="p-3 bg-white h-[87vh] overflow-y-auto">
      <Navigate title="Privacy Policy" />

      <div className="mt-5 overflow-hidden border border-gray-200 rounded-lg">
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1}
          onBlur={(newContent) => setContent(newContent)}
        />
      </div>

      <div className="flex justify-center pb-10 mt-8">
        <button
          disabled={isAdding || isUpdating}
          onClick={handleSave}
          className={`bg-[#10A4B2] py-3 px-10 rounded-lg text-white font-semibold transition-all hover:bg-[#0d8c99] shadow-md ${
            isAdding || isUpdating ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isAdding || isUpdating ? (
            <Spin size="small" className="mr-2" />
          ) : null}
          Save & Change
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
