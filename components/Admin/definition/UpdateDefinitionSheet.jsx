import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import ReactModal from "react-modal";
import Loader from "../../common/Loading";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export function UpdateDefinitionSheet({ sheet, subject, subjects, setUpdateModalOn }) {
  const router = useRouter();
  const [title, setTitle] = useState(sheet.title);
  const [subjectId, setSubjectId] = useState(subject);
  const [description, setDescription] = useState(sheet.description || "");
  const [definitions, setDefinitions] = useState(
    sheet.Definitions.map((d) => ({
      id: d.id,
      term: d.term,
      meaning: d.meaning,
      example: d.example || "",
    }))
  );
  const [loading, setLoading] = useState(false);
  const [loadingModalIsOpen, setLoadingModalIsOpen] = useState(false);

  const handleDefinitionChange = (index, field, value) => {
    const newDefs = [...definitions];
    newDefs[index][field] = value;
    setDefinitions(newDefs);
  };

  const addDefinitionField = () => {
    setDefinitions([...definitions, { term: "", meaning: "", example: "" }]);
  };

  const removeDefinitionField = (index) => {
    const newDefs = definitions.filter((_, i) => i !== index);
    setDefinitions(newDefs);
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      setLoadingModalIsOpen(true);

      await axios.patch(`/api/definitionSheet/update/${sheet.id}`, {
        title,
        subjectId: parseInt(subjectId),
        description,
        definitions,
      });

      router.reload();
    } catch (err) {
      console.error(err);
      setLoading(false);
      setLoadingModalIsOpen(false);
    } finally {
      setUpdateModalOn(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-3xl shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-semibold mb-4 text-center text-emerald-600">
          Update Definition Sheet
        </h2>

        {/* Title */}
        <div className="mb-3">
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>

        {/* Subject */}
        <div className="mb-3">
          <label className="block font-medium mb-1">Subject</label>
          <select
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-lg"
          >
            <option value="">Select Subject</option>
            {subjects.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="block font-medium mb-1">Description</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            className="rounded-lg border border-gray-300"
          />
        </div>

        {/* Definitions */}
        <div className="mb-3">
          <h3 className="font-semibold mb-2">Definitions</h3>
          {definitions.map((def, index) => (
            <div key={index} className="border p-4 rounded-xl mb-4 relative bg-gray-50">
              {definitions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeDefinitionField(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              )}
              <input
                type="text"
                placeholder="Term"
                value={def.term}
                onChange={(e) => handleDefinitionChange(index, "term", e.target.value)}
                className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-lg"
              />
              <label className="block mb-1 font-medium">Meaning</label>
              <ReactQuill
                value={def.meaning}
                onChange={(val) => handleDefinitionChange(index, "meaning", val)}
                className="mb-2 bg-white rounded-lg"
              />
              <label className="block mb-1 font-medium">Example</label>
              <ReactQuill
                value={def.example}
                onChange={(val) => handleDefinitionChange(index, "example", val)}
                className="bg-white rounded-lg"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addDefinitionField}
            className="text-[#009688] font-semibold mt-2"
          >
            Add Another Definition
          </button>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => setUpdateModalOn(false)}
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white"
          >
            {loading ? "Updating..." : "Update Sheet"}
          </button>
        </div>

        <ReactModal
          isOpen={loadingModalIsOpen}
          className="flex items-center justify-center w-full h-full"
        >
          <Loader />
        </ReactModal>
      </div>
    </div>
  );
}
