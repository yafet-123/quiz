import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { useSession } from "next-auth/react";

// ✅ Dynamically import ReactQuill (for Next.js SSR)
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export function AddArticle({ subjects }) {
  const { data } = useSession();
  const UserData = data?.user;
  const [subjectId, setSubjectId] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [slugError, setSlugError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // 🖼️ Quill modules (image upload enabled)
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: function () {
          const input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");
          input.click();

          input.onchange = async () => {
            const file = input.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = () => {
                const base64Image = reader.result;
                const quill = this.quill;
                const range = quill.getSelection();
                quill.insertEmbed(range.index, "image", base64Image);
              };
              reader.readAsDataURL(file);
            }
          };
        },
      },
    },
  }), []);

  // ✅ Slug uniqueness check
  const checkSlugUnique = async (value) => {
    setSlug(value);
    if (!value.trim()) return;
    try {
      const res = await axios.get(`/api/articles/check-slug?slug=${value}`);
      if (res.data.exists) {
        setSlugError("❌ Slug already exists. Choose another one.");
      } else {
        setSlugError("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (slugError) return;

    try {
      await axios.post("/api/articles/add", {
        subjectId,
        title,
        slug,
        content,
        createdBy: UserData.user_id,
      });
      setSuccess("✅ Article added successfully!");
      setSubjectId("");
      setTitle("");
      setSlug("");
      setContent("");
    } catch (err) {
      console.error(err);
      setSuccess("❌ Failed to add article.");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-2 lg:p-6 my-6">
      <h2 className="text-xl font-semibold mb-4">Add New Article</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* Subject Dropdown */}
        <select
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          required
          className="p-2 border rounded-md"
        >
          <option value="">Select Subject</option>
          {subjects.map((subj) => (
            <option key={subj.id} value={subj.id}>
              {subj.name}
            </option>
          ))}
        </select>

        {/* Title */}
        <input
          type="text"
          placeholder="Article Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="p-2 border rounded-md"
        />

        {/* Slug */}
        <input
          type="text"
          placeholder="Slug (must be unique)"
          value={slug}
          onChange={(e) => checkSlugUnique(e.target.value)}
          required
          className={`p-2 border rounded-md ${slugError ? "border-red-500" : ""}`}
        />
        {slugError && <p className="text-red-500 text-sm">{slugError}</p>}

        {/* React Quill Editor */}
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
          placeholder="Write your article content here... (you can insert images)"
          className="h-64 mb-6"
        />

        {/* Submit */}
        <div className="flex justify-center mt-8">
            <button
                type="submit"
                disabled={loading}
                className={`px-8 py-3 text-lg font-semibold rounded-xl transition duration-300 flex items-center justify-center gap-2 
                  ${loading ? "bg-gray-300 cursor-not-allowed" : "bg-[#009688] hover:bg-[#00796b] text-white shadow-md"}`}
            >
              Add Article
            </button>
        </div>

        {success && <p className="text-green-600 mt-2">{success}</p>}
      </form>
    </div>
  );
}
