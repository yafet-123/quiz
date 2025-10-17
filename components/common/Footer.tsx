import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/LOGO_V0.1-01.png";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaTelegramPlane,
} from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

export const Footer = () => {
  const socialLinks = [
    { icon: <FaFacebookF size={22} />, path: "#" },
    { icon: <FaInstagram size={22} />, path: "#" },
    { icon: <FaLinkedinIn size={22} />, path: "#" },
    { icon: <FaYoutube size={22} />, path: "#" },
    { icon: <FaTelegramPlane size={22} />, path: "#" },
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Books", path: "/books" },
    { name: "Practice", path: "/practice" },
    { name: "Study Tools", path: "/study" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-[#9333ea] text-white pt-12">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 grid grid-cols-1 md:grid-cols-3 gap-8 py-5">
        {/* Logo + Social */}
        <div className="flex flex-col space-y-6">
          <Link href="/">
            <div className="relative cursor-pointer">
              <h1 className="cursor-pointer text-2xl font-bold text-white">
                Save My Exams
              </h1>
            </div>
          </Link>
          <p className="font-semibold">Follow us on social media</p>
          <div className="flex space-x-4">
            {socialLinks.map((link, idx) => (
              <Link key={idx} href={link.path}>
                <a className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
                  {link.icon}
                </a>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="flex flex-col space-y-2">
            {quickLinks.map((link, idx) => (
              <li key={idx}>
                <Link href={link.path}>
                  <a className="hover:text-white/80 transition">{link.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-bold mb-4">Contact Us</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <FaPhoneAlt /> <span>+251 966 149 422</span>
            </li>
            <li className="flex items-center gap-2">
              <MdEmail /> <span>info@savemyexams.com</span>
            </li>
            <li className="flex items-center gap-2">
              <ImLocation /> <span>Addis Ababa, Ethiopia</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-gray-900 text-gray-400 py-6 text-center">
        <p>&copy; {new Date().getFullYear()} Save My Exams. All rights reserved.</p>
      </div>
    </footer>
  );
};
