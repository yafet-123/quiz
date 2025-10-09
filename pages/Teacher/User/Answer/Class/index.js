import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { prisma } from '../../../../../util/db.server.js'
import { getSession } from "next-auth/react";
import { MainHeader } from '../../../../../components/common/MainHeader';
import { VerticalNavbar } from "../../../../../components/Teacher/VerticalNavbar";
import ClassList from '../../../../../components/Teacher/UserAnswer/Class/ClassList'
import { useSession } from "next-auth/react";

export async function getServerSideProps(context) {
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

  console.log(teacher)
  if (teacher === null) {
    return {
      redirect: {
        destination: '/auth/error',
        permanent: false,
      },
    };
  }
  const teacherClass = await prisma.ClassTeacher.findMany({
    where: {
      // Specify your conditions here
      teacher_id: Number(teacher.teacher_id),
    },
    orderBy: {
      class_id:"asc"
    },
    include: {
      Class: {
        select: {
          class_id: true,
          ClassName: true,
        },
      },
    },
  });
  console.log(teacherClass)
  
  const classes = teacherClass.map((data)=>({
     teacher_class_id: data.teacher_class_id,
     class_id: data.Class.class_id,
     subject_id: data.subject_id,
     className: data.Class.ClassName
  }))

  return {
    props: {
      classes,
    }, // will be passed to the page component as props
  }
}

export default function Class({classes}) {
  console.log(classes)
  const router = useRouter();
  function handleChange(newValue) {
      setselected(newValue);
  }
  const { status, data } = useSession();
  return (
    <React.Fragment>
      <MainHeader title="MatricMate : Teacher Class" />
      <div className="flex bg-[#e6e6e6] w-full h-full pt-10">
        <VerticalNavbar onChange={handleChange} data={data} />
        <div className="w-full pt-20">
          <ClassList classes={classes} />
        </div>
      </div>
    </React.Fragment>
  );
};