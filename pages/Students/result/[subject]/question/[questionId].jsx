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
      <div className="flex bg-[#e6e6e6] w-full">
        <VerticalNavbar data={data} />
        <div className="min-h-screen flex flex-col items-center w-full bg-gray-50 py-20 px-6">
          <div className="max-w-5xl w-full bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              {student.name} Exam Results
            </h2>

            {results.length === 0 ? (
              <p className="text-center text-gray-500">
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
                    className="mb-10 p-6 border rounded-2xl shadow-sm bg-gray-50"
                  >
                    <h3 className="text-xl font-semibold text-indigo-700 mb-3">
                      Exam ID: {examId}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Score:{" "}
                      <span className="font-semibold text-green-600">
                        {correctCount}/{totalQuestions} ({scorePercent}%)
                      </span>
                    </p>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-indigo-100 text-gray-800">
                            <th className="p-3 border text-left">#</th>
                            <th className="p-3 border text-left">Question</th>
                            <th className="p-3 border text-left">Your Answer</th>
                            <th className="p-3 border text-left">Correct Answer</th>
                            <th className="p-3 border text-left">Result</th>
                          </tr>
                        </thead>
                        <tbody>
                          {examResults.map((res, idx) => (
                            <tr key={res.id} className="hover:bg-gray-100">
                              <td className="p-3 border">{idx + 1}</td>
                              <td className="p-3 border">{res.question}</td>
                              <td
                                className={`p-3 border ${
                                  res.selectedAnswer === res.correctAnswer
                                    ? "text-green-600 font-semibold"
                                    : "text-red-500 font-semibold"
                                }`}
                              >
                                {res.selectedAnswer || "Not Answered"}
                              </td>
                              <td className="p-3 border">{res.correctAnswer}</td>
                              <td className="p-3 border text-center">
                                {res.selectedAnswer === res.correctAnswer ? "✅" : "❌"}
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
