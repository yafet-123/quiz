// UpdateFormula.js
import React, { useState } from "react";
import axios from "axios";
import ReactModal from "react-modal";
import Loader from "../../common/Loading";
import { FiPlusCircle, FiTrash2 } from "react-icons/fi";
import dynamic from "next/dynamic";

// Load React Quill dynamically
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export function UpdateFormula({ formula, subject, subjects, setUpdateModalOn, userId }) {
  const [loading, setLoading] = useState(false);
  const [loadingModalIsOpen, setLoadingModalIsOpen] = useState(false);
  const [topicName, setTopicName] = useState(formula.Topic?.name || "");
  const [subjectId, setSubjectId] = useState(subject.id || "");
  const [formulas, setFormulas] = useState([
    { title: formula.title || "", description: formula.description || "", formula: formula.formula || "" },
  ]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAddFormula = () => setFormulas([...formulas, { title: "", description: "", formula: "" }]);
  const handleRemoveFormula = (index) => setFormulas(formulas.filter((_, i) => i !== index));
  const handleFormulaChange = (index, field, value) => {
    const updated = [...formulas];
    updated[index][field] = value;
    setFormulas(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess(""); setLoading(true); setLoadingModalIsOpen(true);

    try {
      await axios.patch(`/api/formula/update-formula/${formula.id}`, {
        subjectId, topicName, formulas, userId
      });
      setSuccess("Formula sheet updated successfully!");
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      console.error(err);
      setError("Failed to update formula sheet. Please try again later.");
    } finally {
      setLoading(false);
      setLoadingModalIsOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-[95%] max-w-4xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#6b21a8] flex items-center justify-center gap-2">
          <FiPlusCircle /> Update Formula Sheet
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Subject */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Subject</label>
            <select
              required
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#6b21a8]"
            >
              <option value="">Select Subject</option>
              {subjects.map((sub) => <option key={sub.id} value={sub.id}>{sub.name}</option>)}
            </select>
          </div>

          {/* Topic Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Topic Name</label>
            <input
              type="text"
              required
              value={topicName}
              onChange={(e) => setTopicName(e.target.value)}
              placeholder="Enter topic name"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#6b21a8]"
            />
          </div>

          {/* Formula Sections */}
          {formulas.map((f, index) => (
            <div key={index} className="border border-gray-300 rounded-xl p-6 space-y-4 relative bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-gray-800">Formula {index + 1}</h3>
                {formulas.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveFormula(index)}
                    className="text-red-500 hover:text-red-700"
                    title="Remove formula"
                  >
                    <FiTrash2 size={20} />
                  </button>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Title</label>
                <input
                  type="text"
                  required
                  value={f.title}
                  onChange={(e) => handleFormulaChange(index, "title", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#6b21a8]"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Description</label>
                <textarea
                  rows={3}
                  value={f.description}
                  onChange={(e) => handleFormulaChange(index, "description", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#6b21a8]"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Formula (Rich Text)</label>
                <ReactQuill
                  theme="snow"
                  value={f.formula}
                  onChange={(value) => handleFormulaChange(index, "formula", value)}
                  className="bg-white rounded-xl border border-gray-300"
                  placeholder="Write the formula here"
                />
              </div>
            </div>
          ))}

          {/* Add New Formula */}
          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={handleAddFormula}
              className="flex items-center gap-2 text-[#6b21a8] font-semibold hover:underline"
            >
              <FiPlusCircle /> Add Another Formula
            </button>
          </div>

          {/* Feedback */}
          {error && <p className="text-red-600 font-semibold text-center">{error}</p>}
          {success && <p className="text-green-600 font-semibold text-center">{success}</p>}

          {/* Submit + Cancel */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 text-lg font-semibold rounded-xl transition duration-300 flex items-center justify-center gap-2 
                ${
                  loading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#6b21a8] hover:bg-[#4c1d95] text-white shadow-md"
                }`}
            >
              {loading ? "Updating..." : "Update Formula Sheet"}
            </button>

            <button
              type="button"
              onClick={() => setUpdateModalOn(false)}
              className="px-8 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Loading Modal */}
      <ReactModal isOpen={loadingModalIsOpen} className="flex items-center justify-center w-full h-full">
        <Loader />
      </ReactModal>
    </div>
  );
}
