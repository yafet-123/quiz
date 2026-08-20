import { prisma } from "../../../../util/db.server";
import React from "react";
import Link from "next/link";
import { MainHeader } from "../../../../components/common/MainHeader";

export async function getServerSideProps(context) {
  const { subjectId } = context.params;

  let categories = [];
  let notes = [];

  // Prefer subject → category → notes, but fall back to a direct list
  // if the RevisionNoteCategory table has not been created yet.
  try {
    if (typeof prisma.RevisionNoteCategory !== "undefined") {
      try {
        categories = await prisma.RevisionNoteCategory.findMany({
          where: { subjectId: Number(subjectId) },
          include: { _count: { select: { RevisionNote: true } } },
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
      notes = await prisma.RevisionNote.findMany({
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
      categories: JSON.parse(JSON.stringify(categories)),
      notes: JSON.parse(JSON.stringify(notes)),
    },
  };
}

export default function RevisionNoteSubject({ categories, notes }) {
  return (
    <div className="py-32 px-5 lg:px-20">
      <MainHeader title="Aceit : Revision Note Subject Page" />

      {categories.length > 0 ? (
        <>
          <h1 className="text-3xl font-bold mb-2">Revision Notes</h1>
          <p className="text-gray-500 text-md mb-8">Choose a topic to view its notes.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/study/revision-note/category/${category.id}`}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-2xl shadow-lg p-6 hover:scale-105 transition transform"
              >
                <h2 className="font-bold text-xl md:text-2xl">{category.title}</h2>
                <p className="mt-2 opacity-80">
                  {category._count?.RevisionNote || 0} note(s) available
                </p>
              </Link>
            ))}
          </div>
        </>
      ) : notes.length > 0 ? (
        <>
          <h1 className="text-3xl font-bold mb-6">Revision Notes</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notes.map((note) => (
              <Link
                key={note.id}
                href={`/study/revision-note/${note.id}`}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-2xl shadow-lg p-6 hover:scale-105 transition transform"
              >
                <h2 className="font-bold text-xl md:text-2xl">{note.title}</h2>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-600 text-lg">
          There are currently no Revision Notes available for this subject. Please check back later.
        </p>
      )}
    </div>
  );
}