import React from 'react'
import { SubjectGrid } from '../common/SubjectGrid';

export default function BookSubject({ subjects }) {
  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <SubjectGrid
        items={subjects}
        hrefPrefix="/study/book/subject"
        emptyMessage="No books are available for this subject yet."
      />
    </div>
  );
}