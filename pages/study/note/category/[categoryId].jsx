import { prisma } from "../../../../util/db.server";
import React from "react";
import Link from "next/link";
import { FaFilePdf, FaArrowRight } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MainHeader } from "../../../../components/common/MainHeader";
import { Reveal } from "../../../../components/common/Reveal";

export async function getServerSideProps(context) {
  const { categoryId } = context.params;

  try {
    const category = await prisma.NoteCategory.findUnique({
      where: { id: Number(categoryId) },
      select: { id: true, title: true },
    });

    if (!category) {
      return { notFound: true };
    }

    const notes = await prisma.Note.findMany({
      where: { noteCategoryId: Number(categoryId) },
      select: { id: true, title: true, modifiedAt: true },
      orderBy: { modifiedAt: "desc" },
    });

    return {
      props: {
        categoryTitle: category.title,
        notes: JSON.parse(JSON.stringify(notes)),
      },
    };
  } catch (error) {
    console.error("Error fetching notes:", error);
    return { props: { categoryTitle: "Notes", notes: [] } };
  }
}

export default function NotesInCategory({ categoryTitle, notes }) {
  return (
    <>
      <MainHeader title={`Aceit : ${categoryTitle}`} />

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
            <span className="text-ink-800 font-semibold">{categoryTitle}</span>
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
            {notes.length} note{notes.length === 1 ? "" : "s"} available
          </span>
          <h1 className="section-title text-4xl md:text-5xl leading-tight">{categoryTitle}</h1>
          <p className="section-subtitle mt-4 max-w-3xl">
            Open a note to start reviewing. Each note is structured for quick, focused
            recall.
          </p>

          {/* Notes list */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {notes.length === 0 ? (
              <div className="glass-card p-12 text-center max-w-xl mx-auto">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary-100 to-ocean-100 text-ocean-600 text-4xl">
                  <FaFilePdf />
                </div>
                <h3 className="section-title text-xl mb-2">Nothing here yet</h3>
                <p className="text-ink-500">
                  There are currently no notes in this category. Please check back later.
                </p>
              </div>
            ) : (
              notes.map((note, idx) => (
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
                    {note.modifiedAt && (
                      <p className="flex items-center gap-2 text-ink-500 text-sm mt-3">
                        <FaRegCalendarAlt className="text-ocean-500" />{" "}
                        {new Date(note.modifiedAt).toLocaleDateString()}
                      </p>
                    )}
                    <div className="mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-primary-400 to-ocean-400 group-hover:w-28 transition-all duration-500" />
                  </Link>
                </Reveal>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}