import React, { useState } from 'react';
import { useRouter } from 'next/router';
import QuestionType from "../../../../../components/Students/answered/QuestionType"
import { prisma } from '../../../../../util/db.server.js'
import { useSession } from "next-auth/react";
import { MainHeader } from '../../../../../components/common/MainHeader';
import { VerticalNavbar } from "../../../../../components/Students/VerticalNavbar";
import { getSession } from "next-auth/react";
export async function getServerSideProps(context) {
  const {params,req,res,query} = context
  const id = query.id
  const session = await getSession(context);
  const userRole = await session.user.role
  if (userRole !== 'student') {
    return {
      redirect: {
        destination: '/auth/Student/Login/signin-student', // Redirect to the error page for unauthorized access
        permanent: false,
      },
    };
  }
  const student = await prisma.Students.findUnique({
    where:{ students_id: Number(session.user.user_id) },
    
  });
  if (student === null) {
    return {
      redirect: {
        destination: '/auth/error',
        permanent: false,
      },
    };
  }
  
  const questionType = await prisma.QuestionType.findMany({
      where:{
        question_category_id:Number(id)
      },
      include:{
        User:{
          select:{
            UserName:true
          }
        },
      }
    })

    const Allquestiontype = questionType.map((data)=>({
      question_type_id:data.question_type_id,
      questiontypeName:data.questiontypeName,
    }))

    return {
      props: {
        Allquestiontype,
      }, // will be passed to the page component as props
  }
}

export default function Type({Allquestiontype}) {
  console.log(Allquestiontype)
  const router = useRouter();
  const { subjectId } = router.query;
  const handleSubject = (id) => {
    router.push(`/subject/${id}`);
  };
  function handleChange(newValue) {
      setselected(newValue);
  }
  const { status, data } = useSession();
  return (
    <React.Fragment>
      <MainHeader title="MatricMate : Students" />
      <div className="flex bg-[#e6e6e6] pt-10">
        <VerticalNavbar onChange={handleChange} data={data} />
        <div className='w-full px-2 lg:px-32 h-full pt-20 pb-96'>
          <QuestionType Allquestiontype={Allquestiontype} subjectId={subjectId} />
        </div>
      </div>
    </React.Fragment>
  );
};