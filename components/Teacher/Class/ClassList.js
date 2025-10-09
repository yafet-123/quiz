import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

export default function ClassList({classes}) {
  const router = useRouter();

  const handleSubject = (props) => {
    console.log(props)
    router.push(`/Teacher/Question/subject/?subjectId=${props.subject_id}&classId=${props.class_id}`);
  }; 
  return (
    <div className="py-20 h-full px-5 lg:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
      {classes.map((data,index)=>(
        <button 
          key={index}
          onClick={() => handleSubject(data)} 
          className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent px-5 py-16 text-white font-bold text-xl lg:text-3xl rounded-lg"
        >
          {data.className}
        </button>
      ))}
    </div>
  );
}; 

