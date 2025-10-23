// DeleteNote.js
import React, { useState } from "react";
import axios from "axios";
import ReactModal from "react-modal";
import Loader from "../../common/Loading";

export function DeleteNote({ noteId, setDeleteModalOn }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setError("");
    setLoading(true);
    try {
      await axios.delete(`/api/revisionNote/delete-note/${noteId}`);
      window.location.reload();
    } catch (err) {
      console.error(err);
      setError("Failed to delete note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md">
        <h2 className="text-xl font-bold text-center mb-4">Confirm Delete</h2>
        <p className="text-center mb-4">Are you sure you want to delete this note?</p>

        {error && <p className="text-red-600 text-center mb-2">{error}</p>}

        <div className="flex justify-center gap-4">
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
          <button
            onClick={() => setDeleteModalOn(false)}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-xl font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>

      {loading && (
        <ReactModal isOpen={loading} className="flex items-center justify-center w-full h-full">
          <Loader />
        </ReactModal>
      )}
    </div>
  );
}
