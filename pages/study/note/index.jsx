import { FaBook, FaHighlighter, FaClipboardList, FaBookOpen, FaArrowRight, FaFilePdf, FaFlask, FaLayerGroup } from "react-icons/fa";
import Image from "next/image";
import { prisma } from "../../../util/db.server";
import React from "react";
import Link from "next/link";
import { MainHeader } from "../../../components/common/MainHeader";
import { Reveal } from "../../../components/common/Reveal";

const SUBJECT_ICONS = [FaBook, FaHighlighter, FaClipboardList, FaFlask];

const reasons = [
  {
    icon: <FaHighlighter className="text-yellow-500 w-10 h-10" />,
    title: "Quick Review",
    description: "Revisit key topics and important concepts anytime for faster revision.",
  },
  {
    icon: <FaClipboardList className="text-green-500 w-8 h-8" />,
    title: "Track Progress",
    description: "Check which topics you have revised and which need more attention.",
  },
  {
    icon: <FaBookOpen className="text-purple-500 w-8 h-8" />,
    title: "Highlight Key Points",
    description: "Mark essential formulas, definitions, and tips to focus on what matters.",
  },
];

export default function Notes({ subjects, totalCategories, totalNotes }) {
  return (
    <React.Fragment>
      <MainHeader title="Aceit : Notes" />

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-36 pb-16 text-center">
        <div aria-hidden className="pointer-events-none absolute -top-40 -left-40 h-[34rem] w-[34rem] rounded-full bg-gradient-to-br from-primary-200 to-ocean-300 opacity-50 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-36 -right-40 h-[32rem] w-[32rem] rounded-full bg-gradient-to-br from-accent-200 to-primary-200 opacity-40 blur-3xl" />
        <div className="relative max-w-5xl mx-auto">
          <div className="mx-auto mb-10 hover:scale-105 transition-transform duration-300">
            <div className="flex h-28 w-28 mx-auto items-center justify-center rounded-[2rem] bg-gradient-to-br from-primary-500 to-ocean-500 text-white text-5xl shadow-glow">
              <FaBookOpen />
            </div>
          </div>

          <span className="section-eyebrow block mb-6">Aceit · Notes Library</span>
          <h1 className="section-title text-5xl md:text-6xl leading-tight">
            Notes, <span className="text-gradient">Perfectly Organized</span>
          </h1>
          <p className="section-subtitle text-lg md:text-xl mt-6 max-w-3xl mx-auto leading-relaxed">
            Clear, well-organized notes for every subject to simplify learning and
            make revision faster and more effective.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href="#browse" className="btn-primary text-lg">
              Browse Subjects <FaArrowRight className="mt-1" />
            </a>
            <a href="#why" className="btn-ghost text-lg">
              Why Use Notes?
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 max-w-6xl mx-auto" id="why">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { n: subjects.length, label: "Subjects", ico: <FaBookOpen className="text-primary-500" /> },
            { n: totalCategories, label: "Categories", ico: <FaLayerGroup className="text-ocean-500" /> },
            { n: totalNotes, label: "Notes", ico: <FaFilePdf className="text-accent-500" /> },
          ].map((stat, idx) => (
            <Reveal key={stat.label} delay={(idx % 3) * 90}>
              <div className="glass-card p-6 text-center">
                <div className="flex justify-center mb-2 text-3xl">{stat.ico}</div>
                <div className="text-4xl font-bold text-gradient mb-1">{stat.n}</div>
                <p className="text-ink-500 text-sm">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Why use */}
      <section className="px-6 max-w-6xl mx-auto py-20">
        <div className="text-center mb-16">
          <span className="section-eyebrow block mb-4">Aceit · Why Use Notes?</span>
          <h2 className="section-title text-4xl md:text-5xl leading-tight mx-auto">
            Learn Faster, Remember Longer
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((reason, idx) => (
            <Reveal key={reason.title} delay={(idx % 3) * 90} className="h-full">
              <div className="glass-card h-full p-8 text-center">
                <div className="flex justify-center mb-6">{reason.icon}</div>
                <h3 className="text-xl font-semibold text-ink-800 mb-3">{reason.title}</h3>
                <p className="text-ink-500 text-sm leading-relaxed">{reason.description}</p>
              </div>
            </Reveal>
          ))}
                </div>
      </section>

      {/* Browse */}
      <section className="px-6 pb-24" id="browse">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-4">
            <span className="section-eyebrow block mb-4">Aceit · Browse by subject</span>
            <h2 className="section-title text-4xl md:text-5xl leading-tight mx-auto">
              Choose a Subject
            </h2>
          </div>

          {subjects.length === 0 ? (
            <div className="glass-card p-12 text-center max-w-xl mx-auto">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary-100 to-ocean-100 text-ocean-600 text-4xl">
                <FaFilePdf />
              </div>
              <h3 className="section-title text-xl mb-2">Nothing here yet</h3>
              <p className="text-ink-500">
                There are currently no notes available. Please check back later.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {subjects.map((subject, idx) => (
                <Reveal key={subject.id} className="h-full" delay={(idx % 6) * 80}>
                  <Link
                    href={`/study/note/subject/${subject.id}`}
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
                        {subject._count?.NoteCategory || 0}
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
                        {subject._count?.NoteCategory || 0} categor{subject._count?.NoteCategory === 1 ? "y" : "ies"}
                      </p>
                      <div className="h-1 w-16 rounded-full bg-gradient-to-r from-primary-400 to-ocean-400 group-hover:w-28 transition-all duration-500" />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </React.Fragment>
  );
}

export async function getServerSideProps() {
  try {
    const subjectsRaw = await prisma.Subject.findMany({
      orderBy: { id: "asc" },
      select: {
        id: true,
        name: true,
        svg: true,
        NoteCategory: {
          select: {
            _count: {
              select: { Note: true },
            },
          },
        },
      },
    });

    const subjects = subjectsRaw
      .map((subject) => {
        const totalNotesInSubject = subject.NoteCategory.reduce(
          (sum, cat) => sum + cat._count.Note,
          0
        );

        return {
          id: subject.id,
          name: subject.name,
          svg: subject.svg,
          _count: { NoteCategory: subject.NoteCategory.length },
          totalNotesInSubject,
        };
      })
      .filter((subject) => subject.totalNotesInSubject > 0); // hide subjects with no actual notes

    const totalCategories = await prisma.NoteCategory.count();
    const totalNotes = await prisma.Note.count();

    return {
      props: {
        subjects: JSON.parse(JSON.stringify(subjects)),
        totalCategories,
        totalNotes,
      },
    };
  } catch (error) {
    console.error("Error fetching notes:", error);
    return {
      props: {
        subjects: [],
        totalCategories: 0,
        totalNotes: 0,
      },
    };
  }
}