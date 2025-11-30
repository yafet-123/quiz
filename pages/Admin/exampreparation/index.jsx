import React from "react";
import { useSession, getSession } from "next-auth/react";
import { prisma } from '../../../util/db.server.js';
import { VerticalNavbar } from "../../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../../components/common/MainHeader';
import { AddExamPreparation } from "../../../components/Admin/ExamPreparation/AddExamPreparation";
import { DisplayExamPreparations } from "../../../components/Admin/ExamPreparation/DisplayExamPreparations";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const userRole = session?.user?.role;

  // Optionally redirect non-admins
  if (userRole !== 'admin') {
    return {
      redirect: {
        destination: '/auth/Admin/Login/signin-user',
        permanent: false,
      },
    };
  }

  // Fetch all subjects with exam preparations and topics
  const subjects = await prisma.Subject.findMany({
    include: {
      ExamPreparation: {
        include: {
          topics: true, // ExamPreparationTopic
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // Map for easier client-side rendering
  const formattedSubjects = subjects.map(sub => ({
    id: sub.id,
    name: sub.name,
    description: sub.description,
    ExamPreparation: sub.ExamPreparation.map(exam => ({
      id: exam.id,
      nameOfBook: exam.nameOfBook,
      bookFile: exam.bookFile,
      topics: exam.topics.map(topic => ({
        id: topic.id,
        title: topic.title,
      })),
    })),
  }));

  return {
    props: {
      subjects: JSON.parse(JSON.stringify(formattedSubjects)),
    },
  };
}

export default function ExamPreparationPage({ subjects }) {
  const { data } = useSession();

  return (
    <React.Fragment>
      <MainHeader title="Exam Preparation Dashboard" />
      <section className="flex flex-col w-full h-full bg-[#e6e6e6] pt-10">
        <div className='w-full h-full flex flex-row'>
          <VerticalNavbar data={data} />
          <div className="w-full px-6">
            {/* Add Exam Preparation Form */}
            <AddExamPreparation subjects={subjects} />

            {/* Display Existing Exam Preparations */}
            <DisplayExamPreparations subjects={subjects} />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
