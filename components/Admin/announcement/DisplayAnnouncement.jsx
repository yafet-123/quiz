import React, { useState } from "react";
import axios from "axios";
import UpdateAnnouncement from "./UpdateAnnouncement"; // Update modal
import DeleteAnnouncement from "./DeleteAnnouncement"; // Delete modal

export function DisplayAnnouncement({ announcements, refresh }) {
  const [updateModalOn, setUpdateModalOn] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateContent, setUpdateContent] = useState("");

  const [deleteModalOn, setDeleteModalOn] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const handleUpdateClick = (announcement) => {
    setUpdateId(announcement.id);
    setUpdateTitle(announcement.title);
    setUpdateContent(announcement.content);
    setUpdateModalOn(true);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setDeleteModalOn(true);
  };

  return (
    <div className="space-y-4 py-5">
      {announcements.map((ann) => (
        <div
          key={ann.id}
          className="bg-white p-4 rounded shadow flex justify-between items-start "
        >
          <div>
            <h3 className="font-semibold">{ann.title}</h3>
            <p className="text-gray-600">{ann.content}</p>
            <small className="text-gray-400">
              Created: {new Date(ann.createdAt).toLocaleString()}
            </small>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleUpdateClick(ann)}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Update
            </button>
            <button
              onClick={() => handleDeleteClick(ann.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* Update Modal */}
      {updateModalOn && (
        <UpdateAnnouncement
          setUpdateModalOn={setUpdateModalOn}
          id={updateId}
          title={updateTitle}
          setTitle={setUpdateTitle}
          content={updateContent}
          setContent={setUpdateContent}
          refresh={refresh}
        />
      )}

      {/* Delete Modal */}
      {deleteModalOn && (
        <DeleteAnnouncement
          id={deleteId}
          setDeleteModalOn={setDeleteModalOn}
          refresh={refresh}
        />
      )}
    </div>
  );
}
