import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';
import Link from "next/link"

export default function Subject({AllGradesubject}) {
  console.log(AllGradesubject)
  return ( 
    <div className="px-5 md:px-10 lg:px-20 py-32">
      <div className="flex flex-col">
        {AllGradesubject.map((grade) => (
          <div className="flex flex-col" key={grade.id}>
            <h2 className="text-xl font-bold mb-4 text-2xl lg:text-3xl">{grade.name}</h2>
            {grade.subjects.map((subject, index) => (
              <Link key={index} href="/">
                <a className="bg-[#e3e3e8] hover:bg-[#f8f8f9] py-3 px-4 rounded-xl mb-5 text-black text-xl lg:text-2xl">
                  {subject}
                </a>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
