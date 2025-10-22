import React, { useState } from "react";
import axios from "axios";
import Loader from "../../common/Loading";

export function DeleteQuiz({ quizId, setDeleteModalOn }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/quiz/delete-quiz/${quizId}`);
      setDeleteModalOn(false);
      window.location.reload();
    } catch (err) {
      console.error(err);
      setError("Failed to delete quiz.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-4">Confirm Delete</h2>
        <p className="mb-6">Are you sure you want to delete this quiz?</p>

        {error && <p className="text-red-600 mb-3">{error}</p>}

        <div className="flex justify-center gap-4">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
          <button
            onClick={() => setDeleteModalOn(false)}
            className="bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>

        {loading && <Loader />}
      </div>
    </div>
  );
}
