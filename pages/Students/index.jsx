import { VerticalNavbar } from "../../components/student/VerticalNavbar";
import DashBoard from "../../components/student/DashBoard";
import { useSession } from "next-auth/react";
import { useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import { MainHeader } from '../../components/common/MainHeader';
import React from 'react'
import { prisma } from '../../util/db.server.js'
import { getSession } from "next-auth/react";

import MyCalendar from '../../components/student/MyCalendar' 
import TodoList from '../../components/student/TodoList'
import Profile from '../../components/student/Profile'
import Announcements from '../../components/student/Announcements'

export async function getServerSideProps(context){
  const serverdate = new Date();
  const session = await getSession(context);
  const userRole = session?.user?.role;
   if (userRole !== 'student') {
     return {
       redirect: {
         destination: '/auth/Student/Login/signin-student',
         permanent: false,
       },
     };
   }
   console.log(session)
  const student = await prisma.Student.findUnique({
    where:{ name: session.user.name },
  });

  const studentId = student.id

  console.log(student)
  if (student === null) {
    return {
      redirect: {
        destination: '/auth/error',
        permanent: false,
      },
    };
  }

  const Allstudents = {
  students_id: student.id,
  name: student.name,
  schoolName: student.schoolName,
  dateOfBirth: student.dateOfBirth ? student.dateOfBirth.toISOString() : null,
  gender: student.gender,
  email: student.email,
};


  const announcements = await prisma.Announcement.findMany({
    orderBy:{
      createdAt:'desc'
    },
    include:{
      author:{
        select:{
          name:true
        }
      }
    }
  });

  const Allannouncements = announcements.map((data)=>({
    id:data.id,
    title:data.title,
    content:data.content,
    teacherName: data.author.name,
    createdAt: data.createdAt.toISOString()
  }))
  return{
    props:{
      Allannouncements,
      Allstudents,
      serverdate,
      studentId
    }
  }
}

export default function Students({Allannouncements, serverdate, Allstudents, studentId}){
  function handleChange(newValue) {
      setselected(newValue);
  }
  const { status, data } = useSession();
  return (
    <React.Fragment>
      <MainHeader title="MatricMate : Admin" />
      <div className="flex bg-[#e6e6e6] pt-10">
        <VerticalNavbar onChange={handleChange} data={data} />
        <div className="w-full">
          <div className="flex flex-col lg:flex-row justify-between items-center px-0 lg:px-10 mb-5">
            <Profile Allstudents={Allstudents} />
            <MyCalendar serverdate={serverdate} />
          </div>
          <div className="flex flex-col lg:flex-row justify-between px-2 lg:px-10 mb-5">
            <TodoList tasks={tasks} studentId={studentId} />
            <Announcements announcements={announcements} />
          </div>
        </div>
      </div>
    </React.Fragment>  );

}

