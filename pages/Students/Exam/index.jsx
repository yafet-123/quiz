import { FaClipboardList, FaCheckCircle, FaLightbulb } from "react-icons/fa";
import Image from "next/image";
import ExamSubject from "../../../components/student/ExamSubject"; // You can rename this to QuizExam if needed
import { prisma } from "../../../util/db.server";
import { MainHeader } from '../../../components/common/MainHeader';
import React from "react";
import { VerticalNavbar } from "../../../components/student/VerticalNavbar";
import { useSession, getSession } from "next-auth/react";

const reasons = [
  {
    id: 1,
    icon: <FaClipboardList className="text-blue-500 w-8 h-8" />,
    title: "Interactive Learning",
    description: "Engage with exams that provide instant feedback on your answers.",
  },
  {
    id: 2,
    icon: <FaCheckCircle className="text-green-500 w-8 h-8" />,
    title: "Identify Weak Areas",
    description: "Focus on topics you need to improve and track your progress.",
  },
  {
    id: 3,
    icon: <FaLightbulb className="text-yellow-500 w-8 h-8" />,
    title: "Retention Boost",
    description: "Reinforce knowledge and remember concepts more effectively.",
  },
];

const steps = [
  {
    id: 1,
    title: "Select an Exam",
    description: "Choose an exam or subject you want to practice and start testing your knowledge.",
    image: "/quiz/quiz-topic.jpg",
  },
  {
    id: 2,
    title: "Attempt Questions",
    description: "Answer multiple-choice or short-answer questions to apply what you've learned.",
    image: "/quiz/quiz-attempt.jpg",
  },
  {
    id: 3,
    title: "Review Your Answers",
    description: "Check correct and incorrect answers with explanations to improve understanding.",
    image: "/quiz/quiz-review.jpg",
  },
  {
    id: 4,
    title: "Repeat for Mastery",
    description: "Retake exams regularly to reinforce memory and achieve mastery of the topic.",
    image: "/quiz/quiz-repeat.jpg",
  },
];

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
        <div className="bg-gray-50 min-h-screen pt-24 lg:px-5">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-24 lg:py-32 text-center px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Practice Exams
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Test your knowledge with interactive exams and improve your learning retention.
            </p>
          </section>

          {/* Benefits Section */}
          <section className="py-5 lg:py-16 px-5 lg:px-16 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Why Use Practice Exams?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {reasons.map((reason) => (
                <div
                  key={reason.id}
                  className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center space-y-4"
                >
                  <div>{reason.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-700 text-center">{reason.title}</h3>
                  <p className="text-gray-600 text-center">{reason.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Steps Section */}
          {/* <section className="py-5 lg:py-16 px-5 lg:px-6 bg-gray-50">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
              How to Use Exams Effectively
            </h2>

            <div className="max-w-6xl mx-auto">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex flex-col md:flex-row items-center ${
                    index % 2 !== 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
           
                  <div className="relative w-full lg:w-1/2 !h-[30rem] relative">
                    <Image
                      src={step.image}
                      alt={step.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>

                  <div className="lg:w-1/2 w-full md:px-12 mt-6 md:mt-0">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-lg">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section> */}

          {/* Features Section */}
          <section className="py-5 lg:py-16 px-10 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-5 text-gray-800">
              Browse Practice Exams by Exam
            </h2>
            <ExamSubject subjects={subjects} /> {/* You can rename this to QuizExam and pass exams */}
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
