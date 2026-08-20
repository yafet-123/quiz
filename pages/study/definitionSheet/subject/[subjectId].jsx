// pages/study/definitionSheet/subject/[subjectId].js

import { prisma } from "../../../../util/db.server";
import React from "react";
import Link from "next/link";

import {
  FaBook,
  FaArrowLeft,
  FaCloudArrowDown,
  FaFileLines,
} from "react-icons/fa6";

import { MainHeader } from "../../../../components/common/MainHeader";
import { Reveal } from "../../../../components/common/Reveal";

export async function getServerSideProps(context) {
  const { subjectId } = context.params;

  try {
    const id = Number(subjectId);

    // =========================================================
    // VALIDATE SUBJECT ID
    // =========================================================

    if (!Number.isInteger(id)) {
      return {
        notFound: true,
      };
    }

    // =========================================================
    // GET SUBJECT
    // =========================================================

    const subject = await prisma.Subject.findUnique({
      where: {
        id: id,
      },

      select: {
        id: true,
        name: true,
      },
    });

    // Subject doesn't exist
    if (!subject) {
      return {
        notFound: true,
      };
    }

    // =========================================================
    // GET DEFINITIONS BELONGING TO THIS SUBJECT
    // =========================================================

    const definitions = await prisma.Definition.findMany({
      where: {
        subjectId: id,
      },

      select: {
        id: true,
        name: true,
        link: true,
        subjectId: true,
        createdAt: true,
        modifiedAt: true,
      },

      orderBy: {
        id: "desc",
      },
    });

    // =========================================================
    // RETURN DATA
    // =========================================================

    return {
      props: {
        subject: JSON.parse(JSON.stringify(subject)),

        definitions: JSON.parse(
          JSON.stringify(definitions)
        ),
      },
    };

  } catch (error) {
    console.error(
      "Error loading definitions by subject:",
      error
    );

    return {
      notFound: true,
    };
  }
}


// =============================================================
// PAGE
// =============================================================

