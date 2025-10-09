// pages/study-planner.js
import { FaClock, FaCheckCircle, FaLightbulb } from "react-icons/fa";
import Image from "next/image";

const features = [
  {
    id: 1,
    icon: <FaClock className="text-yellow-500 w-10 h-10" />,
    title: "Study Planner",
    description: "Organize your schedule and track study progress effortlessly.",
  },
];

const reasons = [
  {
    id: 1,
    icon: <FaClock className="text-yellow-500 w-8 h-8" />,
    title: "Time Management",
    description: "Plan your study sessions efficiently and make the most of your time.",
  },
  {
    id: 2,
    icon: <FaCheckCircle className="text-green-500 w-8 h-8" />,
    title: "Track Progress",
    description: "Monitor your learning progress and stay on top of your goals.",
  },
  {
    id: 3,
    icon: <FaLightbulb className="text-purple-500 w-8 h-8" />,
    title: "Set Priorities",
    description: "Focus on important topics and prioritize tasks for better results.",
  },
];

const steps = [
  {
    id: 1,
    title: "Create Your Plan",
    description:
      "Set up your study schedule by adding subjects, topics, and target times.",
    image: "/study/planner-create.jpg",
  },
  {
    id: 2,
    title: "Add Study Sessions",
    description:
      "Break your study plan into sessions and assign tasks for each session.",
    image: "/study/planner-sessions.jpg",
  },
  {
    id: 3,
    title: "Track Your Progress",
    description:
      "Mark completed tasks and review your progress to stay on track.",
    image: "/study/planner-progress.jpg",
  },
  {
    id: 4,
    title: "Adjust as Needed",
    description:
      "Update your plan based on progress and upcoming exams or deadlines.",
    image: "/study/planner-adjust.jpg",
  },
];

export default function StudyPlanner() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-32 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Study Planner
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Organize your study schedule, track progress, and achieve your learning goals efficiently.
        </p>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Why Use a Study Planner?
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
          How to Use the Study Planner Effectively
        </h2>

        <div className="space-y-16 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex flex-col md:flex-row items-center ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className="relative w-full lg:w-1/2 !h-[20rem] relative">
                <Image
                  src={step.image}
                  alt={step.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
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
          Key Features
        </h2>
        <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center space-y-4"
            >
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
