import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

export default function SubjectList({subjects,classId}) {
  const router = useRouter();
  const handleSubject = (id) => {
    router.push(`/Teacher/User/Answer/category/?subjectId=${id}&classId=${classId}`);
  };
  return (
    <div className="py-10 px-5 lg:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
      {subjects.map((data,index)=>(
        <button 
          key={index}
          onClick={() => handleSubject(data.subject_id)} 
          className="py-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent px-5 py-16 text-white font-bold text-xl lg:text-3xl rounded-lg"
        >
          {data.SubjectName}
        </button>
      ))}
    </div>
  );
};

