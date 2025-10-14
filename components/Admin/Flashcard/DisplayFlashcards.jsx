import React from "react";
import moment from "moment";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

export function DisplayFlashcards({ subjects }) {
  return (
    <div className="px-4 lg:px-10 py-10">
      <h1 className="text-center text-3xl font-bold mb-8 text-gray-800 italic">
        Flashcards
      </h1>

      {subjects.map((subject) => (
        <div key={subject.id} className="mb-10">
          <h2 className="text-2xl font-bold mb-4 text-[#009688]">{subject.name}</h2>
          {subject.Topics.map((topic) => (
            <div key={topic.id} className="bg-white shadow-md rounded-2xl p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">{topic.title}</h3>
                <div className="space-x-3">
                  <button className="inline-flex items-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl">
                    <FiEdit2 /> Edit
                  </button>
                  <button className="inline-flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl">
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>

              {/* Desktop Table */}
              <div className="hidden md:block">
                <table className="min-w-full bg-gray-50 border border-gray-200">
                  <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                    <tr>
                      <th className="px-4 py-2">Term</th>
                      <th className="px-4 py-2">Definition</th>
                      <th className="px-4 py-2">Created At</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topic.Flashcards.map((card) => (
                      <tr key={card.id} className="hover:bg-gray-100">
                        <td className="px-4 py-2">{card.term}</td>
                        <td className="px-4 py-2">{card.definition}</td>
                        <td className="px-4 py-2">
                          {moment(card.createdAt).format("YYYY-MM-DD")}
                        </td>
                        <td className="px-4 py-2 space-x-2">
                          <button className="bg-emerald-500 text-white px-3 py-1 rounded-md">
                            <FiEdit2 />
                          </button>
                          <button className="bg-red-500 text-white px-3 py-1 rounded-md">
                            <FiTrash2 />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View */}
              <div className="md:hidden space-y-3 mt-4">
                {topic.Flashcards.map((card) => (
                  <div key={card.id} className="border-t border-gray-200 pt-2">
                    <p>
                      <span className="font-semibold">Term:</span> {card.term}
                    </p>
                    <p>
                      <span className="font-semibold">Definition:</span> {card.definition}
                    </p>
                    <p className="text-sm text-gray-500">
                      Created: {moment(card.createdAt).format("YYYY-MM-DD")}
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
