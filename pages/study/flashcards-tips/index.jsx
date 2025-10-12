// pages/flashcards-tips.js
import { FaLightbulb, FaMagic, FaSmile, FaBookOpen } from "react-icons/fa";
import Image from "next/image";
import Subject from "../../../components/flashcard/subject.jsx"

const reasons = [
  {
    id: 1,
    icon: <FaBookOpen className="text-green-500 w-8 h-8" />,
    title: "Quick Recall",
    description:
      "Flashcards boost memory retention and help recall key facts easily.",
  },
  {
    id: 2,
    icon: <FaLightbulb className="text-yellow-500 w-8 h-8" />,
    title: "Smart Study Tips",
    description:
      "Get expert learning techniques to make studying more efficient and enjoyable.",
  },
  {
    id: 3,
    icon: <FaSmile className="text-pink-500 w-8 h-8" />,
    title: "Engaging Experience",
    description:
      "Interactive tools make studying fun and less stressful.",
  },
  {
    id: 4,
    icon: <FaMagic className="text-purple-500 w-8 h-8" />,
    title: "Visual Learning",
    description:
      "Use colorful visuals and concise explanations to understand topics better.",
  },
];

const steps = [
  {
    id: 1,
    title: "Choose Your Subject",
    description:
      "Select the subject and topic you want to study with flashcards.",
    image: "/flashcards/flashcards-select.jpg",
  },
  {
    id: 2,
    title: "Review Flashcards",
    description:
      "Go through flashcards one by one. Read the question, recall the answer, and flip to check it.",
    image: "/flashcards/flashcards-review.jpg",
  },
  {
    id: 3,
    title: "Use Study Tips",
    description:
      "Apply the provided tips to memorize difficult topics faster and retain information longer.",
    image: "/flashcards/flashcards-tips.jpg",
  },
  {
    id: 4,
    title: "Track Progress",
    description:
      "Monitor which cards you’ve mastered and which ones need more review.",
    image: "/flashcards/flashcards-track.jpg",
  },
];

export default function FlashcardsTips() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-400 to-pink-500 text-white py-32 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Flashcards & Smart Study Tips
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Boost your memory, master concepts, and study efficiently with
          interactive flashcards and proven techniques.
        </p>
        <button className="bg-white text-yellow-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
          Start Learning
        </button>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Why Use Flashcards & Tips?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason) => (
            <div
              key={reason.id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center space-y-4"
            >
              <div>{reason.icon}</div>
              <h3 className="text-xl font-semibold text-gray-700 text-center">
                {reason.title}
              </h3>
              <p className="text-gray-600 text-center">{reason.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          How to Use Flashcards & Tips Effectively
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
      <Subject />
    </div>
  );
}