export default function DefinitionsBySubject({
  subject,
  definitions,
}) {

  if (!subject) {
    return (
      <MainHeader title="Aceit : Definition Sheets" />
    );
  }

  return (
    <>
      <MainHeader
        title={`Aceit : ${subject.name} Definition Sheets`}
      />

      <div className="min-h-screen py-24 px-6">

        <div className="max-w-5xl mx-auto">

          {/* =====================================================
              BREADCRUMB
          ====================================================== */}

          <nav className="flex flex-wrap items-center gap-2 text-ink-600 mb-4">

            <Link
              href="/study"
              className="hover:text-primary-700 transition-colors font-semibold"
            >
              Study
            </Link>

            <span className="text-ink-400">
              /
            </span>

            <Link
              href="/study/definitionSheet"
              className="hover:text-primary-700 transition-colors font-semibold"
            >
              Definition Sheets
            </Link>

            <span className="text-ink-400">
              /
            </span>

            <span className="text-ink-800 font-semibold">
              {subject.name}
            </span>

          </nav>


          {/* =====================================================
              BACK BUTTON
          ====================================================== */}

          <div className="mb-10">

            <Link
              href="/study/definitionSheet"
              className="inline-flex items-center gap-2 text-ocean-600 font-semibold hover:text-primary-700 transition-colors"
            >

              <FaArrowLeft />

              Back to Definition Sheets

            </Link>

          </div>


          {/* =====================================================
              PAGE HEADER
          ====================================================== */}

          <span className="section-eyebrow block mb-4">

            {definitions.length} definition{" "}
            {definitions.length === 1
              ? "sheet"
              : "sheets"}{" "}
            available

          </span>


          <h1 className="section-title text-4xl md:text-5xl leading-tight">

            {subject.name}{" "}

            <span className="text-gradient">
              Definition Sheets
            </span>

          </h1>


          <p className="section-subtitle mt-4 max-w-3xl">

            Browse definition sheets available for{" "}

            <strong>
              {subject.name}
            </strong>

            . Access important definitions and
            reference materials for your studies.

          </p>


          {/* =====================================================
              STATISTICS
          ====================================================== */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10">


            {/* DEFINITION COUNT */}

            <Reveal
              delay={0}
              className="h-full"
            >

              <div className="glass-card h-full p-6">

                <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-100 to-ocean-100 text-ocean-600 text-2xl">

                    <FaBook />

                  </div>


                  <div>

                    <p className="section-title text-3xl">

                      {definitions.length}

                    </p>

                    <p className="text-ink-500 font-semibold">

                      Definition Sheets

                    </p>

                  </div>

                </div>

              </div>

            </Reveal>


            {/* SUBJECT */}

            <Reveal
              delay={90}
              className="h-full"
            >

              <div className="glass-card h-full p-6">

                <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-100 to-ocean-100 text-ocean-600 text-2xl">

                    <FaFileLines />

                  </div>


                  <div className="min-w-0">

                    <p className="section-title text-2xl break-words">

                      {subject.name}

                    </p>

                    <p className="text-ink-500 font-semibold">

                      Subject

                    </p>

                  </div>

                </div>

              </div>

            </Reveal>

          </div>


          {/* =====================================================
              DEFINITION SHEET LIST
          ====================================================== */}

          <div className="mt-12 flex flex-col">


            {/* =================================================
                EMPTY STATE
            ================================================== */}

            {definitions.length === 0 ? (

              <div className="glass-card p-12 text-center max-w-xl mx-auto">

                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary-100 to-ocean-100 text-ocean-600 text-4xl">

                  <FaFileLines />

                </div>


                <h3 className="section-title text-xl mb-2">

                  Nothing here yet

                </h3>


                <p className="text-ink-500">

                  No definition sheets are available for
                  this subject yet. Please check back later.

                </p>

              </div>

            ) : (

              definitions.map((definition, index) => (

                <Reveal
                  key={definition.id}
                  delay={(index % 5) * 70}
                  className="mb-5"
                >

                  <div className="glass-card group flex items-center justify-between gap-4 p-5">


                    {/* =================================================
                        LEFT SIDE
                    ================================================== */}

                    <div className="flex items-center gap-4 min-w-0">


                      {/* ICON */}

                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-ocean-500 text-white text-3xl shadow-soft">

                        <FaFileLines />

                      </div>


                      {/* INFORMATION */}

                      <div className="min-w-0">

                        <h3 className="section-title text-lg md:text-xl break-words group-hover:text-primary-700 transition-colors">

                          {definition.name}

                        </h3>


                        <p className="text-ink-500 text-sm mt-1">

                          {subject.name} Definition Sheet

                        </p>


                        {definition.createdAt && (

                          <p className="text-ink-400 text-xs mt-1">

                            Added on{" "}

                            {new Date(
                              definition.createdAt
                            ).toLocaleDateString()}

                          </p>

                        )}

                      </div>

                    </div>


                    {/* =================================================
                        OPEN BUTTON
                    ================================================== */}

                    {definition.link ? (

                      <a
                        href={definition.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary shrink-0 px-4 py-2.5 text-sm md:px-5 inline-flex items-center gap-2"
                      >

                        <FaCloudArrowDown />

                        Open

                      </a>

                    ) : (

                      <div className="shrink-0 px-4 py-2.5 text-sm rounded-xl bg-gray-100 text-gray-500">

                        Link unavailable

                      </div>

                    )}

                  </div>

                </Reveal>

              ))

            )}

          </div>


          {/* =====================================================
              BOTTOM CTA
          ====================================================== */}

          <section className="pt-16 pb-4">

            <div className="glass-card p-10 md:p-14 text-center">

              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary-500 to-ocean-500 text-white text-4xl shadow-glow">

                <FaBook />

              </div>


              <h2 className="section-title text-3xl md:text-4xl">

                Need Another Subject?

              </h2>


              <p className="section-subtitle max-w-2xl mx-auto mt-4">

                Return to the definition sheets page
                and choose another subject.

              </p>


              <Link
                href="/study/definitionSheet"
                className="btn-primary inline-flex mt-8 items-center gap-2"
              >

                Browse All Subjects

                <FaArrowLeft />

              </Link>

            </div>

          </section>

        </div>

      </div>
    </>
  );
}