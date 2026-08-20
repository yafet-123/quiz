import { prisma } from "../../../../util/db.server";
import React from "react";
import Link from "next/link";
import { MainHeader } from "../../../../components/common/MainHeader";
import { Reveal } from "../../../../components/common/Reveal";
import { FaFolderOpen, FaFilePdf, FaArrowRight } from "react-icons/fa6";

export default function WorksheetTopics({ topics, subjectName }) {
  return (
    <React.Fragment>
      <MainHeader title={`Aceit : ${subjectName} Past Papers`} />
      <div className="min-h-screen py-24 px-6">
        {/* Breadcrumb + Header */}
        <div className="max-w-6xl mx-auto">
          <nav className="flex flex-wrap items-center gap-2 text-ink-600 mb-8">
            <Link href="/study" className="hover:text-primary-700 transition-colors font-semibold">
              Study
            </Link>
            <span className="text-ink-400">/</span>
            <Link href="/study/past-paper" className="hover:text-primary-700 transition-colors font-semibold">
              Worksheet
            </Link>
            <span className="text-ink-400">/</span>
            <span className="text-ink-800 font-semibold">{subjectName || "Subject"}</span>
          </nav>

          <span className="section-eyebrow block mb-4">Browse by topic</span>
          <h1 className="section-title text-4xl md:text-5xl leading-tight">
            {subjectName || "Worksheet"}
          </h1>
          <p className="section-subtitle mt-4 max-w-3xl">
            Select a topic to open its worksheets. Reviewed and ready
            for focused revision.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {topics.length > 0 ? (
              topics.map((topic, idx) => (
                <Reveal key={topic.id} className="h-full" delay={(idx % 2) * 90}>
                  <Link
                    href={`/study/worksheet/topic/${topic.id}`}
                    className="glass-card group block h-full p-8"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-100 to-ocean-100 text-ocean-600 text-2xl shadow-soft group-hover:bg-gradient-to-br from-primary-500 to-ocean-500 group-hover:text-white transition-all">
                        <FaFolderOpen />
                      </div>
                      <FaArrowRight className="text-ocean-500 text-2xl opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition" />
                    </div>
                    <h3 className="section-title text-2xl group-hover:text-primary-700 transition-colors">
                      {topic.title}
                    </h3>
                    <div className="mt-3 flex items-center gap-2 text-ink-500">
                      <FaFilePdf className="text-ocean-500" />
                      <span>{topic._count?.Worksheet || 0} worksheet(s)</span>
                    </div>
                    <div className="mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-primary-400 to-ocean-400 group-hover:w-28 transition-all duration-500" />
                  </Link>
                </Reveal>
              ))
            ) : (
              <div className="glass-card p-12 text-center max-w-xl mx-auto">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary-100 to-ocean-100 text-ocean-600 text-4xl">
                  <FaFilePdf />
                </div>
                <h3 className="section-title text-xl mb-2">Nothing here yet</h3>
                <p className="text-ink-500">
                  There are currently no Past Paper topics for this subject. Please check back
                  later.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export async function getServerSideProps(context) {
  const { subjectId } = context.params;

  try {

    const subject = await prisma.Subject.findUnique({
      where: { id: Number(subjectId) },
      select: { id: true, name: true },
    });

    const topics = await prisma.WorksheetTopic.findMany({
      where: { subjectId: Number(subjectId) },
      include: {
        _count: { select: { Worksheet: true } },
      },
      orderBy: { id: "asc" },
    });

    return {
      props: {
        subjectName: subject?.name || "Subject",
        topics: JSON.parse(JSON.stringify(topics)),
        subjectId,
      },
    };
  } catch (error) {
    console.error("Error fetching worksheet topics:", error);
    return {
      props: {subjectName: "Subject", topics: [], subjectId, error: "Failed to load worksheet topics." },
    };
  }
}


 