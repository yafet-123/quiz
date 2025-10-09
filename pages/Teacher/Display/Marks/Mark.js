import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { prisma } from '../../../../util/db.server.js'
import { getSession } from "next-auth/react";
import { MainHeader } from '../../../../components/common/MainHeader';
import { VerticalNavbar } from "../../../../components/Teacher/VerticalNavbar";
import ClassList from '../../../../components/Teacher/Class/ClassList'
import DisplayMarks from '../../../../components/Teacher/Display/DisplayMarks'
import { useSession } from "next-auth/react";
import React, { useState } from 'react';

export async function getServerSideProps(context) {
  const {params,req,res,query} = context
  const classId = query.classId;
  const SubjectId = query.subjectId
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


  const marks = await prisma.Mark.findMany({
      where:{
        AND: [
          {subject_id: Number(SubjectId),},
        ]
      },
      orderBy: {
        // Specify the column and the order (asc for ascending)
        students_id: 'asc'
      },
    })
  
  const students = await prisma.Students.findMany({
    where:{
      class_id: Number(classId),
    },
  })

  const questiontype = await prisma.QuestionType.findMany({
    orderBy: {
      // Specify the column and the order (asc for ascending)
      question_type_id: 'asc'
    },
  })

  const studentsByClass = students.map((data)=>({
    students_id: data.students_id,
    UserName:data.UserName
  }))

  const questiontypes = questiontype.map((data)=>({
    question_type_id: data.question_type_id,
    questiontypeName:data.questiontypeName
  }))

  const marksArray = [];

  
  marks.forEach((mark) => {
    const { students_id, question_type_id, mark: studentMark } = mark;

    // Check if the student's index exists in the array
    if (!marksArray[students_id]) {
      marksArray[students_id] = [];
    }

    // Assign the mark to the corresponding question_type_id
    marksArray[students_id][question_type_id] = studentMark;
  });

  console.log(marks)
  return {
    props: {
      questiontype:questiontypes,
      studentsByClass,
      marks: marksArray
    }, // will be passed to the page component as props
  }
}

const Display = ({questiontype,studentsByClass, marks}) => {
  const { status, data } = useSession();
  return (
    <React.Fragment>
      <MainHeader title="MatricMate : Teacher" />
      <div className="flex bg-[#e6e6e6] pt-5">
        <VerticalNavbar data={data} />
        <DisplayMarks questiontype={questiontype} studentsByClass={studentsByClass} marks={marks} />
      </div>
    </React.Fragment>
  );
};

export default Display;