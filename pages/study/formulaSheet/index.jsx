// pages/formula-sheets.js
import { FaBook, FaHighlighter, FaClipboardList } from "react-icons/fa";
import Image from "next/image";
import { prisma } from "../../../util/db.server";
import Subject from "../../../components/formula-sheet/Subject"; // Adjust this to your component
import { MainHeader } from '../../../components/common/MainHeader';
import React from "react";

const reasons = [
  {
    id: 1,
    icon: <FaBook className="text-blue-500 w-8 h-8" />,
    title: "Quick Reference",
    description: "Access formulas instantly for fast problem-solving and revision.",
  },
  {
    id: 2,
    icon: <FaClipboardList className="text-green-500 w-8 h-8" />,
    title: "Organize Formulas",
    description: "Keep formulas grouped by topic and subject for easier learning.",
  },
  {
    id: 3,
    icon: <FaHighlighter className="text-purple-500 w-8 h-8" />,
    title: "Highlight Key Formulas",
    description: "Identify important formulas quickly for exams or assignments.",
  },
];

const steps = [
  {
    id: 1,
    title: "Select a Subject",
    description: "Pick the subject you want to review formulas for.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "Choose a Formula Sheet",
    description: "Browse through the formula sheets and select the topic you want.",
    image: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "Review Formulas",
    description: "Go through the formulas, read the explanations, and memorize key equations.",
    image: "https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    title: "Practice Applying Formulas",
    description: "Use the formulas in example problems to reinforce understanding.",
    image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function FormulaSheets({ subjects }) {
  return (
    <React.Fragment>
      <MainHeader title="Aceit : FormulaSheet Page" />
      <div className="bg-gray-50 min-h-screen py-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-32 text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Formula Sheets
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Access, organize, and review your formulas for better learning.
          </p>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-6 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Use Formula Sheets?
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
        {/* <section className="py-16 px-6 bg-gray-50">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            How to Use Formula Sheets
          </h2>

          <div className="max-w-6xl mx-auto space-y-12">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex flex-col md:flex-row items-center ${
                  index % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}
              >
        
                <div className="relative w-full lg:w-1/2 !h-[30rem] relative">
                  <Image
                    src={step.image}
                    alt={step.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-2xl shadow-lg"
                  />
                </div>

                <div className="lg:w-1/2 w-full md:px-12 mt-6 md:mt-0">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-lg">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section> */}
        <section className="py-16 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-5 text-gray-800">
            Browse FormulaSheet by Subject
          </h2>
          {/* Formula Sheets by Subject */}
          <Subject subjects={subjects} />
        </section>
      </div>
    </React.Fragment>
  );
}

export async function getServerSideProps() {
  try {
    const subjects = await prisma.Subject.findMany({
      include: { FormulaSheet: true },
      orderBy: { id: "asc" },
    });
    console.log(subjects)
    return {
      props: {
        subjects: JSON.parse(JSON.stringify(subjects)),
      },
    };
  } catch (error) {
    console.error("Error fetching subjects:", error);
    return {
      props: { subjects: [] },
    };
  }
}
