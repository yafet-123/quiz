import React from "react";
import { useState,useEffect, useContext} from 'react'
import { prisma } from '../../../util/db.server.js'
import { AddTeacher } from "../../../components/Admin/Teacher/AddTeacher";
import {DisplayTeacher} from "../../../components/Admin/Teacher/DisplayTeacher";
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
  
  const teachers = await prisma.Teacher.findMany({
    orderBy : {ModifiedDate:'desc'},
    include:{
      User:{
        select:{
          UserName:true
        }
      }
    },
  });
  console.log(teachers)
  const Allteachers = teachers.map((data)=>({
      teacher_id:data.teacher_id,
      email:data.email,
      role:data.role,
      CreatedDate:data.CreatedDate,
      ModifiedDate:data.ModifiedDate,
      UserName:data.UserName
  }))

  return{
    props:{
      teachers:JSON.parse(JSON.stringify(Allteachers)),
    }
  }
}

export default function Teacher({teachers}) {
    const { status, data } = useSession();
    return (
    	<React.Fragment>
      		<MainHeader title="Teacher Dashboard" />
      		<section className="flex flex-col w-full h-full bg-[#e6e6e6] pt-10">
				    <div className='w-full h-full flex flex-row'>
		        	<VerticalNavbar data={data} />
		        	<div className="w-full">
            			<AddTeacher />
            			<DisplayTeacher teachers={teachers} />
        			</div>
		        </div> 
			     </section>
      	</React.Fragment>
        
    );
}
