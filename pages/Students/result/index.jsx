import { FaClipboardList, FaCheckCircle, FaLightbulb } from "react-icons/fa";
import Image from "next/image";
import ResultSubject from "../../../components/student/ResultSubject"; // You can rename this to QuizExam if needed
import { prisma } from "../../../util/db.server";
import { MainHeader } from '../../../components/common/MainHeader';
import React from "react";
import { VerticalNavbar } from "../../../components/student/VerticalNavbar";
import { useSession, getSession } from "next-auth/react";

export default function PracticeQuizzes({ subjects }) {
  function handleChange(newValue) {
      setselected(newValue);
  }
  const { status, data } = useSession();

  return (
    <React.Fragment>
      <MainHeader title="Aceit : Exam Page" />
      <div className="flex bg-[#e6e6e6] ">
        <VerticalNavbar onChange={handleChange} data={data} />
        <div className="bg-gray-50 min-h-screen pt-10 w-full">
          {/* Features Section */}
          <section className="py-16 px-5 lg:px-10 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-5 text-gray-800">
              View Your Practice Exam Results
            </h2>
            <ResultSubject subjects={subjects} /> {/* You can rename this to QuizExam and pass exams */}
          </section>
        </div>
      </div>
    </React.Fragment>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const userRole = session?.user?.role;
   if (userRole !== 'student') {
     return {
       redirect: {
         destination: '/auth/Student/Login/signin-student',
         permanent: false,
       },
     };
   }

  try {
    const subjects = await prisma.Subject.findMany({
      orderBy: { id: "asc" },
    });

    return {
      props: {
        subjects: JSON.parse(JSON.stringify(subjects)),
      },
    };
  } catch (error) {
    console.error("Error fetching subjects:", error);
    return {
      props: { subjects: [], error: "Failed to load exams." },
    };
  }
}
