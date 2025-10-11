// pages/practice-quizzes.js
import { FaClipboardList, FaCheckCircle, FaLightbulb } from "react-icons/fa";
import Image from "next/image";
import QuizSubject from "../../../components/books/QuizSubject"

const features = [
  {
    id: 1,
    icon: <FaClipboardList className="text-blue-500 w-10 h-10" />,
    title: "Practice Quizzes",
    description: "Test your knowledge with quizzes designed to boost retention.",
  },
];

const reasons = [
  {
    id: 1,
    icon: <FaClipboardList className="text-blue-500 w-8 h-8" />,
    title: "Interactive Learning",
    description: "Engage with quizzes that provide instant feedback on your answers.",
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
    title: "Select a Quiz Topic",
    description:
      "Choose a subject or chapter you want to practice and start testing your knowledge.",
    image: "/quiz/quiz-topic.jpg",
  },
  {
    id: 2,
    title: "Attempt Questions",
    description:
      "Answer multiple-choice or short-answer questions to apply what you've learned.",
    image: "/quiz/quiz-attempt.jpg",
  },
  {
    id: 3,
    title: "Review Your Answers",
    description:
      "Check correct and incorrect answers with explanations to improve understanding.",
    image: "/quiz/quiz-review.jpg",
  },
  {
    id: 4,
    title: "Repeat for Mastery",
    description:
      "Retake quizzes regularly to reinforce memory and achieve mastery of the topic.",
    image: "/quiz/quiz-repeat.jpg",
  },
];

export default function PracticeQuizzes() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-32 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Practice Quizzes
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Test your knowledge with interactive quizzes and improve your learning retention.
        </p>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Why Use Practice Quizzes?
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
      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          How to Use Quizzes Effectively
        </h2>

        <div className="max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex flex-col md:flex-row items-center ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className="relative w-full lg:w-1/2 !h-[30rem] relative">
                <Image
                  src={step.image}
                  alt={step.title}
                  layout="fill"
                  objectFit="cover"
                  className=""
                />
              </div>

              {/* Text */}
              <div className="lg:w-1/2 w-full md:px-12 mt-6 md:mt-0">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-lg">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Browse Practice Quizzes by subject
        </h2>
        <QuizSubject />
      </section>
    </div>
  );
}
