import {
  FaBookOpen,
  FaFolderOpen,
  FaLayerGroup,
  FaArrowRight,
  FaFlask,
} from "react-icons/fa6";

import {
  FaBook,
  FaStar,
} from "react-icons/fa";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import { prisma } from "../../../util/db.server";
import { MainHeader } from "../../../components/common/MainHeader";
import { Reveal } from "../../../components/common/Reveal";

/*
|--------------------------------------------------------------------------
| WHY USE DEFINITION SHEETS
|--------------------------------------------------------------------------
*/

const reasons = [
  {
    id: 1,
    icon: <FaBook className="text-blue-500 w-8 h-8" />,
    title: "Quick Reference",
    description:
      "Access important definitions instantly for fast learning and revision.",
  },

  {
    id: 2,
    icon: <FaFolderOpen className="text-green-500 w-8 h-8" />,
    title: "Organized Learning",
    description:
      "Keep definitions grouped by subject for easier learning and revision.",
  },

  {
    id: 3,
    icon: <FaStar className="text-yellow-500 w-8 h-8" />,
    title: "Exam Preparation",
    description:
      "Review important definitions quickly when preparing for exams and assignments.",
  },
];

/*
|--------------------------------------------------------------------------
| FALLBACK SUBJECT ICONS
|--------------------------------------------------------------------------
*/

const SUBJECT_ICONS = [
  FaBook,
  FaFlask,
  FaBookOpen,
  FaLayerGroup,
  FaFolderOpen,
];

