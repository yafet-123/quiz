import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';
import Link from "next/link"
import { FaFolder } from "react-icons/fa6";

export default function Subject({subjects}) {
  return (  
    <div className="bg-gray-100 min-h-screen py-28">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {subjects.map((subject) => (
          <Link href={`/study/revision-note/subject/${subject.id}`} key={subject.id}>
            <div
              className="group bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl 
              transform hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col items-center text-center p-6"
            >
              {/* Image Section */}
              <div className="relative w-full h-64 overflow-hidden rounded-xl">
                <Image
                  src={subject.svg}
                  alt={subject.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl group-hover:scale-110 transition-transform duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Text Section */}
              <h2 className="mt-6 text-2xl font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-300">
                {subject.title}
              </h2>
              <p className="text-gray-600 mt-3 text-base leading-relaxed">
                {subject.description}
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
