import React, { useState } from "react";
import moment from "moment";
import axios from "axios";
import { useRouter } from "next/router";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { UpdateWorksheet } from "./UpdateWorksheet"; // ✅ import update modal
import { DeleteWorksheet } from "./DeleteWorksheet"; // ✅ import delete modal

export function DisplayWorksheets({ subjects, userId }) {
  const router = useRouter();

  const [updateModalOn, setUpdateModalOn] = useState(false);
  const [deleteModalOn, setDeleteModalOn] = useState(false);
  const [subject, setSubject] = useState(false);
  const [selectedWorksheet, setSelectedWorksheet] = useState(null);
  console.log(subjects)
  const handleEdit = (subject, worksheet) => {
    setSubject(subject)
    setSelectedWorksheet(worksheet);
    setUpdateModalOn(true);
  };

  const handleDelete = (subject, worksheet) => {
    setSubject(subject)
    setSelectedWorksheet(worksheet);
    setDeleteModalOn(true);
  };

  return (
    <div className="px-2 lg:px-10 py-10">
      <h1 className="text-center text-3xl font-bold mb-10 text-gray-800 italic">
        Worksheet
      </h1>

      {subjects.map((subject) => (
        <div key={subject.id} className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-[#009688]">{subject.name}</h2>

          {subject.Worksheets.map((worksheet) => (
            <div
              key={worksheet.id}
              className="bg-white shadow-lg rounded-2xl p-6 mb-8 transition hover:shadow-xl"
            >
              {/* worksheet Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">{worksheet.title}</h3>

                <div className="space-x-3">
                  <button
                    onClick={() => handleEdit(subject, worksheet)}
                    className="inline-flex items-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl transition"
                  >
                    <FiEdit2 /> Edit
                  </button>

                  <button
                    onClick={() => handleDelete(subject, worksheet)}
                    className="inline-flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>

              {/* Questions */}
              <div className="space-y-4">
                {worksheet.Questions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="p-4 rounded-xl bg-gray-50 border border-gray-200 hover:border-[#009688] transition"
                  >
                    {/* Question */}
                    <p className="text-lg font-semibold mb-2">
                      {idx + 1}. {q.question}
                    </p>

                    {/* Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                      {q.Options?.map((opt, i) => (
                        <span
                          key={opt.id}
                          className={`px-3 py-1 rounded-full border ${
                            opt.optionText === q.correctAnswer
                              ? "bg-green-100 border-green-500 font-semibold"
                              : "bg-white border-gray-300"
                          }`}
                        >
                          {String.fromCharCode(65 + i)}. {opt.optionText}
                        </span>
                      ))}
                    </div>

                    <p className="text-emerald-600 font-semibold">
                      Correct Answer: {q.correctAnswer}
                    </p>

                    <p className="text-sm text-gray-500 mt-2">
                      Created: {moment(q.createdAt).format("YYYY-MM-DD")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* ✅ Modals (conditionally rendered) */}
      {updateModalOn && selectedWorksheet && (
        <UpdateWorksheet
          subject={subject}
          worksheet={selectedWorksheet}
          setUpdateModalOn={setUpdateModalOn}
          subjects={subjects}
          userId={userId}
        />
      )}

      {deleteModalOn && selectedWorksheet && (
        <DeleteWorksheet
          worksheetId={selectedWorksheet.id}
          setDeleteModalOn={setDeleteModalOn}
        />
      )}
    </div>
  );
}
