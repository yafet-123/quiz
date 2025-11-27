import React, { useState } from "react";
import axios from "axios";
import { FiPlusCircle, FiTrash2 } from "react-icons/fi";
import Loader from "../../common/Loading";
import ReactModal from "react-modal";

export function AddTopicWithFlashcards({ subjects }) {
  const [loading, setLoading] = useState(false);
  const [loadingModalIsOpen, setLoadingModalIsOpen] = useState(false);
  const [subjectId, setSubjectId] = useState("");
  const [topicId, setTopicId] = useState("");
  const [sheetTitle, setSheetTitle] = useState("");
  const [definitions, setDefinitions] = useState([{ term: "", meaning: "", example: "" }]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Add a new definition input set
  const addDefinitionField = () => {
    setDefinitions([...definitions, { term: "", meaning: "", example: "" }]);
  };

  // Remove a definition input set
  const removeDefinitionField = (index) => {
    const newDefinitions = definitions.filter((_, i) => i !== index);
    setDefinitions(newDefinitions);
  };

  // Update definition values
  const handleDefinitionChange = (index, field, value) => {
    const newDefinitions = [...definitions];
    newDefinitions[index][field] = value;
    setDefinitions(newDefinitions);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    setLoadingModalIsOpen(true);

    try { 
      await axios.post("/api/flashcard/add-flash-cards-with-topic", {
        subjectId,
        topicId: topicId || null,
        title: sheetTitle,
        definitions,
      });

      setSuccess("Flashcad added successfully!");
      setSubjectId("");
      setTopicId("");
      setSheetTitle("");
      setDefinitions([{ term: "", meaning: "", example: "" }]);
    } catch (err) {
      console.error(err);
      setError("Failed to add definition sheet. Try again later.");
    } finally {
      setLoading(false);
      setLoadingModalIsOpen(false);
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen py-24 px-2 lg:px-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10 flex items-center justify-center gap-2">
          <FiPlusCircle className="text-[#009688]" />
          Add Definition Sheet
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Select Subject */}
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

          {/* Optional Topic */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Topic (Optional)</label>
            <input
              type="text"
              placeholder="Enter topic ID or leave blank"
              value={topicId}
              onChange={(e) => setTopicId(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009688]"
            />
          </div>

          {/* Sheet Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Sheet Title</label>
            <input
              type="text"
              required
              placeholder="Enter definition sheet title"
              value={sheetTitle}
              onChange={(e) => setSheetTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009688]"
            />
          </div>

          {/* Definitions */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Definitions</label>
            {definitions.map((def, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-200 rounded-xl relative">
                {definitions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDefinitionField(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 />
                  </button>
                )}
                <input
                  type="text"
                  placeholder="Term"
                  required
                  value={def.term}
                  onChange={(e) => handleDefinitionChange(index, "term", e.target.value)}
                  className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009688]"
                />
                <textarea
                  rows={3}
                  placeholder="Meaning"
                  required
                  value={def.meaning}
                  onChange={(e) => handleDefinitionChange(index, "meaning", e.target.value)}
                  className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009688]"
                />
              </div>
            ))}

            <button
              type="button"
              onClick={addDefinitionField}
              className="flex items-center gap-2 text-[#009688] font-semibold mt-2"
            >
              <FiPlusCircle /> Add More Definition
            </button>
          </div>

          {/* Error / Success */}
          {error && <div className="text-red-600 font-semibold text-center">{error}</div>}
          {success && <div className="text-green-600 font-semibold text-center">{success}</div>}

          {/* Submit */}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 text-lg font-semibold rounded-xl transition duration-300 flex items-center justify-center gap-2 
                ${loading ? "bg-gray-300 cursor-not-allowed" : "bg-[#009688] hover:bg-[#00796b] text-white shadow-md"}`}
            >
              {loading ? "Submitting..." : "Submit Definition Sheet"}
            </button>
          </div>
        </form>
      </div>

      <ReactModal isOpen={loadingModalIsOpen} className="flex items-center justify-center w-full h-full">
        <Loader />
      </ReactModal>
    </div>
  );
}
