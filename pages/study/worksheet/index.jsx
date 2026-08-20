// pages/worksheets.js
import { FaClipboardList, FaPenNib, FaFileLines, FaLayerGroup, FaArrowRight, FaBookOpen } from "react-icons/fa6";
import { FaBook, FaCheckCircle } from "react-icons/fa";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { prisma } from "../../../util/db.server";
import { MainHeader } from '../../../components/common/MainHeader';
import { Reveal } from "../../../components/common/Reveal";

const SUBJECT_ICONS = [FaBook, FaPenNib, FaFileLines];

const reasons = [
  {
    icon: <FaClipboardList className="text-4xl text-primary-400" />,
    title: "Structured Practice",
    description:
      "Access well-organized worksheets by topic to reinforce understanding step by step.",
  },
  {
    icon: <FaCheckCircle className="text-4xl text-ocean-500" />,
    title: "Master Key Skills",
    description:
      "Strengthen core exam techniques and apply knowledge effectively through guided questions.",
  },
  {
    icon: <FaPenNib className="text-4xl text-accent-400" />,
    title: "Prepare for Exams",
    description:
      "Revise efficiently with targeted worksheets designed by expert teachers to match your syllabus.",
  },
];

export default function Worksheets({ subjects, totalTopics, totalWorksheets }) {
  return (
    <React.Fragment>
      <MainHeader title="Aceit : Worksheet Page" />
      <div className="min-h-screen py-20">
        {/* Hero */}
        <section className="relative overflow-hidden px-6 pt-36 pb-16 text-center">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 -left-40 h-[34rem] w-[34rem] rounded-full bg-gradient-to-br from-primary-200 to-ocean-300 opacity-50 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-36 -right-40 h-[32rem] w-[32rem] rounded-full bg-gradient-to-br from-accent-200 to-primary-200 opacity-40 blur-3xl"
          />

          <div className="relative max-w-5xl mx-auto">
            <div className="mx-auto mb-10 hover:scale-105 transition-transform duration-300">
              <div className="flex h-28 w-28 mx-auto items-center justify-center rounded-[2rem] bg-gradient-to-br from-primary-500 to-ocean-500 text-white text-5xl shadow-glow">
                <FaClipboardList />
              </div>
            </div>

            <span className="section-eyebrow block mb-6">Aceit · Practice Library</span>
            <h1 className="section-title text-5xl md:text-6xl leading-tight">
              Worksheets, <span className="text-gradient">Perfectly Organized</span>
            </h1>
            <p className="section-subtitle text-lg md:text-xl mt-6 max-w-3xl mx-auto leading-relaxed">
              Practice with structured worksheets that simplify complex topics and help you
              prepare confidently for exams.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a href="#browse" className="btn-primary text-lg">
                Browse Subjects <FaArrowRight className="mt-1" />
              </a>
              <a href="#why" className="btn-ghost text-lg">
                Why Worksheets?
              </a>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="px-6 max-w-6xl mx-auto" id="why">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: subjects.length, label: "Subjects", icon: <FaBookOpen className="text-2xl text-ocean-600" /> },
              { n: totalTopics, label: "Worksheet Topics", icon: <FaLayerGroup className="text-2xl text-ocean-600" /> },
              { n: totalWorksheets, label: "Worksheets", icon: <FaFileLines className="text-2xl text-ocean-600" /> },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 90} className="h-full">
                <div className="glass-card h-full p-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-50 to-ocean-50 text-ocean-600 text-2xl shadow-soft">
                    {s.icon}
                  </div>
                  <p className="section-title text-4xl mt-3">{s.n.toLocaleString()}</p>
                  <p className="text-ink-500 font-semibold mt-2">{s.label}</p>
                  <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary-400 to-ocean-400" />
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Why Use */}
        <section className="px-6 py-16 max-w-6xl mx-auto">
          <div className="max-w-2xl mx-auto mb-12 text-center">
            <span className="section-eyebrow block mb-6">Learn by doing</span>
            <h2 className="section-title text-4xl">Why use worksheets?</h2>
            <p className="section-subtitle mt-3">
              A little practice every day turns hard topics into second nature.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {reasons.map((reason, i) => (
              <Reveal key={reason.title} delay={i * 90} className="h-full">
                <div className="glass-card h-full p-8">
                  <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary-50 to-ocean-50 text-ocean-600">
                    {reason.icon}
                  </div>
                  <h3 className="section-title text-2xl mb-3">{reason.title}</h3>
                  <p className="text-ink-600 leading-relaxed">{reason.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Subject grid */}
        <section id="browse" className="px-6 py-16 max-w-7xl mx-auto">
          <div className="max-w-2xl mx-auto mb-12 text-center">
            <span className="section-eyebrow block mb-6">Choose your path</span>
            <h2 className="section-title text-4xl">All Worksheets by Subject</h2>
            <p className="section-subtitle mt-3">
              Click a subject to uncover its topics. Every card shows how many topics await.
            </p>
          </div>

          {subjects.length === 0 ? (
            <div className="glass-card p-12 text-center max-w-xl mx-auto">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary-100 to-ocean-100 text-ocean-600 text-4xl">
                <FaFileLines />
              </div>
              <h3 className="section-title text-xl mb-2">Nothing here yet</h3>
              <p className="text-ink-500">
                No subjects with worksheets have been added yet. Please check back soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((subject, idx) => (
                <Reveal key={subject.id} className="h-full" delay={(idx % 3) * 90}>
                  <Link
                    href={`/study/worksheet/subject/${subject.id}`}
                    className="glass-card group block h-full overflow-hidden"
                  >
                    <div className="relative w-full h-52 overflow-hidden">
                      {subject.svg ? (
                        <Image
                          src={subject.svg}
                          alt={subject.name}
                          layout="fill"
                          objectFit="cover"
                          className="group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-50 to-ocean-50">
                          {(() => {
                            const Icon = SUBJECT_ICONS[idx % SUBJECT_ICONS.length];
                            return <Icon className="text-6xl text-ocean-600" />;
                          })()}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ocean-600 font-bold shadow-soft">
                        {topicCount(subject)}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="section-title text-2xl group-hover:text-primary-700 transition-colors">
                          {subject.name}
                        </h3>
                        <FaArrowRight className="text-ocean-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition" />
                      </div>
                      <p className="text-ink-500 text-sm mb-4">
                        {topicCount(subject)} worksheet topic(s)
                      </p>
                      <div className="h-1 w-16 rounded-full bg-gradient-to-r from-primary-400 to-ocean-400 group-hover:w-28 transition-all duration-500" />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </section>
      </div>
    </React.Fragment>
  );
}

function topicCount(subject) {
  return subject._count?.WorksheetTopic || 0;
}

export async function getServerSideProps() {
  try {
    const subjects = await prisma.Subject.findMany({
      orderBy: { id: "asc" },
      select: {
        id: true,
        name: true,
        svg: true,
        _count: { select: { WorksheetTopic: true } },
      },
    });

    const totalTopics = await prisma.WorksheetTopic.count();
    const totalWorksheets = await prisma.Worksheet.count();

    return {
      props: {
        subjects: JSON.parse(JSON.stringify(subjects)),
        totalTopics,
        totalWorksheets,
      },
    };
  } catch (error) {
    console.error("Error fetching worksheets:", error);
    return {
      props: {
        subjects: [],
        totalTopics: 0,
        totalWorksheets: 0,
        error: "Failed to load worksheets.",
      },
    };
  }
}
