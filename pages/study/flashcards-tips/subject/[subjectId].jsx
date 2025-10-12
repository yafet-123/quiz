import { MainHeader } from "../../../../components/common/MainHeader";
import { getAllRevisionNotes, getRevisionNotesBySubject } from "../../../../data/revisionNote.jsx";
import { FaFilePdf } from "react-icons/fa6";
import Link from "next/link"
import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";

export default function BookGradeDetail({ all_notes }) {
  const [visibleAnswers, setVisibleAnswers] = useState(
    Array(all_notes.length).fill(false),
  );

  const toggleAnswer = (index) => {
    const updatedVisibility = [...visibleAnswers];
    updatedVisibility[index] = !updatedVisibility[index];
    setVisibleAnswers(updatedVisibility);
  };
  return (
    <div className="py-32 px-5 lg:px-20">
      <MainHeader title={`MatricMate`} />
      <div className="flex flex-col">
        {all_notes.map((note, index) => (
          <div key={index} className="border px-4 py-5 rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
              <h3 className="flex items-center font-semibold text-md lg:text-lg mb-2">
                <h1 className="pr-5">
                  <FaFilePdf size={40} color="#df646a" />
                </h1>
                {note.title}
              </h3>
              <button
                aria-label={`Open menu ${index}`}
                onClick={() => toggleAnswer(index)}
                className="bg-[#2664eb] text-white px-3 py-1 rounded hover:bg-blue-700 transition"
              >
                {visibleAnswers[index] ? <IoIosArrowUp /> : <FaAngleDown />}
              </button>
            </div>
            {visibleAnswers[index] && (
              <div className="flex flex-col">
                <p className="mt-2 text-lg lg:text-xl text-gray-700 my-5">
                  {note.description}
                </p>
                <Link href={`/study/revision-note/${note.id}`}>
                  <a className="w-32 text-white bg-[#3699ff] hover:bg-[#002244] px-3 py-2 border rounded-2xl text-md md:text-lg font-bold">
                    View Detail
                  </a>
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
 
export const getStaticProps = async (context) => {
  const subjectId = context.params.subjectId;
  const all_notes = getRevisionNotesBySubject(subjectId);

  if (!all_notes) {
    return {
      notFound: true,
    };
  }

  return {
    props: { all_notes },
    revalidate: 3600,
  };
};

export const getStaticPaths = async (context) => {
  const subjects = getAllRevisionNotes();
  //   console.log(context)

  // Get the paths we want to pre-render based on grades
  const paths = subjects.map((book) => ({
    params: { subjectId: book.subject },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths: paths, fallback: false };
};