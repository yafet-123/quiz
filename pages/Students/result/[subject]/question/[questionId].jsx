import React from "react";
import { getSession, useSession } from "next-auth/react";
import { prisma } from "../../../../../util/db.server";
import { VerticalNavbar } from "../../../../../components/student/VerticalNavbar";
import { MainHeader } from "../../../../../components/common/MainHeader";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session || session.user.role !== "student") {
    return {
      redirect: {
        destination: "/auth/Student/Login/signin-student",
        permanent: false,
      },
    };
  }

  const student = await prisma.Student.findUnique({
    where: { name: session.user.name },
  });

  const results = await prisma.StudentExamAnswer.findMany({
    where: { studentId: student.id },
    orderBy: { createdAt: "desc" },
  });

  return {
    props: {
      results: JSON.parse(JSON.stringify(results)),
      student: {
        name: student.name,
        email: student.email,
      },
    },
  };
}

export default function StudentExamResults({ results, student }) {
  const { data } = useSession();

  // Group results by examId
  const groupedResults = results.reduce((acc, curr) => {
    if (!acc[curr.examId]) acc[curr.examId] = [];
    acc[curr.examId].push(curr);
    return acc;
  }, {});

  return (
    <React.Fragment>
      <MainHeader title="Exam Results" />
      <div className="flex flex-col lg:flex-row bg-[#e6e6e6] w-full min-h-screen pt-10">
        {/* Sidebar */}
        <div className="lg:w-1/4 w-full">
          <VerticalNavbar data={data} />
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col items-center bg-gray-50 py-8 px-4 sm:px-6 md:px-8">
          <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800">
              {student.name} Exam Results
            </h2>

            {results.length === 0 ? (
              <p className="text-center text-gray-500 text-sm sm:text-base">
                No exam results found yet.
              </p>
            ) : (
              Object.entries(groupedResults).map(([examId, examResults]) => {
                const correctCount = examResults.filter(
                  (r) => r.selectedAnswer === r.correctAnswer
                ).length;
                const totalQuestions = examResults.length;
                const scorePercent = Math.round(
                  (correctCount / totalQuestions) * 100
                );

                return (
                  <div
                    key={examId}
                    className="mb-8 sm:mb-10 p-4 sm:p-6 border rounded-2xl shadow-sm bg-gray-50"
                  >
                    <h3 className="text-lg sm:text-xl font-semibold text-indigo-700 mb-2">
                      Exam ID: {examId}
                    </h3>
                    <p className="text-gray-600 mb-3 text-sm sm:text-base">
                      Score:{" "}
                      <span className="font-semibold text-green-600">
                        {correctCount}/{totalQuestions} ({scorePercent}%)
                      </span>
                    </p>

                    {/* Table wrapper with horizontal scroll on small screens */}
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-sm sm:text-base">
                        <thead>
                          <tr className="bg-indigo-100 text-gray-800">
                            <th className="p-2 sm:p-3 border text-left">#</th>
                            <th className="p-2 sm:p-3 border text-left min-w-[180px]">
                              Question
                            </th>
                            <th className="p-2 sm:p-3 border text-left min-w-[130px]">
                              Your Answer
                            </th>
                            <th className="p-2 sm:p-3 border text-left min-w-[130px]">
                              Correct Answer
                            </th>
                            <th className="p-2 sm:p-3 border text-center">
                              Result
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {examResults.map((res, idx) => (
                            <tr key={res.id} className="hover:bg-gray-100">
                              <td className="p-2 sm:p-3 border">{idx + 1}</td>
                              <td className="p-2 sm:p-3 border break-words">
                                {res.question}
                              </td>
                              <td
                                className={`p-2 sm:p-3 border ${
                                  res.selectedAnswer === res.correctAnswer
                                    ? "text-green-600 font-semibold"
                                    : "text-red-500 font-semibold"
                                }`}
                              >
                                {res.selectedAnswer || "Not Answered"}
                              </td>
                              <td className="p-2 sm:p-3 border">
                                {res.correctAnswer}
                              </td>
                              <td className="p-2 sm:p-3 border text-center">
                                {res.selectedAnswer === res.correctAnswer
                                  ? "✅"
                                  : "❌"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
