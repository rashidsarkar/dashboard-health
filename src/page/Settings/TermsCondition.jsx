import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { useNavigate } from "react-router-dom";
import { message, Spin } from "antd";
import { Navigate } from "../../Navigate";
import {
  useGetTermsConditionsQuery,
  useAddTermsConditionsMutation,
  useEditTermsConditionsMutation,
} from "../redux/api/manageWebApi";

const TermsCondition = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  // 1. Fetch real data from API
  const { data: termsData, isLoading: isFetching } =
    useGetTermsConditionsQuery();

  // 2. Mutations
  const [addTerms, { isLoading: isAdding }] = useAddTermsConditionsMutation();
  const [editTerms, { isLoading: isUpdating }] =
    useEditTermsConditionsMutation();

  // 3. Set initial content when data arrives from the server
  useEffect(() => {
    // Check if data exists and handle array or object response
    const dataObj = Array.isArray(termsData?.data)
      ? termsData.data[0]
      : termsData?.data;

    if (dataObj?.description) {
      setContent(dataObj.description);
    }
  }, [termsData]);

  // 4. Handle Save logic (Add or Edit)
  const handleSave = async () => {
    // Validation for empty content
    if (!content || content.trim() === "" || content === "<p><br></p>") {
      return message.warning("Please enter some content before saving.");
    }

    const dataObj = Array.isArray(termsData?.data)
      ? termsData.data[0]
      : termsData?.data;
    const existingId = dataObj?._id;

    try {
      if (existingId) {
        // Update existing entry
        await editTerms({
          id: existingId,
          data: { description: content },
        }).unwrap();
        message.success("Terms & Conditions updated successfully!");
      } else {
        // Create new entry if none exists
        await addTerms({
          description: content,
        }).unwrap();
        message.success("Terms & Conditions created successfully!");
      }
    } catch (err) {
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
    placeholder: "Start typing terms and conditions here...",
    style: {
      height: 450,
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
      "image",
    ],
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Spin size="large" tip="Loading Terms..." />
      </div>
    );
  }

  return (
    <div className="p-3 bg-white h-[87vh] overflow-y-auto">
      <Navigate title="Terms And Condition" />

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

export default TermsCondition;
