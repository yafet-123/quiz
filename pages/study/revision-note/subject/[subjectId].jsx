import { useRouter } from "next/router";
import { prisma } from "../../../../util/db.server";
import { FaFilePdf } from "react-icons/fa6";
import Link from "next/link"
import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import { MainHeader } from "../../../../components/common/MainHeader";

export async function getServerSideProps(context) {
  const { subjectId } = context.params; // get subjectId from the URL

  try { 
    const notes = await prisma.RevisionNote.findMany({
      where: { subjectId: Number(subjectId) },
      select: {
        id: true,
        title: true,
        modifiedAt: true,
      },
      orderBy: {
        modifiedAt: 'desc', // optional: order by most recently modified
      },
    });

    console.log("Fetched notes:", notes);

    return {
      props: {
        notes: JSON.parse(JSON.stringify(notes)), // serialize for Next.js
      },
    };
  } catch (error) {
    console.error("Error fetching notes:", error);
    return {
      props: {
        notes: [],
        error: "Failed to load notes.",
      },
    };
  }
}


export default function BookGradeDetail({ notes }) {
  const router = useRouter();

  const goToDetail = (noteId) => {
    router.push(`/study/revision-note/${noteId}`);
  };
  return (
    <div className="py-32 px-5 lg:px-20">
      <MainHeader title={`MatricMate`} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <div
            key={note.id}
            className="cursor-pointer bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-2xl shadow-lg p-6 hover:scale-105 transition transform"
            onClick={() => goToDetail(note.id)}
          >
            <h2 className="font-bold text-xl md:text-2xl">{note.title}</h2>
            <p className="mt-2 text-sm md:text-base opacity-80">
              Click to view full note
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}