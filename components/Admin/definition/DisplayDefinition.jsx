import React, { useState } from "react";
import moment from "moment";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { UpdateDefinitionSheet } from "./UpdateDefinitionSheet"; // import your update component
import { DeleteDefinitionSheet } from "./DeleteDefinitionSheet"; // import your delete component

export function DisplayDefinition({ subjects }) {
  const [updateModalOn, setUpdateModalOn] = useState(false);
  const [deleteModalOn, setDeleteModalOn] = useState(false);
  const [selectedSheet, setSelectedSheet] = useState(null);
  const [subject, setSubject] = useState()
  return (
    <div className="px-4 lg:px-12 py-12">
      <h1 className="text-center text-3xl font-bold mb-12 text-gray-800 italic">
        Definition Sheets
      </h1>

      {subjects.map((subject) => (
        <div key={subject.id} className="mb-12">
          {/* Subject Name */}
          <h2 className="text-2xl font-bold mb-6 text-[#009688]">{subject.name}</h2>

          {subject.DefinitionSheet?.map((sheet) => (
            <div
              key={sheet.id}
              className="mb-8 bg-white border border-gray-200 rounded-2xl shadow hover:shadow-lg transition p-5"
            >
              {/* Header & Actions */}
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-gray-800">{sheet.title}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedSheet(sheet);
                      setUpdateModalOn(true);
                      setSubject(subject.id)
                    }}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600"
                  >
                    <FiEdit2 /> Edit
                  </button>
                  <button
                    onClick={() => {
                      setSelectedSheet(sheet);
                      setDeleteModalOn(true);
                    }}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600"
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>

              {/* Info */}
              <p className="text-sm text-gray-500 mb-4">
                Created by: {sheet.createdBy} | {moment(sheet.createdAt).format("YYYY-MM-DD")}
              </p>

              <div
                className="prose max-w-none text-gray-700 mb-4"
                dangerouslySetInnerHTML={{ __html: sheet.description }}
              ></div>

              {/* Definitions Table (Desktop) */}
              {sheet.Definitions?.length > 0 ? (
                <div className="hidden md:block">
                  <table className="min-w-full text-left border-collapse">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
                      <tr>
                        <th className="px-4 py-2">Term</th>
                        <th className="px-4 py-2">Meaning</th>
                        <th className="px-4 py-2">Example</th>
                        <th className="px-4 py-2">Created By</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sheet.Definitions.map((def) => (
                        <tr key={def.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-2 font-medium">{def.term}</td>
                          <td
                            className="px-4 py-2 prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: def.meaning }}
                          ></td>
                          <td
                            className="px-4 py-2 prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: def.example || "-" }}
                          ></td>
                          <td className="px-4 py-2">{def.createdBy}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 italic">No definitions yet.</p>
              )}

              {/* Mobile View */}
              <div className="md:hidden space-y-3 mt-4">
                {sheet.Definitions.map((def) => (
                  <div
                    key={def.id}
                    className="bg-gray-50 p-3 rounded-xl border border-gray-200"
                  >
                    <p>
                      <span className="font-semibold">Term:</span> {def.term}
                    </p>
                    <p>
                      <span className="font-semibold">Meaning:</span>{" "}
                      <span dangerouslySetInnerHTML={{ __html: def.meaning }} />
                    </p>
                    {def.example && (
                      <p>
                        <span className="font-semibold">Example:</span>{" "}
                        <span dangerouslySetInnerHTML={{ __html: def.example }} />
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

      {/* Modals */}
      {updateModalOn && selectedSheet && (
        <UpdateDefinitionSheet
          sheet={selectedSheet}
          subjects={subjects}
          setUpdateModalOn={setUpdateModalOn}
          subject={subject}
        />
      )}

      {deleteModalOn && selectedSheet && (
        <DeleteDefinitionSheet
          sheetId={selectedSheet.id}
          setDeleteModalOn={setDeleteModalOn}
        />
      )}
    </div>
  );
}
