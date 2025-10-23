import React, { useState } from "react";
import axios from "axios";
import ReactModal from "react-modal";
import Loader from "../../common/Loading";

export function DeleteFormula({ formulaId, setDeleteModalOn }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/formula/delete-formula/${formulaId}`);
      window.location.reload();
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Failed to delete formula sheet.");
    }
  };

  return (
    <ReactModal
      isOpen={true}
      className="flex items-center justify-center w-full h-full"
      onRequestClose={() => setDeleteModalOn(false)}
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 w-[95%] max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Delete Formula Sheet</h2>
        <p className="mb-6 text-gray-600">Are you sure you want to delete this formula sheet? This action cannot be undone.</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
          <button
            onClick={() => setDeleteModalOn(false)}
            className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </ReactModal>
  );
}
