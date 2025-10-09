import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

export default function SubjectList({subjects}) {
  const router = useRouter();
  const handleSubject = (id) => {
    router.push(`/Students/question/category/${id}`);
  };
  return (
    <div className="pt-0 pb-20 h-full px-5 lg:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
      {subjects.map((data,index)=>(
        <button 
          key={index}
          onClick={() => handleSubject(data.subject_id)} 
          className={`bg-gradient-to-r from-green-500 via-red-500 to-blue-500 text-transparent px-5 py-16 text-white font-bold text-xl lg:text-3xl rounded-lg`}>
          {data.SubjectName}
        </button>
      ))}
    </div>
  );
};

