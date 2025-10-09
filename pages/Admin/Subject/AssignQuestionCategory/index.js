import React from "react";
import { useState,useEffect, useContext} from 'react'
import { prisma } from '../../../../util/db.server.js'
import { AddAsign } from "../../../../components/Admin/subjects/AssignQuestionCategory/AddAsign";
import { DisplayAssign} from "../../../../components/Admin/subjects/AssignQuestionCategory/DisplayAssign";
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

  const subjects = await prisma.Subject.findMany({
    orderBy : {ModifiedDate:'desc'},
    include:{
      User:{
        select:{
          UserName:true
        }
      }
      
    }
    
  });
  
  const Allsubjects = subjects.map((data)=>({
      subject_id:data.subject_id,
      SubjectName:data.SubjectName,
      CreatedDate:data.CreatedDate,
      ModifiedDate:data.ModifiedDate,
      User:data.User?.UserName,
  }))

  const questioncategory = await prisma.QuestionCategory.findMany({
    orderBy : {ModifiedDate:'desc'},
    include:{
      User:{
        select:{
          UserName:true
        }
      }
      
    }
    
  });

  const Allquestioncategory = questioncategory.map((data)=>({
      question_category_id:data.question_category_id,
      questioncategoryName:data.questioncategoryName,
      CreatedDate:data.CreatedDate,
      ModifiedDate:data.ModifiedDate,
      User:data.User?.UserName,
  }))

  const subjectquestioncategory = await prisma.SubjectQuestionCategory.findMany({
    orderBy : {ModifiedDate:'desc'},
    include:{
      Subject:{
        select:{
          SubjectName:true
        }
      },

      QuestionCategory:{
        select:{
          questioncategoryName:true
        }
      },

      Subject:{
        select:{
          SubjectName:true
        }
      },
    },
  });

  const allsubjectquestioncategory = subjectquestioncategory.map((data)=>({
      subject_category_id:data.subject_category_id,
      question_category_id:data.question_category_id,
      subject_id:data.subject_id,
      CreatedDate:data.CreatedDate,
      ModifiedDate:data.ModifiedDate,
      SubjectName:data.Subject.SubjectName,
      questioncategoryName:data.QuestionCategory.questioncategoryName,
  }))

  return{
    props:{
      subjects:JSON.parse(JSON.stringify(Allsubjects)),
      questioncategory:JSON.parse(JSON.stringify(Allquestioncategory)),
      subjectquestioncategory:JSON.parse(JSON.stringify(allsubjectquestioncategory)),
      
    }
  }
}

export default function AssignTeacher({questioncategory,subjects,subjectquestioncategory}) {
    const { status, data } = useSession();
    return (
    	<React.Fragment>
      		<MainHeader title="Assign Subjects and Question Category Dashboard" />
      		<section className="flex flex-col w-full h-full bg-[#e6e6e6] pt-10">
				    <div className='w-full h-full flex flex-row'>
		        	<VerticalNavbar data={data} />
		        	<div className="w-full">
            			<AddAsign questioncategory={questioncategory} subjects={subjects} />
            			<DisplayAssign subjectquestioncategory={subjectquestioncategory} questioncategory={questioncategory} subjects={subjects} />
        			</div>
		        </div> 
			     </section>
      	</React.Fragment>
        
    );
}
