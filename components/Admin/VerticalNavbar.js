import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import { AiFillDashboard, AiOutlineMenu } from "react-icons/ai";
import { RiAdminFill } from "react-icons/ri";
import { FaBookOpen, FaStickyNote, FaListAlt, FaGraduationCap, FaLightbulb } from "react-icons/fa";
import { MdOutlineQuiz, MdOutlineArticle, MdSubject } from "react-icons/md";
import { BsCardText } from "react-icons/bs";
import { GiBookmarklet } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";

export function VerticalNavbar({ data }) {
  const router = useRouter();
  const path = router.pathname;
  const [collapsed, setCollapsed] = useState(false);

  // Collapse automatically on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setCollapsed(true);
      else setCollapsed(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <div
      className={`flex h-screen sticky top-20 bg-white transition-width duration-300 overflow-y-auto
        ${collapsed ? "w-20" : "w-64"} md:w-64`}
    >
      <nav className="flex flex-col justify-between h-full py-6 px-2 lg:px-4 w-full">
        {/* Header */}
        <div className="flex items-center justify-between px-2 lg:px-0 mb-10">
          {!collapsed && <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-800 hover:text-gray-600 focus:outline-none md:hidden"
          >
            <AiOutlineMenu size={28} />
          </button>
        </div>

        {/* Links */}
        <ul className="flex-1">
          {SideBarList.map((item, idx) => (
            <li key={idx} className="mb-3">
              <button
                onClick={() => router.push(item.link)}
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
  );
}
