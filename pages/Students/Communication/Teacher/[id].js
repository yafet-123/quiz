import React,{ useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { MainHeader } from '../../../../components/common/MainHeader';
import { VerticalNavbar } from "../../../../components/Students/VerticalNavbar";
import Multiselect from 'multiselect-react-dropdown';
import { getSession } from "next-auth/react";
import { prisma } from '../../../../util/db.server.js'
import Display from '../../../../components/Students/Communication/Display'
import Teachers from '../../../../components/Students/Communication/Teachers'

export async function getServerSideProps(context) {
  const {params,req,res,query} = context
   const id = query.id;
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
  const studentId = session.user.user_id
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
  if (student === null) {
    return {
      redirect: {
        destination: '/auth/error',
        permanent: false,
      },
    };
  }

  const communications = await prisma.CommunicationRelation.findMany({
    where: {
      AND: [
        { students_id: Number(student.students_id)},
        { teacher_id: Number(id) }, // Add more fields and values as needed
      ],
      
    },
    orderBy: {
      CreatedDate:"asc"
    },
    include: {
      Communication: {
        select: {
          communication_id:true,
          title: true,
          content: true,
          isStudent:true
        },
      },
      Class:{
        select:{
          ClassName:true
        }
      },
      Students:{
        select:{
          email:true
        }
      },
      Teacher:{
        select:{
          firstName:true,
          lastName:true,
          email:true
        }
      }
    },
  });

  const Allcommunications = communications.map((data)=>({
    communication_relation_id:data.communication_relation_id,
    students_id:data.students_id,
    isStudent: data.Communication.isStudent,
    class_id:data.class_id,
    title: data.Communication.title,
    communication_id:data.Communication.communication_id,
    content:data.Communication.content,
    teacher_id:data.teacher_id,
    email:data.Teacher.email,
    studentemail:data.Students.email,
    name:data.Teacher.firstName + " " + data.Teacher.lastName,
    ClassName:data.Class ? data.Class.ClassName : null,
    ModifiedDate: data.ModifiedDate.toISOString()
  }))

  return {
    props: {
      Allcommunications,
      teacherId:id,
      studentId,
      student:student.email
    
    }, // will be passed to the page component as props
  }
}

const StudentDisplay = ({Allcommunications,teacherId, studentId, student}) => {
  console.log(student)
  return (
    <React.Fragment>
      <MainHeader title="MatricMate : Communication" />
      <div className="flex bg-[#e6e6e6] w-full h-full pt-10">
        <VerticalNavbar />
        <div className="w-full flex flex-col pt-20">
          <Display Allcommunications={Allcommunications} teacherId={teacherId} studentId={studentId} student={student} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default StudentDisplay;
