// pages/articles.js
import { FaBook, FaBookmark, FaSearch, FaCloudDownloadAlt, FaCheckCircle, FaNewspaper, FaBookOpen } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link"
import Subject from "../../../../components/articles/subject.jsx"
import { prisma } from "../../../../util/db.server";
import { MainHeader } from '../../../../components/common/MainHeader';
import React from "react";

const features = [
  {
    id: 1,
    icon: <FaBookOpen className="text-green-600 w-10 h-10" />,
    title: "Subject-wise Articles",
    path: "/study/articles/subject",
    description:
      "Explore articles categorized by subject for easy navigation and targeted learning.",
  },
  {
    id: 2,
    icon: <FaNewspaper className="text-orange-500 w-10 h-10" />,
    title: "Educational Articles",
    path: "/study/articles/all",
    description:
      "Read insightful articles, research summaries, and educational content across various topics.",
  },
];

const reasons = [
  {
    id: 1,
    icon: <FaBook className="text-green-500 w-8 h-8" />,
    title: "Comprehensive Resources",
    description: "Access a wide range of articles covering all subjects and topics.",
  },
  {
    id: 2,
    icon: <FaBookmark className="text-yellow-500 w-8 h-8" />,
    title: "Personalized Learning",
    description: "Choose articles based on your interests and learning goals.",
  },
  {
    id: 3,
    icon: <FaCheckCircle className="text-green-600 w-8 h-8" />,
    title: "Trusted Sources",
    description: "All articles are curated from reliable educational and academic sources.",
  },
  {
    id: 4,
    icon: <FaCloudDownloadAlt className="text-blue-500 w-8 h-8" />,
    title: "Easy Access",
    description: "Read online instantly on any device—desktop, tablet, or mobile.",
  },
];


export default function Articles({subjects}) {
  return (
    <React.Fragment>
      <MainHeader title="Aceit : Article Page" />
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-32 text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Educational Articles</h1>
          <p className="text-lg md:text-xl mb-8">
            Access curated articles, guides, and educational content to enhance your learning experience.
          </p>
          <Link href="#Article"> 
            <a className="bg-white text-purple-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
              Browse Articles
            </a>
          </Link>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Use Our Article Library?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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

        {/* Features Section */}
        <section id="Article" className="py-16 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Article Categories
          </h2>
          <Subject subjects={subjects} />
        </section>
      </div>
    </React.Fragment>
  );
}

export async function getServerSideProps() {
  try {
    // Fetch all subjects with relations
    const subjects = await prisma.Subject.findMany({
       
      orderBy: {
        id: "asc",
      },
    });
    console.log(subjects)
    return {
      props: {
        subjects: JSON.parse(JSON.stringify(subjects)), // serialize dates
      },
    };
  } catch (error) {
    console.error("Error fetching subjects:", error);
    return {
      props: {
        subjects: [],
        error: "Failed to load subjects.",
      },
    };
  }
}