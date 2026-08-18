import React from 'react'
import { SubjectGrid } from '../common/SubjectGrid';

export default function Subject({subjects}) {
  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <SubjectGrid
        items={subjects}
        hrefPrefix="/study/flashcards-tips/subject"
        emptyMessage="No flashcard topics are available yet."
      />
    </div>
  );
}
