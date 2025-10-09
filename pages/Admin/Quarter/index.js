import React from "react";
import { useState,useEffect, useContext} from 'react'
import { prisma } from '../../../util/db.server.js'
import { AddQuarter } from "../../../components/Admin/quarter/AddQuarter";
import {DisplayQuarter } from "../../../components/Admin/quarter/DisplayQuarter";
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
  
  const quarter = await prisma.Quarter.findMany({
    orderBy : {ModifiedDate:'desc'},
    include:{
      User:{
        select:{
          UserName:true
        }
      }
      
    }
    
  });
  console.log(quarter)
  const Allquarter = quarter.map((data)=>({
      quarter_id:data.quarter_id,
      quarterName:data.quarterName,
      CreatedDate:data.CreatedDate,
      ModifiedDate:data.ModifiedDate,
      User:data.User?.UserName,
  }))
  return{
    props:{
      quarter:JSON.parse(JSON.stringify(Allquarter)),
    }
  }
}

export default function Subjects({quarter}) {
    const { status, data } = useSession();
    return (
    	<React.Fragment>
      		<MainHeader title="Quarter Dashboard" />
      		<section className="flex flex-col w-full h-full bg-[#e6e6e6] pt-10">
				    <div className='w-full h-full flex flex-row'>
		        	<VerticalNavbar data={data} />
		        	<div className="w-full">
            			<AddQuarter />
            			<DisplayQuarter quarter={quarter} />
        			</div>
		        </div> 
			     </section>
      	</React.Fragment>
        
    );
}
