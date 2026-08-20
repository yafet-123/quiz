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

    // Validate subject ID
    if (isNaN(id)) {
      return {
        notFound: true,
      };
    }

    // Get subject
    const subject = await prisma.Subject.findUnique({
      where: {
        id,
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

    // Get all syllabus items belonging to this subject
    const syllabi = await prisma.Syllablus.findMany({
      where: {
        subjectId: id,
      },
      orderBy: {
        id: "desc",
      },
    });

    return {
      props: {
        subject: JSON.parse(JSON.stringify(subject)),
        syllabi: JSON.parse(JSON.stringify(syllabi)),
      },
    };
  } catch (error) {
    console.error("Error loading syllabus by subject:", error);

    return {
      notFound: true,
    };
  }
}

export default function SyllablusBySubject({
  subject,
  syllabi,
}) {
  if (!subject) {
    return <MainHeader title="Aceit : Syllabus" />;
  }

  /*
   * Convert syllabus content into a usable URL.
   *
   * Example:
   * https://drive.google.com/...
   *
   * or:
   * www.example.com/...
   */
  const getLink = (content) => {
    if (!content) {
      return "#";
    }

    const trimmed = content.trim();

    if (
      trimmed.startsWith("http://") ||
      trimmed.startsWith("https://")
    ) {
      return trimmed;
    }

    if (
      trimmed.startsWith("www.") ||
      trimmed.includes("drive.google.com") ||
      trimmed.includes("dropbox.com")
    ) {
      return `https://${trimmed}`;
    }

    return trimmed;
  };

  return (
    <>
      <MainHeader title={`Aceit : ${subject.name} Syllabus`} />

      <div className="min-h-screen py-24 px-6">
        <div className="max-w-5xl mx-auto">

          {/* =========================
              BREADCRUMB
          ========================== */}

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
              href="/study/syllablus"
              className="hover:text-primary-700 transition-colors font-semibold"
            >
              Syllabus
            </Link>

            <span className="text-ink-400">
              /
            </span>

            <span className="text-ink-800 font-semibold">
              {subject.name}
            </span>

          </nav>

          {/* =========================
              BACK BUTTON
          ========================== */}

          <div className="mb-10">

            <Link
              href="/study/syllablus"
              className="inline-flex items-center gap-2 text-ocean-600 font-semibold hover:text-primary-700 transition-colors"
            >
              <FaArrowLeft />

              Back to Syllabus
            </Link>

          </div>

          {/* =========================
              PAGE HEADER
          ========================== */}

          <span className="section-eyebrow block mb-4">
            {syllabi.length} syllabus{" "}
            {syllabi.length === 1 ? "item" : "items"} available
          </span>

          <h1 className="section-title text-4xl md:text-5xl leading-tight">
            {subject.name} Syllabus
          </h1>

          <p className="section-subtitle mt-4 max-w-3xl">
            Browse the syllabus materials available for {subject.name}.
          </p>

          {/* =========================
              STATISTICS
          ========================== */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10">

            {/* SYLLABUS COUNT */}

            <div className="glass-card p-6">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-100 to-ocean-100 text-ocean-600 text-2xl">
                  <FaBook />
                </div>

                <div>

                  <p className="section-title text-3xl">
                    {syllabi.length}
                  </p>

                  <p className="text-ink-500 font-semibold">
                    Syllabus Items
                  </p>

                </div>

              </div>

            </div>

            {/* SUBJECT */}

            <div className="glass-card p-6">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-100 to-ocean-100 text-ocean-600 text-2xl">
                  <FaFileLines />
                </div>

                <div>

                  <p className="section-title text-3xl">
                    {subject.name}
                  </p>

                  <p className="text-ink-500 font-semibold">
                    Subject
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* =========================
              SYLLABUS LIST
          ========================== */}

          <div className="mt-12 flex flex-col">

            {syllabi.length === 0 ? (

              /* EMPTY STATE */

              <div className="glass-card p-12 text-center max-w-xl mx-auto">

                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary-100 to-ocean-100 text-ocean-600 text-4xl">
                  <FaFileLines />
                </div>

                <h3 className="section-title text-xl mb-2">
                  Nothing here yet
                </h3>

                <p className="text-ink-500">
                  No syllabus materials are available for this
                  subject yet. Please check back later.
                </p>

              </div>

            ) : (

              /* SYLLABUS ITEMS */

              syllabi.map((item, index) => {

                const link = getLink(item.content);

                return (
                  <Reveal
                    key={item.id}
                    delay={(index % 5) * 70}
                    className="mb-5"
                  >

                    <div className="glass-card group flex items-center justify-between gap-4 p-5">

                      {/* LEFT SIDE */}

                      <div className="flex items-center gap-4 min-w-0">

                        {/* ICON */}

                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-ocean-500 text-white text-3xl shadow-soft">

                          <FaFileLines />

                        </div>

                        {/* SYLLABUS INFORMATION */}

                        <div className="min-w-0">

                          <h3 className="section-title text-lg md:text-xl break-words group-hover:text-primary-700 transition-colors">
                            {item.title}
                          </h3>

                          <p className="text-ink-500 text-sm mt-1">
                            {subject.name} Syllabus
                          </p>

                        </div>

                      </div>

                      {/* OPEN BUTTON */}

                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary shrink-0 px-4 py-2.5 text-sm md:px-5 inline-flex items-center gap-2"
                      >

                        <FaCloudArrowDown />

                        Open

                      </a>

                    </div>

                  </Reveal>
                );
              })

            )}

          </div>

        </div>
      </div>
    </>
  );
}