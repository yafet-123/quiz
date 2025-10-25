import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill (important for Next.js SSR)
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export function UpdateArticle({ article, subject, subjects, setUpdateModalOn }) {
  const router = useRouter();
  const [title, setTitle] = useState(article.title);
  const [slug, setSlug] = useState(article.slug);
  const [content, setContent] = useState(article.content || "");
  const [subjectId, setSubjectId] = useState(subject || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await axios.patch(`/api/articles/updateArticle/${article.id}`, {
        title,
        slug,
        content,
        subjectId,
      });
      router.reload();
    } catch (error) {
      console.error(error);
      setLoading(false);
    } finally {
      setUpdateModalOn(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-semibold mb-4 text-center text-emerald-600">
          Update Article
        </h2>

        {/* Subject Dropdown */}
        <div className="mb-3">
          <label className="block text-gray-700 font-medium mb-1">Subject</label>
          <select
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-emerald-500"
          >
            <option value="">Select Subject</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        {/* Title */}
        <div className="mb-3">
          <label className="block text-gray-700 font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Slug */}
        <div className="mb-3">
          <label className="block text-gray-700 font-medium mb-1">Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="article-title-slug"
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Content with React Quill */}
        <div className="mb-3">
          <label className="block text-gray-700 font-medium mb-1">Content</label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            className="rounded-lg border border-gray-300"
            placeholder="Write your article content here..."
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => setUpdateModalOn(false)}
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
          >
            {loading ? "Updating..." : "Update Article"}
          </button>
        </div>
      </div>
    </div>
  );
}
