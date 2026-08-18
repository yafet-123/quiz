import React from 'react'
import { SubjectGrid } from '../common/SubjectGrid';

export default function QuizSubject({subjects}) {
  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <SubjectGrid
        items={subjects}
        hrefPrefix="/study/youtube/subject"
        emptyMessage="No video topics are available yet."
      />
    </div>
  );
}
