import React from "react";
import moment from "moment";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

export function DisplayQuizzes({ subjects }) {
  return (
    <div className="px-4 lg:px-12 py-12 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800 italic">
        Quizzes
      </h1>

      {subjects.map((subject) => (
        <div key={subject.id} className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-[#009688]">{subject.name}</h2>

          {subject.Quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white rounded-2xl shadow-lg p-6 mb-8 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Quiz Header */}
              <div className="flex justify-between items-center mb-6 border-b pb-3">
                <h3 className="text-2xl font-semibold">{quiz.title}</h3>
                <div className="flex gap-3">
                  <button className="flex items-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl transition">
                    <FiEdit2 /> Edit
                  </button>
                  <button className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition">
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>

              {/* Questions */}
              <div className="space-y-6">
                {quiz.Questions.map((q, idx) => (
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

                    {/* Correct Answer */}
                    <p className="text-sm text-green-700 font-semibold mt-1">
                      Correct Answer: {q.answer}
                    </p>

                    {/* Created At */}
                    <p className="text-xs text-gray-500 mt-1">
                      Created on: {moment(q.createdAt).format("YYYY-MM-DD")}
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
