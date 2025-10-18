import React from "react";
import { useSession, getSession } from "next-auth/react";
import { prisma } from "../../../util/db.server.js";
import { VerticalNavbar } from "../../../components/Admin/VerticalNavbar";
import { MainHeader } from "../../../components/common/MainHeader";
import { AddWorksheetWithQuestions } from "../../../components/Admin/worksheet/AddWorksheetWithQuestions";
import { DisplayWorksheets } from "../../../components/Admin/worksheet/DisplayWorksheets";

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
  const subjects = await prisma.Subject.findMany({
    include: {
      Worksheets: {
        include: {
          Questions: {
            include: {
              Options: true, // include options here
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // Format data for client-side rendering
  const formattedSubjects = subjects.map(sub => ({
    id: sub.id,
    name: sub.name,
    description: sub.description,
    Worksheets: sub.Worksheets.map(worksheet => ({
      id: worksheet.id,
      title: worksheet.title,
      Questions: worksheet.Questions.map(q => ({
        id: q.id,
        question: q.question,
        correctAnswer: q.correctAnswer,
        Options: q.Options.map(opt => ({
          id: opt.id,
          optionText: opt.optionText
        })), // options included cleanly
      })),
    })),
  }));

  console.log(formattedSubjects)
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
      <section className="flex flex-col w-full h-full bg-[#e6e6e6] pt-24">
        <div className="w-full h-full flex flex-row">
          <VerticalNavbar data={data} />
          <div className="w-full px-6">
            {/* Add Exam & Questions Form */}
            <AddWorksheetWithQuestions subjects={subjects} />

            {/* Display Existing Exams & Questions */}
            <DisplayWorksheets subjects={subjects} />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