export default function DefinitionSheetsIndex({ subjects }) {
  /*
  |--------------------------------------------------------------------------
  | TOTAL DEFINITION SHEETS
  |--------------------------------------------------------------------------
  */

  const totalDefinitionSheets = subjects.reduce(
    (total, subject) => total + subject.itemCount,
    0
  );

  /*
  |--------------------------------------------------------------------------
  | SUBJECTS WITH DEFINITION SHEETS
  |--------------------------------------------------------------------------
  */

  const subjectsWithDefinitionSheets = subjects.filter(
    (subject) => subject.itemCount > 0
  ).length;

  return (
    <React.Fragment>

      <MainHeader title="Aceit: Definition Sheets" />

      <div className="min-h-screen py-20">

        {/* =========================================================
            HERO
        ========================================================== */}

        <section className="relative overflow-hidden px-6 pt-36 pb-16 text-center">

          {/* Background decoration */}

          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 -left-40 h-[34rem] w-[34rem] rounded-full bg-gradient-to-br from-primary-200 to-ocean-300 opacity-50 blur-3xl"
          />

          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-36 -right-40 h-[32rem] w-[32rem] rounded-full bg-gradient-to-br from-accent-200 to-primary-200 opacity-40 blur-3xl"
          />

          <div className="relative max-w-5xl mx-auto">

            {/* Icon */}

            <div className="mx-auto mb-10 hover:scale-105 transition-transform duration-300">

              <div className="flex h-28 w-28 mx-auto items-center justify-center rounded-[2rem] bg-gradient-to-br from-primary-500 to-ocean-500 text-white text-5xl shadow-glow">

                <FaBookOpen />

              </div>

            </div>

            {/* Eyebrow */}

            <span className="section-eyebrow block mb-6">

              Aceit · Study Resources

            </span>

            {/* Title */}

            <h1 className="section-title text-5xl md:text-6xl leading-tight">

              Definition Sheets,{" "}

              <span className="text-gradient">

                Perfectly Organized

              </span>

            </h1>

            {/* Description */}

            <p className="section-subtitle text-lg md:text-xl mt-6 max-w-3xl mx-auto leading-relaxed">

              Explore important definitions organized by subject.
              Quickly find the definitions you need for learning,
              revision, assignments, and exam preparation.

            </p>

            {/* Buttons */}

            <div className="mt-10 flex flex-wrap justify-center gap-3">

              <a
                href="#browse"
                className="btn-primary text-lg"
              >

                Browse Subjects

                <FaArrowRight className="mt-1" />

              </a>

              <a
                href="#why"
                className="btn-ghost text-lg"
              >

                Why Definition Sheets?

              </a>

            </div>

          </div>

        </section>

        {/* =========================================================
            STATISTICS
        ========================================================== */}

        <section
          className="px-6 max-w-6xl mx-auto"
          id="why"
        >

          <div className="grid md:grid-cols-3 gap-6">

            {/* Subjects */}

            <Reveal
              delay={0}
              className="h-full"
            >

              <div className="glass-card h-full p-8">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-50 to-ocean-50 text-ocean-600 text-2xl shadow-soft">

                  <FaBook />

                </div>

                <p className="section-title text-4xl mt-3">

                  {subjects.length.toLocaleString()}

                </p>

                <p className="text-ink-500 font-semibold mt-2">

                  Subjects

                </p>

                <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary-400 to-ocean-400" />

              </div>

            </Reveal>

            {/* Total Definition Sheets */}

            <Reveal
              delay={90}
              className="h-full"
            >

              <div className="glass-card h-full p-8">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-50 to-ocean-50 text-ocean-600 text-2xl shadow-soft">

                  <FaLayerGroup />

                </div>

                <p className="section-title text-4xl mt-3">

                  {totalDefinitionSheets.toLocaleString()}

                </p>

                <p className="text-ink-500 font-semibold mt-2">

                  Definition Sheets

                </p>

                <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary-400 to-ocean-400" />

              </div>

            </Reveal>

            {/* Subjects With Definition Sheets */}

            <Reveal
              delay={180}
              className="h-full"
            >

              <div className="glass-card h-full p-8">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-50 to-ocean-50 text-ocean-600 text-2xl shadow-soft">

                  <FaBookOpen />

                </div>

                <p className="section-title text-4xl mt-3">

                  {subjectsWithDefinitionSheets}

                </p>

                <p className="text-ink-500 font-semibold mt-2">

                  Subjects With Definition Sheets

                </p>

                <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary-400 to-ocean-400" />

              </div>

            </Reveal>

          </div>

        </section>

        {/* =========================================================
            WHY USE DEFINITION SHEETS
        ========================================================== */}

        <section className="px-6 py-16 max-w-6xl mx-auto">

          <div className="max-w-2xl mx-auto mb-12 text-center">

            <span className="section-eyebrow block mb-6">

              Study smarter

            </span>

            <h2 className="section-title text-4xl">

              Why Use Definition Sheets?

            </h2>

            <p className="section-subtitle mt-3">

              Keep important definitions organized and easy to
              access whenever you need them.

            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {reasons.map((reason, i) => (

              <Reveal
                key={reason.id}
                delay={i * 90}
                className="h-full"
              >

                <div className="glass-card h-full p-8">

                  <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary-50 to-ocean-50 text-ocean-600">

                    {reason.icon}

                  </div>

                  <h3 className="section-title text-2xl mb-3">

                    {reason.title}

                  </h3>

                  <p className="text-ink-600 leading-relaxed">

                    {reason.description}

                  </p>

                </div>

              </Reveal>

            ))}

          </div>

        </section>

        {/* =========================================================
            SUBJECT GRID
        ========================================================== */}

        <section
          id="browse"
          className="px-6 py-16 max-w-7xl mx-auto"
        >

          <div className="max-w-2xl mx-auto mb-12 text-center">

            <span className="section-eyebrow block mb-6">

              Choose your subject

            </span>

            <h2 className="section-title text-4xl">

              All Definition Sheets by Subject

            </h2>

            <p className="section-subtitle mt-3">

              Select a subject to explore its available
              definition sheets.

            </p>

          </div>

          {/* No subjects */}

          {subjects.length === 0 ? (

            <div className="glass-card p-12 text-center max-w-xl mx-auto">

              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary-100 to-ocean-100 text-ocean-600 text-4xl">

                <FaBookOpen />

              </div>

              <h3 className="section-title text-xl mb-2">

                Nothing here yet

              </h3>

              <p className="text-ink-500">

                No subjects with definition sheets have been
                added yet. Please check back soon.

              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {subjects.map((subject, idx) => (

                <Reveal
                  key={subject.id}
                  className="h-full"
                  delay={(idx % 3) * 90}
                >

                  <Link
                    href={`/study/definitionSheet/subject/${subject.id}`}
                    className="glass-card group block h-full overflow-hidden"
                  >

                    {/* Image */}

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

                            const Icon =
                              SUBJECT_ICONS[
                                idx % SUBJECT_ICONS.length
                              ];

                            return (
                              <Icon className="text-6xl text-ocean-600" />
                            );

                          })()}

                        </div>

                      )}

                      {/* Hover overlay */}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Definition count */}

                      <div className="absolute top-4 right-4 flex h-10 min-w-10 px-3 items-center justify-center rounded-full bg-white/90 text-ocean-600 font-bold shadow-soft">

                        {subject.itemCount}

                      </div>

                    </div>

                    {/* Card content */}

                    <div className="p-6">

                      <div className="flex items-center justify-between mb-3">

                        <h3 className="section-title text-2xl group-hover:text-primary-700 transition-colors">

                          {subject.name}

                        </h3>

                        <FaArrowRight className="text-ocean-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition" />

                      </div>

                      <p className="text-ink-500 text-sm mb-4">

                        {subject.itemCount} definition sheet
                        {subject.itemCount !== 1 ? "s" : ""}

                      </p>

                      <div className="h-1 w-16 rounded-full bg-gradient-to-r from-primary-400 to-ocean-400 group-hover:w-28 transition-all duration-500" />

                    </div>

                  </Link>

                </Reveal>

              ))}

            </div>

          )}

        </section>

        {/* =========================================================
            BOTTOM CTA
        ========================================================== */}

        <section className="px-6 py-16">

          <div className="max-w-6xl mx-auto">

            <div className="glass-card p-10 md:p-14 text-center">

              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary-500 to-ocean-500 text-white text-4xl shadow-glow">

                <FaBookOpen />

              </div>

              <h2 className="section-title text-3xl md:text-4xl">

                Start Reviewing Your Definitions

              </h2>

              <p className="section-subtitle max-w-2xl mx-auto mt-4">

                Choose a subject above and explore the definition
                sheets available for your course.

              </p>

              <a
                href="#browse"
                className="btn-primary inline-flex mt-8"
              >

                Browse Subjects

                <FaArrowRight />

              </a>

            </div>

          </div>

        </section>

      </div>

    </React.Fragment>
  );
}

/*
|--------------------------------------------------------------------------
| SERVER SIDE DATA
|--------------------------------------------------------------------------
|
| DefinitionSheet belongs directly to Subject.
|
*/
export async function getServerSideProps() {
  try {
    const subjects = await prisma.Subject.findMany({
      orderBy: {
        id: "asc",
      },

      include: {
        Definition: true,
      },
    });

    const formatted = subjects.map((subject) => ({
      id: subject.id,
      name: subject.name,
      svg: subject.svg || null,
      itemCount: subject.Definition?.length || 0,
    }));

    return {
      props: {
        subjects: JSON.parse(JSON.stringify(formatted)),
      },
    };
  } catch (error) {
    console.error(
      "Error loading definition subjects:",
      error
    );

    return {
      props: {
        subjects: [],
      },
    };
  }
}