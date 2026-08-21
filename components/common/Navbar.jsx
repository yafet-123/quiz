import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import logo from "../../public/logo.jpg";

export const Navbar = () => {
  const [open, setOpen] = useState(false); // mobile menu
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  const router = useRouter();

  const NavLinks = [
    { path: "/", name: "Home" },
    {
      path: "/study",
      name: "Study Tools",
      dropdown: [
        // { path: "/study/books/article", name: "Articles" },
        { path: "/study/book", name: "Books" },
        { path: "/study/definitionSheet", name: "Definition Sheet" },
        // { path: "/study/exampreparation", name: "Exam Preparation" },
        { path: "/study/formulaSheet", name: "Formula Sheet" },
        // { path: "/study/flashcards-tips", name: "Flashcards Tips" },
        { path: "/study/past-paper", name: "Past Paper" },
        // { path: "/study/practice-quizzes", name: "Practice Questions" },
        { path: "/study/note", name: "Note" },
        { path: "/study/syllablus", name: "Syllablus" },
        { path: "/study/worksheet", name: "Worksheets" },
        // { path: "/study/youtube", name: "Youtube" },
      ],
    },
    { path: "/about", name: "About Us" },
    { path: "/help", name: "Help Center" },
    { path: "/contact", name: "Contact Us" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = (name) => {
    setDropdownOpen(dropdownOpen === name ? null : name);
  };

  const isActive = (path) =>
    path === "/" ? router.pathname === "/" : router.pathname.startsWith(path);
  const isActiveSub = (sub) =>
    router.pathname === sub.path || router.pathname.startsWith(sub.path + "/");

  const dropdownVariants = reduceMotion
    ? {}
    : {
        hidden: { opacity: 0, y: -8, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.18, ease: "easeOut" } },
      };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-0 shadow-nav glass-strong border-b border-white/60"
          : "py-1 bg-transparent border-b border-transparent"
      }`}
    >
      <nav className={`max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-8 transition-all duration-300 ${scrolled ? "h-16" : "h-20"}`}>
        <Link href="/" className="block w-[180px] h-[58px] relative">
          <div className="relative w-full h-full overflow-hidden bg-white/85 shadow-soft">
            <Image src={logo} alt="Aceit Logo" layout="fill" objectFit="contain" />
          </div>
        </Link>
        <div className="hidden lg:flex items-center gap-6 font-semibold">
          {NavLinks.map((link) => (
            <div key={link.name} className="relative group">
              {link.dropdown ? (
                <>
                  <button
                    onClick={() => toggleDropdown(link.name)}
                    className={`flex items-center gap-1.5 text-[15px] py-2 transition-colors ${
                      isActive(link.path) ? "text-primary-600" : "text-ink-700 hover:text-primary-600"
                    }`}
                  >
                    <span>{link.name}</span>
                    <motion.span animate={{ rotate: dropdownOpen === link.name ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <IoIosArrowDown className="text-xs" />
                    </motion.span>
                    <span
                      className={`absolute left-0 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-primary-400 to-ocean-400 transition-all duration-300 ${
                        isActive(link.path) ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {dropdownOpen === link.name && (
                      <motion.ul
                        variants={dropdownVariants}
                        initial={reduceMotion ? false : "hidden"}
                        animate="visible"
                        exit={reduceMotion ? undefined : "hidden"}
                        className="absolute left-0 top-full mt-2 w-80 rounded-2xl glass-strong shadow-lift p-2 overflow-hidden"
                      >
                        {link.dropdown.map((sublink) => (
                          <li key={sublink.name}>
                            <Link
                              href={sublink.path}
                              onClick={() => setDropdownOpen(null)}
                              className={`block px-4 py-2.5 rounded-xl text-[15px] transition-colors ${
                                isActiveSub(sublink)
                                  ? "bg-primary-50 text-primary-700 font-semibold"
                                  : "text-ink-700 hover:bg-white/70 hover:text-primary-600"
                              }`}
                            >
                              {sublink.name}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  href={link.path}
                  className={`relative text-[15px] py-2 transition-colors group ${
                    isActive(link.path) ? "text-primary-600 font-bold" : "text-ink-700 hover:text-primary-600"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute left-0 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-primary-400 to-ocean-400 transition-all duration-300 ${
                      isActive(link.path) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              )}
            </div>
          ))}

          <div className="flex items-center gap-3 ml-2">
            <Link href="/auth/Student/Login/signin-student" className="btn-ghost px-5 py-2 text-sm">
              Login
            </Link>
            <Link href="/signup" className="btn-primary px-5 py-2 text-sm">
              Sign Up
            </Link>
          </div>
        </div>

        <div className="lg:hidden">
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="p-2 rounded-xl glass text-gray-700 hover:text-primary-600 transition-colors focus:outline-none"
          >
            {open ? <AiOutlineClose size={26} /> : <AiOutlineMenu size={26} />}
          </button>
        </div>
      </nav>
<AnimatePresence>
        {open && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden glass-strong border-t border-white/60 overflow-hidden"
          >
            <ul className="flex flex-col p-4 space-y-1 font-semibold text-ink-700">
              {NavLinks.map((link) => (
                <li key={link.name}>
                  {link.dropdown ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(link.name)}
                        className={`flex justify-between w-full items-center px-2 py-2.5 rounded-xl transition-colors ${
                          isActive(link.path) ? "text-primary-600" : "hover:bg-white/60"
                        }`}
                      >
                        {link.name}
                        <motion.span animate={{ rotate: dropdownOpen === link.name ? 180 : 0 }}>
                          <IoIosArrowDown />
                        </motion.span>
                      </button>
                      <AnimatePresence initial={false}>
                        {dropdownOpen === link.name && (
                          <motion.ul
                            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
                            className="pl-4 mt-1 overflow-hidden"
                          >
                            {link.dropdown.map((sublink) => (
                              <li key={sublink.name}>
                                <Link
                                  href={sublink.path}
                                  onClick={() => setOpen(false)}
                                  className={`block px-3 py-2 rounded-xl transition-colors ${
                                    isActiveSub(sublink)
                                      ? "text-primary-600 bg-primary-50"
                                      : "hover:bg-white/60"
                                  }`}
                                >
                                  {sublink.name}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={link.path}
                      onClick={() => setOpen(false)}
                      className={`block px-2 py-2.5 rounded-xl transition-colors ${
                        isActive(link.path) ? "text-primary-600 bg-primary-50 font-bold" : "hover:bg-white/60"
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
              <li className="flex flex-col gap-3 mt-3">
                <Link href="/auth/Student/Login/signin-student" className="btn-ghost w-full justify-center">
                  Login
                </Link>
                <Link href="/signup" onClick={() => setOpen(false)} className="btn-primary w-full justify-center">
                  Sign Up
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};