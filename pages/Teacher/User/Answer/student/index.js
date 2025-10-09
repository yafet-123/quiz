import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { prisma } from '../../../../../util/db.server.js'
import { getSession } from "next-auth/react";
import { MainHeader } from '../../../../../components/common/MainHeader';
import { VerticalNavbar } from "../../../../../components/Teacher/VerticalNavbar";
import Studentlist from '../../../../../components/Teacher/UserAnswer/Studentlist'
import { useSession } from "next-auth/react";

export async function getServerSideProps(context) {
  const {params,req,res,query} = context
  const classId = query.classId
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
  const classes = await prisma.Class.findUnique({
    where:{
      class_id: Number(classId)
    }
  })

  const students = await prisma.Students.findMany({
    where: {
      class_id: Number(classId),
    },
    orderBy: {
      UserName:"asc"
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
  const ClassName = classes.ClassName
  console.log(students)
  const Allstudents = students.map((data)=>({
     students_id: data.students_id,
     UserName: data.UserName,
     firstName: data.firstName,
     lastName: data.lastName,
     class_id: data.Class.class_id
  }))
  console.log(Allstudents)
  return {
    props: {
      Allstudents,
      ClassName
    }, // will be passed to the page component as props
  }
}

export default function Students({Allstudents, ClassName}) {
  const router = useRouter();
  function handleChange(newValue) {
      setselected(newValue);
  }
  const { status, data } = useSession();
  return (
    <React.Fragment>
      <MainHeader title="MatricMate : Teacher Student" />
      <div className="flex bg-[#e6e6e6] w-full h-full pt-10">
        <VerticalNavbar onChange={handleChange} data={data} />
        <div className="w-full pt-20">
          {Allstudents.length == 0 ? (
            <div className="bg-[#E6E6E6] w-full px-2 lg:px-10 h-full py-20">
              <p className="text-center font-bold text-[#00225F] text-3xl md:text-4xl lg:text-5xl pt-10 mb-5">Sorry No students Are Found in {ClassName}.</p>
            </div>
          ) : (
            <Studentlist Allstudents={Allstudents} />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};