import { MainHeader } from "../../../../components/common/MainHeader";
import { getAllFlashcardsBySubject, getFlashcardsForSubject } from "../../../../data/FlashCards.jsx";
import Link from "next/link"
import React, { useState } from "react";
import { FaBook } from "react-icons/fa";
import { prisma } from "../../../../util/db.server";

export default function BookGradeDetail({ topics }) {
  
  return (
    <div className="py-32 px-5 lg:px-20">
      <MainHeader title="Aceit : Flashcard Subject Page" />
      <div className="px-4 py-32 max-w-4xl mx-auto">
        {topics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topics.map((flash) => (
              <Link key={flash.title} href={`/study/flashcards-tips/${flash.Subject.name}/flashcard/${flash.id}`}>
                <a className="flex flex-col items-center gap-3 p-4 rounded-xl bg-[#ededf2] shadow hover:shadow-lg transition text-left">
                  <span className="text-2xl text-indigo-500">
                    <FaBook />
                  </span>
                  <span className="font-medium">{flash.title}</span>
                </a>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">
            There are currently no Flash Card available for this subject. Please check back later.
          </p>
        )}
      </div>
    </div>
  );
}
 
export async function getServerSideProps(context) {
  const { subjectId } = context.params;

  try {
    const topics = await prisma.flashcardTopic.findMany({
      where: {
        subjectId: Number(subjectId),
      },
      include: {
        Subject: {
          select: { name: true },
        },
      },
      orderBy: {
        id: "asc",
      },
    });

    if (!topics.length) {
      return {
        notFound: false,
        props: { topics: [], subjectId },
      };
    }
    console.log(topics)
    return {
      props: {
        topics: JSON.parse(JSON.stringify(topics)),
      },
    };
  } catch (error) {
    console.error("Error fetching flashcard topics:", error);
    return {
      props: { topics: [], error: "Failed to load flashcard topics." },
    };
  }
}
