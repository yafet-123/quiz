import React, { useState } from "react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";


import { AiFillDashboard, AiOutlineMenu } from "react-icons/ai";
import { RiUser3Fill } from "react-icons/ri";
import { FaUserGraduate, FaBook, FaListAlt, FaGraduationCap, FaFileAlt, FaLightbulb, FaStickyNote, FaYoutube } from "react-icons/fa";
import { MdOutlineQuiz, MdOutlineArticle, MdSubject } from "react-icons/md";
import { BsCardText, BsFileEarmarkPdf } from "react-icons/bs";
import { GiBookmarklet } from "react-icons/gi";
import { FiLogOut, FiBookOpen } from "react-icons/fi";


export function VerticalNavbar() {
  const router = useRouter();
  const path = router.pathname;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const SideBarList = [
    { link: "/Admin", icon: <AiFillDashboard size={20} />, name: "Dashboard" },
    { link: "/Admin/User", icon: <RiUser3Fill size={20} />, name: "User" },
    { link: "/Admin/Student", icon: <FaUserGraduate size={20} />, name: "Student" },
    { link: "/Admin/Announcement", icon: <FaStickyNote size={20} />, name: "Announcement" },
    { link: "/Admin/exampreparation", icon: <FaFileAlt size={20} />, name: "Exam Preparation" },
    { link: "/Admin/pastpaper", icon: <BsFileEarmarkPdf size={20} />, name: "Past Paper" },
    { link: "/Admin/revisionnote", icon: <GiBookmarklet size={20} />, name: "Revision Note" },
    { link: "/Admin/book", icon: <FiBookOpen size={20} />, name: "Book" },
    { link: "/Admin/youtube", icon: <FaYoutube size={20} />, name: "YouTube" },
    { link: "/Admin/exam", icon: <FaBook size={20} />, name: "Exam" },
    { link: "/Admin/quiz", icon: <MdOutlineQuiz size={20} />, name: "Quiz" },
    { link: "/Admin/worksheet", icon: <FaListAlt size={20} />, name: "Worksheet" },
    { link: "/Admin/formula", icon: <FaGraduationCap size={20} />, name: "Formula Sheet" },
    { link: "/Admin/definition", icon: <FaLightbulb size={20} />, name: "Definition Sheet" },
    { link: "/Admin/article", icon: <MdOutlineArticle size={20} />, name: "Article" },
    { link: "/Admin/Subject", icon: <MdSubject size={20} />, name: "Subject" },
    { link: "/Admin/Flashcard", icon: <BsCardText size={20} />, name: "FlashCard" },
    { link: "/Admin/note", icon: <FaStickyNote size={20} />, name: "Comprehensive Notes" },
  ];
  const renderLinks = () =>
    SideBarList.map((item, idx) => (
      <li key={idx} className="mb-3">
        <button
          onClick={() => {
            router.push(item.link);
            setMobileOpen(false); // close mobile menu on mobile click
          }}
          className={`flex items-center w-full px-1 py-2 rounded-xl transition-colors duration-200 ${path === item.link
            ? "bg-teal-600 text-white shadow-md"
            : "text-gray-700 hover:bg-teal-500 hover:text-white"
            }`}
        >
          <span>{item.icon}</span>
          {!collapsed && <span className="ml-1 font-medium">{item.name}</span>}
        </button>
      </li>
    ));

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-20 left-4 z-[60]">
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
        className={`
          fixed top-0 left-0 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 md:hidden
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          w-64 overflow-y-auto
        `}
      >
        <nav className="flex flex-col justify-between h-full py-6 px-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
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
              onClick={() => signOut({ callbackUrl: "/auth/Admin/Login/signin-user" })}
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
        className={`hidden md:flex flex-col top-20 sticky self-start h-screen bg-white shadow-lg z-40 flex-shrink-0
          ${collapsed ? "w-20" : "w-72"} overflow-y-auto`}
      >
        <nav className="flex flex-col justify-between h-full py-6 px-3">
          <div className="flex items-center justify-between mb-6">
            {!collapsed && <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-gray-800 hover:text-gray-600 focus:outline-none"
            >
              <AiOutlineMenu size={24} />
            </button>
          </div>
          <ul className="flex-1">{renderLinks()}</ul>
          <div className="px-1">
            <button
              onClick={() => signOut({ callbackUrl: "/auth/Admin/Login/signin-user" })}
              className={`flex items-center w-full px-1 py-2 rounded-xl text-gray-700 hover:bg-red-500 hover:text-white 
              transition-colors duration-200`}
            >
              <FiLogOut size={22} />
              {!collapsed && <span className="ml-1 font-medium">Log Out</span>}
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
