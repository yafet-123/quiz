import { FaYoutube, FaPlayCircle, FaVideo } from "react-icons/fa";
import React from "react";
import { prisma } from "../../../util/db.server";
import { MainHeader } from "../../../components/common/MainHeader";
import Subject from "../../../components/books/Subject";

const reasons = [
  {
    id: 1,
    icon: <FaYoutube className="text-red-500 w-8 h-8" />,
    title: "Learn Visually",
    description: "Watch high-quality YouTube lessons for every subject.",
  },
  {
    id: 2,
    icon: <FaPlayCircle className="text-blue-500 w-8 h-8" />,
    title: "Easy to Understand",
    description:
      "Videos break down difficult concepts and make studying simple.",
  },
  {
    id: 3,
    icon: <FaVideo className="text-purple-500 w-8 h-8" />,
    title: "Learn Anytime",
    description: "Watch lessons anywhere, anytime at your own pace.",
  },
];

export default function YoutubeLinks({ subjects }) {
  return (
    <React.Fragment>
      <MainHeader title="Aceit: YouTube Lessons" />
      <div className="bg-gray-50 min-h-screen py-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-red-500 to-pink-600 text-white py-32 text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            YouTube Lessons
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Access curated YouTube videos for easier understanding.
          </p>
        </section>

        {/* Why Use Youtube */}
        <section className="py-16 px-6 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Use YouTube Lessons?
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
                <p className="text-gray-600 text-center">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* YouTube Links List */}
        <section className="py-16 px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            All YouTube Lessons by Subject
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
        YoutubeLink: true, // Requires Prisma model `YoutubeLinks`
      },
    });

    return {
      props: { subjects: JSON.parse(JSON.stringify(subjects)) },
    };
  } catch (error) {
    console.error("Error loading YouTube links:", error);
    return {
      props: { subjects: [], error: "Failed to load YouTube links." },
    };
  }
}
