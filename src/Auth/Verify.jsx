import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";
import OTPInput from "react-otp-input";


const Verify = () => {
  
 const [otp, setOtp] = useState("");
  const onFinish = (values) => {
    console.log("Form Values:", values);
  };
  return (
   <div className="flex justify-center items-center min-h-screen px-4 lg:px-0">
      <div className="w-full max-w-lg  p-8 border">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Check your email
        </h2>
        <p className="text-gray-600 mb-6 text-sm">
          We sent a reset link to foisalrk2@gmail.com. Enter the 5-digit code
          mentioned in the email.
        </p>

        {/* Ant Design Form */}
        <div className="flex justify-center mb-5">
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span className="mx-1"></span>}
            renderInput={(props) => (
              <input
                {...props}
                className="w-16 h-16 text-center bg-white text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                style={{ width: "40px", height: "50px" }}
              />
            )}
          />
        </div>
        <Link to={"/reset-password"}>
          <button
            htmlType="submit"
            className="w-full bg-red-500 py-3 text-white rounded-md hover:bg-primary-dark transition-colors"
          >
            Continue
          </button>
        </Link>

        <span className="flex justify-center mt-4">
          You have not received the email?{" "}
          <span
            // onClick={handleResend}
            className="text-[#D17C51] cursor-pointer pl-2"
          >
            Resend
          </span>
        </span>
      </div>
    </div>
  );
};

export default Verify;
