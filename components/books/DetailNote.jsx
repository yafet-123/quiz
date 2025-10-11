import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';
import Link from "next/link"
import { FaFilePdf } from "react-icons/fa6";

export default function DetailNote({notes}) {
  console.log(notes)
  return ( 
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 px-5 md:px-10 lg:px-20 py-32">
      <div className="flex flex-col">
        <h1 className="mb-5 font-bold text-xl lg:text-3xl">
          Note Summary
        </h1>
        <div className="flex text-lg lg:text-xl font-caveat mb-3">
          <h3 className="font-bold">Title : </h3>
          <h3 className="pl-2">{notes.title}</h3>
        </div>
        <div className="flex text-lg lg:text-xl font-caveat mb-3">
          <h3 className="font-bold">Subject : </h3>
          <h3 className="pl-2">{notes.subject}</h3>
        </div>
        <div className="flex text-lg lg:text-xl font-caveat mb-3">
          <h3 className="font-bold">Total Units : </h3>
          <h3 className="pl-2">{notes.unit}</h3>
        </div>
        <div className="flex flex-col text-lg lg:text-xl font-caveat mb-3">
          <h3 className="font-bold">Descreption : </h3>
          <h3 className="">{notes.description}</h3>
        </div>
        <div className="flex text-lg lg:text-xl font-caveat mb-3">
          <h3 className="font-bold">Units : </h3>
          <h3 className="pl-2">{notes.unit}</h3>
        </div>
        <div className="flex text-lg lg:text-xl font-caveat mb-3">
          <h3 className="font-bold">Total Pages : </h3>
          <h3 className="pl-2">{notes.page}</h3>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Link
          href="/book/grade 1/confessions-tolstoy.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <a className="px-6 py-4 bg-[#8950fc] text-white rounded-lg shadow-md hover:bg-blue-700 transition">
            Click To Download TextBook
          </a>
        </Link>
      </div>
    </div>
  );
}