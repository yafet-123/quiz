import { VerticalNavbar } from "../../components/Teacher/VerticalNavbar";
import { useSession } from "next-auth/react";
import { useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import { MainHeader } from '../../components/common/MainHeader';
import React from 'react'
import { prisma } from '../../util/db.server.js'
import { getSession } from "next-auth/react";
import MyCalendar from '../../components/common/MyCalendar' 
import TodoList from '../../components/Students/TodoList'
import Profile from '../../components/Teacher/Profile'

export async function getServerSideProps(context){
  const serverdate = new Date();
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

  const teacherId = teacher.teacher_id

  const Allteachers = {
    teacher_id: teacher.teacher_id,
    firstName: teacher.firstName,
    lastName: teacher.lastName,
    age: teacher.age,
    UserName: teacher.UserName,
    email: teacher.email,
  };

  return {
    props: {
      Allteachers
    },
  };
}

export default function Teacher({serverdate, Allteachers}){
  function handleChange(newValue) {
      setselected(newValue);
  }
  const { status, data } = useSession();
  return (
    <React.Fragment>
      <MainHeader title="MatricMate : Teacher" />
      <div className="flex bg-[#e6e6e6] pt-10">
        <VerticalNavbar onChange={handleChange} data={data} />
        <div className="w-full pt-20">
          <div className="flex flex-col lg:flex-row justify-between items-center px-5 lg:px-10 mb-5">
            <Profile Allteachers={Allteachers} />
            <MyCalendar serverdate={serverdate} />
          </div>
        </div>
      </div>
    </React.Fragment>  );

}

