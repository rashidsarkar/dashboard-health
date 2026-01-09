import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import logo from "../assets/header/logo.png";

const ForgetPass = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F0FDFF] px-4">
      <div className="w-full max-w-md p-8 bg-white border shadow-sm rounded-2xl border-cyan-100">
        <div className="mb-8 text-center">
          <img src={logo} alt="Logo" className="h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">Forget Password?</h2>
          <p className="mt-2 text-sm text-gray-500">
            Please enter your email to get a reset code
          </p>
        </div>

        <Form layout="vertical">
          <Form.Item
            label="Email Address"
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input placeholder="admin@gmail.com" className="h-12 rounded-lg" />
          </Form.Item>

          <Link to="/verification">
            <Button className="w-full h-12 bg-[#10A4B2] hover:bg-[#0d8c99] text-white border-none rounded-lg text-lg font-medium mt-4">
              Continue
            </Button>
          </Link>
        </Form>
      </div>
    </div>
  );
};
export default ForgetPass;
