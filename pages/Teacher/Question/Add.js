import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { prisma } from '../../../util/db.server.js'
import { getSession } from "next-auth/react";
import { MainHeader } from '../../../components/common/MainHeader';
import { VerticalNavbar } from "../../../components/Teacher/VerticalNavbar";
import {AddQuestion} from '../../../components/Teacher/AddQuestion'
import { useSession } from "next-auth/react";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log(session)
  const userRole = await session?.user?.role
  if (userRole !== 'teacher') {
    return {
      redirect: {
        destination: '/auth/Teacher/Login/signin-teacher', // Redirect to the error page for unauthorized access
        permanent: false,
      },
    };
  }
  const teacherId = session.user.user_id;
  const teacher = await prisma.Teacher.findUnique({
    where:{ teacher_id: Number(session.user.user_id) },
    
  });

  if (teacher === null) {
    return {
      redirect: {
        destination: '/auth/error',
        permanent: false,
      },
    };
  }
 
  const classes = await prisma.ClassTeacher.findMany({
    where:{
      teacher_id:Number(teacher.teacher_id)
    },
    include:{
      Class:{
        select:{
          ClassName:true
        }
      },
      Subject:{
        select:{
          SubjectName:true
        }
      },
    },
    orderBy: {
      // Specify the column and the order (asc for ascending)
      class_id: 'asc'
    },
  })

  const types = await prisma.QuestionType.findMany({
    orderBy: {
      // Specify the column and the order (asc for ascending)
      question_type_id: 'asc'
    },
  })
  
  const Allclasses = classes.map((data)=>({
    class_id:data.class_id,
    ClassName:data.Class.ClassName,
  }))

  
  const Allsubjects = classes.map((data)=>({
    subject_id:data.subject_id,
    SubjectName:data.Subject.SubjectName,
  }))

  const Alltypes = types.map((data)=>({
    question_type_id:data.question_type_id,
    questiontypeName:data.questiontypeName,
  }))
  console.log(Alltypes)
  return {
    props: {
      Allclasses,
      Alltypes,
      Allsubjects,
      teacherId,
    }, // will be passed to the page component as props
  }
}

export default function Add({Allclasses,Alltypes,Allsubjects,teacherId}) {
  console.log(Allclasses)
  const router = useRouter();
  function handleChange(newValue) {
      setselected(newValue);
  }
  const { status, data } = useSession();
  return (
    <React.Fragment>
      <MainHeader title="MatricMate : Add Question" />
      <div className="flex bg-[#e6e6e6] w-full h-full pt-10">
        <VerticalNavbar onChange={handleChange} data={data} />
        <div className="w-full pt-20">
          <AddQuestion Allclasses={Allclasses} Alltypes={Alltypes} Allsubjects={Allsubjects} teacherId={teacherId} />
        </div>
      </div>
    </React.Fragment>
  );
};