import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

export default function ClassList({classes}) {
  const router = useRouter();
  const handleSubject = (id) => {
    router.push(`/subject/${id}`);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {classes.map((data,index)=>(
        <button 
         key={index}
          onClick={() => handleSubject(data.class_id)} 
          className={`${ data.class_id % 3 == 0 && "bg-[#2862E9]" || data.class_id % 3 == 1 && "bg-[#EFD81D]" || data.class_id % 3 == 2 && "bg-[#E95F21]" } 
          px-5 py-16 text-white font-bold text-xl lg:text-3xl rounded-lg`}
        >
          {data.ClassName}
        </button>
      ))}
    </div>
  );
};