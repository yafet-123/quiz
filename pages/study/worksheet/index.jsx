// pages/worksheets.js
import { FaBookOpen, FaPenFancy, FaCheckDouble } from "react-icons/fa";
import Image from "next/image";
import WorksheetSubject from "../../../components/books/WorksheetSubject";
import { prisma } from "../../../util/db.server";
import { MainHeader } from '../../../components/common/MainHeader';
import React from "react";

const reasons = [
  {
    id: 1,
    icon: <FaBookOpen className="text-blue-500 w-8 h-8" />,
    title: "Structured Practice",
    description:
      "Access well-organized worksheets by topic to reinforce understanding step by step.",
  },
  {
    id: 2,
    icon: <FaPenFancy className="text-green-500 w-8 h-8" />,
    title: "Master Key Skills",
    description:
      "Strengthen core exam techniques and apply knowledge effectively through guided questions.",
  },
  {
    id: 3,
    icon: <FaCheckDouble className="text-yellow-500 w-8 h-8" />,
    title: "Prepare for Exams",
    description:
      "Revise efficiently with targeted worksheets designed by expert teachers to match your syllabus.",
  },
];

const steps = [
  {
    id: 1,
    title: "Choose Your Subject",
    description:
      "Select a subject that you want to focus on, from Math to Science or Languages.",
    image: "https://images.unsplash.com/photo-1584697964354-3c22b379fb53?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "Download or Practice Online",
    description:
      "Access printable or digital worksheets tailored for different exam boards and levels.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "Work Through Step-by-Step Questions",
    description:
      "Follow a gradual difficulty curve that helps you build confidence in each topic.",
    image: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    title: "Check Answers and Learn",
    description:
      "Use detailed solutions to understand mistakes and learn how to write perfect answers.",
    image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function Worksheets({ subjects }) {
  return (
    <React.Fragment>
      <MainHeader title="Aceit : Worksheet Page" />
      <div className="bg-gray-50 min-h-screen py-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-32 text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Worksheets for Every Subject
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            Practice with structured worksheets that simplify complex topics and
            help you prepare confidently for exams.
          </p>
        </section>

        {/* Why Use Worksheets */}
        <section className="py-16 px-6 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Use Our Worksheets?
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

        {/* How to Use Worksheets */}
        {/* <section className="py-16 px-6 bg-gray-50">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            How to Make the Most of Worksheets
          </h2>

          <div className="max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex flex-col md:flex-row items-center mb-16 ${
                  index % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}
              >
            
                <div className="relative w-full lg:w-1/2 h-[25rem]">
                  <Image
                    src={step.image}
                    alt={step.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-2xl shadow-md"
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

        {/* Browse Section */}
        <section className="py-16 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-5 text-gray-800">
            Browse Worksheets by Subject
          </h2>
          <WorksheetSubject subjects={subjects} />
        </section>
      </div>
    </React.Fragment>
  );
}

export async function getServerSideProps() {
  try {
    const subjects = await prisma.Subject.findMany({
      orderBy: { id: "asc" },
    });

    return {
      props: {
        subjects: JSON.parse(JSON.stringify(subjects)),
      },
    };
  } catch (error) {
    console.error("Error fetching subjects:", error);
    return {
      props: { subjects: [], error: "Failed to load subjects." },
    };
  }
}
