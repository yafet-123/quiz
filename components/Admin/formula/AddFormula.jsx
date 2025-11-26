import React, { useState } from "react";
import axios from "axios";
import ReactModal from "react-modal";
import Loader from "../../common/Loading";
import { FiPlusCircle, FiTrash2 } from "react-icons/fi";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";

// Load React Quill dynamically (to avoid SSR issues)
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export function AddFormula({ subjects }) {
  const { data } = useSession();
  const userData = data?.user;
  const [loading, setLoading] = useState(false);
  const [loadingModalIsOpen, setLoadingModalIsOpen] = useState(false);
  const [topicName, settopicName] = useState();
  const [subjectId, setSubjectId] = useState("");
  const [formulas, setFormulas] = useState([{ title: "", description: "", formula: "" }]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ Add a new formula section
  const handleAddFormula = () => {
    setFormulas([...formulas, { title: "", description: "", formula: "" }]);
  };

  // ✅ Remove a formula section
  const handleRemoveFormula = (index) => {
    setFormulas(formulas.filter((_, i) => i !== index));
  };

  // ✅ Handle field changes for each formula
  const handleFormulaChange = (index, field, value) => {
    const updated = [...formulas];
    updated[index][field] = value;
    setFormulas(updated);
  };

  // ✅ Handle submission
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    setLoadingModalIsOpen(true);

    try {
      await axios.post("/api/formula/add-formula", {
        subjectId,
        topicName,
        formulas,
        createdBy: userData.user_id,
      });

      setSuccess("Formula sheet added successfully!");
      setSubjectId("");
      setFormulas([{ title: "", description: "", formula: "" }]);
    } catch (err) {
      console.error(err);
      setError("Failed to add formula sheet. Please try again later.");
    } finally {
      setLoading(false);
      setLoadingModalIsOpen(false);
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen px-2 lg:px-6 pb-10">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10 flex items-center justify-center gap-2">
          <FiPlusCircle className="text-[#009688]" />
          Add Formula Sheet
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Subject Dropdown */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Subject</label>
            <select
              required
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009688]"
            >
              <option value="">Select Subject</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Topic Name</label>
            <input
              type="text"
              required
              placeholder="Enter formula title"
              value={topicName}
              onChange={(e) => settopicName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009688]"
            />
          </div>

          {/* Formula Sections */}
          {formulas.map((formula, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-xl p-6 space-y-4 relative bg-gray-50"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-gray-800">
                  Formula {index + 1}
                </h3>
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

              {/* Formula Title */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Title</label>
                <input
                  type="text"
                  required
                  placeholder="Enter formula title"
                  value={formula.title}
                  onChange={(e) => handleFormulaChange(index, "title", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009688]"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Description</label>
                <textarea
                  rows={3}
                  placeholder="Enter a short description"
                  value={formula.description}
                  onChange={(e) => handleFormulaChange(index, "description", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009688]"
                ></textarea>
              </div>

              {/* Formula (Rich Text) */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Formula (Rich Text)
                </label>
                <ReactQuill
                  theme="snow"
                  value={formula.formula}
                  onChange={(value) => handleFormulaChange(index, "formula", value)}
                  className="bg-white rounded-xl border border-gray-300"
                  placeholder="Write the formula here (supports bold, symbols, etc.)"
                />
              </div>
            </div>
          ))}

          {/* Add New Formula Button */}
          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={handleAddFormula}
              className="flex items-center gap-2 text-[#009688] font-semibold hover:underline"
            >
              <FiPlusCircle />
              Add Another Formula
            </button>
          </div>

          {/* Feedback */}
          {error && <p className="text-red-600 font-semibold text-center">{error}</p>}
          {success && <p className="text-green-600 font-semibold text-center">{success}</p>}

          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 text-lg font-semibold rounded-xl transition duration-300 flex items-center justify-center gap-2 
                ${
                  loading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#009688] hover:bg-[#00796b] text-white shadow-md"
                }`}
            >
              {loading ? "Submitting..." : "Submit Formula Sheet"}
            </button>
          </div>
        </form>
      </div>

      {/* Loading Modal */}
      <ReactModal
        isOpen={loadingModalIsOpen}
        className="flex items-center justify-center w-full h-full"
      >
        <Loader />
      </ReactModal>
    </div>
  );
}
