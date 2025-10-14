import React, { useState } from "react";
import axios from "axios";
import { FiPlusCircle, FiTrash2 } from "react-icons/fi";
import Loader from "../../common/Loading";
import ReactModal from "react-modal";

export function AddExamWithQuestions({ subjects }) {
  const [loading, setLoading] = useState(false);
  const [loadingModalIsOpen, setLoadingModalIsOpen] = useState(false);
  const [subjectId, setSubjectId] = useState("");
  const [examTitle, setExamTitle] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctOption: "" },
  ]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ➕ Add new question
  const addQuestionField = () => {
    setQuestions([...questions, { question: "", options: ["", "", "", ""], correctOption: "" }]);
  };

  // 🗑️ Remove a question
  const removeQuestionField = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  // 📝 Handle input changes
  const handleQuestionChange = (index, field, value, optionIndex = null) => {
    const newQuestions = [...questions];
    if (field === "option") {
      newQuestions[index].options[optionIndex] = value;
    } else {
      newQuestions[index][field] = value;
    }
    setQuestions(newQuestions);
  };

  // 🚀 Handle form submit
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    setLoadingModalIsOpen(true);

    try {
      // Validate questions before sending
      for (let i = 0; i < questions.length; i++) {
        if (!questions[i].correctOption) {
          throw new Error(`Correct answer missing for question: "${questions[i].question}"`);
        }
      }

      const formattedQuestions = questions.map((q) => ({
        question: q.question,
        createdBy:1,
        correctOption: q.correctOption, // <-- rename from "answer" to "correctOption"
        Options: {
          create: q.options.map((opt) => ({ optionText: opt })),
        },
      }));

      console.log("Sending to API:", formattedQuestions);

      await axios.post("/api/exam/add-exam-with-questions", {
        subjectId,
        title: examTitle,
        createdBy: 1, // replace with actual userId
        questions: formattedQuestions,
      });

      setSuccess("Exam and questions added successfully!");
      setSubjectId("");
      setExamTitle("");
      setQuestions([{ question: "", options: ["", "", "", ""], correctOption: "" }]);
    } catch (err) {
      console.log(err);
      setError(err.message || "Failed to add exam and questions. Try again later.");
    } finally {
      setLoading(false);
      setLoadingModalIsOpen(false);
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen py-24 px-6 bg-gray-50">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10 flex items-center justify-center gap-2">
          <FiPlusCircle className="text-[#009688]" />
          Add Exam & Questions
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Subject Selection */}
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

          {/* Exam Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Exam Title</label>
            <input
              type="text"
              required
              placeholder="Enter exam title"
              value={examTitle}
              onChange={(e) => setExamTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009688]"
            />
          </div>

          {/* Questions Section */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Questions</label>
            {questions.map((q, index) => (
              <div key={index} className="mb-4 p-4 border border-gray-200 rounded-xl relative bg-gray-50">
                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestionField(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 />
                  </button>
                )}

                {/* Question */}
                <input
                  type="text"
                  placeholder="Question"
                  required
                  value={q.question}
                  onChange={(e) => handleQuestionChange(index, "question", e.target.value)}
                  className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009688]"
                />

                {/* Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {q.options.map((opt, optIndex) => (
                    <input
                      key={optIndex}
                      type="text"
                      placeholder={`Option ${optIndex + 1}`}
                      required
                      value={opt}
                      onChange={(e) =>
                        handleQuestionChange(index, "option", e.target.value, optIndex)
                      }
                      className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009688]"
                    />
                  ))}
                </div>

                {/* Correct Option */}
                <input
                  type="text"
                  placeholder="Correct Option"
                  required
                  value={q.correctOption}
                  onChange={(e) => handleQuestionChange(index, "correctOption", e.target.value)}
                  className="w-full mt-3 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009688]"
                />
              </div>
            ))}

            {/* Add More Question */}
            <button
              type="button"
              onClick={addQuestionField}
              className="flex items-center gap-2 text-[#009688] font-semibold mt-2"
            >
              <FiPlusCircle /> Add More Question
            </button>
          </div>

          {/* Error / Success Messages */}
          {error && <div className="text-red-600 font-semibold text-center">{error}</div>}
          {success && <div className="text-green-600 font-semibold text-center">{success}</div>}

          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 text-lg font-semibold rounded-xl transition duration-300 flex items-center justify-center gap-2 ${
                loading ? "bg-gray-300 cursor-not-allowed" : "bg-[#009688] hover:bg-[#00796b] text-white shadow-md"
              }`}
            >
              {loading ? "Submitting..." : "Submit Exam & Questions"}
            </button>
          </div>
        </form>
      </div>

      {/* Loading Modal */}
      <ReactModal
        isOpen={loadingModalIsOpen}
        className="flex items-center justify-center w-full h-full bg-black/40"
      >
        <Loader />
      </ReactModal>
    </div>
  );
}
