import { Button } from "antd";
import React from "react";
import OTPInput from "react-otp-input";
import { Link } from "react-router-dom";
import logo from "../assets/header/logo.png";

const Verify = () => {
  const [otp, setOtp] = React.useState("");
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F0FDFF] px-4">
      <div className="w-full max-w-md p-8 bg-white border shadow-sm rounded-2xl border-cyan-100">
        <div className="mb-8 text-center">
          <img src={logo} alt="Logo" className="h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">
            Verify Your Account
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Please enter the code sent to your email to continue
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span className="mx-1"></span>}
            renderInput={(props) => (
              <input
                {...props}
                className="!w-[50px] h-[60px] text-center bg-white border border-gray-200 rounded-lg focus:border-[#10A4B2] focus:ring-1 focus:ring-[#10A4B2] outline-none text-xl transition-all"
              />
            )}
          />
        </div>

        <Link to="/reset-password">
          <Button className="w-full h-12 bg-[#10A4B2] hover:bg-[#0d8c99] text-white border-none rounded-lg text-lg font-medium">
            Verify
          </Button>
        </Link>

        <p className="mt-6 text-center text-gray-500">
          Didn't receive code?{" "}
          <span className="text-[#10A4B2] cursor-pointer font-medium hover:underline">
            Resend
          </span>
        </p>
      </div>
    </div>
  );
};
export default Verify;
