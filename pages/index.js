// pages/index-replica.js
import { FaBookOpen, FaGraduationCap, FaChartLine, FaArrowRight } from "react-icons/fa";

export default function Home() {
  return (
    <div className="font-sans text-gray-800">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-600">Save My Exams</h1>
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
          <li>Home</li>
          <li>Subjects</li>
          <li>Resources</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
        <button className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700">
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <section className="bg-purple-50 py-20 text-center px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-purple-700 mb-4">
          Study Smarter. Not Harder.
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Trusted by thousands of students to ace their GCSEs, IGCSEs, A Levels, and more.
        </p>
        <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700">
          Get Started
        </button>
      </section>

      {/* Subjects */}
      <section className="py-16 px-6 bg-white">
        <h3 className="text-3xl font-bold text-center text-purple-700 mb-10">
          Explore Subjects
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {["Biology", "Chemistry", "Physics", "Maths", "Geography", "Economics", "History", "English"].map(
            (subject, index) => (
              <div
                key={index}
                className="border rounded-xl shadow-md p-6 text-center hover:bg-purple-50 transition"
              >
                <FaBookOpen className="text-purple-600 text-4xl mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-800">{subject}</h4>
              </div>
            )
          )}
        </div>
      </section>

      {/* Features */}
      <section className="bg-purple-50 py-16 px-6">
        <h3 className="text-3xl font-bold text-center text-purple-700 mb-10">
          Why Students Love Us
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <FaGraduationCap className="text-5xl text-purple-600 mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2">Expert Resources</h4>
            <p>Carefully crafted study materials written by top teachers.</p>
          </div>
          <div>
            <FaChartLine className="text-5xl text-purple-600 mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2">Track Progress</h4>
            <p>Monitor your improvement across subjects and topics.</p>
          </div>
          <div>
            <FaArrowRight className="text-5xl text-purple-600 mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2">Exam Success</h4>
            <p>Build confidence and achieve the grades you deserve.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-purple-600 text-center text-white">
        <h3 className="text-4xl font-bold mb-4">Start Acing Your Exams Today</h3>
        <p className="text-lg mb-8">
          Join thousands of students who trust Save My Exams to boost their grades.
        </p>
        <button className="bg-white text-purple-700 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100">
          Join Now
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center">
        <p>&copy; {new Date().getFullYear()} Save My Exams. All rights reserved.</p>
      </footer>
    </div>
  );
}
