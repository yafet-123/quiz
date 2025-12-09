import React, { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { UpdateBook } from "./UpdateBook";
import { DeleteBook } from "./DeleteBook";

export function DisplayBooks({ subjects, onRefresh }) {
  const [selectedBook, setSelectedBook] = useState(null);
  const [subjectId, setSubjectId] = useState(null);
  const [updateModalOn, setUpdateModalOn] = useState(false);
  const [deleteModalOn, setDeleteModalOn] = useState(false);

  return (
    <div className="px-4 lg:px-12 py-12 bg-gradient-to-b from-purple-50 to-white min-h-screen">
      <h1 className="text-center text-4xl font-bold mb-12 text-purple-700 italic tracking-wide">
        Books
      </h1>

      {subjects.map((subject) => (
        <div
          key={subject.id}
          className="mb-12 bg-white rounded-3xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all"
        >
          <h2 className="text-3xl font-bold mb-6 text-purple-600 border-b pb-2">
            {subject.name}
          </h2>

          {subject.Book?.length > 0 ? (
            subject.Book.map((book) => (
              <div
                key={book.id}
                className="bg-gray-50 rounded-2xl shadow-sm p-6 mb-6 hover:shadow-md transition-shadow border border-gray-100"
              >
                {/* Header: Book Name + Link */}
                <div className="flex justify-between items-center mb-4 border-b pb-3">
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {book.title}
                  </h3>
                  {book.bookFile ? (
                    <a
                      href={book.bookFile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md shadow-sm transition"
                    >
                      View Book
                    </a>
                  ) : (
                    <span className="text-gray-400 italic">No link provided</span>
                  )}
                </div>

                {/* Topics List */}
                {book.BookTopic?.length > 0 && (
                  <ul className="mb-4 list-disc ml-6">
                    {book.BookTopic.map((topic) => (
                      <li key={topic.id} className="text-gray-700 mb-1">
                        {topic.title}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-3">
                  <button
                    onClick={() => {
                      setSelectedBook(book);
                      setSubjectId(subject.id);
                      setUpdateModalOn(true);
                    }}
                    className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-md shadow-md transition"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedBook(book);
                      setDeleteModalOn(true);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md shadow-md transition"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">
              No books added for this subject yet.
            </p>
          )}
        </div>
      ))}

      {/* Update & Delete Modals */}
      {updateModalOn && selectedBook && (
        <UpdateBook
          book={selectedBook}
          setUpdateModalOn={setUpdateModalOn}
          subjects={subjects}
          subjectId={subjectId}
          onRefresh={onRefresh}
        />
      )}

      {deleteModalOn && selectedBook && (
        <DeleteBook
          book={selectedBook}
          setDeleteModalOn={setDeleteModalOn}
          onRefresh={onRefresh}
        />
      )}
    </div>
  );
}
