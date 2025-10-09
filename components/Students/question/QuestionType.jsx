import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

export default function QuestionType({Allquestiontype,subjectId}) {
  const router = useRouter();
  const handleSubject = (id) => {
    router.push(`/Students/question/?id=${id}&subjectId=${subjectId}`);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {Allquestiontype.map((data,index)=>(
        <button
        key={index} 
          onClick={() => handleSubject(data.question_type_id)} 
          className={`bg-gradient-to-r from-yellow-500 via-blue-500 to-green-500 text-transparent px-5 py-16 text-white font-bold text-xl lg:text-3xl rounded-lg`}
        >
          {data.questiontypeName}
        </button>
      ))}
    </div>
  );
};