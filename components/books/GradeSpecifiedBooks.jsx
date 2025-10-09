import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';
import Link from "next/link"
import { FaFilePdf } from "react-icons/fa6";

export default function GradeSpecifiedBooks({grades}) {
  return ( 
    <div className="px-5 md:px-10 lg:px-20 py-32">
      <div className="flex flex-col">
        {grades.map((grade, index) => (
          <div
            key={grade.id}
            className={`flex justify-between items-center bg-[#f8f8f9] text-[#fff] py-5 px-4 border-lg rounded-2xl 
            hover:bg-[#ededf2] mb-5`}
          >
            <div className="flex justify-center items-center">
                <h1>
                  <FaFilePdf size={40} color="#df646a" />
                </h1>
                <h1 className="pl-4 text-black font-caveat mb-5 text-center font-bold text-md md:text-lg">
                  {grade.name}
                </h1>
            </div>

            <Link href={`/books/grade/${grade.id}`}>
            	<a className="bg-[#3699ff] hover:bg-[#002244] px-3 py-2 border rounded-2xl text-md md:text-lg font-bold">
            		View Detail
            	</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
