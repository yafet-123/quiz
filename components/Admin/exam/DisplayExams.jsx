import React from "react";
import moment from "moment";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

export function DisplayExams({ subjects }) {
  return (
    <div className="px-4 lg:px-10 py-10">
      <h1 className="text-center text-3xl font-bold mb-10 text-gray-800 italic">
        Exams
      </h1>

      {subjects.map((subject) => (
        <div key={subject.id} className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-[#009688]">{subject.name}</h2>

          {subject.Exams.map((exam) => (
            <div key={exam.id} className="bg-white shadow-lg rounded-2xl p-6 mb-8">
              {/* Exam Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">{exam.title}</h3>
                <div className="space-x-3">
                  <button className="inline-flex items-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl">
                    <FiEdit2 /> Edit
                  </button>
                  <button className="inline-flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl">
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div> 

              {/* Questions */}
              <div className="space-y-4">
                {exam.Questions.map((q,idx) => (
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
                            opt.optionText === q.answer
                              ? "bg-green-100 border-green-500 font-semibold"
                              : "bg-white border-gray-300"
                          }`}
                        >
                          {String.fromCharCode(65 + i)}. {opt.optionText}
                        </span>
                      ))}
                    </div>

                    <p className="text-emerald-600 font-semibold">
                      Correct Answer: {q.answer}
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
    </div>
  );
}
