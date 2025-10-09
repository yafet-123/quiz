import React, {useState} from 'react'
import Image from 'next/image'
import Link from "next/link"
import Slider, { Settings , LazyLoadTypes } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"

export default function CommonHeroSection({Tag , Welcome_Message}) {
  return (
    <main
      className="flex flex-col items-center justify-center text-center px-4 pt-24 h-full lg:h-screen"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-5xl font-bold text-[#007BFF] mb-4 mt-24 animate-fade-in">
        MatricMate
      </h1>
      <p className="text-lg font-medium text-white mb-4">
        Your best companion to ace the matric exam.
      </p>
      <p className="text-white max-w-xl mb-6">
        Ethiopia is entering a new era of digital testing; MatricMate is
        here to support every step. Access textbooks, test your knowledge,
        and get instant answers, all from one platform.
      </p>
      <Link href="/practice">
        <a
          className={`bg-white text-[#002244] px-6 py-3 rounded-full border border-[#007BFF] hover:bg-[#007BFF] hover:text-white 
          transition`}
        >
          Get Started
        </a>
      </Link>
    </main>
  )
};


