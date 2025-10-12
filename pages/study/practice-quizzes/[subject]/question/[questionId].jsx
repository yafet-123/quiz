import { useState, useEffect } from "react";
import { getAllQuiz, getQuizBySubjectAndTitle } from "../../../../../data/Quiz.jsx";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export async function getStaticProps(context) {
  const { subject, questionId } = context.params;
  const quiz = getQuizBySubjectAndTitle(subject, questionId);

  if (!quiz) {
    return { notFound: true };
  }

  return {
    props: { quiz, subject },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  const allSubjects = getAllQuiz();

  const paths = allSubjects.flatMap((subject) =>
    subject.quizzes.map((quiz) => ({
      params: {
        subject: subject.subject.toString(),
        questionId: quiz.title,
      },
    }))
  );

  return { paths, fallback: false };
}

export default function PracticeQuizPage({ quiz, subject }) {
  const [current, setCurrent] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [reviewMarks, setReviewMarks] = useState([]);
  const [score, setScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [finished, setFinished] = useState(false);
  const [showSubmitPrompt, setShowSubmitPrompt] = useState(false);

  const questions = quiz.questions;

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
    setSelectedAnswers({ ...selectedAnswers, [current]: option });
  };

  const toggleReview = (index) => {
    setReviewMarks((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const nextQuestion = () => current < questions.length - 1 && setCurrent(current + 1);
  const prevQuestion = () => current > 0 && setCurrent(current - 1);

  const handleSubmit = () => {
    const unanswered = questions.filter((_, i) => !selectedAnswers[i]);
    if (unanswered.length > 0 && !showSubmitPrompt) {
      setShowSubmitPrompt(true);
      return;
    }

    // Calculate score
    let points = 0;
    questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.answer) points++;
    });
    setScore(points);
    setFinished(true);
  };

  const restartQuiz = () => {
    setCurrent(0);
    setSelectedAnswers({});
    setReviewMarks([]);
    setScore(null);
    setTimeLeft(120);
    setFinished(false);
    setShowSubmitPrompt(false);
  };

  const percentage = score !== null ? Math.round((score / questions.length) * 100) : 0;

  const pieData = {
    labels: ["Correct", "Incorrect"],
    datasets: [
      {
        data: [score || 0, questions.length - (score || 0)],
        backgroundColor: ["#10B981", "#EF4444"],
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 py-24 px-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center text-indigo-700 mb-2">
          {quiz.title}
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Subject: <span className="font-semibold text-gray-700">{subject}</span>
        </p>

        {!finished && (
          <>

            {/* Question Numbers Legend */}
            <div className="flex gap-4 mb-4 justify-center text-sm">
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
                let colorClass = "bg-gray-200 text-gray-700"; // default: not answered

                if (reviewMarks.includes(i)) {
                  colorClass = selectedAnswers[i] ? "bg-blue-500 text-white" : "bg-red-500 text-white";
                } else if (selectedAnswers[i]) {
                  colorClass = "bg-green-500 text-white";
                }

                return (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-10 h-10 rounded-full border flex items-center justify-center text-sm ${colorClass}`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>

            {/* Question Card */}
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              {questions[current].question}
            </h2>

            <div className="space-y-3 mb-4">
              {questions[current].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(opt)}
                  className={`w-full text-left px-4 py-2 rounded-xl border transition-all ${
                    selectedAnswers[current] === opt
                      ? "bg-indigo-500 text-white border-indigo-500"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center mb-4">
              <button
                onClick={prevQuestion}
                disabled={current === 0}
                className="px-4 py-2 rounded-xl bg-gray-200 text-gray-700 disabled:opacity-50"
              >
                Previous
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleReview(current)}
                  className={`px-4 py-2 rounded-xl ${
                    reviewMarks.includes(current)
                      ? "bg-yellow-400 text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {reviewMarks.includes(current) ? "Unmark Review" : "Mark Review"}
                </button>

                {current < questions.length - 1 ? (
                  <button
                    onClick={nextQuestion}
                    className="px-4 py-2 rounded-xl bg-indigo-500 text-white"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 rounded-xl bg-green-500 text-white"
                  >
                    Submit Quiz
                  </button>
                )}
              </div>
            </div>
          </>
        )}

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
              <button
                onClick={() => setShowSubmitPrompt(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-xl"
              >
                Go Back
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {finished && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700 text-center">
              Quiz Completed!
            </h2>
            <div className="text-center mb-6">
              <p className="text-lg mb-1">
                Score:{" "}
                <span className="font-bold text-green-600">
                  {score} / {questions.length} ({percentage}%)
                </span>
              </p>
              <Pie data={pieData} className="mx-auto max-w-xs" />
            </div>

            {/* Question Review */}
            <div className="mb-4">
              {questions.map((q, i) => (
                <div key={i} className="mb-3 p-3 rounded-xl border">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">
                      Q{i + 1}: {q.question}
                    </span>
                    {selectedAnswers[i] !== q.answer && (
                      <span className="text-red-500 font-semibold">Incorrect</span>
                    )}
                  </div>
                  <div className="mb-1">
                    Your answer:{" "}
                    <span
                      className={
                        selectedAnswers[i] === q.answer ? "text-green-600" : "text-red-500"
                      }
                    >
                      {selectedAnswers[i] || "No answer"}
                    </span>
                  </div>
                  <div>Correct answer: <span className="text-green-600">{q.answer}</span></div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-2">
              <button
                onClick={restartQuiz}
                className="px-6 py-2 rounded-xl bg-indigo-500 text-white"
              >
                Retry Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
