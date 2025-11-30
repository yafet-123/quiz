// pages/exam-preparation.js
import { FaBook, FaFileAlt, FaClipboardCheck } from "react-icons/fa";
import React from "react";
import { prisma } from "../../../util/db.server";
import { MainHeader } from "../../../components/common/MainHeader";
import Subject from "../../../components/exampreparation/Subject"; // Your display component

const features = [
  {
    id: 1,
    icon: <FaFileAlt className="text-green-500 w-10 h-10" />,
    title: "Exam Preparation",
    description: "Access organized books, notes, and exam materials easily.",
  },
];

const reasons = [
  {
    id: 1,
    icon: <FaBook className="text-blue-500 w-8 h-8" />,
    title: "Study Faster",
    description: "Find all exam materials in one place with no distractions.",
  },
  {
    id: 2,
    icon: <FaClipboardCheck className="text-green-500 w-8 h-8" />,
    title: "Stay Organized",
    description: "Every subject contains the recommended books and links.",
  },
  {
    id: 3,
    icon: <FaFileAlt className="text-orange-500 w-8 h-8" />,
    title: "Boost Performance",
    description: "Use curated books and revision guides for exam success.",
  },
];

export default function ExamPreparation({ subjects }) {
  return (
    <React.Fragment>
      <MainHeader title="Aceit: Exam Preparation" />
      <div className="bg-gray-50 min-h-screen py-20">

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-32 text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Exam Preparation
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Access organized exam materials and boost your performance.
          </p>
        </section>

        {/* Why Use Section */}
        <section className="py-16 px-6 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Use Exam Preparation?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
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

        {/* Exam Preparation List */}
        <section className="py-16 px-6 bg-gray-50">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            All Exam Preparation by Subject
          </h2>

          <div className="max-w-6xl mx-auto">
            <Subject subjects={subjects} />
          </div>
        </section>

      </div>
    </React.Fragment>
  );
}

export async function getServerSideProps() {
  try {
    const subjects = await prisma.Subject.findMany({
      orderBy: { id: "asc" },
      include: {
        ExamPreparation: true
        
      },
    });
    console.log(subjects)
    return {
      props: {
        subjects: JSON.parse(JSON.stringify(subjects)),
      },
    };
  } catch (error) {
    console.error("Error fetching exam preparation:", error);
    return {
      props: {
        subjects: [],
        error: "Failed to load exam preparation.",
      },
    };
  }
}
