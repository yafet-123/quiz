import { FaBook, FaFolderOpen, FaStar } from "react-icons/fa";
import React from "react";
import { prisma } from "../../../util/db.server";
import { MainHeader } from "../../../components/common/MainHeader";
import Subject from "../../../components/books/Subject"; // reuse same subject component

const reasons = [
  {
    id: 1,
    icon: <FaBook className="text-blue-500 w-8 h-8" />,
    title: "Find Recommended Books",
    description: "Access top-quality textbooks organized by subject.",
  },
  {
    id: 2,
    icon: <FaFolderOpen className="text-green-500 w-8 h-8" />,
    title: "Study Easily",
    description: "All your required and reference books in one place.",
  },
  {
    id: 3,
    icon: <FaStar className="text-yellow-500 w-8 h-8" />,
    title: "Boost Understanding",
    description: "Use well-structured books to improve your learning.",
  },
];

export default function Books({ subjects }) {
  console.log(subjects);
  return (
    <React.Fragment>
      <MainHeader title="Aceit: Books" />
      <div className="bg-gray-50 min-h-screen py-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-32 text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Books</h1>
          <p className="text-lg md:text-xl mb-8">
            Access recommended textbooks and reading materials.
          </p>
        </section>

        {/* Why Use Books */}
        <section className="py-16 px-6 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Use Books?
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

        {/* Books List */}
        <section className="py-16 px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            All Books by Subject
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
        Book: true, // Your Prisma must have a Book model
      },
    });

    return {
      props: { subjects: JSON.parse(JSON.stringify(subjects)) },
    };
  } catch (error) {
    console.error("Error loading books:", error);
    return {
      props: { subjects: [], error: "Failed to load books." },
    };
  }
}
