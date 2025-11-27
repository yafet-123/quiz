import React from "react";
import { useSession, getSession } from "next-auth/react";
import { prisma } from '../../../util/db.server.js';
import { VerticalNavbar } from "../../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../../components/common/MainHeader';
import { AddQuizWithQuestions } from "../../../components/Admin/Quiz/AddQuizWithQuestions";
import { DisplayQuizzes } from "../../../components/Admin/Quiz/DisplayQuizzes";

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

  // Fetch all subjects with quizzes and questions
  const subjects = await prisma.Subject.findMany({
    include: {
      Quizzes: {
        include: {
          Questions: {
            include: {
              OptionTable: true, // <-- include options here
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
    Quizzes: sub.Quizzes.map(quiz => ({
      id: quiz.id,
      title: quiz.title,
      Questions: quiz.Questions.map(q => ({
        id: q.id,
        question: q.question,
        answer: q.answer,
        Options: q.OptionTable.map(opt => ({ id: opt.id, optionText: opt.optionText })), // now options are included
      })),
    })),
  }));

  console.log(formattedSubjects)
  return {
    props: {
      subjects: JSON.parse(JSON.stringify(formattedSubjects)),
      userId: session?.user?.user_id
    }
  };
}

export default function QuizzesPage({ subjects, userId }) {
  const { data } = useSession();
  console.log(subjects)
  return (
    <React.Fragment>
      <MainHeader title="Quizzes Dashboard" />
      <section className="flex flex-col w-full h-full bg-[#e6e6e6] pt-24">
        <div className='w-full h-full flex flex-row'>
          <VerticalNavbar data={data} />
          <div className="w-full px-6">
            {/* Add Quiz & Questions Form */}
            <AddQuizWithQuestions subjects={subjects} userId={userId} />

            {/* Display Existing Quizzes & Questions */}
            <DisplayQuizzes subjects={subjects} userId={userId} />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
