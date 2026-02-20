import React, { useRef, useState } from "react";
import { LuBell } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaChevronRight, FaHome } from "react-icons/fa";
import { Drawer, Radio, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";

// Icons & Assets
import { FiUser } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { TbCategory2 } from "react-icons/tb";
import { IoIosLogIn } from "react-icons/io";
import logo from "../../assets/header/logo.png";
import items from "../item.json";
import { useGetProfileQuery } from "../../page/redux/api/userApi";
import { imageUrl } from "../../page/redux/api/baseApi";

const icons = {
  FaHome,
  FiUser,
  TbCategory2,
  IoSettingsOutline,
};

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
  const contentRef = useRef({});

  // 1. Fetch Real User Data
  const { data: profile } = useGetProfileQuery();
  const userData = profile?.data;

  // Image path normalization
  const getProfileImg = () => {
    if (userData?.profile_image) {
      const normalizedPath = userData.profile_image.replace(/\\/g, "/");
      return `${imageUrl}/${normalizedPath}`;
    }
    return "https://cdn-icons-png.flaticon.com/512/149/149071.png"; // Placeholder
  };

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  const onParentClick = (key) => {
    setExpandedKeys((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key],
    );
  };

  // 2. Real Logout Logic
  const handleLogout = () => {
    dispatch(logout()); // Clears Redux state
    localStorage.removeItem("token"); // Optional: clear storage if not using Redux Persist
    navigate("/login");
  };

  return (
    <div className="sticky top-0 z-50 pt-5 text-black bg-white">
      <div className="flex items-center justify-between px-6">
        {/* Mobile Menu Icon */}
        <div className="lg:hidden">
          <div onClick={showDrawer} className="text-3xl cursor-pointer">
            <FaBars />
          </div>
        </div>

        <div className="flex-1 lg:flex-none"></div>

        {/* Right Section: Notifications & Profile */}
        <div className="flex items-center gap-8">
          {/* Notification Icon */}
          <div className="relative">
            <Link to={"/dashboard/Settings/notification"}>
              <div className="w-[45px] h-[45px] flex items-center justify-center text-xl rounded-full bg-gray-100 text-black hover:bg-gray-200 transition-all">
                <LuBell />
              </div>
            </Link>
          </div>

          {/* Real User Profile Info */}
          <Link to={"/dashboard/Settings/profile"}>
            <div className="flex items-center gap-3 group">
              <div className="hidden text-end sm:block">
                <h3 className="font-bold leading-tight text-gray-800">
                  {userData?.fullName || "Loading..."}
                </h3>
                <h4 className="text-xs text-gray-500 capitalize">
                  {userData?.role?.toLowerCase() || "Admin"}
                </h4>
              </div>
              <div className="w-[45px] h-[45px] rounded-full overflow-hidden border-2 border-gray-100 group-hover:border-[#10A4B2] transition-all">
                <img
                  className="object-cover w-full h-full"
                  src={getProfileImg()}
                  alt="profile"
                />
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Sidebar Drawer */}
      <Drawer
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        width={280}
        bodyStyle={{ padding: 0 }}
      >
        <div className="bg-[#02111E] h-full relative flex flex-col">
          <div className="flex justify-center py-8 mb-4 border-b border-gray-800">
            <img src={logo} alt="Logo" className="w-[140px]" />
          </div>

          <div className="flex-1 px-4 overflow-y-auto">
            {items.map((item) => {
              const Icon = icons[item.icon] || FaHome;
              return (
                <div key={item.key}>
                  <Link
                    to={item.link}
                    className={`my-2 py-3 px-4 flex items-center rounded-lg transition-all ${
                      selectedKey === item.key
                        ? "bg-[#10A4B2] text-white"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    }`}
                    onClick={(e) => {
                      if (item.children) {
                        e.preventDefault();
                        onParentClick(item.key);
                      } else {
                        setSelectedKey(item.key);
                        onClose();
                      }
                    }}
                  >
                    <Icon className="mr-3 text-xl" />
                    <span className="flex-1">{item.label}</span>
                    {item.children && (
                      <FaChevronRight
                        className={`transition-transform ${
                          expandedKeys.includes(item.key) ? "rotate-90" : ""
                        }`}
                      />
                    )}
                  </Link>

                  {/* Submenu handling */}
                  {item.children && expandedKeys.includes(item.key) && (
                    <div className="mb-2 ml-8 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.key}
                          to={child.link}
                          className={`block py-2 px-4 rounded-md text-sm transition-all ${
                            selectedKey === child.key
                              ? "text-[#10A4B2] font-bold"
                              : "text-gray-500 hover:text-white"
                          }`}
                          onClick={() => {
                            setSelectedKey(child.key);
                            onClose();
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="p-4 border-t border-gray-800">
            <button
              onClick={handleLogout}
              className="flex items-center justify-center w-full gap-2 py-3 font-semibold text-red-500 transition-all bg-red-500/10 rounded-xl hover:bg-red-500 hover:text-white"
            >
              <IoIosLogIn className="text-2xl" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Header;
