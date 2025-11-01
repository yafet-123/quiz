import React, { useState } from "react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { AiFillDashboard, AiOutlineMenu } from "react-icons/ai";
import { FaBookOpen, FaChartBar } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

export function VerticalNavbar() {
  const router = useRouter();
  const path = router.pathname;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const SideBarList = [
    { link: "/Students", icon: <AiFillDashboard size={24} />, name: "Dashboard" },
    { link: "/Students/Exam", icon: <FaBookOpen size={24} />, name: "Exam" },
    { link: "/Students/result", icon: <FaChartBar size={24} />, name: "Result" },
  ];

  const renderLinks = () =>
    SideBarList.map((item, idx) => (
      <li key={idx} className="mb-3">
        <button
          onClick={() => {
            router.push(item.link);
            setMobileOpen(false);
          }}
          className={`flex items-center w-full px-3 py-2 rounded-xl transition-colors duration-200 ${
            path === item.link
              ? "bg-teal-600 text-white shadow-md"
              : "text-gray-700 hover:bg-teal-500 hover:text-white"
          }`}
        >
          <span>{item.icon}</span>
          {!collapsed && <span className="ml-3 font-medium">{item.name}</span>}
        </button>
      </li>
    ));

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-24 left-4 z-50">
        <button
          onClick={() => setMobileOpen(true)}
          className="text-white p-2 bg-teal-600 rounded shadow-lg"
        >
          <AiOutlineMenu size={28} />
        </button>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 md:hidden
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          w-64 overflow-y-auto`}
      >
        <nav className="flex flex-col justify-between h-full py-6 px-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold text-gray-800">Student Panel</h1>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-gray-800 hover:text-gray-600 focus:outline-none"
            >
              ✕
            </button>
          </div>
          <ul className="flex-1">{renderLinks()}</ul>
          <div className="px-3">
            <button
              onClick={() =>
                signOut({ callbackUrl: "/auth/Student/Login/signin-student" })
              }
              className="flex items-center w-full px-3 py-2 rounded-xl text-gray-700 hover:bg-red-500 hover:text-white transition-colors duration-200"
            >
              <FiLogOut size={22} />
              <span className="ml-3 font-medium">Log Out</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <div
        className={`hidden md:flex flex-col top-24 sticky self-start h-screen bg-white shadow-lg transition-all duration-300
          ${collapsed ? "w-20" : "w-72"} overflow-y-auto`}
      >
        <nav className="flex flex-col justify-between h-full pb-6 pt-16 px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            {!collapsed && (
              <h1 className="text-2xl font-bold text-gray-800">Student Panel</h1>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-gray-800 hover:text-gray-600 focus:outline-none"
            >
              <AiOutlineMenu size={28} />
            </button>
          </div>

          {/* Links */}
          <ul className="flex-1">{renderLinks()}</ul>

          {/* Logout */}
          <div className="px-3">
            <button
              onClick={() =>
                signOut({ callbackUrl: "/auth/Student/Login/signin-student" })
              }
              className="flex items-center w-full px-3 py-2 rounded-xl text-gray-700 hover:bg-red-500 hover:text-white transition-colors duration-200"
            >
              <FiLogOut size={22} />
              {!collapsed && <span className="ml-3 font-medium">Log Out</span>}
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
