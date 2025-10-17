// Navbar.js
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/router";

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
        { path: "/study/books", name: "Books" },
        { path: "/study/comprehensive-notes", name: "Comprehensive Notes" },
        { path: "/study/practice-quizzes", name: "Practice Quizzes" },
        { path: "/study/revision-note", name: "Revision Note" },
        { path: "/study/flashcards-tips", name: "Flashcards Tips" },
      ],
    },
    { path: "/practice", name: "Practice" },
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
      className={`fixed w-full z-50 transition-all duration-300 ${
        shadow ? "shadow-lg bg-white" : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 lg:px-10 h-20">
        {/* Logo */}
        <Link href="/">
          <h1 className="cursor-pointer text-2xl font-bold text-purple-600">
            Save My Exams
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8 font-semibold text-gray-700">
          {NavLinks.map((link) => (
            <div key={link.name} className="relative">
              {link.dropdown ? (
                <>
                  <button
                    onClick={() => toggleDropdown(link.name)}
                    className={`flex items-center space-x-1 hover:text-purple-600 text-xl ${
                      router.pathname.startsWith(link.path)
                        ? "text-purple-600 underline text-2xl font-bold"
                        : ""
                    }`}
                  >
                    <span>{link.name}</span>
                    <IoIosArrowDown />
                  </button>

                  {dropdownOpen === link.name && (
                    <ul className="absolute left-0 top-full mt-1 bg-white shadow-lg rounded-md w-96 z-50">
                      {link.dropdown.map((sublink) => (
                        <li key={sublink.name}>
                          <Link href={sublink.path}>
                            <a
                              className={`block px-4 py-2 hover:bg-gray-100 text-lg ${
                                router.pathname === sublink.path
                                  ? "text-purple-600 underline text-2xl font-bold"
                                  : "text-gray-700 text-lg"
                              }`}
                            >
                              {sublink.name}
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link href={link.path}>
                  <a
                    className={`hover:text-purple-800 text-lg ${
                      router.pathname === link.path
                        ? "text-purple-600 underline text-3xl font-bold"
                        : ""
                    }`}
                  >
                    {link.name}
                  </a>
                </Link>
              )}
            </div>
          ))}

          {/* Sign Up Button */}
          <Link href="/signup">
            <a className="ml-4 bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition">
              Sign Up
            </a>
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
                            <Link href={sublink.path}>
                              <a
                                onClick={() => setOpen(false)}
                                className="block hover:text-purple-600"
                              >
                                {sublink.name}
                              </a>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link href={link.path}>
                    <a
                      onClick={() => setOpen(false)}
                      className={`block hover:text-purple-800 text-lg ${
                        router.pathname === link.path
                          ? "text-indigo-600 underline text-3xl font-bold"
                          : ""
                      }`}
                    >
                      {link.name}
                    </a>
                  </Link>
                )}
              </li>
            ))}
            {/* Mobile Sign Up Button */}
            <li>
              <Link href="/signup">
                <a
                  onClick={() => setOpen(false)}
                  className="block text-center bg-purple-700 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition"
                >
                  Sign Up
                </a>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};
