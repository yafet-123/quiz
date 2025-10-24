import React, { useState } from "react";
import moment from "moment";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { UpdateFlashcard } from "./UpdateFlashcard";
import { DeleteFlashcard } from "./DeleteFlashcard";

export function DisplayFlashcards({ subjects, onRefresh }) {
  const [selectedCard, setSelectedCard] = useState(null);
  const [showUpdate, setShowUpdate] = useState(false);
  const [subjectId, setsubjectId] = useState();
  const [topic, settopic] = useState()
  const [deletemodalOn, setdeleteModalOn] = useState(false);
  const [updatemodalOn, setupdateModalOn] = useState(false);

  return (
    <div className="px-4 lg:px-12 py-12 bg-gradient-to-b from-emerald-50 to-white min-h-screen">
      <h1 className="text-center text-4xl font-bold mb-12 text-emerald-700 italic tracking-wide">
        Flashcards
      </h1>

      {subjects.map((subject) => (
        <div
          key={subject.id}
          className="mb-12 bg-white rounded-3xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all"
        >
          <h2 className="text-3xl font-bold mb-6 text-emerald-600 border-b pb-2">
            {subject.name}
          </h2>

          {subject.Topics.map((topic) => (
            <div
              key={topic.id}
              className="bg-gray-50 rounded-2xl shadow-sm p-6 mb-8 hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex justify-between items-center mb-4 border-b pb-3">
                <h3 className="text-2xl font-semibold text-gray-800">
                  {topic.title}
                </h3>
              </div>

              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden text-gray-700">
                  <thead className="bg-emerald-50 text-emerald-800 uppercase text-sm font-semibold">
                    <tr>
                      <th className="px-3 py-3 text-left">Term</th>
                      <th className="px-3 py-3 text-left">Definition</th>
                      <th className="px-3 py-3 text-left">Created At</th>
                      <th className="px-3 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topic.Flashcards.map((card) => (
                      <tr
                        key={card.id}
                        className="border-t hover:bg-emerald-50 transition duration-200"
                      >
                        <td className="px-3 py-3 font-medium">{card.term}</td>
                        <td className="px-3 py-3">{card.definition}</td>
                        <td className="px-3 py-3 text-sm text-gray-500">
                          {moment(card.createdAt).format("YYYY-MM-DD")}
                        </td>
                        <td className="px-3 py-3 flex justify-center gap-3">
                          <button
                            onClick={() => {
                              setSelectedCard(card);
                              setsubjectId(subject.id)
                              settopic(topic.title)
                              setupdateModalOn(true);
                            }}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-md shadow-md transition"
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedCard(card);
                              setdeleteModalOn(true);
                            }}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md shadow-md transition"
                          >
                            <FiTrash2 />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View */}
              <div className="md:hidden space-y-4 mt-4">
                {topic.Flashcards.map((card) => (
                  <div
                    key={card.id}
                    className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition"
                  >
                    <p className="text-lg font-semibold text-gray-800">
                      {card.term}
                    </p>
                    <p className="text-gray-600 mt-1">{card.definition}</p>
                    <p className="text-sm text-gray-400 mt-2">
                      Created: {moment(card.createdAt).format("YYYY-MM-DD")}
                    </p>
                    <div className="flex justify-end gap-3 mt-3">
                      <button
                        onClick={() => {
                          setSelectedCard(card);
                          setsubjectId(subject.id)
                          settopic(topic.title)
                          setupdateModalOn(true);
                        }}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-md transition"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedCard(card);
                          setdeleteModalOn(true);
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* Update & Delete Modals */}
      {updatemodalOn && selectedCard && (
        <UpdateFlashcard
          card={selectedCard}
          setupdateModalOn={setupdateModalOn}
          subjects={subjects}
          subjectId={subjectId}
          topic={topic}
        />
      )}
      {deletemodalOn && selectedCard && (
        <DeleteFlashcard
          card={selectedCard}
          setdeleteModalOn={setdeleteModalOn}
        />
      )}
    </div>
  );
}
