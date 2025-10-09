import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { prisma } from '../../../../util/db.server.js'
import { getSession } from "next-auth/react";
import { MainHeader } from '../../../../components/common/MainHeader';
import { VerticalNavbar } from "../../../../components/Teacher/VerticalNavbar";
import {AddAnnouncement} from '../../../../components/Teacher/AddAnnouncement'
import {DisplayAnnouncement} from '../../../../components/Teacher/DisplayAnnouncement'
import { useSession } from "next-auth/react";
   
export async function getServerSideProps(context) {
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
  const teacherId = session.user.user_id;
  const teacher = await prisma.Teacher.findUnique({
    where:{ teacher_id: Number(session.user.user_id) },
    
  });

  console.log(teacher)
  if (teacher === null) {
    return {
      redirect: {
        destination: '/auth/error',
        permanent: false,
      },
    };
  }

  const classes = await prisma.ClassTeacher.findMany({
    where:{
      teacher_id:Number(teacher.teacher_id)
    },
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
      },
    },
    orderBy: {
      // Specify the column and the order (asc for ascending)
      class_id: 'asc'
    },
  })

  const Allclasses = classes.map((data)=>({
    class_id:data.class_id,
    ClassName:data.Class.ClassName,
  }))

  const classAnnouncements = await prisma.classAnnouncement.findMany({
    include: {
      Announcement: true,
      Class: true,
    },
  });


  const announcements = await prisma.Announcement.findMany({
    where: {
      teacher_id: Number(teacher.teacher_id),
    },
    include:{
      ClassAnnouncement: {
        include: {
          Class: {
            select: {
              class_id: true,
              ClassName: true,
            },
          },
        },
      },
    }

  })

  const Allannouncements = announcements.map((announcement) => {
  const associatedClassAnnouncements = classAnnouncements.filter(
    (classAnnouncement) => classAnnouncement.announcement_id === announcement.announcement_id
  );

  const classDetails = associatedClassAnnouncements.map((classAnnouncement) => ({
    class_id: classAnnouncement.Class.class_id,
    class_name: classAnnouncement.Class.ClassName,
  }));

  return {
    announcement_id: announcement.announcement_id,
    title: announcement.title,
    content: announcement.content,
    classDetails,
  };
});

console.log(Allannouncements);

  return {
    props: {
      Allclasses,
      teacherId,
      Allannouncements
    }, // will be passed to the page component as props
  }
}

export default function Add({Allclasses,teacherId,Allannouncements}) {
  const router = useRouter();
  function handleChange(newValue) {
      setselected(newValue);
  }
  const { status, data } = useSession();
  return (
    <React.Fragment>
      <MainHeader title="MatricMate : Add Announcement" />
      <div className="flex bg-[#e6e6e6]  w-full h-full pt-10">
        <VerticalNavbar onChange={handleChange} data={data} />
        <div className="w-full flex flex-col pt-20">
          <AddAnnouncement Allclasses={Allclasses} teacherId={teacherId} />
          <DisplayAnnouncement Allannouncements={Allannouncements} Allclasses={Allclasses} />
        </div>
      </div>
    </React.Fragment>
  );
};