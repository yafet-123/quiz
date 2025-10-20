import React from "react";
import moment from "moment";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

export function DisplayDefinition({ subjects }) {
  return (
    <div className="px-2 lg:px-10 py-10">
      <h1 className="text-center text-3xl font-bold mb-8 text-gray-800 italic">
        Definition Sheets
      </h1>

      {subjects.map((subject) => (
        <div key={subject.id} className="mb-10">
          {/* Subject Name */}
          <h2 className="text-2xl font-bold mb-6 text-[#009688]">{subject.name}</h2>

          {subject.DefinitionSheet?.map((sheet) => (
            <div key={sheet.id} className="mb-6 bg-white border border-gray-200 rounded-xl">
              {/* Sheet Header */}
              <div className="p-4">
                <div className="py-2 space-x-2">
                  <button className="bg-emerald-500 text-white px-3 py-1 rounded-md">
                    <FiEdit2 />
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded-md">
                    <FiTrash2 />
                  </button>
                </div>
                <div className="flex justify-between items-center mb-3 rounded-xl">
                  <h3 className="text-xl font-semibold">{sheet.title}</h3>
                  <span className="text-sm text-gray-600">
                    Created by: {sheet.createdBy} | {moment(sheet.createdAt).format("YYYY-MM-DD")}
                  </span>
                </div>

                <div
                  className="prose max-w-none text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: sheet.description }}
                ></div>
              </div>
              {/* Definitions Table - Desktop */}
              {sheet.Definitions?.length === 0 ? (
                <p className="text-gray-500 mb-4">No definitions added yet.</p>
              ) : (
                <div className="hidden md:block">
                  <table className="min-w-full overflow-hidden">
                    <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
                      <tr>
                        <th className="px-4 py-2">Term</th>
                        <th className="px-4 py-2">Meaning</th>
                        <th className="px-4 py-2">Example</th>
                        <th className="px-4 py-2">Created By</th>
                        <th className="px-4 py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sheet.Definitions.map((def) => (
                        <tr key={def.id} className="hover:bg-gray-100">
                          <td className="px-4 py-2">{def.term}</td>
                          <td
                            className="prose max-w-none text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: def.meaning }}
                          ></td>
                          <td
                            className="prose max-w-none text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: def.example || "-" }}
                          ></td>
                          <td className="px-4 py-2">{def.createdBy}</td>
                          
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Mobile View */}
              <div className="md:hidden space-y-3 mt-4">
                {sheet.Definitions.map((def) => (
                  <div
                    key={def.id}
                    className="border-t border-gray-200 pt-2 px-3 bg-gray-50 rounded-xl"
                  >
                    <p>
                      <span className="font-semibold">Term:</span> {def.term}
                    </p>
                    <p>
                      <span className="font-semibold">Meaning:</span> {def.meaning}
                    </p>
                    {def.example && (
                      <p>
                        <span className="font-semibold">Example:</span> {def.example}
                      </p>
                    )}
                    <p className="text-sm text-gray-500">
                      Created by: {def.createdBy}
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
