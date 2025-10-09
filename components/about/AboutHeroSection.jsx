import React, {useState} from 'react'
import Image from 'next/image'
import Slider, { Settings , LazyLoadTypes } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"

export default function AboutHeroSection({Tag , Welcome_Message}) {
  const topReason = [
    {
      title:"International Curriculum",
      description:"Our school offers an internationally recognized curriculum that prepares our students for success in universities and careers around the world"
    },
    {
      title:"Experienced Faculty",
      description:"Our faculty members are highly qualified and experienced educators who are passionate about teaching and learning.They are committed to providing our students with the knowledge, skills, and experiences they need to succeed academically and personally"
    },
    {
      title:"Community Involvement",
      description:"Our school is an active member of the local and global community. We encourage our students to get involved in community service projects and other extracurricular activities that help them develop leadership skills, social responsibility, and a sense of civic duty"
    }
  ]
  return (
    <div className="flex flex-col px-5 lg:px-40 py-5 bg-[#44576d]">
      <div className="flex flex-col">
        <h1 className="text-center text-2xl lg:text-4xl pb-5 text-white text-capitalize font-bold">
          About Us
        </h1>
        <p className="text-center text-xl lg:text-3xl pb-5 text-white text-capitalize font-bold">
          At FTIA, we are dedicated to providing a world-class education that prepares our students for success in a global society.
        </p>
        
        <p className="text-center text-lg lg:text-2xl pb-5 text-white text-capitalize font-bold">
          Here are top reasons why you should choose our school:
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 text-white">
        {topReason.map((reason, index) => (
          <div className="p-5 bg-[#072d44] text-justify">
            <h1 className="text-xl lg:text-2xl font-bold mb-5 ">{reason.title}</h1>
            <p className="text-md lg:text-lg">{reason.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
};


