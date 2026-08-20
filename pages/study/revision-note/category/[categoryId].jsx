import { prisma } from "../../../../util/db.server";
import React from "react";
import Link from "next/link";
import { MainHeader } from "../../../../components/common/MainHeader";

export async function getServerSideProps(context) {
  const { categoryId } = context.params;

  try {
    let category = null;
    let notes = [];

    if (typeof prisma.RevisionNoteCategory !== "undefined") {
      category = await prisma.RevisionNoteCategory
        .findUnique({ where: { id: Number(categoryId) }, select: { id: true, title: true } })
        .catch(() => null);
    }

    notes = await prisma.RevisionNote.findMany({
      where: { revisionNoteCategoryId: Number(categoryId) },
      select: { id: true, title: true, modifiedAt: true },
      orderBy: { modifiedAt: "desc" },
    }).catch(() => []);

    return {
      props: {
        categoryTitle: category?.title || "Revision Notes",
        notes: JSON.parse(JSON.stringify(notes)),
      },
    };
  } catch (error) {
    console.error("Error fetching revision notes:", error);
    return { props: { categoryTitle: "Revision Notes", notes: [] } };
  }
}

export default function RevisionNotesInCategory({ categoryTitle, notes }) {
  return (
    <div className="py-32 px-5 lg:px-20">
      <MainHeader title="Aceit : Revision Notes" />
      <Link
        href="/study/revision-note"
        className="text-purple-600 font-semibold inline-block mb-4 hover:underline"
      >
        ← Back to Subjects
      </Link>
      <h1 className="text-3xl font-bold mb-6">{categoryTitle}</h1>

      {notes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notes.map((note) => (
            <Link
              key={note.id}
              href={`/study/revision-note/${note.id}`}
              className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-2xl shadow-lg p-6 hover:scale-105 transition transform"
            >
              <h2 className="font-bold text-xl md:text-2xl">{note.title}</h2>
              <p className="mt-2 text-sm md:text-base opacity-80">Click to view full note</p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">
          There are currently no notes in this topic. Please check back later.
        </p>
      )}
    </div>
  );
}