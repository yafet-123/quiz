import React from "react";
import { useState,useEffect, useContext} from 'react'
import { prisma } from '../../../../util/db.server.js'
import { AddAsign } from "../../../../components/Admin/classes/AssignSubject/AddAsign";
import {DisplayAssign} from "../../../../components/Admin/classes/AssignSubject/DisplayAssign";
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

  const assignclasssubject = await prisma.ClassSubject.findMany({
    orderBy : {ModifiedDate:'desc'},
    include:{
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

  const allasign = assignclasssubject.map((data)=>({
      class_subject_id:data.class_subject_id,
      subject_id:data.subject_id,
      class_id:data.class_id,
      CreatedDate:data.CreatedDate,
      ModifiedDate:data.ModifiedDate,
      ClassName:data.Class.ClassName,
      SubjectName:data.Subject.SubjectName,

  }))

  return{
    props:{
      subjectes:JSON.parse(JSON.stringify(Allsujectes)),
      classes:JSON.parse(JSON.stringify(Allclasses)),
      allasign:JSON.parse(JSON.stringify(allasign)),
      
    }
  }
}

export default function AssignTeacher({subjectes,classes,allasign}) {
    const { status, data } = useSession();
    return (
    	<React.Fragment>
      		<MainHeader title="Assign Class and subject Dashboard" />
      		<section className="flex flex-col w-full h-full bg-[#e6e6e6] pt-10">
				    <div className='w-full h-full flex flex-row'>
		        	<VerticalNavbar data={data} />
		        	<div className="w-full">
            			<AddAsign subjectes={subjectes} classes={classes} /> 
            			<DisplayAssign allasign={allasign} subjectes={subjectes} classes={classes} />
        			</div>
		        </div> 
			     </section>
      	</React.Fragment>
        
    );
}
