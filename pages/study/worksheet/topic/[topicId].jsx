import { prisma } from "../../../../util/db.server";
import React from "react";
import Link from "next/link";
import { FaBookOpen, FaArrowRight } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MainHeader } from "../../../../components/common/MainHeader";
import { Reveal } from "../../../../components/common/Reveal";

export async function getServerSideProps(context) {
  const { topicId } = context.params;

  try {
    const topic = await prisma.WorksheetTopic.findUnique({
      where: { id: Number(topicId) },
      select: {
        id: true,
        title: true,
        Subject: { select: { id: true, name: true } },
      },
    });

    if (!topic) {
      return { notFound: true };
    }

    const worksheets = await prisma.Worksheet.findMany({
      where: { worksheetTopicId: Number(topicId) },
      orderBy: { id: "desc" },
      select: {
        id: true,
        title: true,
        link: true,
        _count: { select: { Questions: true } },
      },
    });

    return {
      props: {
        topicTitle: topic.title,
        subjectName: topic.Subject?.name || "",
        subjectId: topic.Subject?.id || null,
        worksheets: JSON.parse(JSON.stringify(worksheets)),
      },
    };
  } catch (error) {
    console.error("Error fetching worksheets:", error);
    return {
      props: {
        topicTitle: "",
        subjectName: "",
        subjectId: null,
        worksheets: [],
      },
    };
  }
}

export default function WorksheetList({ topicTitle, subjectName, subjectId, worksheets }) {
  const subjectSlug = subjectName;

  return (
    <>
      <MainHeader title={`Aceit : ${topicTitle}`} />

      <div className="min-h-screen py-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 text-ink-600 mb-4">
            <Link href="/study" className="hover:text-primary-700 transition-colors font-semibold">
              Study
            </Link>
            <span className="text-ink-400">/</span>
            <Link href="/study/worksheet" className="hover:text-primary-700 transition-colors font-semibold">
              Worksheets
            </Link>
            {subjectId && (
              <>
                <span className="text-ink-400">/</span>
                <Link
                  href={`/study/worksheet/subject/${subjectId}`}
                  className="hover:text-primary-700 transition-colors font-semibold"
                >
                  {subjectName}
                </Link>
              </>
            )}
            <span className="text-ink-400">/</span>
            <span className="text-ink-800 font-semibold">{topicTitle}</span>
          </nav>

          {/* Back link */}
          <div className="mb-10">
            <Link
              href={subjectId ? `/study/worksheet/subject/${subjectId}` : "/study/worksheet"}
              className="inline-flex items-center gap-2 text-ocean-600 font-semibold hover:text-primary-700 transition-colors"
            >
              <FaArrowRight className="rotate-180" /> Back to {subjectName || "Subjects"}
            </Link>
          </div>

          {/* Header */}
          <span className="section-eyebrow block mb-4">
            {worksheets.length} worksheet{worksheets.length === 1 ? "" : "s"} available
          </span>
          <h1 className="section-title text-4xl md:text-5xl leading-tight">{topicTitle}</h1>
          <p className="section-subtitle mt-4 max-w-3xl">
            Open a worksheet to start practising. Each question is timed and tracked so you can
            review your answers and track mastery.
          </p>

          {/* Worksheets list */}
          <div className="mt-12 flex flex-col">
            {worksheets.length === 0 ? (
              <div className="glass-card p-12 text-center max-w-xl mx-auto">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary-100 to-ocean-100 text-ocean-600 text-4xl">
                  <FaBookOpen />
                </div>
                <h3 className="section-title text-xl mb-2">Nothing here yet</h3>
                <p className="text-ink-500">
                  There are currently no worksheets in this topic. Please check back later.
                </p>
              </div>
            ) : (
              worksheets.map((worksheet, index) => (
                <Reveal key={worksheet.id} delay={(index % 5) * 70} className="mb-5">
                  <div className="glass-card group flex items-center justify-between gap-4 p-5">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-ocean-500 text-white text-3xl shadow-soft">
                        <FaBookOpen />
                      </div>
                      <div className="min-w-0">
                        <h3 className="section-title text-lg md:text-xl truncate group-hover:text-primary-700 transition-colors">
                          {worksheet.title}
                        </h3>
                        <p className="flex items-center gap-2 text-ink-500 text-sm mt-1">
                          <FaRegCalendarAlt className="text-ocean-500" /> Updated topic resource
                        </p>
                        <p className="text-ink-500 text-sm mt-1">
                          {worksheet._count?.Questions || 0} question
                          {worksheet._count?.Questions === 1 ? "" : "s"}
                        </p>
                      </div>
                    </div>

                    <Link
                      href={`/study/worksheet/${subjectSlug}/question/${worksheet.id}`}
                      className="btn-primary shrink-0 px-4 py-2.5 text-sm md:px-5"
                    >
                      Start Worksheet
                    </Link>
                  </div>
                </Reveal>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}