import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Loader from "../../common/Loading";
import ReactModal from "react-modal";

export function UpdateFlashcard({ subjects, card, setupdateModalOn, subjectId, topic }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [LoadingmodalIsOpen, setLoadingModalIsOpen] = useState(false);
  const [error, setError] = useState("");

  const [selectedSubject, setselectedSubject] = useState(subjectId);
  const [topicTitle, setTopicTitle] = useState(topic);
  const [updateterm, setupdateterm] = useState(card.term);
  const [updatedefinition, setupdatedefinition] = useState(card.definition);

  const handleOKClickForupdate = async () => {
    if (!selectedSubject || !topicTitle || !updateterm || !updatedefinition) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setLoadingModalIsOpen(true);
    setError("");

    try {
      await axios.patch(`../api/flashcard/updateFlashcard/${card.id}`, {
        selectedSubject,
        topicTitle,
        updateterm,
        updatedefinition,
      });
      // After successful update
      router.reload(); // refresh page to show updated flashcard
    } catch (err) {
      console.error(err);
      setError("Failed to update flashcard. Try again.");
      setLoadingModalIsOpen(false);
    } finally {
      setLoading(false);
      setupdateModalOn(false); // close modal after update
    }
  };

  return (
    <div className="bg-gray-200 bg-opacity-95 fixed inset-0 z-50">
      <div className="flex h-screen justify-center items-center px-4">
        <div className="bg-white py-10 px-8 lg:px-10 border-t-4 border-emerald-500 rounded-2xl shadow-2xl w-full max-w-lg transition-all">
          <h2 className="text-center text-3xl font-extrabold text-emerald-600 mb-6">
            Update Flashcard
          </h2>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <div className="mb-5">
            <label className="block mb-2 text-gray-700 font-semibold">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setselectedSubject(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-xl px-3 py-2 bg-white focus:outline-none focus:border-emerald-500 transition"
            >
              <option value="">Select Subject</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-gray-700 font-semibold">Topic Title</label>
            <input
              type="text"
              value={topicTitle}
              onChange={(e) => setTopicTitle(e.target.value)}
              placeholder="Enter topic title"
              className="w-full border-2 border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-gray-700 font-semibold">Term</label>
            <input
              type="text"
              value={updateterm}
              onChange={(e) => setupdateterm(e.target.value)}
              placeholder="Enter flashcard term"
              className="w-full border-2 border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          <div className="mb-8">
            <label className="block mb-2 text-gray-700 font-semibold">Definition</label>
            <textarea
              rows={4}
              value={updatedefinition}
              onChange={(e) => setupdatedefinition(e.target.value)}
              placeholder="Enter flashcard definition"
              className="w-full border-2 border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          <div className="flex justify-center space-x-4">
            <button
              disabled={loading}
              onClick={handleOKClickForupdate}
              className={`rounded-xl px-6 py-2.5 font-semibold shadow-sm ${
                loading
                  ? "text-gray-600 bg-gray-200 cursor-not-allowed"
                  : "text-white bg-emerald-500 hover:bg-emerald-600 transition-all"
              }`}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={() => setupdateModalOn(false)}
              className="rounded-xl px-6 py-2.5 font-semibold text-white bg-gray-400 hover:bg-gray-500 transition-all"
            >
              Cancel
            </button>
          </div>

          <ReactModal
            isOpen={LoadingmodalIsOpen}
            className="flex items-center justify-center w-full h-full"
          >
            <Loader />
          </ReactModal>
        </div>
      </div>
    </div>
  );
}
