import { useState, useEffect } from "react";
import { getAllFlashcardsBySubject, getFlashCardBySubjectAndTitle } from "../../../../../data/FlashCards.jsx";


export async function getStaticProps(context) {
  const { subject, topic } = context.params;
  const flashcard = getFlashCardBySubjectAndTitle(subject, topic);
  console.log(flashcard)
  if (!flashcard) {
    return { notFound: true };
  }

  return {
    props: { flashcard, subject },
    revalidate: 3600,
  };
}

export async function getStaticPaths() {
  const allSubjects = getAllFlashcardsBySubject();

  const paths = allSubjects.flatMap((subject) =>
    subject.topics.map((flash) => ({
      params: {
        subject: subject.subject.toString(),
        topic: flash.topic,
      },
    }))
  );

  return { paths, fallback: false };
}

export default function FlashCard({ flashcard, subject }) {
  const [flipped, setFlipped] = useState({}); // track flipped cards

  const handleFlip = (id) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-50 to-gray-100 py-24 px-4">
  <div className="mb-12 w-full max-w-6xl">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center border-b-2 border-indigo-500 pb-4">
      {flashcard.topic}
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {flashcard.cards.map((card) => (
        <div
          key={card.id}
          className="relative w-full h-48 cursor-pointer perspective"
          onClick={() => handleFlip(card.id)}
        >
          <div
            className={`relative w-full h-full duration-700 transform-style preserve-3d ${
              flipped[card.id] ? "rotate-y-180" : ""
            }`}
          >
            {/* Front */}
            <div className="absolute w-full h-full bg-white rounded-2xl shadow-lg flex items-center justify-center p-6 text-center backface-hidden">
              <span className="font-semibold text-lg md:text-xl text-gray-800">{card.term}</span>
            </div>

            {/* Back */}
            <div className="absolute w-full h-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl shadow-lg flex items-center justify-center p-6 text-center rotate-y-180 backface-hidden">
              <span className="text-base md:text-lg">{card.definition}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>


  );
}
