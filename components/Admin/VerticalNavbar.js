import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import { GiTeacher } from "react-icons/gi";
import { RiAdminFill } from "react-icons/ri";
import { PiStudent } from "react-icons/pi";
import { SiBookstack, SiGoogleclassroom } from "react-icons/si";
import { FaQuestion } from "react-icons/fa";
import { AiFillDashboard, AiOutlineMenu } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { WiMoonFirstQuarter } from "react-icons/wi";

export function VerticalNavbar({ data }) {
  const router = useRouter();
  const path = router.pathname;
  const [collapsed, setCollapsed] = useState(false);

  const SideBarList = [
    { link: "/Admin", icon: <AiFillDashboard size={24} />, name: "Dashboard" },
    { link: "/Admin/User", icon: <RiAdminFill size={24} />, name: "User" },
    { link: "/Admin/exam", icon: <SiBookstack size={24} />, name: "Exam" },
    { link: "/Admin/Subject", icon: <SiBookstack size={24} />, name: "Subject" },
    { link: "/Admin/Flashcard", icon: <SiBookstack size={24} />, name: "FlashCard" },
    { link: "/Admin/quiz", icon: <SiBookstack size={24} />, name: "Quiz" },
    { link: "/Admin/Teacher", icon: <GiTeacher size={24} />, name: "Teacher" },
    { link: "/Admin/Teacher/Assign", icon: <GiTeacher size={24} />, name: "Assign Teacher" },
    { link: "/Admin/Student", icon: <PiStudent size={24} />, name: "Student" },
    { link: "/Admin/Class", icon: <SiGoogleclassroom size={24} />, name: "Class" },
    { link: "/Admin/Class/AssignSubject", icon: <WiMoonFirstQuarter size={24} />, name: "Assign Subject" },
    { link: "/Admin/Quarter", icon: <WiMoonFirstQuarter size={24} />, name: "Quarter" },
    { link: "/Admin/QuestionCategory", icon: <FaQuestion size={24} />, name: "Question Category" },
    { link: "/Admin/Subject/AssignQuestionCategory", icon: <FaQuestion size={24} />, name: "Assign Category" },
  ];

  return (
    <div className={`flex h-screen sticky top-20 ${collapsed ? "w-20" : "w-64"} transition-width duration-300`}>
      <nav className="flex flex-col justify-between h-full bg-[#f1f5f9] shadow-lg py-6 px-2 lg:px-4">
        {/* Header */}
        <div className="flex items-center justify-between px-2 lg:px-0 mb-10">
          {!collapsed && <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-800 hover:text-gray-600 focus:outline-none"
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
            onClick={() =>
              signOut({ callbackUrl: "/auth/Admin/Login/signin-user" })
            }
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
