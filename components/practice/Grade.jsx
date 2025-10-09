import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';
import Link from "next/link"
import { FaFolder } from "react-icons/fa6";

export default function Grade() {
  const grades = [
    { id: 9, name: "Grade 9", slug : "grade_9" },
    { id: 10, name: "Grade 10", slug : "grade_10" },
    { id: 11, name: "Grade 11", slug : "grade_11" },
    { id: 12, name: "Grade 12", slug : "grade_12" },
  ];

  return ( 
    <div className="px-5 md:px-10 lg:px-20 py-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {grades.map((grade, index) => (
          <div
            key={grade.id}
            className={`flex justify-center items-center bg-[#002244] text-[#fff] py-4 px-2 border-lg rounded-2xl 
            hover:bg-[#0041e1] hover:text-[#fff]`}
          >
            <Link 
              href={`/practice/subject/${grade.slug}`}
            >
              <a className="flex justify-center items-center">
                <h1>
                  <FaFolder size={40} color="#ffcb23" />
                </h1>
                <h1 className="pl-4 font-caveat text-center font-bold text-md md:text-lg">
                  {grade.name}
                </h1>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
