import React, { useState } from 'react';
import { useRouter } from 'next/router';
import QuestionType from "../../../../../../components/Teacher/UserAnswer/QuestionType"
import { prisma } from '../../../../../../util/db.server.js'
import { useSession } from "next-auth/react";
import { MainHeader } from '../../../../../../components/common/MainHeader';
import { VerticalNavbar } from "../../../../../../components/Teacher/VerticalNavbar";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context) {
  const {params,req,res,query} = context
  const id = query.id
  console.log(query.id)
  const session = await getSession(context);
  const userRole = await session?.user?.role
  if (userRole !== 'teacher') {
    return {
      redirect: {
        destination: '/auth/Teacher/Login/signin-teacher', // Redirect to the error page for unauthorized access
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
  const router = useRouter();
  const subjectId = router.query.subjectId;
  const classId = router.query.classId;
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
          <QuestionType Allquestiontype={Allquestiontype} subjectId={subjectId} classId={classId} />
        </div>
      </div>
    </React.Fragment>
  );
};