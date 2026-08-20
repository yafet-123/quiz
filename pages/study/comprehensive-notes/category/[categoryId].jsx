import { prisma } from "../../../../util/db.server";
import React from "react";
import Link from "next/link";
import { FaFilePdf } from "react-icons/fa6";
import { MainHeader } from "../../../../components/common/MainHeader";

export async function getServerSideProps(context) {
  const { categoryId } = context.params;

  try {
    const category = await prisma.NoteCategory.findUnique({
      where: { id: Number(categoryId) },
      select: { id: true, title: true },
    });

    const notes = await prisma.Note.findMany({
      where: { noteCategoryId: Number(categoryId) },
      select: { id: true, title: true, modifiedAt: true },
      orderBy: { modifiedAt: "desc" },
    });

    return {
      props: {
        categoryTitle: category?.title || "Notes",
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
    <div className="py-32 px-5 lg:px-20">
      <MainHeader title="Aceit : Notes" />
      <Link
        href="/study/comprehensive-notes"
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
              href={`/study/comprehensive-notes/${note.id}`}
              className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-2xl shadow-lg p-6 hover:scale-105 transition transform"
            >
              <div className="flex items-center gap-3">
                <FaFilePdf size={28} />
                <h2 className="font-bold text-lg md:text-xl">{note.title}</h2>
              </div>
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