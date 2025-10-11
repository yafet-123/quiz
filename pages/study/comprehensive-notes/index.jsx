// pages/comprehensive-notes.js
import { FaBook, FaCheckCircle, FaLightbulb } from "react-icons/fa";
import Image from "next/image";

const features = [
  {
    id: 1,
    icon: <FaBook className="text-green-500 w-10 h-10" />,
    title: "Comprehensive Notes",
    description: "Access structured notes for every subject to simplify learning.",
  },
];

const reasons = [
  {
    id: 1,
    icon: <FaBook className="text-green-500 w-8 h-8" />,
    title: "Clear Organization",
    description: "Well-structured notes cover all subjects and key topics for easy studying.",
  },
  {
    id: 2,
    icon: <FaCheckCircle className="text-blue-500 w-8 h-8" />,
    title: "Key Points Highlighted",
    description: "Important concepts, formulas, and definitions are emphasized.",
  },
  {
    id: 3,
    icon: <FaLightbulb className="text-yellow-500 w-8 h-8" />,
    title: "Learning Tips",
    description: "Tips and tricks are included to help remember information faster.",
  },
];

const steps = [
  {
    id: 1,
    title: "Start with Notes Overview",
    description:
      "Review all notes for the topic to get a full understanding before diving into details.",
    image: "/note/note-overview.jpg",
  },
  {
    id: 2,
    title: "Highlight Key Points",
    description:
      "Identify and highlight definitions, formulas, and important concepts for quick revision.",
    image: "/note/note-highlight.jpg",
  },
  {
    id: 3,
    title: "Use Diagrams & Visuals",
    description:
      "Visual aids help you understand and memorize concepts more efficiently.",
    image: "/note/note-diagram.jpg",
  },
  {
    id: 4,
    title: "Review Regularly",
    description:
      "Go through notes periodically to reinforce memory and improve retention.",
    image: "/note/note-review.jpg",
  },
];

export default function ComprehensiveNotes() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-32 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Comprehensive Notes
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Access structured notes for every subject to make learning simpler and more effective.
        </p>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Why Use Comprehensive Notes?
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
          How to Use Notes Effectively
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
