import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo.jpg";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaTelegramPlane,
  FaPhoneAlt,
} from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import { MdEmail } from "react-icons/md";
import { Reveal } from "./Reveal";

export const Footer = () => {
  const socialLinks = [
    { icon: <FaFacebookF size={18} />, path: "#" },
    { icon: <FaInstagram size={18} />, path: "#" },
    { icon: <FaLinkedinIn size={18} />, path: "#" },
    { icon: <FaYoutube size={18} />, path: "#" },
    { icon: <FaTelegramPlane size={18} />, path: "#" },
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Books", path: "/study/book" },
    { name: "Study Tools", path: "/study" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const studyLinks = [
    { name: "Past Papers", path: "/study/past-paper" },
    { name: "Practice Questions", path: "/study/practice-quizzes" },
    { name: "Flashcards", path: "/study/flashcards-tips" },
    { name: "Notes", path: "/study/note" },
    { name: "Worksheets", path: "/study/worksheet" },
  ];

  return (
    <footer className="relative mt-24 overflow-hidden">
      {/* decorative glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-[120%] bg-gradient-to-r from-primary-400/20 via-accent-400/20 to-primary-400/20 blur-3xl" />
      <div className="relative glass-dark">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 pt-16 pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <Reveal>
            <div className="flex flex-col gap-5">
              <Link href="/" className="block w-[180px] h-[58px] relative">
                <div className="relative w-full h-full overflow-hidden bg-white/85 shadow-soft">
                  <Image src={logo} alt="Aceit Logo" layout="fill" objectFit="contain" />
                </div>
              </Link>
              <p className="text-white/75 text-sm leading-relaxed max-w-xs">
                Ethiopia&apos;s digital learning platform. Textbooks, past papers, quizzes and
                flashcards — everything you need to ace your exams.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.path}
                    aria-label="social link"
                    className="p-2.5 rounded-xl bg-white/10 hover:bg-white/25 text-white/85 hover:text-white ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1"
                  >
                    {link.icon}
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Quick Links */}
          <Reveal className="stagger-1">
            <h3 className="text-white font-bold mb-5 text-lg">Quick Links</h3>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.path} className="text-white/70 hover:text-primary-300 transition-colors text-[15px]">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Study Tools */}
          <Reveal className="stagger-2">
            <h3 className="text-white font-bold mb-5 text-lg">Study Tools</h3>
            <ul className="flex flex-col gap-2.5">
              {studyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.path} className="text-white/70 hover:text-primary-300 transition-colors text-[15px]">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
<Reveal className="stagger-3">
            <h3 className="text-white font-bold mb-5 text-lg">Contact Us</h3>
            <ul className="flex flex-col gap-3 text-white/75 text-[15px]">
              <li className="flex items-center gap-3">
                <span className="p-2 rounded-lg bg-white/10 ring-1 ring-white/10"><FaPhoneAlt size={14} /></span>
                <span>+2519 04 95 49 86</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="p-2 rounded-lg bg-white/10 ring-1 ring-white/10"><MdEmail size={14} /></span>
                <span>hiyabealaa@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="p-2 rounded-lg bg-white/10 ring-1 ring-white/10"><ImLocation size={14} /></span>
                <span>Addis Ababa, Ethiopia</span>
              </li>
            </ul>
          </Reveal>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-5 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/50 text-sm">
              &copy; {new Date().getFullYear()} Aceit. All rights reserved.
            </p>
            <p className="text-white/40 text-xs text-center sm:text-right">
              Designed for students. Built for success.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};