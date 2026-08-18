import React from 'react'
import { SubjectGrid } from '../common/SubjectGrid';

export default function QuizSubject({subjects}) {
  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <SubjectGrid
        items={subjects}
        hrefPrefix="/study/practice-quizzes/subject"
        emptyMessage="No practice questions are available yet."
      />
    </div>
  );
}
