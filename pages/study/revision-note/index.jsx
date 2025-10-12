// pages/revision-notes.js
import { FaBook, FaHighlighter, FaClipboardList } from "react-icons/fa";
import Image from "next/image";
import { getAllNotes } from "../../../data/NotesData.jsx";
import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import { FaFilePdf } from "react-icons/fa6";
import Link from "next/link"
import Subject from "../../../components/revision-note/subject.jsx"
const features = [
  {
    id: 1,
    icon: <FaHighlighter className="text-yellow-500 w-10 h-10" />,
    title: "Revision Notes",
    description: "Organize and access your revision notes quickly for efficient learning.",
  },
];

const reasons = [
  {
    id: 1,
    icon: <FaBook className="text-blue-500 w-8 h-8" />,
    title: "Quick Review",
    description: "Revisit key topics and important concepts anytime for faster revision.",
  },
  {
    id: 2,
    icon: <FaClipboardList className="text-green-500 w-8 h-8" />,
    title: "Track Progress",
    description: "Check which topics you have revised and which need more attention.",
  },
  {
    id: 3,
    icon: <FaHighlighter className="text-purple-500 w-8 h-8" />,
    title: "Highlight Key Points",
    description: "Mark essential formulas, definitions, and tips to focus on what matters.",
  },
];

const steps = [
  {
    id: 1,
    title: "Organize Notes",
    description:
      "Arrange your revision notes by subject, topic, and importance to make them easy to access.",
    image: "/revision/organize.jpg",
  },
  {
    id: 2,
    title: "Summarize Key Points",
    description:
      "Highlight and summarize the most important information for faster review sessions.",
    image: "/revision/highlight.jpg",
  },
  {
    id: 3,
    title: "Review Regularly",
    description:
      "Go through your notes periodically to reinforce memory and understanding.",
    image: "/revision/review.jpg",
  },
  {
    id: 4,
    title: "Track Completion",
    description:
      "Mark topics as revised and track your overall progress to ensure comprehensive coverage.",
    image: "/revision/progress.jpg",
  },
];

export default function RevisionNotes({all_notes}) {
  const [visibleAnswers, setVisibleAnswers] = useState(
    Array(all_notes.length).fill(false),
  );

  const toggleAnswer = (index) => {
    const updatedVisibility = [...visibleAnswers];
    updatedVisibility[index] = !updatedVisibility[index];
    setVisibleAnswers(updatedVisibility);
  };
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-32 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Revision Notes
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Access, organize, and review your notes effectively to boost learning and retention.
        </p>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Why Use Revision Notes?
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
          How to Use Revision Notes Effectively
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

export async function getServerSideProps(context){
  const all_notes = getAllNotes();

  if (!all_notes) {
    return {
      notFound: true,
    };
  }

  return {
    props: { all_notes }
  };
}