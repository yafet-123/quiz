import { prisma } from "../../../../util/db.server";
import React from "react";
import Link from "next/link";
import { FaFolderOpen, FaFilePdf, FaArrowRight } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MainHeader } from "../../../../components/common/MainHeader";
import { Reveal } from "../../../../components/common/Reveal";

export async function getServerSideProps(context) {
  const { subjectId } = context.params;

  try {
    const subject = await prisma.Subject.findUnique({
      where: { id: Number(subjectId) },
      select: { id: true, name: true },
    });

    let categories = [];
    let notes = [];

    // Prefer subject → category → notes, but fall back to a direct list
    // if the NoteCategory table has not been created yet.
    try {
      if (typeof prisma.NoteCategory !== "undefined") {
        try {
          categories = await prisma.NoteCategory.findMany({
            where: { subjectId: Number(subjectId) },
            include: { _count: { select: { Note: true } } },
            orderBy: { id: "asc" },
          });
        } catch (error) {
          categories = [];
        }
      }
    } catch (error) {
      categories = [];
    }

    if (categories.length === 0) {
      try {
        notes = await prisma.Note.findMany({
          where: { subjectId: Number(subjectId) },
          select: { id: true, title: true, modifiedAt: true },
          orderBy: { modifiedAt: "desc" },
        });
      } catch (error) {
        notes = [];
      }
    }

    return {
      props: {
        subjectName: subject?.name || "Subject",
        categories: JSON.parse(JSON.stringify(categories)),
        notes: JSON.parse(JSON.stringify(notes)),
      },
    };
  } catch (error) {
    console.error("Error fetching note topics:", error);
    return {
      props: {
        subjectName: "Subject",
        categories: [],
        notes: [],
        error: "Failed to load note topics.",
      },
    };
  }
}

export default function NoteSubject({ subjectName, categories, notes }) {
  return (
    <>
      <MainHeader title={`Aceit : ${subjectName} Notes`} />

      <div className="min-h-screen py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-2 text-ink-600 mb-4">
            <Link href="/study" className="hover:text-primary-700 transition-colors font-semibold">
              Study
            </Link>
            <span className="text-ink-400">/</span>
            <Link href="/study/note" className="hover:text-primary-700 transition-colors font-semibold">
              Notes
            </Link>
            <span className="text-ink-400">/</span>
            <span className="text-ink-800 font-semibold">{subjectName}</span>
          </nav>

          {/* Back link */}
          <div className="mb-10">
            <Link
              href="/study/note"
              className="inline-flex items-center gap-2 text-ocean-600 font-semibold hover:text-primary-700 transition-colors"
            >
              <FaArrowRight className="rotate-180" /> Back to Subjects
            </Link>
          </div>

          {/* Header */}
          <span className="section-eyebrow block mb-4">
            {categories.length > 0
              ? `${categories.length} categor${categories.length === 1 ? "y" : "ies"}`
              : `${notes.length} note${notes.length === 1 ? "" : "s"}`}
          </span>
          <h1 className="section-title text-4xl md:text-5xl leading-tight">{subjectName}</h1>
          <p className="section-subtitle mt-4 max-w-3xl">
            {categories.length > 0
              ? "Select a category to open its notes."
              : "Open a note to start reviewing."}
          </p>

          {/* Categories / Notes grid */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.length > 0
              ? categories.map((category, idx) => (
                  <Reveal key={category.id} className="h-full" delay={(idx % 4) * 90}>
                    <Link
                      href={`/study/note/${category.id}`}
                      className="glass-card group block h-full p-8"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-100 to-ocean-100 text-ocean-600 text-2xl group-hover:bg-gradient-to-br from-primary-500 to-ocean-500 group-hover:text-white transition-all">
                          <FaFolderOpen />
                        </div>
                        <FaArrowRight className="text-ocean-500 text-2xl opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition" />
                      </div>
                      <h3 className="section-title text-2xl group-hover:text-primary-700 transition-colors">
                        {category.title}
                      </h3>
                      <div className="mt-3 flex items-center gap-2 text-ink-500">
                        <FaFilePdf className="text-ocean-500" />
                        <span>{category._count?.Note || 0} note(s)</span>
                      </div>
                      <div className="mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-primary-400 to-ocean-400 group-hover:w-28 transition-all duration-500" />
                    </Link>
                  </Reveal>
                ))
              : notes.map((note, idx) => (
                  <Reveal key={note.id} className="h-full" delay={(idx % 4) * 90}>
                    <Link
                      href={`/study/note/${note.id}`}
                      className="glass-card group block h-full p-8"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-100 to-ocean-100 text-ocean-600 text-2xl group-hover:bg-gradient-to-br from-primary-500 to-ocean-500 group-hover:text-white transition-all">
                          <FaFilePdf />
                        </div>
                        <FaArrowRight className="text-ocean-500 text-2xl opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition" />
                      </div>
                      <h3 className="section-title text-2xl group-hover:text-primary-700 transition-colors truncate">
                        {note.title}
                      </h3>
                      {note.modifiedAt ? (
                        <p className="flex items-center gap-2 text-ink-500 text-sm mt-3">
                          <FaRegCalendarAlt className="text-ocean-500" />{" "}
                          {new Date(note.modifiedAt).toLocaleDateString()}
                        </p>
                      ) : null}
                      <div className="mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-primary-400 to-ocean-400 group-hover:w-28 transition-all duration-500" />
                    </Link>
                  </Reveal>
                ))}

            {categories.length === 0 && notes.length === 0 && (
              <div className="glass-card p-12 text-center max-w-xl mx-auto">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary-100 to-ocean-100 text-ocean-600 text-4xl">
                  <FaFilePdf />
                </div>
                <h3 className="section-title text-xl mb-2">Nothing here yet</h3>
                <p className="text-ink-500">
                  There are currently no notes available for this subject. Please check back later.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}