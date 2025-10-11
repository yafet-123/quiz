// pages/books.js
import { FaBook, FaBookmark, FaSearch, FaCloudDownloadAlt, FaCheckCircle, FaBookOpen, FaUniversity, FaNewspaper } from "react-icons/fa";
import Image from "next/image";

const features = [
  {
    id: 1,
    icon: <FaBookOpen className="text-green-600 w-10 h-10" />,
    title: "Digital Supplementary Books",
    path: "/study/books/digital",
    description:
      "Explore a wide range of supplementary learning materials to enhance your studies and understanding.",
  },
  {
    id: 2,
    icon: <FaUniversity className="text-blue-500 w-10 h-10" />,
    title: "Digital Government Books",
    path: "/study/books/government",
    description:
      "Access official government-published books and resources easily in one digital platform.",
  },
  {
    id: 3,
    icon: <FaNewspaper className="text-orange-500 w-10 h-10" />,
    title: "Articles",
    path: "/study/books/article",
    description:
      "Read insightful educational articles, research papers, and academic write-ups across various subjects.",
  },
  {
    id: 4,
    icon: <FaSearch className="text-purple-500 w-10 h-10" />,
    title: "Search Within Books",
    path: "/study/books/search",
    description:
      "Quickly find specific topics, keywords, or chapters inside any book or article with our powerful search tool.",
  },
];


const reasons = [
  {
    id: 1,
    icon: <FaBook className="text-green-500 w-8 h-8" />,
    title: "Comprehensive Resources",
    description: "Access a wide range of books covering all subjects and levels.",
  },
  {
    id: 2,
    icon: <FaBookmark className="text-yellow-500 w-8 h-8" />,
    title: "Personalized Reading",
    description: "Choose books based on your interests and study goals.",
  },
  {
    id: 3,
    icon: <FaCheckCircle className="text-green-600 w-8 h-8" />,
    title: "Trusted Material",
    description: "All books are selected from reliable academic and educational sources.",
  },
  {
    id: 4,
    icon: <FaCloudDownloadAlt className="text-blue-500 w-8 h-8" />,
    title: "Easy Access",
    description: "Download or read instantly on any device—desktop, tablet, or mobile.",
  },
];

const steps = [
  {
    id: 1,
    title: "Browse the Collection",
    description:
      "Explore categories such as science, mathematics, history, and literature to find the books you need.",
    image: "/books/books-browse.jpg",
  },
  {
    id: 2,
    title: "Preview Before Reading",
    description:
      "Check summaries, author details, and chapter lists before diving into a book.",
    image: "/books/books-preview.jpg",
  },
  {
    id: 3,
    title: "Add to Your Library",
    description:
      "Save books to your personal library for easy access anytime.",
    image: "/books/books-library.jpg",
  },
  {
    id: 4,
    title: "Read & Highlight",
    description:
      "Open your favorite books, read online or offline, and highlight key sections for review.",
    image: "/books/books-read.jpg",
  },
];

export default function Books() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-32 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Educational Books</h1>
        <p className="text-lg md:text-xl mb-8">
          Access curated digital books, guides, and textbooks to enrich your learning experience.
        </p>
        <button className="bg-white text-green-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
          Browse Books
        </button>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Why Use Our Digital Library?
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

      {/* Steps Section */}
      <section className="px-6 bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          How to Use the Book Library
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
          Key Book Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <Link
              key={feature.id}
              href={feature.path}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center space-y-4"
            >
              <a>
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </a>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
