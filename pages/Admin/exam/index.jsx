import React from "react";
import { useSession, getSession } from "next-auth/react";
import { prisma } from "../../../util/db.server.js";
import { VerticalNavbar } from "../../../components/Admin/VerticalNavbar";
import { MainHeader } from "../../../components/common/MainHeader";
import { AddExamWithQuestions } from "../../../components/Admin/exam/AddExamWithQuestions";
import { DisplayExams } from "../../../components/Admin/exam/DisplayExams";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const userRole = session?.user?.role;

  // Optional: restrict access to admin/teacher roles
  // if (userRole !== 'admin') {
  //   return {
  //     redirect: {
  //       destination: '/auth/Admin/Login/signin-user',
  //       permanent: false,
  //     },
  //   };
  // }

  // Fetch all subjects with exams and their questions
  const subjects = await prisma.subject.findMany({
    include: {
      Exams: {
        include: {
          Questions: {
            include: {
              Options: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // Format data for easy rendering
  const formattedSubjects = subjects.map((sub) => ({
    id: sub.id,
    name: sub.name,
    description: sub.description,
    Exams: sub.Exams.map((exam) => ({
      id: exam.id,
      title: exam.title,
      Questions: exam.Questions.map((q) => ({
        id: q.id,
        question: q.question,
        correctOption: q.correctOption,
        Options: q.Options,
      })),
    })),
  }));

  return {
    props: {
      subjects: JSON.parse(JSON.stringify(formattedSubjects)),
    },
  };
}

export default function ExamsPage({ subjects }) {
  const { data } = useSession();

  return (
    <React.Fragment>
      <MainHeader title="Exams Dashboard" />
      <section className="flex flex-col w-full h-full bg-[#e6e6e6] pt-10">
        <div className="w-full h-full flex flex-row">
          <VerticalNavbar data={data} />
          <div className="w-full px-6">
            {/* Add Exam & Questions Form */}
            <AddExamWithQuestions subjects={subjects} />

            {/* Display Existing Exams & Questions */}
            <DisplayExams subjects={subjects} />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
