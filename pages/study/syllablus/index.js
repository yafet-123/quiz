import {
  FaBookOpen,
  FaFolderOpen,
  FaLayerGroup,
  FaFilePdf,
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

const reasons = [
  {
    id: 1,
    icon: <FaBook className="text-blue-500 w-8 h-8" />,
    title: "Official Syllabus",
    description:
      "Access official course syllablus organized clearly by subject.",
  },
  {
    id: 2,
    icon: <FaFolderOpen className="text-green-500 w-8 h-8" />,
    title: "Structured Learning",
    description:
      "Explore course requirements, topics, and learning areas in one place.",
  },
  {
    id: 3,
    icon: <FaStar className="text-yellow-500 w-8 h-8" />,
    title: "Exam Alignment",
    description:
      "Review syllabus information and keep your preparation aligned with the curriculum.",
  },
];

/*
|--------------------------------------------------------------------------
| Fallback icons for subjects without an image
|--------------------------------------------------------------------------
*/

const SUBJECT_ICONS = [
  FaBook,
  FaFlask,
  FaBookOpen,
  FaLayerGroup,
  FaFolderOpen,
];

export default function SyllablusIndex({ subjects }) {
  /*
  |--------------------------------------------------------------------------
  | Total syllabus topics
  |--------------------------------------------------------------------------
  |
  | Each subject has:
  |
  | subject.Syllablus[]
  |
  | Therefore we add all syllabus items together.
  |
  */

  const totalTopics = subjects.reduce(
    (total, subject) => total + subject.itemCount,
    0
  );

  return (
    <React.Fragment>

      <MainHeader title="Aceit: Syllabus" />

      <div className="min-h-screen py-20">

        {/* =========================================================
            HERO
        ========================================================== */}

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

                <FaBookOpen />

              </div>

            </div>

            <span className="section-eyebrow block mb-6">
              Aceit · Course Resources
            </span>

            <h1 className="section-title text-5xl md:text-6xl leading-tight">

              Course Syllablus,{" "}

              <span className="text-gradient">
                Perfectly Organized
              </span>

            </h1>

            <p className="section-subtitle text-lg md:text-xl mt-6 max-w-3xl mx-auto leading-relaxed">

              Explore course syllabi organized by subject and topic.
              Understand what you need to learn and follow your curriculum
              with confidence.

            </p>

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
                Why Syllabus?
              </a>

            </div>

          </div>

        </section>


        {/* =========================================================
            STATS
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


            {/* Total syllabus topics */}

            <Reveal
              delay={90}
              className="h-full"
            >

              <div className="glass-card h-full p-8">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-50 to-ocean-50 text-ocean-600 text-2xl shadow-soft">

                  <FaLayerGroup />

                </div>

                <p className="section-title text-4xl mt-3">

                  {totalTopics.toLocaleString()}

                </p>

                <p className="text-ink-500 font-semibold mt-2">
                  Syllabus Topics
                </p>

                <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary-400 to-ocean-400" />

              </div>

            </Reveal>


            {/* Subjects with syllabus */}

            <Reveal
              delay={180}
              className="h-full"
            >

              <div className="glass-card h-full p-8">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-50 to-ocean-50 text-ocean-600 text-2xl shadow-soft">

                  <FaBookOpen />

                </div>

                <p className="section-title text-4xl mt-3">

                  {
                    subjects.filter(
                      (subject) => subject.itemCount > 0
                    ).length
                  }

                </p>

                <p className="text-ink-500 font-semibold mt-2">
                  Subjects With Syllabus
                </p>

                <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary-400 to-ocean-400" />

              </div>

            </Reveal>

          </div>

        </section>


        {/* =========================================================
            WHY USE SYLLABUS
        ========================================================== */}

        <section className="px-6 py-16 max-w-6xl mx-auto">

          <div className="max-w-2xl mx-auto mb-12 text-center">

            <span className="section-eyebrow block mb-6">
              Plan your learning
            </span>

            <h2 className="section-title text-4xl">
              Why Review the Syllabus?
            </h2>

            <p className="section-subtitle mt-3">

              Understand your course structure and organize your
              study around the topics you need to learn.

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
              All Syllablus by Subject
            </h2>

            <p className="section-subtitle mt-3">

              Select a subject to explore its syllabus topics
              and course content.

            </p>

          </div>


          {subjects.length === 0 ? (

            <div className="glass-card p-12 text-center max-w-xl mx-auto">

              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary-100 to-ocean-100 text-ocean-600 text-4xl">

                <FaBookOpen />

              </div>

              <h3 className="section-title text-xl mb-2">
                Nothing here yet
              </h3>

              <p className="text-ink-500">

                No subjects with syllabus information have been
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
                    href={`/study/syllablus/subject/${subject.id}`}
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

                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />


                      {/* Count */}

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

                        {subject.itemCount} syllabus item
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

                Start Exploring Your Syllabus

              </h2>

              <p className="section-subtitle max-w-2xl mx-auto mt-4">

                Choose a subject above and explore the syllabus
                topics available for your course.

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


/* =========================================================
   SERVER SIDE DATA
   Syllabus only
========================================================= */

export async function getServerSideProps() {

  try {

    const subjects = await prisma.subject.findMany({

      orderBy: {
        id: "asc",
      },

      include: {
        Syllablus: true,
      },

    });


    const formatted = subjects.map((sub) => ({

      id: sub.id,

      name: sub.name,

      svg: sub.svg || null,

      /*
       * Number of syllabus records belonging
       * to this subject.
       */

      itemCount: sub.Syllablus?.length || 0,

    }));


    return {

      props: {

        subjects: JSON.parse(
          JSON.stringify(formatted)
        ),

      },

    };

  } catch (error) {

    console.error(
      "Error loading syllabus subjects:",
      error
    );


    /*
     * Fallback query
     */

    try {

      const subjects =
        await prisma.subject.findMany({

          orderBy: {
            id: "asc",
          },

          select: {

            id: true,

            name: true,

            svg: true,

          },

        });


      const formatted = subjects.map((sub) => ({

        id: sub.id,

        name: sub.name,

        svg: sub.svg || null,

        itemCount: 0,

      }));


      return {

        props: {

          subjects: JSON.parse(
            JSON.stringify(formatted)
          ),

        },

      };

    } catch (e) {

      return {

        props: {
          subjects: [],
        },

      };

    }

  }

}