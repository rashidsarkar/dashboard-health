import dashboard from "../../assets/routerImg/dashboard.png";
import categorie from "../../assets/routerImg/categorie.png";
import create from "../../assets/routerImg/create.png";
import settings from "../../assets/routerImg/settings.png";
import subscription from "../../assets/routerImg/subscription.png";
import user from "../../assets/routerImg/user.png";
// import logo from "../../assets/header/logo.png";
import logo from "../../assets/header/logo.png";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaChevronRight, FaHome } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { useDispatch } from "react-redux";
import { logout } from "../../page/redux/features/auth/authSlice";

import { FiUser } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { TbCategory2 } from "react-icons/tb";

import items from "../item.json";

const icons = {
  FaHome,
  FiUser,
  TbCategory2,
  IoSettingsOutline,
};

const SidBar = () => {
  const [selectedKey, setSelectedKey] = useState("");
  const [expandedKeys, setExpandedKeys] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const contentRef = useRef({});
  const dispatch = useDispatch();

  /* -------------------- AUTO ACTIVE BY URL -------------------- */
  useEffect(() => {
    const currentPath = location.pathname;

    let activeParent = null;
    let activeChild = null;

    items.forEach((item) => {
      if (item.link === currentPath) {
        activeParent = item;
      }

      if (item.children) {
        const foundChild = item.children.find(
          (child) => child.link === currentPath
        );
        if (foundChild) {
          activeParent = item;
          activeChild = foundChild;
        }
      }
    });

    if (activeChild) {
      setSelectedKey(activeChild.key);
      setExpandedKeys((prev) =>
        prev.includes(activeParent.key) ? prev : [...prev, activeParent.key]
      );
    } else if (activeParent) {
      setSelectedKey(activeParent.key);
    }
  }, [location.pathname]);

  /* -------------------- TOGGLE PARENT -------------------- */
  const onParentClick = (key) => {
    setExpandedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  /* -------------------- LOGOUT -------------------- */
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-screen text-white custom-sidebar">
      {/* LOGO */}
      <div className="flex justify-center py-6">
        <img src={logo} alt="Logo" className="w-[160px]" />
      </div>

      {/* MENU */}
      <div className="flex-1 px-2 overflow-y-auto menu-items">
        {items.map((item) => {
          const Icon = icons[item.icon];

          const isParentActive =
            selectedKey === item.key ||
            item.children?.some((c) => c.key === selectedKey);

          return (
            <div key={item.key}>
              {/* ---------------- PARENT ---------------- */}
              <Link
                to={item.link}
                onClick={(e) => {
                  if (item.children) {
                    e.preventDefault();
                    onParentClick(item.key);
                  } else {
                    setSelectedKey(item.key);
                  }
                }}
                className={`my-2 py-[10px] px-4 flex items-center cursor-pointer rounded transition
                  ${
                    isParentActive
                      ? "bg-[#0A6169] border-l-4 border-white"
                      : "bg-[#10A4B2] hover:bg-[#0A6169]"
                  }
                `}
              >
                <span className="mr-3 text-lg">
                  <Icon />
                </span>

                <span className="flex-1">{item.label}</span>

                {item.children && (
                  <FaChevronRight
                    className={`text-xs transition-transform duration-300 ${
                      expandedKeys.includes(item.key) ? "rotate-90" : ""
                    }`}
                  />
                )}
              </Link>

              {/* ---------------- CHILDREN ---------------- */}
              {item.children && (
                <div
                  ref={(el) => (contentRef.current[item.key] = el)}
                  className="ml-2 overflow-hidden transition-all duration-300"
                  style={{
                    maxHeight: expandedKeys.includes(item.key)
                      ? `${contentRef.current[item.key]?.scrollHeight}px`
                      : "0px",
                  }}
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.key}
                      to={child.link}
                      onClick={() => setSelectedKey(child.key)}
                      className={`block my-1 px-4 py-2 rounded transition cursor-pointer
                        ${
                          selectedKey === child.key
                            ? "bg-[#0A6169] border-l-4 border-white text-white"
                            : "bg-[#10A4B2] hover:bg-[#0A6169] text-white"
                        }
                      `}
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

      {/* LOGOUT (ALWAYS AT BOTTOM) */}
      <div className="px-4 pb-6 mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center w-full gap-3 px-4 py-3 rounded bg-[#10A4B2] hover:bg-[#0A6169] text-white"
        >
          <IoIosLogIn className="text-xl" />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default SidBar;
