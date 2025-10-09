import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';
import Link from "next/link"
import { FaFolder } from "react-icons/fa6";

export default function Category() {
  const grades = [
    {
      id: 1,
      title: "Grade 9",
      description: "Grade 9 marks the beginning of high school. Students explore core subjects in greater depth, including mathematics, sciences, languages, and social studies. This is a critical stage for building a strong foundation for higher grades.",
      svg: "/Grade/grade 9.svg"
    },
    {
      id: 2,
      title: "Grade 10",
      description: "Grade 10 is a transitional year where students solidify their knowledge in key subjects and begin preparing for specialized streams in Grades 11 and 12. It is an important year for academic growth and skill development.",
      svg: "/Grade/grade 10.svg"
    },
    {
      id: 3,
      title: "Grade 11 - Natural Science",
      description: "Grade 11 Natural Science focuses on subjects like physics, chemistry, biology, and advanced mathematics. Students in this stream prepare for science-related careers and higher education opportunities.",
      svg: "/Grade/grade 11 Natural.svg"
    },
    {
      id: 4,
      title: "Grade 11 - Social Science",
      description: "Grade 11 Social Science covers subjects such as history, geography, economics, and civics. This stream is ideal for students interested in social studies, humanities, or business-related fields in the future.",
      svg: "/Grade/grade 11 Social.svg"
    },
    {
      id: 5,
      title: "Grade 12 - Natural Science",
      description: "Grade 12 Natural Science is the final year of the science stream, where students advance their knowledge in physics, chemistry, biology, and mathematics. It prepares students for university studies in science, engineering, or medical fields.",
      svg: "/Grade/grade 12 Natural.svg"
    },
    {
      id: 6,
      title: "Grade 12 - Social Science",
      description: "Grade 12 Social Science is the final year of the social science stream, emphasizing advanced topics in history, geography, economics, and civics. Students gain the knowledge and skills needed for higher education in humanities, social sciences, or business.",
      svg: "/Grade/grade 12 Social.svg"
    }
  ];


  return ( 
    <div className="bg-gray-100 min-h-screen py-28">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {grades.map((grade) => (
          <Link
            href={`/books/${grade.title}`}
            key={grade.id} 
          >
            <a className={`bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow 
            duration-300 flex flex-col items-center text-center`}>
              <div className="relative w-full h-72">
                <Image
                  src={grade.svg}
                  alt={grade.title}
                  layout="fill"
                  objectFit="cover" 
                  className="rounded-lg"
                />
              </div>

              <h2 className="text-lg lg:text-2xl font-bold text-[#000] mb-2">{grade.title}</h2>

              <p className="text-gray-600 text-md lg:text-lg">{grade.description}</p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
