import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

export default function Studentlist({Allstudents}) {
  const router = useRouter();
  const subjectId = router.query.subjectId
  const id = router.query.id
  const handleSubject = (props) => {
    console.log(props)
    router.push(`/Teacher/User/Answer/?studentId=${props.students_id}&subjectId=${subjectId}&id=${id}`);
  }; 
  return (
    <div className="py-10 px-5 grid grid-cols-1 md:grid-cols-6 lg:grid-cols-3 gap-5 ">
      {Allstudents.map((data,index)=>(
        <button 
          key={index}
          onClick={() => handleSubject(data)} 
          className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent px-5 py-16 text-white font-bold text-xl lg:text-3xl rounded-lg"
        >
          <span className="capitalize">{data.firstName}</span> <span className="capitalize">{data.lastName} </span>
        </button>
      ))}
    </div>
  );
}; 

