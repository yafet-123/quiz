import { MainHeader } from "../../../../components/common/MainHeader";
import { getAllNotes, getNotesBySubject } from "../../../../data/NotesData.jsx";
import { FaFilePdf } from "react-icons/fa6";
import Link from "next/link"
import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";

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
  return (
    <div className="py-32 px-5 lg:px-20">
      <MainHeader title={`MatricMate`} />
      <div className="flex flex-col">
        {notes.map((note, index) => (
          <div
              key={note.id}
              className="relative w-full h-48 cursor-pointer perspective"
              onClick={() => handleFlip(note.id)}
            >
              <div
                className={`relative w-full h-full duration-700 transform-style preserve-3d`}
              >
                {/* Front */}
                <div className="absolute w-full h-full bg-white rounded-2xl shadow-lg flex items-center justify-center p-6 text-center backface-hidden">
                  <span className="font-semibold text-lg md:text-xl text-gray-800">{note.title}</span>
                </div>

                {/* Back */}
                <div className="absolute w-full h-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl shadow-lg flex items-center justify-center p-6 text-center rotate-y-180 backface-hidden">
                  <span className="text-base md:text-lg">{note.definition}</span>
                </div>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
}