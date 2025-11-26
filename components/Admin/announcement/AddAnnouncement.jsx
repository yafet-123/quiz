import React, { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function AddAnnouncement({ authorId, refresh }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { data } = useSession();
  const UserData = data?.user;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/api/announcement/add", { title, content, authorId });
      setTitle("");
      setContent("");
      refresh(); // Refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to add announcement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 md:p-10 w-full max-w-lg mx-auto mb-8 animate-fadeIn">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Add New Announcement
      </h2>
      <p className="text-gray-500 text-center mb-6">
        Create an announcement for all students
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title Input */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            placeholder="Enter title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            required
          />
        </div>

        {/* Content Input */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Content</label>
          <textarea
            placeholder="Enter announcement content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition h-32 resize-none"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className={`w-full md:w-auto px-6 py-3 rounded-xl text-white font-semibold transition 
              ${loading 
                ? "bg-purple-300 cursor-not-allowed" 
                : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"}`
            }
          >
            {loading ? "Adding..." : "Add Announcement"}
          </button>
        </div>
      </form>
    </div>
  );
}
