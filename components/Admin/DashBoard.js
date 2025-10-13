import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  GiTeacher,
  SiBookstack,
  SiGoogleclassroom,
} from "react-icons/gi";
import {
  RiAdminFill
} from "react-icons/ri";
import {
  PiStudent
} from "react-icons/pi";
import {
  FaQuestion
} from "react-icons/fa";
import {
  AiFillDashboard,
  AiOutlineMenu,
} from "react-icons/ai";
import { WiMoonFirstQuarter } from "react-icons/wi";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "next-auth/react";

export function VerticalNavbar() {
  const router = useRouter();
  const [sideBar, setSideBar] = useState(false);
  const handleSideBar = () => setSideBar(!sideBar);

  const path = router.pathname;

  const SideBarList = [
    { link: "/Admin", icon: <AiFillDashboard size={22} />, name: "Dashboard" },
    { link: "/Admin/User", icon: <RiAdminFill size={22} />, name: "User" },
    { link: "/Admin/Subject", icon: <SiBookstack size={22} />, name: "Subject" },
    { link: "/Admin/Teacher", icon: <GiTeacher size={22} />, name: "Teacher" },
    { link: "/Admin/Teacher/Assign", icon: <GiTeacher size={22} />, name: "Assign Teacher" },
    { link: "/Admin/Student", icon: <PiStudent size={22} />, name: "Student" },
    { link: "/Admin/Class", icon: <SiGoogleclassroom size={22} />, name: "Class" },
    { link: "/Admin/Class/AssignSubject", icon: <WiMoonFirstQuarter size={22} />, name: "Assign Subject" },
    { link: "/Admin/Quarter", icon: <WiMoonFirstQuarter size={22} />, name: "Quarter" },
    { link: "/Admin/QuestionCategory", icon: <FaQuestion size={22} />, name: "Question Category" },
    { link: "/Admin/Subject/AssignQuestionCategory", icon: <FaQuestion size={22} />, name: "Assign Question Category" },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen z-50 bg-gradient-to-b from-[#004d40] via-[#00695c] to-[#009688] text-white flex flex-col justify-between transition-all duration-300 ${
        sideBar ? "w-20" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-6 border-b border-white/20">
        <h1
          className={`text-2xl font-bold tracking-wide transition-all duration-300 ${
            sideBar ? "opacity-0 hidden" : "opacity-100"
          }`}
        >
          Admin
        </h1>
        <button
          onClick={handleSideBar}
          className="p-2 rounded-md hover:bg-white/10 transition-all duration-200"
        >
          <AiOutlineMenu size={24} />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto py-6 scrollbar-thin scrollbar-thumb-white/10">
        <ul className="space-y-2">
          {SideBarList.map((side, index) => (
            <li key={index}>
              <button
                onClick={() => router.push(side.link)}
                className={`flex items-center w-full px-4 py-3 rounded-xl transition-all duration-300 ${
                  path === side.link
                    ? "bg-white text-[#004d40] shadow-md font-semibold"
                    : "text-white hover:bg-white/15"
                }`}
              >
                <span>{side.icon}</span>
                {!sideBar && (
                  <span className="ml-4 text-sm font-medium tracking-wide">
                    {side.name}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="px-4 py-5 border-t border-white/20">
        <button
          onClick={() =>
            signOut({ callbackUrl: "/auth/Admin/Login/signin-user" })
          }
          className="flex items-center w-full px-4 py-3 rounded-xl text-sm hover:bg-white/15 transition-all duration-300"
        >
          <FiLogOut size={22} />
          {!sideBar && <span className="ml-3 font-medium">Log Out</span>}
        </button>
      </div>
    </aside>
  );
}
