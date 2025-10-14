import React, { useState } from "react";
import axios from "axios";
import { FiPlusCircle, FiTrash2 } from "react-icons/fi";
import Loader from "../../common/Loading";
import ReactModal from "react-modal";

export function AddTopicWithFlashcards({ subjects }) {
  const [loading, setLoading] = useState(false);
  const [loadingModalIsOpen, setLoadingModalIsOpen] = useState(false);
  const [subjectId, setSubjectId] = useState("");
  const [topicTitle, setTopicTitle] = useState("");
  const [flashcards, setFlashcards] = useState([{ term: "", definition: "" }]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Add a new flashcard input set
  const addFlashcardField = () => {
    setFlashcards([...flashcards, { term: "", definition: "" }]);
  };

  // Remove a flashcard input set
  const removeFlashcardField = (index) => {
    const newFlashcards = flashcards.filter((_, i) => i !== index);
    setFlashcards(newFlashcards);
  };

  // Update flashcard values
  const handleFlashcardChange = (index, field, value) => {
    const newFlashcards = [...flashcards];
    newFlashcards[index][field] = value;
    setFlashcards(newFlashcards);
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
        topicTitle,
        flashcards,
      });

      setSuccess("Topic and flashcards added successfully!");
      setSubjectId("");
      setTopicTitle("");
      setFlashcards([{ term: "", definition: "" }]);
      setLoading(false);
      setLoadingModalIsOpen(false);
    } catch (err) {
      console.error(err);
      setError("Failed to add topic and flashcards. Try again later.");
      setLoading(false);
      setLoadingModalIsOpen(false);
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen py-24 px-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10 flex items-center justify-center gap-2">
          <FiPlusCircle className="text-[#009688]" />
          Add Topic & Flashcards
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
                <option key={subject.id} value={subject.id}>{subject.name}</option>
              ))}
            </select>
          </div>

          {/* Topic Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Topic Title</label>
            <input
              type="text"
              required
              placeholder="Enter topic title"
              value={topicTitle}
              onChange={(e) => setTopicTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009688]"
            />
          </div>

          {/* Flashcards */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Flashcards</label>
            {flashcards.map((card, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-200 rounded-xl relative">
                {flashcards.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFlashcardField(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 />
                  </button>
                )}
                <input
                  type="text"
                  placeholder="Term"
                  required
                  value={card.term}
                  onChange={(e) => handleFlashcardChange(index, "term", e.target.value)}
                  className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009688]"
                />
                <textarea
                  rows={3}
                  placeholder="Definition"
                  required
                  value={card.definition}
                  onChange={(e) => handleFlashcardChange(index, "definition", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009688]"
                />
              </div>
            ))}

            <button
              type="button"
              onClick={addFlashcardField}
              className="flex items-center gap-2 text-[#009688] font-semibold mt-2"
            >
              <FiPlusCircle /> Add More Flashcard
            </button>
          </div>

          {/* Error / Success */}
          {error && <div className="text-red-600 font-semibold text-center">{error}</div>}
          {success && <div className="text-green-600 font-semibold text-center">{success}</div>}

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 text-lg font-semibold rounded-xl transition duration-300 flex items-center justify-center gap-2 
                ${loading ? "bg-gray-300 cursor-not-allowed" : "bg-[#009688] hover:bg-[#00796b] text-white shadow-md"}`}
            >
              {loading ? "Submitting..." : "Submit Topic & Flashcards"}
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
