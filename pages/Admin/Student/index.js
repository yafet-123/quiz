import React from "react";
import { useState,useEffect, useContext} from 'react'
import { prisma } from '../../../util/db.server.js'
import AddStudent from "../../../components/Admin/student/AddStudent";
import { DisplayStudent} from "../../../components/Admin/student/DisplayStudent";
import { useSession } from "next-auth/react";
import { VerticalNavbar } from "../../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../../components/common/MainHeader';
import { getSession } from "next-auth/react";

export async function getServerSideProps(context){
  const session = await getSession(context);
  const serverdate = new Date();     
  const userRole = session?.user?.role;
  if (userRole !== 'admin') {
    return {
      redirect: {
        destination: '/auth/Admin/Login/signin-user',
        permanent: false,
      },
    };
  }
  
  const students = await prisma.Student.findMany({orderBy : {enrolledAt:'desc'}});
  const Allstudents = students.map((data)=>({
      user_id:data.id,
      name: data.name,
      gradeLevel: data.gradeLevel,
      schoolName: data.schoolName,
      dateOfBirth: data.dateOfBirth,
      email:data.email,
      gender:data.gender,
      enrolledAt:data.enrolledAt,
      updatedAt:data.updatedAt,
  }))
  console.log(students)
  return{
    props:{
      students:JSON.parse(JSON.stringify(Allstudents)),
    }
  }
}

export default function Student({students}) {
    const { status, data } = useSession();
    return (
      <React.Fragment>
        <MainHeader title="User Dashboard" />
        <section className="flex flex-col w-full h-full bg-[#e6e6e6] pt-10">
          <div className='w-full h-full flex flex-row'>
            <VerticalNavbar data={data} />
            <div className="w-full lg:px-6">
              <AddStudent />
              <DisplayStudent students={students} />
            </div>
          </div>
        </section>
      </React.Fragment>
    );
}