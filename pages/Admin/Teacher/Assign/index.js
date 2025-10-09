import React from "react";
import { useState,useEffect, useContext} from 'react'
import { prisma } from '../../../../util/db.server.js'
import { AddAsign } from "../../../../components/Admin/Teacher/AssignTeacher/AddAsign";
import {DisplayAssign} from "../../../../components/Admin/Teacher/AssignTeacher/DisplayAssign";
import { useSession } from "next-auth/react";
import { VerticalNavbar } from "../../../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../../../components/common/MainHeader';
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

  const classes = await prisma.Class.findMany({
    orderBy : {ModifiedDate:'desc'},
    include:{
      User:{
        select:{
          UserName:true
        }
      }
      
    }
    
  });
  
  const Allclasses = classes.map((data)=>({
      class_id:data.class_id,
      ClassName:data.ClassName,
      CreatedDate:data.CreatedDate,
      ModifiedDate:data.ModifiedDate,
      User:data.User.UserName,
  }))

  const subjectes = await prisma.Subject.findMany({
    orderBy : {ModifiedDate:'desc'},
    include:{
      User:{
        select:{
          UserName:true
        }
      }
      
    }
    
  });

  const Allsujectes = subjectes.map((data)=>({
      subject_id:data.subject_id,
      SubjectName:data.SubjectName,
      CreatedDate:data.CreatedDate,
      ModifiedDate:data.ModifiedDate,
      User:data.User?.UserName,
  }))

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

  const assignclass = await prisma.ClassTeacher.findMany({
    orderBy : {ModifiedDate:'desc'},
    include:{
      Teacher:{
        select:{
          UserName:true
        }
      },

      Class:{
        select:{
          ClassName:true
        }
      },

      Subject:{
        select:{
          SubjectName:true
        }
      }
    },
  });
  console.log(assignclass)

  const allasign = assignclass.map((data)=>({
      teacher_class_id:data.teacher_class_id,
      teacher_id:data.teacher_id,
      subject_id:data.subject_id,
      class_id:data.class_id,
      CreatedDate:data.CreatedDate,
      ModifiedDate:data.ModifiedDate,
      UserName:data.Teacher.UserName,
      ClassName:data.Class.ClassName,
      SubjectName:data.Subject.SubjectName,

  }))

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
      subjectes:JSON.parse(JSON.stringify(Allsujectes)),
      classes:JSON.parse(JSON.stringify(Allclasses)),
      asignteacher:JSON.parse(JSON.stringify(allasign)),
      
    }
  }
}

export default function AssignTeacher({teachers,subjectes,classes,asignteacher}) {
    const { status, data } = useSession();
    return (
    	<React.Fragment>
      		<MainHeader title="Assign Teacher Dashboard" />
      		<section className="flex flex-col w-full h-full bg-[#e6e6e6] pt-10">
				    <div className='w-full h-full flex flex-row'>
		        	<VerticalNavbar data={data} />
		        	<div className="w-full">
            			<AddAsign teachers={teachers} subjectes={subjectes} classes={classes} />
            			<DisplayAssign asignteacher={asignteacher} teachers={teachers} subjectes={subjectes} classes={classes} />
        			</div>
		        </div> 
			     </section>
      	</React.Fragment>
        
    );
}
