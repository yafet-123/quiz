import React, { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { UpdateExamPreparation } from "./UpdateExamPreparation";
import { DeleteExamPreparation } from "./DeleteExamPreparation";

export function DisplayExamPreparations({ subjects, onRefresh }) {
  
  const [selectedExamPrep, setSelectedExamPrep] = useState(null);
  const [subjectId, setSubjectId] = useState(null);
  const [updateModalOn, setUpdateModalOn] = useState(false);
  const [deleteModalOn, setDeleteModalOn] = useState(false);
  console.log(selectedExamPrep)
  return (
    <div className="px-4 lg:px-12 py-12 bg-gradient-to-b from-emerald-50 to-white min-h-screen">
      <h1 className="text-center text-4xl font-bold mb-12 text-emerald-700 italic tracking-wide">
        Exam Preparations
      </h1>

      {subjects.map((subject) => (
        <div
          key={subject.id}
          className="mb-12 bg-white rounded-3xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all"
        >
          <h2 className="text-3xl font-bold mb-6 text-emerald-600 border-b pb-2">
            {subject.name}
          </h2>

          {subject.ExamPreparation?.length > 0 ? (
            subject.ExamPreparation.map((exam) => (
              <div
                key={exam.id}
                className="bg-gray-50 rounded-2xl shadow-sm p-6 mb-6 hover:shadow-md transition-shadow border border-gray-100"
              >
                {/* Header: Book Name + Link */}
                <div className="flex justify-between items-center mb-4 border-b pb-3">
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {exam.nameOfBook}
                  </h3>
                  {exam.bookFile ? (
                    <a
                      href={exam.bookFile} // direct Google Drive link
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md shadow-sm transition"
                    >
                      View Book
                    </a>
                  ) : (
                    <span className="text-gray-400 italic">No link provided</span>
                  )}
                </div>

                {/* Topics List */}
                {exam.topics?.length > 0 && (
                  <ul className="mb-4 list-disc ml-6">
                    {exam.topics.map((topic) => (
                      <li key={topic.id} className="text-gray-700 mb-1">
                        {topic.title}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-3">
                  <button
                    onClick={() => {
                      setSelectedExamPrep(exam);
                      setSubjectId(subject.id);
                      setUpdateModalOn(true);
                    }}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-md shadow-md transition"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedExamPrep(exam);
                      setDeleteModalOn(true);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md shadow-md transition"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">
              No exam preparations added for this subject yet.
            </p>
          )}
        </div>
      ))}

      {/* Update & Delete Modals */}
      {updateModalOn && selectedExamPrep && (
        <UpdateExamPreparation
          examPrep={selectedExamPrep}
          setUpdateModalOn={setUpdateModalOn}
          subjects={subjects}
          subjectId={subjectId}
          onRefresh={onRefresh}
        />
      )}

      {deleteModalOn && selectedExamPrep && (
        <DeleteExamPreparation
          examPrep={selectedExamPrep}
          setDeleteModalOn={setDeleteModalOn}
          onRefresh={onRefresh}
        />
      )}
    </div>
  );
}
