import React, { useState } from "react";
import axios from "axios";

export default function UpdateAnnouncement({ id, title, setTitle, content, setContent, setUpdateModalOn, refresh }) {
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await axios.patch(`/api/announcement/update/${id}`, { title, content });
      refresh();
      setUpdateModalOn(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Update Announcement</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-3"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border px-3 py-2 rounded h-24 mb-3"
        />
        <div className="flex justify-end gap-2">
          <button onClick={() => setUpdateModalOn(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button
            onClick={handleUpdate}
            disabled={loading}
            className={`px-4 py-2 text-white rounded ${loading ? "bg-blue-300" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}
