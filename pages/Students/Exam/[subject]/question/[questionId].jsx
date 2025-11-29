import { useState, useEffect } from "react";
import { prisma } from "../../../../../util/db.server";
import { MainHeader } from "../../../../../components/common/MainHeader";
import React from "react";
import { VerticalNavbar } from "../../../../../components/student/VerticalNavbar";
import { useSession, getSession } from "next-auth/react";

export async function getServerSideProps(context) {
  const { subject, questionId } = context.params;
  const session = await getSession(context);
  const userRole = session?.user?.role;

  if (userRole !== "student") {
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

  // Check if student already submitted this exam
  const previousSubmission = await prisma.StudentExamAnswer.findFirst({
    where: { studentId: student.id, examId: Number(questionId) },
  });

  if (previousSubmission) {
    // Redirect or show a "already completed" page
    return {
      redirect: {
        destination: `/Students/exams/completed`, // You can create a page to show exam completed message
        permanent: false,
      },
    };
  }

  const Allstudents = {
    students_id: student.id,
    name: student.name,
    schoolName: student.schoolName,
    dateOfBirth: student.dateOfBirth ? student.dateOfBirth.toISOString() : null,
    gender: student.gender,
    email: student.email,
  };

  try {
    const exam = await prisma.Exam.findUnique({
      where: { id: Number(questionId) },
      include: {
        Subject: { select: { id: true, name: true } },
        Questions: { include: { Options: true } },
      },
    });

    if (!exam || exam.Subject.name !== decodeURIComponent(subject)) {
      return { notFound: true };
    }

    return {
      props: {
        exam: JSON.parse(JSON.stringify(exam)),
        subject,
        student: Allstudents,
      },
    };
  } catch (error) {
    console.error("Error fetching exam:", error);
    return {
      props: { exam: null, error: "Failed to load exam.", subject },
    };
  }
}

export default function ExamQuestionPage({ exam, subject, student }) {
  const [current, setCurrent] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [reviewMarks, setReviewMarks] = useState([]);
  const [timeLeft, setTimeLeft] = useState(120);
  const [finished, setFinished] = useState(false);
  const [showSubmitPrompt, setShowSubmitPrompt] = useState(false);

  const { status, data } = useSession();
  const questions = exam.Questions;

  // Timer
  useEffect(() => {
    if (timeLeft > 0 && !finished) {
      const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !finished) {
      handleSubmit();
    }
  }, [timeLeft, finished]);

  const handleSelect = (option) => {
    if (finished) return; // Disable selection after submission
    setSelectedAnswers({ ...selectedAnswers, [current]: option });
  };

  const toggleReview = (index) => {
    if (finished) return; // Disable review marking after submission
    setReviewMarks((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const nextQuestion = () => current < questions.length - 1 && setCurrent(current + 1);
  const prevQuestion = () => current > 0 && setCurrent(current - 1);

  const handleSubmit = async () => {
    if (finished) return;

    const unanswered = questions.filter((_, i) => !selectedAnswers[i]);
    if (unanswered.length > 0 && !showSubmitPrompt) {
      setShowSubmitPrompt(true);
      return;
    }

    const answers = questions.map((q, i) => ({
      question: q.question,
      selectedAnswer: selectedAnswers[i] || null,
      correctAnswer: q.correctAnswer,
    }));

    try {
      const res = await fetch("/api/student/saveExamResults", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: student.students_id,
          examId: exam.id,
          email: student.email,
          answers,
        }),
      });
      const result = await res.json();
      setFinished(true);
      console.log("Results sent:", result.message);
    } catch (err) {
      console.error("Failed to send results:", err);
    }
  };

  const restartExam = () => {
    setCurrent(0);
    setSelectedAnswers({});
    setReviewMarks([]);
    setTimeLeft(120);
    setFinished(false);
    setShowSubmitPrompt(false);
  };

  return (
    <React.Fragment>
      <MainHeader title="Aceit : Exam Question Page" />
      <div className="flex bg-[#e6e6e6] w-full">
        <VerticalNavbar data={data} />
        <div className="min-h-screen flex flex-col items-center w-full bg-gray-50 py-24 px-4">
          <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-6">
            <h1 className="text-2xl font-bold text-center text-indigo-700 mb-2">{exam.title}</h1>
            <p className="text-center text-gray-500 mb-6">
              Subject: <span className="font-semibold text-gray-700">{subject}</span>
            </p>

            {/* Question Status Legend */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-4 text-sm">
              <div className="flex items-center gap-1">
                <span className="w-4 h-4 bg-gray-200 rounded-full border"></span> Not Answered
              </div>
              <div className="flex items-center gap-1">
                <span className="w-4 h-4 bg-green-500 rounded-full border"></span> Answered
              </div>
              <div className="flex items-center gap-1">
                <span className="w-4 h-4 bg-blue-500 rounded-full border"></span> Answered & Marked for Review
              </div>
              <div className="flex items-center gap-1">
                <span className="w-4 h-4 bg-red-500 rounded-full border"></span> Not Answered & Marked for Review
              </div>
            </div>

            {/* Timer & Progress */}
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-gray-600">
                Time Left:{" "}
                <span className="font-semibold text-red-500">
                  {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                Question {current + 1} / {questions.length}
              </div>
            </div>

            {/* Question Numbers Bar */}
            <div className="flex flex-wrap gap-2 mb-4">
              {questions.map((q, i) => {
                let colorClass = "bg-gray-200 text-gray-700";
                if (reviewMarks.includes(i)) {
                  colorClass = selectedAnswers[i] ? "bg-blue-500 text-white" : "bg-red-500 text-white";
                } else if (selectedAnswers[i]) {
                  colorClass = "bg-green-500 text-white";
                }
                return (
                  <button
                    key={i}
                    onClick={() => !finished && setCurrent(i)}
                    className={`w-10 h-10 rounded-full border flex items-center justify-center text-sm ${colorClass}`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>

            {/* Question Card */}
            <h2 className="text-lg font-semibold mb-4 text-gray-800">{questions[current].question}</h2>
            <div className="space-y-3 mb-4">
              {questions[current].Options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(opt.optionText)}
                  disabled={finished} // disable after submission
                  className={`w-full text-left px-4 py-2 rounded-xl border transition-all ${
                    selectedAnswers[current] === opt.optionText
                      ? "bg-indigo-500 text-white border-indigo-500"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {opt.optionText}
                </button>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col-reverse lg:flex-row justify-between items-center mb-4">
              <button
                onClick={prevQuestion}
                disabled={current === 0 || finished} // disable after submission
                className="mt-0 lg:mt-5 px-4 py-2 rounded-xl bg-gray-200 text-gray-700 disabled:opacity-50"
              >
                Previous
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleReview(current)}
                  disabled={finished} // disable after submission
                  className={`px-4 py-2 rounded-xl ${
                    reviewMarks.includes(current) ? "bg-yellow-400 text-white" : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {reviewMarks.includes(current) ? "Unmark For Review" : "Mark For Review"}
                </button>

                {current < questions.length - 1 ? (
                  <button onClick={nextQuestion} disabled={finished} className="px-4 py-2 rounded-xl bg-indigo-500 text-white">
                    Next
                  </button>
                ) : (
                  <button onClick={handleSubmit} disabled={finished} className="px-4 py-2 rounded-xl bg-green-500 text-white">
                    Submit Exam
                  </button>
                )}
              </div>
            </div>

            {/* Submit Prompt */}
            {showSubmitPrompt && !finished && (
              <div className="bg-yellow-100 p-4 rounded-xl mb-4">
                <p className="text-yellow-800 mb-2">
                  You have unanswered questions. Do you want to submit anyway or go back?
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setShowSubmitPrompt(false);
                      handleSubmit();
                    }}
                    className="px-4 py-2 bg-green-500 text-white rounded-xl"
                  >
                    Submit Anyway
                  </button>
                  <button onClick={() => setShowSubmitPrompt(false)} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-xl">
                    Go Back
                  </button>
                </div>
              </div>
            )}

            {/* Finished Notice */}
            {finished && (
              <div className="text-center mt-6">
                <p className="text-lg text-green-600 font-semibold">
                  Exam submitted! Your results have been sent to your email.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
