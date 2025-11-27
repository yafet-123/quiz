// pages/definition-sheets.js
import { FaBook, FaHighlighter, FaClipboardList } from "react-icons/fa";
import Image from "next/image";
import { prisma } from "../../../util/db.server";
import React from "react";
import Subject from "../../../components/definition-sheet/Subject.jsx"; // your display component
import { MainHeader } from '../../../components/common/MainHeader';

const features = [
  {
    id: 1,
    icon: <FaHighlighter className="text-yellow-500 w-10 h-10" />,
    title: "Definition Sheets",
    description: "Organize and access your definition sheets quickly for efficient learning.",
  },
];

const reasons = [
  {
    id: 1,
    icon: <FaBook className="text-blue-500 w-8 h-8" />,
    title: "Quick Reference",
    description: "Revisit key terms and definitions anytime for faster understanding.",
  },
  {
    id: 2,
    icon: <FaClipboardList className="text-green-500 w-8 h-8" />,
    title: "Track Learning",
    description: "Check which topics you have learned and which need more attention.",
  },
  {
    id: 3,
    icon: <FaHighlighter className="text-purple-500 w-8 h-8" />,
    title: "Highlight Important Terms",
    description: "Focus on essential terms and concepts for better retention.",
  },
];

export default function DefinitionSheets({ subjects }) {
  return (
    <React.Fragment>
      <MainHeader title="Aceit : Revision Note Page" />
      <div className="bg-gray-50 min-h-screen py-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-32 text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Definition Sheets
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Access, organize, and review your definition sheets effectively to boost learning and retention.
          </p>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-6 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Use Definition Sheets?
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

        {/* Definition Sheets Section */}
        <section className="py-16 px-6 bg-gray-50">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            All Definition Sheets by Subject
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
    // Fetch subjects with definition sheets and definitions
    const subjects = await prisma.Subject.findMany({
      orderBy: { id: "asc" },
      include: {
        DefinitionSheet: {
          include: {
            Definitions: true,
            User: true, // creator of the sheet
          },
        },
      },
    });

    return {
      props: {
        subjects: JSON.parse(JSON.stringify(subjects)), // serialize dates
      },
    };
  } catch (error) {
    console.error("Error fetching definition sheets:", error);
    return {
      props: {
        subjects: [],
        error: "Failed to load definition sheets.",
      },
    };
  }
}
