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
      svg: "/Grade/grade 9.jpg"
    },
    {
      id: 2,
      title: "Grade 10",
      description: "Grade 10 is a transitional year where students solidify their knowledge in key subjects and begin preparing for specialized streams in Grades 11 and 12. It is an important year for academic growth and skill development.",
      svg: "/Grade/grade 10.jpg"
    },
    {
      id: 3,
      title: "Grade 11 Natural Science",
      description: "Grade 11 Natural Science focuses on subjects like physics, chemistry, biology, and advanced mathematics. Students in this stream prepare for science-related careers and higher education opportunities.",
      svg: "/Grade/grade 11.jpg"
    },
    {
      id: 4,
      title: "Grade 11 Social Science",
      description: "Grade 11 Social Science covers subjects such as history, geography, economics, and civics. This stream is ideal for students interested in social studies, humanities, or business-related fields in the future.",
      svg: "/Grade/grade 11.jpg"
    },
    {
      id: 5,
      title: "Grade 12 Natural Science",
      description: "Grade 12 Natural Science is the final year of the science stream, where students advance their knowledge in physics, chemistry, biology, and mathematics. It prepares students for university studies in science, engineering, or medical fields.",
      svg: "/Grade/grade 12.jpg"
    },
    {
      id: 6,
      title: "Grade 12 Social Science",
      description: "Grade 12 Social Science is the final year of the social science stream, emphasizing advanced topics in history, geography, economics, and civics. Students gain the knowledge and skills needed for higher education in humanities, social sciences, or business.",
      svg: "/Grade/grade 12.jpg"
    }
  ];
  return ( 
    <div className="bg-gray-100 min-h-screen py-28">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {grades.map((grade) => (
          <Link href={`/study/books/government/${grade.title}`} key={grade.id}>
            <div
              className="group bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl 
              transform hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col items-center text-center p-6"
            >
              {/* Image Section */}
              <div className="relative w-full h-64 overflow-hidden rounded-xl">
                <Image
                  src={grade.svg}
                  alt={grade.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl group-hover:scale-110 transition-transform duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Text Section */}
              <h2 className="mt-6 text-2xl font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-300">
                {grade.title}
              </h2>
              <p className="text-gray-600 mt-3 text-base leading-relaxed">
                {grade.description}
              </p>

              {/* Decorative Line */}
              <div className="mt-4 w-16 h-1 bg-green-500 rounded-full group-hover:w-24 transition-all duration-500"></div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
