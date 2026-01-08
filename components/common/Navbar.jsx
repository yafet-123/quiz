import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/router";
import logo from "../../public/logo.png";

export const Navbar = () => {
  const [open, setOpen] = useState(false); // mobile menu
  const [dropdownOpen, setDropdownOpen] = useState(null); // which dropdown is open
  const [shadow, setShadow] = useState(false);

  const router = useRouter();

  const NavLinks = [
    { path: "/", name: "Home" },
    {
      path: "/study",
      name: "Study Tools",
      dropdown: [
        { path: "/study/books/article", name: "Articles" },
        { path: "/study/book", name: "Books" },
        { path: "/study/definitionSheet", name: "Definition Sheet" },
        { path: "/study/exampreparation", name: "Exam Preparation" },
        { path: "/study/formulaSheet", name: "Formula Sheet" },
        { path: "/study/flashcards-tips", name: "Flashcards Tips" },
        { path: "/study/past-paper", name: "Past Paper" },
        { path: "/study/practice-quizzes", name: "Practice Questions" },
        { path: "/study/revision-note", name: "Revision Note" },
        { path: "/study/worksheet", name: "Worksheets / Topical questions" },
        { path: "/study/youtube", name: "Youtube" },
      ],
    },
    { path: "/about", name: "About Us" },
    { path: "/help", name: "Help Center" },
    { path: "/contact", name: "Contact Us" },
  ];

  useEffect(() => {
    const handleShadow = () => setShadow(window.scrollY > 50);
    window.addEventListener("scroll", handleShadow);
    return () => window.removeEventListener("scroll", handleShadow);
  }, []);

  const toggleDropdown = (name) => {
    setDropdownOpen(dropdownOpen === name ? null : name);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${shadow ? "shadow-lg bg-[#417094]" : "bg-[#417094]"
        }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center h-20">
        {/* Logo */}
        <Link href="/" className="relative w-[150px] lg:w-[180px] h-[55px] lg:h-[60px] overflow-hidden">
          <Image
            src={logo}
            alt="Navbar Logo Image"
            layout="fill"
            objectPosition="center"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8 font-semibold text-gray-700">
          {NavLinks.map((link) => (
            <div key={link.name} className="relative">
              {link.dropdown ? (
                <>
                  <button
                    onClick={() => toggleDropdown(link.name)}
                    className={`flex items-center space-x-1 hover:text-[#3cb371] text-xl ${router.pathname.startsWith(link.path)
                        ? "text-[#3cb371] underline text-2xl font-bold"
                        : "text-[#FFF]"
                      }`}
                  >
                    <span>{link.name}</span>
                    <IoIosArrowDown />
                  </button>

                  {dropdownOpen === link.name && (
                    <ul className="absolute left-0 top-full mt-1 bg-white shadow-lg rounded-md w-96 z-50">
                      {link.dropdown.map((sublink) => (
                        <li key={sublink.name}>
                          <Link
                            href={sublink.path}
                            className={`block px-4 py-2 hover:bg-gray-100 text-lg ${router.pathname === sublink.path
                                ? "text-[#3cb371] underline text-2xl font-bold"
                                : "text-gray-700 text-lg"
                              }`}
                          >
                            {sublink.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={link.path}
                  className={`hover:text-[#3cb371] text-lg ${router.pathname === link.path
                      ? "text-[#3cb371] underline text-3xl font-bold"
                      : "text-[#FFF]"
                    }`}
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}

          {/* Sign Up Button */}
          <Link
            href="/auth/Student/Login/signin-student"
            className="ml-4 bg-[#111827] text-white px-5 py-2 rounded-lg hover:bg-[#417094] transition"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="ml-10 bg-[#fff] text-[#417094] hover:text-[#fff] hover:bg-[#417094] px-5 py-2 rounded-lg transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="text-gray-800 p-2 rounded-md focus:outline-none"
          >
            {open ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-white shadow-lg">
          <ul className="flex flex-col p-4 space-y-4 font-semibold text-gray-700">
            {NavLinks.map((link) => (
              <li key={link.name}>
                {link.dropdown ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(link.name)}
                      className="flex justify-between w-full items-center"
                    >
                      {link.name} <IoIosArrowDown />
                    </button>
                    {dropdownOpen === link.name && (
                      <ul className="pl-4 mt-2 flex flex-col space-y-2">
                        {link.dropdown.map((sublink) => (
                          <li key={sublink.name}>
                            <Link
                              href={sublink.path}
                              onClick={() => setOpen(false)}
                              className="block hover:text-[#417094]"
                            >
                              {sublink.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.path}
                    onClick={() => setOpen(false)}
                    className={`block hover:text-[#417094] text-lg ${router.pathname === link.path
                        ? "text-indigo-600 underline text-3xl font-bold"
                        : ""
                      }`}
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
            {/* Mobile Sign Up Button */}
            <li className="flex flex-col">
              <Link
                href="/auth/Student/Login/signin-student"
                className="mb-5 bg-[#111827] text-white px-5 py-2 rounded-lg hover:bg-[#417094] transition"
              >
                Login
              </Link>

              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className="block text-center bg-[#fff] text-[#417094] hover:text-[#fff] hover:bg-[#417094] px-5 py-2 rounded-lg  transition"
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};
