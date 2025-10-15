import React from "react";
import moment from "moment";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

export function DisplayComprehensiveNotes({ notes }) {
  return (
    <div className="px-4 lg:px-12 py-12 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800 italic">
        Comprehensive Notes
      </h1>

      {notes.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No notes available.</p>
      ) : (
        notes.map((note) => (
          <div
            key={note.id}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8 hover:shadow-xl transition-shadow duration-300"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <div>
                <h2 className="text-2xl font-bold text-[#009688] mb-1">
                  {note.title}
                </h2>
                <p className="text-sm text-gray-500">
                  Subject:{" "}
                  <span className="font-semibold">{note.Subject?.name}</span>
                </p>
                <p className="text-xs text-gray-400">
                  Created on: {moment(note.createdAt).format("YYYY-MM-DD")}
                </p>
              </div>

              <div className="flex gap-3">
                <button className="flex items-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl transition">
                  <FiEdit2 /> Edit
                </button>
                <button className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition">
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>

            {/* Content (Rich Text HTML) */}
            <div
              className="prose max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: note.content }}
            ></div>
          </div>
        ))
      )}
    </div>
  );
}
