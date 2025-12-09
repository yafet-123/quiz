import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Loader from "../../common/Loading";
import ReactModal from "react-modal";

export function UpdateYoutube({ subjects, video, setUpdateModalOn, subjectId }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingModalIsOpen, setLoadingModalIsOpen] = useState(false);
  const [error, setError] = useState("");

  const [selectedSubject, setSelectedSubject] = useState(subjectId);
  const [title, setTitle] = useState(video.title);
  const [url, setUrl] = useState(video.url || "");

  const handleUpdate = async () => {
    if (!selectedSubject || !title || !url) {
      setError("Subject, Video Title, and URL are required.");
      return;
    }

    setLoading(true);
    setLoadingModalIsOpen(true);
    setError("");

    try {
      await axios.patch(`/api/youtube/update/${video.id}`, {
        subjectId: selectedSubject,
        title,
        url,
      });

      router.reload();
    } catch (err) {
      console.error(err);
      setError("Failed to update YouTube link. Try again.");
      setLoadingModalIsOpen(false);
    } finally {
      setLoading(false);
      setUpdateModalOn(false);
    }
  };

  return (
    <div className="bg-gray-200 bg-opacity-95 fixed inset-0 z-50">
      <div className="flex h-screen justify-center items-center px-4">
        <div className="bg-white py-10 px-8 lg:px-10 border-t-4 border-red-500 rounded-2xl shadow-2xl w-full max-w-lg transition-all">
          <h2 className="text-center text-3xl font-extrabold text-red-600 mb-6">
            Update YouTube Link
          </h2>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          {/* Subject */}
          <div className="mb-5">
            <label className="block mb-2 text-gray-700 font-semibold">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-xl px-3 py-2 bg-white focus:outline-none focus:border-red-500 transition"
            >
              <option value="">Select Subject</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          {/* Video Title */}
          <div className="mb-5">
            <label className="block mb-2 text-gray-700 font-semibold">Video Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter video title"
              className="w-full border-2 border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-red-500 transition"
            />
          </div>

          {/* YouTube URL */}
          <div className="mb-5">
            <label className="block mb-2 text-gray-700 font-semibold">YouTube URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter YouTube video URL"
              className="w-full border-2 border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-red-500 transition"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              disabled={loading}
              onClick={handleUpdate}
              className={`rounded-xl px-6 py-2.5 font-semibold shadow-sm ${
                loading
                  ? "text-gray-600 bg-gray-200 cursor-not-allowed"
                  : "text-white bg-red-500 hover:bg-red-600 transition-all"
              }`}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={() => setUpdateModalOn(false)}
              className="rounded-xl px-6 py-2.5 font-semibold text-white bg-gray-400 hover:bg-gray-500 transition-all"
            >
              Cancel
            </button>
          </div>

          <ReactModal
            isOpen={loadingModalIsOpen}
            className="flex items-center justify-center w-full h-full"
          >
            <Loader />
          </ReactModal>
        </div>
      </div>
    </div>
  );
}
