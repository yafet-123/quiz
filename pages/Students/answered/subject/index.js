import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { prisma } from '../../../../util/db.server.js'
import { getSession } from "next-auth/react";
import { MainHeader } from '../../../../components/common/MainHeader';
import { VerticalNavbar } from "../../../../components/Students/VerticalNavbar";
import SubjectList from '../../../../components/Students/answered/subject/SubjectList'
import { useSession } from "next-auth/react";
export async function getServerSideProps(context) {
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

  const studentsubject = await prisma.classSubject.findMany({
    where: {
      // Specify your conditions here
      class_id: Number(student.class_id),
    },
    include: {
      Subject: {
        select: {
          subject_id: true,
          SubjectName: true,
        },
      },
    },
  });
  console.log(studentsubject)
  
  const subjects = studentsubject.map((data)=>({
     class_subject_id: data.class_subject_id,
     subject_id: data.Subject.subject_id,
     SubjectName: data.Subject.SubjectName
  }))

  return {
    props: {
      subjects,
    }, // will be passed to the page component as props
  }
}

export default function Subjects({subjects}) {
  console.log(subjects)
  const router = useRouter();
  function handleChange(newValue) {
      setselected(newValue);
  }
  const { status, data } = useSession();
  return (
    <React.Fragment>
      <MainHeader title="MatricMate : Student SUbject" />
      <div className="flex bg-[#e6e6e6] w-full h-full pt-10">
        <VerticalNavbar onChange={handleChange} data={data} />
        <div className="w-full pt-20">
          <SubjectList subjects={subjects} />
        </div>
      </div>
    </React.Fragment>
  );
};