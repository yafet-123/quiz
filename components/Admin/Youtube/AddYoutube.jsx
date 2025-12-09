import React, { useState } from "react";
import axios from "axios";
import { FiPlusCircle, FiTrash2 } from "react-icons/fi";
import Loader from "../../common/Loading";
import ReactModal from "react-modal";

export function AddYoutube({ subjects }) {
  const [loading, setLoading] = useState(false);
  const [loadingModalIsOpen, setLoadingModalIsOpen] = useState(false);
  const [subjectId, setSubjectId] = useState("");
  const [topicTitle, setTopicTitle] = useState("");

  // videos list
  const [videos, setVideos] = useState([]);

  // current video being typed
  const [currentVideo, setCurrentVideo] = useState({ name: "", link: "" });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const addVideo = () => {
    if (!currentVideo.name || !currentVideo.link) {
      setError("Please enter video name and link.");
      return;
    }

    setVideos([...videos, currentVideo]);
    setCurrentVideo({ name: "", link: "" });
    setError("");
  };

  const removeVideo = (index) => {
    setVideos(videos.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const allVideos =
      currentVideo.name && currentVideo.link
        ? [...videos, currentVideo]
        : videos;

    if (!subjectId || !topicTitle || allVideos.length === 0) {
      setError("Please fill all fields and add at least one video.");
      return;
    }

    setLoading(true);
    setLoadingModalIsOpen(true);

    try {
      const res = await axios.post("/api/youtube/add", {
        subjectId,
        topicTitle,
        videos: allVideos,
      });

      setSuccess("YouTube links added successfully!");
      setSubjectId("");
      setTopicTitle("");
      setVideos([]);
      setCurrentVideo({ name: "", link: "" });
    } catch (err) {
      console.error(err);
      setError("Failed to add YouTube links. Please try again.");
    } finally {
      setLoading(false);
      setLoadingModalIsOpen(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-24 px-4 lg:px-6 bg-gray-50">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-10 flex items-center justify-center gap-2 text-gray-800">
          <FiPlusCircle className="text-[#ff0000] text-4xl" />
          Add YouTube Link
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Subject */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Subject</label>
            <select
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
            >
              <option value="">Select Subject</option>
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>

          {/* Topic */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Topic Title</label>
            <input
              type="text"
              value={topicTitle}
              onChange={(e) => setTopicTitle(e.target.value)}
              required
              placeholder="Enter topic title"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
            />
          </div>

          {/* Current Video */}
          <div className="border p-4 rounded-xl bg-gray-50">
            <h3 className="font-semibold mb-2 text-gray-700">Add YouTube Video</h3>

            <input
              type="text"
              placeholder="Video Title"
              value={currentVideo.name}
              onChange={(e) =>
                setCurrentVideo((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full mb-2 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
            />

            <input
              type="text"
              placeholder="YouTube Video URL"
              value={currentVideo.link}
              onChange={(e) =>
                setCurrentVideo((prev) => ({ ...prev, link: e.target.value }))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff0000]"
            />

            <button
              type="button"
              onClick={addVideo}
              className="mt-2 bg-[#ff0000] hover:bg-[#cc0000] text-white px-4 py-2 rounded-xl font-medium"
            >
              Add This Video
            </button>
          </div>

          {/* Video List */}
          {videos.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold mb-2 text-gray-700">
                Videos to be submitted:
              </h4>
              <ul className="list-disc ml-5">
                {videos.map((v, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center bg-gray-100 p-2 rounded-xl mb-2"
                  >
                    <span>
                      {v.name} —{" "}
                      <a href={v.link} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
                        Link
                      </a>
                    </span>
                    <button
                      type="button"
                      onClick={() => removeVideo(i)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiTrash2 />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Messages */}
          {error && <div className="text-red-600 font-semibold text-center">{error}</div>}
          {success && (
            <div className="text-green-600 font-semibold text-center">{success}</div>
          )}

          {/* Submit */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 text-lg font-semibold rounded-xl shadow-md ${
                loading
                  ? "bg-gray-300"
                  : "bg-[#ff0000] hover:bg-[#cc0000] text-white"
              }`}
            >
              {loading ? "Submitting..." : "Submit YouTube Links"}
            </button>
          </div>
        </form>
      </div>

      {/* Loading Modal */}
      <ReactModal
        isOpen={loadingModalIsOpen}
        className="flex items-center justify-center w-full h-full"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <Loader />
      </ReactModal>
    </div>
  );
}
