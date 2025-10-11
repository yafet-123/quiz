import { FaBook, FaClipboardList, FaLightbulb, FaClock, FaMobileAlt, FaStar, FaSmile, FaChartLine, FaCheckCircle, FaMedal } from "react-icons/fa";
import Image from "next/image";

const features = [
  {
    id: 1,
    icon: <FaBook className="text-green-500 w-10 h-10" />,
    title: "Comprehensive Notes",
    description: "Access structured notes for every subject to simplify learning.",
  },
  {
    id: 2,
    icon: <FaClipboardList className="text-blue-500 w-10 h-10" />,
    title: "Practice Quizzes",
    description: "Test your knowledge with quizzes designed to boost retention.",
  },
  {
    id: 3,
    icon: <FaClock className="text-yellow-500 w-10 h-10" />,
    title: "Study Planner",
    description: "Organize your schedule and track study progress effortlessly.",
  },
  {
    id: 4,
    icon: <FaLightbulb className="text-purple-500 w-10 h-10" />,
    title: "Flashcards & Tips",
    description: "Learn key concepts faster with interactive flashcards and tips.",
  },
];

const reasons = [
  {
    id: 1,
    icon: <FaBook className="text-green-500 w-8 h-8" />,
    title: "Comprehensive Notes",
    description: "Clear, well-organized notes cover all subjects and key topics.",
  },
  {
    id: 2,
    icon: <FaClipboardList className="text-blue-500 w-8 h-8" />,
    title: "Interactive Quizzes",
    description: "Instant feedback helps identify weak areas and improve performance.",
  },
  {
    id: 3,
    icon: <FaLightbulb className="text-yellow-500 w-8 h-8" />,
    title: "Flashcards for Learning",
    description: "Quick memory aids for definitions, formulas, and key concepts.",
  },
  {
    id: 4,
    icon: <FaClock className="text-purple-500 w-8 h-8" />,
    title: "Personalized Planner",
    description: "Schedule study sessions and track progress effectively.",
  },
  {
    id: 5,
    icon: <FaMobileAlt className="text-pink-500 w-8 h-8" />,
    title: "Accessible Anywhere",
    description: "Study on desktop or mobile, anytime, anywhere.",
  },
  {
    id: 6,
    icon: <FaStar className="text-yellow-400 w-8 h-8" />,
    title: "Gamified Learning",
    description: "Earn points, badges, and achievements to stay motivated.",
  },
  {
    id: 7,
    icon: <FaSmile className="text-indigo-500 w-8 h-8" />,
    title: "Fun and Engaging",
    description: "Interactive tools make studying enjoyable and exciting.",
  },
  {
    id: 8,
    icon: <FaChartLine className="text-teal-500 w-8 h-8" />,
    title: "Boosts Productivity",
    description: "Saves time by combining all study resources in one place.",
  },
  {
    id: 9,
    icon: <FaCheckCircle className="text-green-600 w-8 h-8" />,
    title: "Trusted by Students",
    description: "Recommended by teachers and peers for better learning results.",
  },
  {
    id: 10,
    icon: <FaMedal className="text-yellow-600 w-8 h-8" />,
    title: "Improves Grades",
    description: "Proven to help students increase grades and confidence.",
  },
];

const steps = [
  {
    id: 1,
    title: "Start with a Study Plan",
    description:
      "Use the study planner to schedule sessions, break study time into manageable chunks, and prioritize difficult topics.",
    image: "/study/plan.jpg",
  },
  {
    id: 2,
    title: "Use Notes Strategically",
    description:
      "Read comprehensive notes first, highlight key points, and use visual tools like diagrams for better retention.",
    image: "/study/note.jpg",
  },
  {
    id: 3,
    title: "Practice with Quizzes",
    description:
      "Take interactive quizzes to test your knowledge, review incorrect answers, and repeat for mastery.",
    image: "/study/quiz.jpg",
  },
  {
    id: 4,
    title: "Leverage Flashcards",
    description:
      "Use flashcards for memorizing definitions, formulas, and key facts, reviewing them daily for long-term retention.",
    image: "/study/flashcards.jpg",
  },
];

export default function Study() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-32 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Learn Smarter, Anytime, Anywhere
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Explore study tools, practice quizzes, flashcards, and planners to boost your learning.
        </p>
        <button className="bg-white text-green-500 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
          Start Studying
        </button>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Why Use Our Study Tools?
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex items-center space-x-4">
            <FaBook className="w-10 h-10 text-green-500" />
            <p className="text-gray-700 font-medium">
              Organized and structured notes for efficient studying.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex items-center space-x-4">
            <FaClipboardList className="w-10 h-10 text-blue-500" />
            <p className="text-gray-700 font-medium">
              Practice quizzes help retain knowledge and prepare for exams.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex items-center space-x-4">
            <FaClock className="w-10 h-10 text-yellow-500" />
            <p className="text-gray-700 font-medium">
              Study planners keep you on track and manage your time efficiently.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex items-center space-x-4">
            <FaLightbulb className="w-10 h-10 text-purple-500" />
            <p className="text-gray-700 font-medium">
              Flashcards and tips make learning fun and interactive.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          How to Use Study Tools Most Effectively
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

      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Why Students Love Our Study Tools
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reasons.map((reason) => (
            <div
              key={reason.id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-start space-y-4"
            >
              <div className="flex items-center space-x-3">{reason.icon}</div>
              <h3 className="text-xl font-semibold text-gray-700">{reason.title}</h3>
              <p className="text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Key Study Tools
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2 text-center">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
