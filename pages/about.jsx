// pages/about.js
import React from "react";
import Image from "next/image";
import {
  FaUsers,
  FaBookOpen,
  FaChartLine,
  FaRegLightbulb,
  FaTwitter,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";

export default function AboutPage() {
  const stats = [
    { label: "Students helped", value: "120k+" },
    { label: "Notes published", value: "8k+" },
    { label: "Practice questions", value: "45k+" },
    { label: "Countries", value: "70+" },
  ];

  const team = [
  {
    name: "Emily Roberts",
    role: "Head of Content",
    img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "James King",
    role: "Lead Developer",
    img: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Sara Lopez",
    role: "Product & Design",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Omar Tekle",
    role: "Community Lead",
    img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=500&q=80",
  },
];

  const testimonials = [
    { name: "Amina", quote: "SavedMyExams style notes simplified the whole syllabus helped me gain two grades!" },
    { name: "Daniel", quote: "Practical practice quizzes and clear answers excellent site." },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* HERO */}
      <header className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-indigo-700">
                We make exam prep simple so you can focus on learning.
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-2xl">
                Study resources, past papers, and practice quizzes built by teachers and exam experts.
                Trusted by students worldwide to revise smarter and achieve better results.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/signup"
                  className="inline-flex items-center justify-center px-6 py-3 bg-indigo-700 text-white rounded-lg shadow hover:bg-indigo-800 transition"
                >
                  {`Get started — it's free`}
                </a>
                <a
                  href="/subjects"
                  className="inline-flex items-center justify-center px-6 py-3 border border-indigo-200 rounded-lg text-indigo-700 hover:bg-indigo-50 transition"
                >
                  Browse subjects
                </a>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-xl transform hover:scale-102 transition">
                <Image
                  src="https://via.placeholder.com/720x480"
                  alt="Study illustration"
                  width={720}
                  height={480}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MISSION / FEATURES */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold text-gray-900">Our mission</h2>
              <p className="mt-4 text-gray-600">
                To make high-quality revision materials available to every student.
                We simplify syllabus content, provide worked answers and realistic practice so revision feels 
                productive and focused.
              </p>
            </div>

            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow">
                <div className="flex items-center gap-4">
                  <FaRegLightbulb className="text-indigo-600 text-2xl" />
                  <div>
                    <h3 className="font-semibold">Clear explanations</h3>
                    <p className="text-sm text-gray-600 mt-1">Concise notes written by experienced teachers.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow">
                <div className="flex items-center gap-4">
                  <FaBookOpen className="text-indigo-600 text-2xl" />
                  <div>
                    <h3 className="font-semibold">Practise & test</h3>
                    <p className="text-sm text-gray-600 mt-1">Lots of exam style questions with full answers.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow">
                <div className="flex items-center gap-4">
                  <FaUsers className="text-indigo-600 text-2xl" />
                  <div>
                    <h3 className="font-semibold">Student focused</h3>
                    <p className="text-sm text-gray-600 mt-1">Resources shaped by student feedback and performance data.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow">
                <div className="flex items-center gap-4">
                  <FaChartLine className="text-indigo-600 text-2xl" />
                  <div>
                    <h3 className="font-semibold">Track progress</h3>
                    <p className="text-sm text-gray-600 mt-1">See improvements and target weak topics efficiently.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-indigo-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {stats.map((s, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow">
                <div className="text-2xl font-bold text-indigo-700">{s.value}</div>
                <div className="mt-2 text-sm text-gray-600">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Meet the team</h2>
            <p className="text-sm text-gray-600">A small team with big experience in education & tech.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow p-6 text-center">
                <div className="mx-auto w-32 h-32 relative rounded-full overflow-hidden mb-4">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-indigo-700 text-white py-14">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-6">What students say</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white/10 p-6 rounded-lg">
                <p className="italic">“{t.quote}”</p>
                <div className="mt-4 font-semibold">{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to level up your revision?</h3>
          <p className="text-gray-600 mb-6">Join thousands of students using our resources to boost their grades.</p>
          <a href="/signup" className="inline-flex items-center px-6 py-3 bg-indigo-700 text-white rounded-lg shadow hover:bg-indigo-800 transition">
            {`Create an account — it's free`}
          </a>
        </div>
      </section>
    </div>
  );
}
