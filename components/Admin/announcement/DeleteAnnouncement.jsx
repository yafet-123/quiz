import React, { useState } from "react";
import axios from "axios";
import ReactModal from "react-modal";
import Loader from "../../common/Loading"; // Optional loading spinner component

export default function DeleteAnnouncement({ id, setDeleteModalOn, refresh }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this announcement?")) return;

    setLoading(true);
    try {
      await axios.delete(`/api/announcement/delete/${id}`);
      refresh(); // Refresh announcement list
      setDeleteModalOn(false);
    } catch (err) {
      console.error(err);
      alert("Failed to delete announcement. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setDeleteModalOn(false);
  };

  return (
    <ReactModal
      isOpen={true}
      onRequestClose={handleCancel}
      className="fixed inset-0 flex items-center justify-center p-4"
      overlayClassName="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-fadeIn">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Delete Announcement
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Are you sure you want to delete this announcement? This action cannot be undone.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleCancel}
            className="px-6 py-2 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className={`px-6 py-2 rounded-xl text-white font-semibold transition ${
              loading
                ? "bg-red-300 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 rounded-2xl">
            <Loader /> {/* Your loading spinner */}
          </div>
        )}
      </div>
    </ReactModal>
  );
}
