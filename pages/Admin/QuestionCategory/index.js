import React from "react";
import { useState,useEffect, useContext} from 'react'
import { prisma } from '../../../util/db.server.js'
import { AddQuestionCategory } from "../../../components/Admin/QuestionCategory/AddQuestionCategory";
import {DisplayQuestionCategory } from "../../../components/Admin/QuestionCategory/DisplayQuestionCategory";
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
  
  const QuestionCategory = await prisma.QuestionCategory.findMany({
    orderBy : {ModifiedDate:'desc'},
    include:{
      User:{
        select:{
          UserName:true
        }
      }
      
    }
    
  });
   
  const AllQuestionCategory = QuestionCategory.map((data)=>({
      question_category_id:data.question_category_id,
      questioncategoryName:data.questioncategoryName,
      CreatedDate:data.CreatedDate,
      ModifiedDate:data.ModifiedDate,
      User:data.Use?.UserName,
  }))
  return{
    props:{
      QuestionCategory:JSON.parse(JSON.stringify(AllQuestionCategory)),
    }
  }
}

export default function QuestionCategorys({QuestionCategory}) {
    const { status, data } = useSession();
    return (
    	<React.Fragment>
      		<MainHeader title="Question Category Dashboard" />
      		<section className="flex flex-col w-full h-full bg-[#e6e6e6] pt-10">
				    <div className='w-full h-full flex flex-row'>
		        	<VerticalNavbar data={data} />
		        	<div className="w-full">
            			<AddQuestionCategory />
            			<DisplayQuestionCategory QuestionCategory={QuestionCategory} />
        			</div>
		        </div> 
			     </section>
      	</React.Fragment>
        
    );
}
