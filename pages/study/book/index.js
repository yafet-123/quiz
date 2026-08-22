// pages/exam-preparation.js  → You can rename to books.js if you want
import { FaLayerGroup, FaFilePdf, FaArrowRight, FaFlask } from "react-icons/fa6";
import { FaBook, FaCheckCircle, FaFolderOpen, FaStar } from "react-icons/fa";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import BookSubject from "../../../components/books/BookSubject";

import { prisma } from "../../../util/db.server";
import { MainHeader } from "../../../components/common/MainHeader";
import { Reveal } from "../../../components/common/Reveal";

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

export default function Books({ subjects, totalBooks, totalBookCategories }) {
  console.log(subjects);
  return (
    <React.Fragment>
      <MainHeader title="Aceit: Books" />
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
                      <FaFilePdf />
                    </div>
                  </div>
      
                  <span className="section-eyebrow block mb-6">Aceit · Exam Archive</span>
                  <h1 className="section-title text-5xl md:text-6xl leading-tight">
                    Book,{" "}
                    <span className="text-gradient">Perfectly Organized</span>
                  </h1>
                  <p className="section-subtitle text-lg md:text-xl mt-6 max-w-3xl mx-auto leading-relaxed">
                    Explore real exam papers organized by subject and topic. Practice with official
                    mark schemes and boost your performance all in one polished workspace.
                  </p>
      
                  <div className="mt-10 flex flex-wrap justify-center gap-3">
                    <a href="#browse" className="btn-primary text-lg">
                      Browse Subjects <FaArrowRight className="mt-1" />
                    </a>
                    <a href="#why" className="btn-ghost text-lg">
                      Why Books?
                    </a>
                  </div>
                </div>
              </section>
      
              {/* Stats */}
              <section className="px-6 max-w-6xl mx-auto" id="why">
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { n: subjects.length, label: "Subjects", icon: <FaBook className="text-2xl text-ocean-600" /> },
                    { n: totalBookCategories, label: "Book Categories", icon: <FaFolderOpen className="text-2xl text-ocean-600" /> },
                    { n: totalBooks, label: "Papers & Mark Schemes", icon: <FaFilePdf className="text-2xl text-ocean-600" /> },
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
                  <span className="section-eyebrow block mb-6">Unlock your potential</span>
                  <h2 className="section-title text-4xl">Why reuse books?</h2>
                  <p className="section-subtitle mt-3">
                    They turn uncertainty into results. When you know the format, you know your score.
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
                  <h2 className="section-title text-4xl">All Books by Subject</h2>
                  <p className="section-subtitle mt-3">
                    Click a subject to uncover its books. Every card shows how many categories await.
                  </p>
                </div>
      
                {subjects.length === 0 ? (
                  <div className="glass-card p-12 text-center max-w-xl mx-auto">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary-100 to-ocean-100 text-ocean-600 text-4xl">
                                      <FaFilePdf />
                    </div>
                    <h3 className="section-title text-xl mb-2">Nothing here yet</h3>
                    <p className="text-ink-500">
                      No subjects with books have been added yet. Please check back soon.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subjects.map((subject, idx) => (
                      <Reveal key={subject.id} className="h-full" delay={(idx % 3) * 90}>
                        <Link
                          href={`/study/book/subject/${subject.id}`}
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
                              {topicCount(subject)} Book Category(s)
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
  return subject._count?.BookCategory || 0;
}

export async function getServerSideProps() {
  try {
    const subjectsRaw = await prisma.Subject.findMany({
      orderBy: { id: "asc" },
      select: {
        id: true,
        name: true,
        svg: true,
        BookCategory: {
          select: {
            id: true,
            _count: {
              select: { Book: true },
            },
          },
        },
      },
    });

    // Keep only subjects that actually contain at least one book
    const subjects = subjectsRaw
      .map((subject) => {
        const bookCategoryCount = subject.BookCategory.length;
        const totalBooksInSubject = subject.BookCategory.reduce(
          (sum, cat) => sum + cat._count.Book,
          0
        );

        return {
          id: subject.id,
          name: subject.name,
          svg: subject.svg,
          _count: { BookCategory: bookCategoryCount },
        };
      })
      .filter((subject, idx) => subjectsRaw[idx].BookCategory.reduce(
        (sum, cat) => sum + cat._count.Book, 0
      ) > 0);

    const totalBooks = await prisma.Book.count();
    const totalBookCategories = await prisma.BookCategory.count();

    return {
      props: {
        subjects: JSON.parse(JSON.stringify(subjects)),
        totalBooks,
        totalBookCategories,
      },
    };
  } catch (error) {
    console.error("Error loading books:", error);
    return {
      props: { subjects: [], totalBooks: 0, totalBookCategories: 0 },
    };
  }
}
