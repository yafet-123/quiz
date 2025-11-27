import React, { useState } from "react";
import moment from "moment";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { UpdateFormula } from "./UpdateFormula"; // ✅ import update modal
import { DeleteFormula } from "./DeleteFormula"; // ✅ import delete modal

export function DisplayFormula({ subjects, currentUserId, userId }) {
  const [updateModalOn, setUpdateModalOn] = useState(false);
  const [deleteModalOn, setDeleteModalOn] = useState(false);
  const [subject, setSubject] = useState(null);
  const [selectedFormula, setSelectedFormula] = useState(null);

  const handleEdit = (subject, formula) => {
    setSubject(subject);
    setSelectedFormula(formula);
    setUpdateModalOn(true);
  };

  const handleDelete = (subject, formula) => {
    setSubject(subject);
    setSelectedFormula(formula);
    setDeleteModalOn(true);
  };

  return (
    <div className="px-2 lg:px-10 py-10">
      <h1 className="text-center text-3xl font-bold mb-10 text-gray-800 italic">
        Formulas
      </h1>

      {subjects.map((subject) => (
        <div key={subject.id} className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-[#6b21a8]">{subject.name}</h2>
          {subject.FormulaSheet.map((sheet) => (
            <div
              key={sheet.id}
              className="bg-white shadow-lg rounded-2xl p-6 mb-8 transition hover:shadow-xl"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800">{sheet.title}</h3>

                {sheet.createdBy === currentUserId && (
                  <div className="space-x-3">
                    <button
                      onClick={() => handleEdit(subject, sheet)}
                      className="inline-flex items-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl transition"
                    >
                      <FiEdit2 /> Edit
                    </button>

                    <button
                      onClick={() => handleDelete(subject, sheet)}
                      className="inline-flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </div>
                )}
              </div>

              {/* Formula & Topic */}
              <div className="space-y-3">
                <p className="flex text-gray-700">
                  <span className="font-semibold pr-2">Formula:</span>
                  <span
                    className="prose prose-purple max-w-none text-gray-800"
                    dangerouslySetInnerHTML={{ __html: sheet.formula }}
                  />
                </p>
                
                {sheet.Topic && (
                  <p className="text-gray-600">
                    <span className="font-semibold">Topic:</span> {sheet.Topic.name}
                  </p>
                )}
                {sheet.description && (
                  <p className="text-gray-600">
                    <span className="font-semibold">Description:</span> {sheet.description}
                  </p>
                )}
                <p className="text-sm text-gray-400">
                  Created: {moment(sheet.createdAt).format("YYYY-MM-DD")}
                </p>
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* ✅ Modals */}
      {updateModalOn && selectedFormula && (
        <UpdateFormula
          subject={subject}
          formula={selectedFormula}
          setUpdateModalOn={setUpdateModalOn}
          subjects={subjects}
          userId={userId}
        />
      )}

      {deleteModalOn && selectedFormula && (
        <DeleteFormula
          formulaId={selectedFormula.id}
          setDeleteModalOn={setDeleteModalOn}
        />
      )}
    </div>
  );
}
