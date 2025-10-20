import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { AiFillDashboard, AiOutlineMenu } from "react-icons/ai";
import { RiAdminFill } from "react-icons/ri";
import { FaBookOpen, FaStickyNote, FaListAlt, FaGraduationCap, FaLightbulb } from "react-icons/fa";
import { MdOutlineQuiz, MdOutlineArticle, MdSubject } from "react-icons/md";
import { BsCardText } from "react-icons/bs";
import { GiBookmarklet } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";

export function VerticalNavbar() {
  const router = useRouter();
  const path = router.pathname;
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const SideBarList = [
    { link: "/Admin", icon: <AiFillDashboard size={24} />, name: "Dashboard" },
    { link: "/Admin/User", icon: <RiAdminFill size={24} />, name: "User" },
    { link: "/Admin/exam", icon: <FaBookOpen size={24} />, name: "Exam" },
    { link: "/Admin/quiz", icon: <MdOutlineQuiz size={24} />, name: "Quiz" },
    { link: "/Admin/worksheet", icon: <FaListAlt size={24} />, name: "Worksheet" },
    { link: "/Admin/formula", icon: <FaGraduationCap size={24} />, name: "Formula Sheet" },
    { link: "/Admin/definition", icon: <FaLightbulb size={24} />, name: "Definition Sheet" },
    { link: "/Admin/article", icon: <MdOutlineArticle size={24} />, name: "Article" },
    { link: "/Admin/Subject", icon: <MdSubject size={24} />, name: "Subject" },
    { link: "/Admin/Flashcard", icon: <BsCardText size={24} />, name: "FlashCard" },
    { link: "/Admin/note", icon: <FaStickyNote size={24} />, name: "Comprehensive Notes" },
    { link: "/Admin/revisionnote", icon: <GiBookmarklet size={24} />, name: "Revision Note" },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileOpen(true)}
          className="text-gray-800 p-2 bg-white rounded shadow"
        >
          <AiOutlineMenu size={28} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full bg-white shadow-lg z-40 transform transition-transform duration-300
          ${collapsed ? "w-20 md:w-64" : "w-64"} 
          md:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <nav className="flex flex-col justify-between h-full py-6 px-2 lg:px-4 w-full">
          {/* Header */}
          <div className="flex items-center justify-between px-2 lg:px-0 mb-10">
            {!collapsed && <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-gray-800 hover:text-gray-600 focus:outline-none hidden md:block"
            >
              <AiOutlineMenu size={28} />
            </button>
            {/* Close button for mobile */}
            <button
              onClick={() => setMobileOpen(false)}
              className="text-gray-800 hover:text-gray-600 focus:outline-none md:hidden"
            >
              ✕
            </button>
          </div>

          {/* Links */}
          <ul className="flex-1">
            {SideBarList.map((item, idx) => (
              <li key={idx} className="mb-3">
                <button
                  onClick={() => {
                    router.push(item.link);
                    setMobileOpen(false); // close mobile menu on click
                  }}
                  className={`flex items-center w-full px-3 py-2 rounded-xl transition-colors duration-200 ${
                    path === item.link
                      ? "bg-[#009688] text-white shadow-md"
                      : "text-gray-700 hover:bg-[#009688] hover:text-white"
                  }`}
                >
                  <span>{item.icon}</span>
                  {!collapsed && <span className="ml-3 font-medium">{item.name}</span>}
                </button>
              </li>
            ))}
          </ul>

          {/* Logout */}
          <div className="px-3">
            <button
              onClick={() => signOut({ callbackUrl: "/auth/Admin/Login/signin-user" })}
              className="flex items-center w-full px-3 py-2 rounded-xl text-gray-700 hover:bg-red-500 hover:text-white transition-colors duration-200"
            >
              <FiLogOut size={22} />
              {!collapsed && <span className="ml-3 font-medium">Log Out</span>}
            </button>
          </div>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
