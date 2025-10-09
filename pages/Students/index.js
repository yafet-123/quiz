import { VerticalNavbar } from "../../components/Students/VerticalNavbar";
import { useSession } from "next-auth/react";
import { useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import { MainHeader } from '../../components/common/MainHeader';
import React from 'react'
import { prisma } from '../../util/db.server.js'
import MyCalendar from '../../components/common/MyCalendar' 
import TodoList from '../../components/Students/TodoList'
import Profile from '../../components/Students/Profile'
import Announcements from '../../components/Students/Announcements'
import { getSession } from "next-auth/react";
import Moment from 'react-moment';

export async function getServerSideProps(context){
  const serverdate = new Date();
  const session = await getSession(context);
  const userRole = await session?.user?.role
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
    include:{
      Class:{
        select:{
          ClassName:true
        }
      }
    }
  });
  console.log(student)
  if (student === null) {
    return {
      redirect: {
        destination: '/auth/error',
        permanent: false,
      },
    };
  }

  const studentId = student.students_id

  const tasks = await prisma.Task.findMany({
    where:{
      students_id: Number(student.students_id)
    }
  });

  const announcements = await prisma.Announcement.findMany({
    where: {
      ClassAnnouncement: {
        some: {
          class_id: Number(student.class_id),
        },
      },
    },
    orderBy:{
      ModifiedDate:'desc'
    },
    include:{
      teacher:{
        select:{
          UserName:true
        }
      }
    }
  });

  const Allannouncements = announcements.map((data)=>({
    announcement_id:data.announcement_id,
    title:data.title,
    content:data.content,
    teacherName: data.teacher.UserName,
    ModifiedDate: data.ModifiedDate.toISOString()
  }))

  const Alltasks = tasks.map((data)=>({
    id: data.id,
    text:data.text,
    completed:data.completed,
    students_id:data.students_id,
  }))

  const Allstudents = {
    students_id: student.students_id,
    firstName: student.firstName,
    lastName: student.lastName,
    age: student.age,
    UserName: student.UserName,
    email: student.email,
    ClassName: student.Class.ClassName
  };

  console.log(Allannouncements)
  return {
    props: {
      tasks:Alltasks,
      studentId,
      announcements:Allannouncements,
      Allstudents
    },
  };
}
 
export default function Admin({serverdate, tasks, studentId, Allstudents, announcements}){
  function handleChange(newValue) {
      setselected(newValue);
  }
  const { status, data } = useSession();
  return (
    <React.Fragment>
      <MainHeader title="MatricMate : Students" />
      <div className="flex bg-[#e6e6e6] pt-10 w-full">
        <VerticalNavbar onChange={handleChange} data={data} />
        <div className="w-full pt-20">
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

