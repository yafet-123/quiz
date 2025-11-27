import React, { useState } from "react";
import axios from "axios";
import Loader from "../../common/Loading";
import { FiPlusCircle, FiTrash2 } from "react-icons/fi";

export function UpdateQuiz({ quizId, subject, currentQuiz, subjects, setUpdateModalOn, userId }) {
  console.log(subject)
  const [title, setTitle] = useState(currentQuiz.title || "");
  const [subjectId, setSubjectId] = useState(subject.id || "");
  const [questions, setQuestions] = useState(
    currentQuiz.Questions.map((q) => ({
      question: q.question,
      answer: q.answer,
      options: q.Options.map((o) => o.optionText),
    }))
  );
  const [loading, setLoading] = useState(false);
  const [loadingModalIsOpen, setLoadingModalIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleQuestionChange = (index, field, value, optIndex = null) => {
    const newQuestions = [...questions];
    if (field === "option") newQuestions[index].options[optIndex] = value;
    else newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: "", options: ["", "", "", ""], answer: "" }]);
  };

  const handleRemoveQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    setLoadingModalIsOpen(true);

    try {
      const formattedQuestions = questions.map((q) => ({
        question: q.question,
        answer: q.answer,
        Options: { create: q.options.map((opt) => ({ optionText: opt })) },
      }));

      await axios.patch(`/api/quiz/update-quiz/${quizId}`, {
        title,
        subjectId,
        questions: formattedQuestions,
      });

      setSuccess("Quiz updated successfully!");
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to update quiz.");
    } finally {
      setLoading(false);
      setLoadingModalIsOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center z-50">
  <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-3xl max-h-[90vh] overflow-y-auto p-6">
    <h2 className="text-2xl font-semibold text-center mb-4">Update Quiz</h2>
    <form onSubmit={handleSubmit} className="space-y-6">
      <select
        value={subjectId}
        onChange={(e) => setSubjectId(e.target.value)}
        className="w-full border rounded-lg px-4 py-2"
      >
        <option value="">Select Subject</option>
        {subjects.map((sub) => (
          <option key={sub.id} value={sub.id}>
            {sub.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={title}
        placeholder="Quiz Title"
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border rounded-lg px-4 py-2"
      />

      {questions.map((q, i) => (
        <div key={i} className="border rounded-xl p-4 relative">
          {questions.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemoveQuestion(i)}
              className="absolute top-2 right-2 text-red-500"
            >
              <FiTrash2 />
            </button>
          )}
          <input
            type="text"
            value={q.question}
            onChange={(e) => handleQuestionChange(i, "question", e.target.value)}
            placeholder="Question"
            className="w-full border rounded-lg px-3 py-2 mb-3"
          />
          <div className="grid grid-cols-2 gap-2">
            {q.options.map((opt, j) => (
              <input
                key={j}
                type="text"
                value={opt}
                onChange={(e) => handleQuestionChange(i, "option", e.target.value, j)}
                placeholder={`Option ${j + 1}`}
                className="border rounded-lg px-3 py-2"
              />
            ))}
          </div>
          <input
            type="text"
            value={q.answer}
            onChange={(e) => handleQuestionChange(i, "answer", e.target.value)}
            placeholder="Correct Option"
            className="w-full mt-2 border rounded-lg px-3 py-2"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddQuestion}
        className="text-[#009688] flex items-center gap-2"
      >
        <FiPlusCircle /> Add Question
      </button>

      {error && <p className="text-red-600 text-center">{error}</p>}
      {success && <p className="text-green-600 text-center">{success}</p>}

      <div className="flex justify-center gap-4 mt-6">
        <button
          type="submit"
          className="bg-[#009688] text-white px-6 py-2 rounded-lg hover:bg-[#00796b]"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={() => setUpdateModalOn(false)}
          className="bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </form>

    {loadingModalIsOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40">
        <Loader />
      </div>
    )}
  </div>
</div>

  );
}
