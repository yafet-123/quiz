import React, { useState } from "react";
import axios from "axios";
import { FiPlusCircle, FiTrash2 } from "react-icons/fi";
import Loader from "../../common/Loading";
import ReactModal from "react-modal";

export function AddBook({ subjects }) {
  const [loading, setLoading] = useState(false);
  const [loadingModalIsOpen, setLoadingModalIsOpen] = useState(false);
  const [subjectId, setSubjectId] = useState("");
  const [topicTitle, setTopicTitle] = useState("");

  // books list
  const [books, setBooks] = useState([]);

  // current book being typed
  const [currentBook, setCurrentBook] = useState({ name: "", link: "" });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const addBook = () => {
    if (!currentBook.name || !currentBook.link) {
      setError("Please enter book name and link.");
      return;
    }

    setBooks([...books, currentBook]);
    setCurrentBook({ name: "", link: "" });
    setError("");
  };

  const removeBook = (index) => {
    setBooks(books.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const allBooks =
      currentBook.name && currentBook.link
        ? [...books, currentBook]
        : books;

    if (!subjectId || !topicTitle || allBooks.length === 0) {
      setError("Please fill all fields and add at least one book.");
      return;
    }

    setLoading(true);
    setLoadingModalIsOpen(true);

    try {
      const res = await axios.post("/api/book/add", {
        subjectId,
        topicTitle,
        books: allBooks,
      });

      setSuccess("Books added successfully!");
      setSubjectId("");
      setTopicTitle("");
      setBooks([]);
      setCurrentBook({ name: "", link: "" });
    } catch (err) {
      console.error(err);
      setError("Failed to add books. Please try again.");
    } finally {
      setLoading(false);
      setLoadingModalIsOpen(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-24 px-4 lg:px-6 bg-gray-50">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-10 flex items-center justify-center gap-2 text-gray-800">
          <FiPlusCircle className="text-[#673ab7] text-4xl" />
          Add Book
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Subject */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Subject</label>
            <select
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#673ab7]"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#673ab7]"
            />
          </div>

          {/* Current Book */}
          <div className="border p-4 rounded-xl bg-gray-50">
            <h3 className="font-semibold mb-2 text-gray-700">Add Book</h3>

            <input
              type="text"
              placeholder="Book Name"
              value={currentBook.name}
              onChange={(e) =>
                setCurrentBook((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full mb-2 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#673ab7]"
            />

            <input
              type="text"
              placeholder="Book File Link (Google Drive, Dropbox, etc.)"
              value={currentBook.link}
              onChange={(e) =>
                setCurrentBook((prev) => ({ ...prev, link: e.target.value }))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#673ab7]"
            />

            <button
              type="button"
              onClick={addBook}
              className="mt-2 bg-[#673ab7] hover:bg-[#5e35b1] text-white px-4 py-2 rounded-xl font-medium"
            >
              Add This Book
            </button>
          </div>

          {/* Book List */}
          {books.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold mb-2 text-gray-700">
                Books to be submitted:
              </h4>
              <ul className="list-disc ml-5">
                {books.map((b, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center bg-gray-100 p-2 rounded-xl mb-2"
                  >
                    <span>
                      {b.name} —{" "}
                      <a href={b.link} className="text-blue-600 underline">
                        Link
                      </a>
                    </span>
                    <button
                      type="button"
                      onClick={() => removeBook(i)}
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
                  : "bg-[#673ab7] hover:bg-[#5e35b1] text-white"
              }`}
            >
              {loading ? "Submitting..." : "Submit Books"}
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
