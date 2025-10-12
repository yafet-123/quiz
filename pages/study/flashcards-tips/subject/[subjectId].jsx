import { MainHeader } from "../../../../components/common/MainHeader";
import { getAllFlashcardsBySubject, getFlashcardsForSubject } from "../../../../data/FlashCards.jsx";
import Link from "next/link"
import React, { useState } from "react";
import { FaBook } from "react-icons/fa";

export default function BookGradeDetail({ flashcards, subject }) {
  
  return (
    <div className="py-32 px-5 lg:px-20">
      <MainHeader title={`MatricMate`} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {flashcards.map((flash) => (
          <Link key={flash.topic} href={`/study/flashcards-tips/${subject}/flashcard/${flash.topic}`}>
            <a className="flex flex-col items-center gap-3 p-4 rounded-xl bg-[#ededf2] shadow hover:shadow-lg transition text-left">
              <span className="text-2xl text-indigo-500">
                <FaBook />
              </span>
              <span className="font-medium">{flash.topic}</span>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
 
export const getStaticProps = async (context) => {
  const subjectId = context.params.subjectId;
  const flashcards = getFlashcardsForSubject(subjectId);
  console.log(flashcards)
  if (!flashcards) {
    return {
      notFound: true,
    };
  }

  return {
    props: { flashcards, subject:subjectId },
    revalidate: 3600,
  };
};

export const getStaticPaths = async (context) => {
  const subjects = getAllFlashcardsBySubject();
  //   console.log(context)

  // Get the paths we want to pre-render based on grades
  const paths = subjects.map((book) => ({
    params: { subjectId: book.subject },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths: paths, fallback: false };
};