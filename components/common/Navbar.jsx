import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { BsLinkedin, BsInstagram } from "react-icons/bs";
import logo from "../../public/LOGO_V0.1-01.png";
import { IoIosArrowDown } from "react-icons/io";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  // const [toggleDropdown, setToggleDropdown] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
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
        { path: "/study/revision-note", name:"Revision Note"},
        { path: "/study/flashcards-tips", name:"Flashcards Tips"},
      ],
    },
    { path: "/practice", name: "Practice" },
    { path: "/about", name: "About" },
    { path: "/Team", name: "Help and Support" },
    { path: "/about", name: "About Us" },
    { path: "/contact", name: "Contact Us" },
  ];

  useEffect(() => {
    // when it will scrolldown greater than 90 it will have navbar will change it style
    const handleShadow = () => {
      if (window.scrollY >= 50) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener("scroll", handleShadow);
  }, []);

  const closeDropdown = useCallback(() => {
    setOpen(false);
  }, []);

  const isDetailPage =
    /^\/tours\/regular_tours\/[^/]+$/.test(router.pathname) ||
    /^\/tours\/halal_tours\/[^/]+$/.test(router.pathname) ||
    /^\/destination\/[^/]+$/.test(router.pathname);

  return (
    <nav
      className={`
        ${
          shadow
            ? "fixed w-full h-20 shadow-xl z-[200] ease-in-out duration-300 bg-[#fff] overflow-visible"
            : "fixed w-full h-20 z-[200] border-b-2 border-slate-100 "
        }
      `}
    >
      <div
        className={` ${
          open ? "bg-[#fff] fixed w-full" : ""
        } lg:justify-between justify-around px-2 lg:px-10 items-center lg:flex ${
          isDetailPage ? "bg-[#fff]" : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="relative w-[150px] lg:w-[100px] h-[65px] lg:h-[70px] overflow-hidden">
              <Image
                src={logo}
                alt="Navbar Logo Image"
                layout="fill"
                
                objectPosition="center"
              />
            </div>
          </Link>

          <div className="flex items-center lg:hidden">
            <div className="pl-5">
              <button
                aria-label={`Open menu or closing menu`}
                className={` text-black p-2 rounded-md outline-none focus:border-gray-400 focus:border`}
                onClick={() => setOpen(!open)}
              >
                {open === true ? (
                  <AiOutlineClose size={35} />
                ) : (
                  <AiOutlineMenu size={35} />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="">
          <div
            className={`flex-1 justify-self-center pb-2 mt-4 lg:block lg:pb-0 lg:mt-0 ${
              open ? "flex " : "hidden"
            }`}
          >
            <ul
              className={` ${
                open ? "text-black" : "text-black"
              } items-center font-bold paragraph-fonts justify-center space-y-8 lg:flex lg:flex-row flex-col lg:space-x-6 lg:space-y-0`}
            >
              {NavLinks.map((link) => (
                <li
                  key={link.name}
                  className={`relative md:my-0 my-7 text-lg md:text-xl cursor-pointer ${
                    router.pathname === link.path ||
                    (link.path !== "/" && router.pathname.startsWith(link.path))
                      ? "text-[#266d35] underline"
                      : "hover:text-[#266d35]"
                  }`}
                >
                  {link.dropdown ? (
                    <>
                      {/* Parent button */}
                      <button
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === link.name ? null : link.name
                          )
                        }
                        className={`flex items-center justify-center space-x-1 ${
                          router.pathname === link.path
                            ? "text-[#266d35] underline"
                            : "hover:text-[#266d35]"
                        }`}
                      >
                        <span>{link.name}</span>
                        <IoIosArrowDown />
                      </button>

                      {/* Dropdown menu */}
                      {openDropdown === link.name && (
                        <ul className="absolute left-0 mt-2 bg-white shadow-lg rounded-md w-96 z-50 overflow-visible">
                          {link.dropdown.map((sublink) => {
                            const isActive = router.pathname === sublink.path; // only exact match
                            return (
                              <li key={sublink.name}>
                                <Link href={sublink.path}>
                                  <p
                                    onClick={() => {
                                      setOpenDropdown(null);
                                      closeDropdown(); // close mobile menu too
                                    }}
                                    className={`block px-4 py-2 ${
                                      isActive
                                        ? "text-[#266d35] underline"
                                        : "text-[#000] hover:bg-gray-100"
                                    }`}
                                  >
                                    {sublink.name}
                                  </p>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link href={link.path}>
                      <p onClick={closeDropdown}>{link.name}</p>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
