import React from "react";
import { prisma } from "../../../util/db.server";
import { FaFilePdf, FaCloudArrowDown, FaArrowLeft } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import Link from "next/link";
import { MainHeader } from "../../../components/common/MainHeader";
import { Reveal } from "../../../components/common/Reveal";

export async function getServerSideProps(context) {
  const { pastpaperId } = context.params;

  try {
    // Fetch the PastPaperTopic with all of its PastPaper records
    const topic = await prisma.PastPaperTopic.findUnique({
      where: { id: Number(pastpaperId) },
      include: {
        PastPaper: true, // a topic has many past papers
        Subject: { select: { id: true, name: true } },
      },
    });

    if (!topic) {
      return { notFound: true };
    }

    // Build a flat list of papers from all PastPaper records.
    // Each record's title / paperFile may contain comma-separated values.
    let papers = [];
    (topic.PastPaper || []).forEach((pp) => {
      const names = pp.title ? pp.title.split(",").map((s) => s.trim()) : [];
      const links = pp.paperFile ? pp.paperFile.split(",").map((s) => s.trim()) : [];
      names.forEach((name, index) => {
        papers.push({
          name,
          link: links[index] || "#",
          year: pp.year || null,
        });
      });
    });

    return {
      props: {
        topicTitle: topic.title,
        subjectName: topic.Subject?.name || "",
        subjectId: topic.Subject?.id || null,
        papers,
      },
    };
  } catch (error) {
    console.error("Error fetching past paper topic:", error);
    return {
      props: {
        topicTitle: "",
        subjectName: "",
        subjectId: null,
        papers: [],
      },
    };
  }
}

export default function PastPaperPage({ topicTitle, subjectName, subjectId, papers }) {
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
            <Link href="/study/past-paper" className="hover:text-primary-700 transition-colors font-semibold">
              Past Papers
            </Link>
            {subjectId && (
              <>
                <span className="text-ink-400">/</span>
                <Link
                  href={`/study/past-paper/subject/${subjectId}`}
                  className="hover:text-primary-700 transition-colors font-semibold"
                >
                  {subjectName}
                </Link>
              </>
            )}
            <span className="text-ink-400">/</span>
            <span className="text-ink-800 font-semibold">{topicTitle}</span>
          </nav>

          <div className="mb-10">
            <Link
              href={subjectId ? `/study/past-paper/subject/${subjectId}` : "/study/past-paper"}
              className="inline-flex items-center gap-2 text-ocean-600 font-semibold hover:text-primary-700 transition-colors"
            >
              <FaArrowLeft /> Back to {subjectName || "Subjects"}
            </Link>
          </div>

          <span className="section-eyebrow block mb-4">{papers.length} papers available</span>
          <h1 className="section-title text-4xl md:text-5xl leading-tight">{topicTitle}</h1>
          <p className="section-subtitle mt-4 max-w-3xl">
            Open a genuine exam paper or mark scheme below. Perfect for timed practice and review.
          </p>

          <div className="mt-12 flex flex-col">
            {papers.length === 0 ? (
              <div className="glass-card p-12 text-center max-w-xl mx-auto">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary-100 to-ocean-100 text-ocean-600 text-4xl">
                  <FaFilePdf />
                </div>
                <h3 className="section-title text-xl mb-2">Nothing here yet</h3>
                <p className="text-ink-500">
                  No past papers are available for this topic yet. Please check back later.
                </p>
              </div>
            ) : (
              papers.map((paper, index) => (
                <Reveal key={index} delay={(index % 5) * 70} className="mb-5">
                  <div className="glass-card group flex items-center justify-between gap-4 p-5">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-ocean-500 text-white text-3xl shadow-soft">
                        <FaFilePdf />
                      </div>
                      <div className="min-w-0">
                        <h3 className="section-title text-lg md:text-xl truncate group-hover:text-primary-700 transition-colors">
                          {paper.name}
                        </h3>
                        {paper.year ? (
                          <p className="flex items-center gap-2 text-ink-500 text-sm mt-1">
                            <FaRegCalendarAlt className="text-ocean-500" /> Year {paper.year}
                          </p>
                        ) : (
                          <p className="text-ink-500 text-sm mt-1">Exam paper</p>
                        )}
                      </div>
                    </div>

                    <a
                      href={paper.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary shrink-0 px-4 py-2.5 text-sm md:px-5"
                    >
                                    <FaCloudArrowDown /> Open
                    </a>
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
