import { MainHeader } from '../components/common/MainHeader';
import React from "react";
import Link from "next/link"
import Image from "next/image";
import { Reveal } from '../components/common/Reveal';
import {
  FaUsers,
  FaBookOpen,
  FaChartLine,
  FaRegLightbulb,
  FaArrowRight,
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
    <React.Fragment>
      <MainHeader title="Aceit : About Page" />
      <div className="font-sans text-ink-800 min-h-screen overflow-hidden">
        {/* HERO */}
        <section className="relative pt-28 md:pt-36 pb-16 md:pb-20 px-4 md:px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="section-eyebrow">About Aceit</span>
                <h1 className="section-title text-4xl md:text-5xl leading-tight mt-4 animate-fadeDown">
                  We make exam prep simple so you can <span className="text-gradient">focus on learning.</span>
                </h1>
                <Reveal delay={120}>
                  <p className="text-lg text-ink-500 max-w-2xl mt-6 leading-relaxed">
                    My name is Hiyabeal Assefa, a student who was once in your shoes. I’ve experienced the
                    pressure, the uncertainty, and the challenge of preparing for exams, and I
                    understand how overwhelming it can feel.
                  </p>
                </Reveal>
                <Reveal delay={200}>
                  <p className="text-lg text-ink-500 max-w-2xl mt-6 leading-relaxed">
                    Using the knowledge and experience I gained throughout my own exam journey, I’m committed
                    to providing clear, reliable, and student-focused guidance. My goal is to make exam
                    preparation more organised, efficient, and confidence-building for every learner.
                  </p>
                </Reveal>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/signup">
                    <a className="btn-primary text-lg">
                      {`Get started. It's free`}
                      <FaArrowRight />
                    </a>
                  </Link>
                </div>
              </div>

              <Reveal variant="right" delay={160}>
                <div className="flex items-center justify-center">
                  <div className="w-full max-w-md rounded-3xl overflow-hidden shadow-card ring-1 ring-white/60">
                    {/* Using native img tag for external URL - more reliable on Vercel */}
                    <img
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=720&q=80"
                      alt="Students studying together"
                      width={720}
                      height={480}
                      className="object-cover w-full h-auto"
                      loading="lazy"
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* MISSION / FEATURES */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
              <Reveal className="md:col-span-1">
                <h2 className="section-title text-3xl">Our mission</h2>
                <p className="text-ink-500 mt-4 leading-relaxed">
                  To make high-quality revision materials available to every student.
                  We simplify syllabus content, provide worked answers and realistic practice so revision feels
                  productive and focused.
                </p>
              </Reveal>

              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Reveal className="h-full">
                  <div className="glass-card p-7 h-full flex items-center gap-5">
                    <span className="p-4 rounded-2xl bg-gradient-to-br from-primary-50 to-ocean-50 text-ocean-500 text-2xl shadow-soft ring-1 ring-white">
                      <FaRegLightbulb />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-ink-800">Clear explanations</h3>
                      <p className="text-sm text-ink-500 mt-1">Concise notes written by experienced teachers.</p>
                    </div>
                  </div>
                </Reveal>

                <Reveal className="h-full stagger-1">
                  <div className="glass-card p-7 h-full flex items-center gap-5">
                    <span className="p-4 rounded-2xl bg-gradient-to-br from-primary-50 to-ocean-50 text-ocean-500 text-2xl shadow-soft ring-1 ring-white">
                      <FaBookOpen />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-ink-800">Practise & test</h3>
                      <p className="text-sm text-ink-500 mt-1">Lots of exam style questions with full answers.</p>
                    </div>
                  </div>
                </Reveal>

                <Reveal className="h-full stagger-2">
                  <div className="glass-card p-7 h-full flex items-center gap-5">
                    <span className="p-4 rounded-2xl bg-gradient-to-br from-primary-50 to-ocean-50 text-ocean-500 text-2xl shadow-soft ring-1 ring-white">
                      <FaUsers />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-ink-800">Student focused</h3>
                      <p className="text-sm text-ink-500 mt-1">Resources shaped by student feedback and performance data.</p>
                    </div>
                  </div>
                </Reveal>

                <Reveal className="h-full stagger-3">
                  <div className="glass-card p-7 h-full flex items-center gap-5">
                    <span className="p-4 rounded-2xl bg-gradient-to-br from-primary-50 to-ocean-50 text-ocean-500 text-2xl shadow-soft ring-1 ring-white">
                      <FaChartLine />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-ink-800">Track progress</h3>
                      <p className="text-sm text-ink-500 mt-1">See improvements and target weak topics efficiently.</p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        {/* <section className="bg-indigo-50 py-12">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {stats.map((s, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow">
                  <div className="text-2xl font-bold text-[#417094]">{s.value}</div>
                  <div className="mt-2 text-sm text-gray-600">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* TEAM */}
        {/* <section className="py-14">
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
        </section> */}

        {/* TESTIMONIALS */}
        {/* <section className="bg-[#417094] text-white py-14">
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
        </section> */}

        {/* CTA */}
        <section className="py-20 px-6 pb-24">
          <Reveal>
            <div className="glass-card max-w-4xl mx-auto p-10 md:p-14 text-center">
              <FaArrowRight className="text-4xl mx-auto mb-4 text-primary-500" />
              <h3 className="section-title text-3xl mb-3">Ready to level up your revision?</h3>
              <p className="text-ink-500 text-lg mb-8 max-w-xl mx-auto">Join thousands of students using our resources to boost their grades.</p>
              <Link href="/signup">
                <a className="btn-primary text-lg">
                  {`Create an account. it's free`}
                </a>
              </Link>
            </div>
          </Reveal>
        </section>
      </div>
    </React.Fragment>
  );
}
