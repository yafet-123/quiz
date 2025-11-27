import React, { useState } from "react";
import axios from "axios";
import Loader from "../../common/Loading";
import ReactModal from "react-modal";
import { FiPlusCircle, FiTrash2 } from "react-icons/fi";

export function UpdateWorksheet({ worksheet, subject, subjects, setUpdateModalOn, userId }) {
  const [loading, setLoading] = useState(false);
  const [loadingModalIsOpen, setLoadingModalIsOpen] = useState(false);
  console.log(subject)
  // Initialize with existing worksheet data
  const [title, setTitle] = useState(worksheet.title || "");
  const [subjectId, setSubjectId] = useState(subject.id || "");
  const [questions, setQuestions] = useState(
    worksheet.Questions?.map((q) => ({
      question: q.question,
      correctAnswer: q.correctAnswer,
      options: q.Options?.map((o) => o.optionText) || ["", "", "", ""],
    })) || []
  );

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 📝 Handle question or option edits
  const handleQuestionChange = (index, field, value, optIndex = null) => {
    const newQ = [...questions];
    if (field === "option") newQ[index].options[optIndex] = value;
    else newQ[index][field] = value;
    setQuestions(newQ);
  };

  // ➕ Add new question
  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correctAnswer: "" },
    ]);
  };

  // 🗑️ Remove a question
  const handleRemoveQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  // 💾 Save changes
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    setLoadingModalIsOpen(true);

    try {
      // Format questions for API
      const formattedQuestions = questions.map((q) => ({
        question: q.question,
        correctAnswer: q.correctAnswer,
        createdBy: userId, // optional
        Options: { create: q.options.map((opt) => ({ optionText: opt })) },
      }));

      await axios.patch(`/api/worksheet/update-worksheet/${worksheet.id}`, {
        title,
        subjectId,
        questions: formattedQuestions,
      });

      setSuccess("worksheet updated successfully!");
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to update worksheet.");
    } finally {
      setLoading(false);
      setLoadingModalIsOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-[95%] max-w-3xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-semibold text-center mb-6 text-[#009688]">
          Update worksheet
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Subject */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Subject
            </label>
            <select
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#009688]"
            >
              <option value="">Select Subject</option>
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>

          {/* worksheet Title */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              worksheet Title
            </label>
            <input
              type="text"
              value={title}
              placeholder="Enter worksheet Title"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#009688]"
            />
          </div>

          {/* Questions */}
          {questions.map((q, i) => (
            <div
              key={i}
              className="border rounded-xl p-4 relative bg-gray-50 shadow-sm"
            >
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveQuestion(i)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <FiTrash2 />
                </button>
              )}

              <input
                type="text"
                value={q.question}
                onChange={(e) =>
                  handleQuestionChange(i, "question", e.target.value)
                }
                placeholder="Question"
                className="w-full border rounded-lg px-3 py-2 mb-3 focus:ring-2 focus:ring-[#009688]"
              />

              <div className="grid grid-cols-2 gap-2">
                {q.options.map((opt, j) => (
                  <input
                    key={j}
                    type="text"
                    value={opt}
                    onChange={(e) =>
                      handleQuestionChange(i, "option", e.target.value, j)
                    }
                    placeholder={`Option ${j + 1}`}
                    className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#009688]"
                  />
                ))}
              </div>

              <input
                type="text"
                value={q.correctAnswer}
                onChange={(e) =>
                  handleQuestionChange(i, "correctAnswer", e.target.value)
                }
                placeholder="Correct Option"
                className="w-full mt-3 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#009688]"
              />
            </div>
          ))}

          {/* Add More Question */}
          <button
            type="button"
            onClick={handleAddQuestion}
            className="text-[#009688] flex items-center gap-2 font-medium"
          >
            <FiPlusCircle /> Add Question
          </button>

          {/* Messages */}
          {error && <p className="text-red-600 text-center">{error}</p>}
          {success && <p className="text-green-600 text-center">{success}</p>}

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 rounded-lg text-white font-medium transition ${
                loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#009688] hover:bg-[#00796b]"
              }`}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={() => setUpdateModalOn(false)}
              className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Loader Modal */}
        <ReactModal
          isOpen={loadingModalIsOpen}
          className="flex items-center justify-center w-full h-full bg-black/40"
        >
          <Loader />
        </ReactModal>
      </div>
    </div>
  );
}
