import React, { useState } from "react";
import axios from "axios";
import { FiPlusCircle, FiTrash2 } from "react-icons/fi";
import Loader from "../../common/Loading";
import ReactModal from "react-modal";

export function AddPastPaper({ subjects }) {
  const [loading, setLoading] = useState(false);
  const [loadingModalIsOpen, setLoadingModalIsOpen] = useState(false);
  const [subjectId, setSubjectId] = useState("");
  const [topicTitle, setTopicTitle] = useState("");

  // papers list
  const [papers, setPapers] = useState([]);

  // current paper being typed
  const [currentPaper, setCurrentPaper] = useState({ name: "", link: "", year: "" });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const addPaper = () => {
    if (!currentPaper.name || !currentPaper.link) {
      setError("Please enter paper name and link.");
      return;
    }

    setPapers([...papers, currentPaper]);
    setCurrentPaper({ name: "", link: "", year: "" });
    setError("");
  };

  const removePaper = (index) => {
    setPapers(papers.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const allPapers =
      currentPaper.name && currentPaper.link
        ? [...papers, currentPaper]
        : papers;

    if (!subjectId || !topicTitle || allPapers.length === 0) {
      setError("Please fill all fields and add at least one paper.");
      return;
    }

    setLoading(true);
    setLoadingModalIsOpen(true);

    try {
      const res = await axios.post("/api/past-paper/add", {
        subjectId,
        topicTitle,
        papers: allPapers,
      });

      setSuccess("Past papers added successfully!");
      setSubjectId("");
      setTopicTitle("");
      setPapers([]);
      setCurrentPaper({ name: "", link: "", year: "" });
    } catch (err) {
      console.error(err);
      setError("Failed to add past papers. Please try again.");
    } finally {
      setLoading(false);
      setLoadingModalIsOpen(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-24 px-4 lg:px-6 bg-gray-50">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-10 flex items-center justify-center gap-2 text-gray-800">
          <FiPlusCircle className="text-[#ff5722] text-4xl" />
          Add Past Paper
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Subject */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Subject</label>
            <select
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff5722]"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff5722]"
            />
          </div>

          {/* Current Paper */}
          <div className="border p-4 rounded-xl bg-gray-50">
            <h3 className="font-semibold mb-2 text-gray-700">Add Past Paper</h3>

            <input
              type="text"
              placeholder="Paper Name"
              value={currentPaper.name}
              onChange={(e) =>
                setCurrentPaper((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full mb-2 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff5722]"
            />

            <input
              type="number"
              placeholder="Year (optional)"
              value={currentPaper.year}
              onChange={(e) =>
                setCurrentPaper((prev) => ({ ...prev, year: e.target.value }))
              }
              className="w-full mb-2 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff5722]"
            />

            <input
              type="text"
              placeholder="Paper File Link (Google Drive, Dropbox, etc.)"
              value={currentPaper.link}
              onChange={(e) =>
                setCurrentPaper((prev) => ({ ...prev, link: e.target.value }))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff5722]"
            />

            <button
              type="button"
              onClick={addPaper}
              className="mt-2 bg-[#ff5722] hover:bg-[#e64a19] text-white px-4 py-2 rounded-xl font-medium"
            >
              Add This Paper
            </button>
          </div>

          {/* Paper List */}
          {papers.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold mb-2 text-gray-700">
                Papers to be submitted:
              </h4>
              <ul className="list-disc ml-5">
                {papers.map((p, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center bg-gray-100 p-2 rounded-xl mb-2"
                  >
                    <span>
                      {p.name} {p.year && `(${p.year})`} —{" "}
                      <a href={p.link} className="text-blue-600 underline">
                        Link
                      </a>
                    </span>
                    <button
                      type="button"
                      onClick={() => removePaper(i)}
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
                  : "bg-[#ff5722] hover:bg-[#e64a19] text-white"
              }`}
            >
              {loading ? "Submitting..." : "Submit Past Papers"}
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
