import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { prisma } from '../../../../../util/db.server.js'
import { getSession } from "next-auth/react";
import { MainHeader } from '../../../../../components/common/MainHeader';
import { VerticalNavbar } from "../../../../../components/Teacher/VerticalNavbar";
import { useSession } from "next-auth/react";

export async function getServerSideProps(context) {
  const {params,req,res,query} = context
  const id = query.subjectId
  const session = await getSession(context);
  const userRole = await session?.user?.role
  if (userRole !== 'teacher') {
    return {
      redirect: {
        destination: '/auth/Teacher/Login/signin-teacher', // Redirect to the error page for unauthorized access
        permanent: false,
      },
    };
  }
  
  const teacher = await prisma.Teacher.findUnique({
    where:{ teacher_id: Number(session.user.user_id) },
    
  });

  if (teacher === null) {
    return {
      redirect: {
        destination: '/auth/error',
        permanent: false,
      },
    };
  }
  const allSubjects = await prisma.Subject.findMany({
    where: {
      subject_id: Number(id),
    }
  });
  
  const subjects = allSubjects.map((data)=>({
     subject_id: data.subject_id,
     SubjectName: data.SubjectName
  }))

  return {
    props: {
      subjects,
    }, // will be passed to the page component as props
  }
}

export default function Subjects({subjects}) {
  console.log(subjects)
  const router = useRouter();
  const classId = router.query.classId;
  console.log(classId)
  function handleChange(newValue) {
      setselected(newValue);
  }
  const { status, data } = useSession();
  const handleSubject = (id) => {
    router.push(`/Teacher/Display/Marks/Mark/?subjectId=${id}&classId=${classId}`);
  };
  return (
    <React.Fragment>
      <MainHeader title="MatricMate : Student SUbject" />
      <div className="flex bg-[#e6e6e6] w-full h-full pt-10">
        <VerticalNavbar onChange={handleChange} data={data} />
        <div className="w-full pt-20">
          <div className="py-10 px-5 lg:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
            {subjects.map((data,index)=>(
              <button 
                key={index}
                onClick={() => handleSubject(data.subject_id)} 
                className="py-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent px-5 py-16 text-white font-bold text-xl lg:text-3xl rounded-lg"
              >
                {data.SubjectName}
              </button>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};