import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

export default function QuestionCategory({AllquestionCategory,subjectId}) {
  const router = useRouter();
  console.log(subjectId)
  const handleSubject = (id) => {
    router.push(`/Students/answered/category/type/${id}?subjectId=${subjectId}`);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {AllquestionCategory.map((data,index)=>(
        <button 
         key={index}
          onClick={() => handleSubject(data.question_category_id)} 
          className={`bg-gradient-to-r from-blue-500 via-orange-500 to-pink-500 text-transparent px-5 py-16 text-white font-bold text-xl lg:text-3xl rounded-lg`}
        >
          {data.questioncategoryName}
        </button>
      ))}
    </div>
  );
};
