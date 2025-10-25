import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import ReactModal from "react-modal";
import Loader from "../../common/Loading";

export function DeleteDefinitionSheet({ sheetId, setDeleteModalOn }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/definitionSheet/delete/${sheetId}`);
      router.reload();
    } catch (err) {
      console.error(err);
      setLoading(false);
    } finally {
      setDeleteModalOn(false);
    }
  };

  return (
    <ReactModal isOpen={true} className="flex items-center justify-center w-full h-full">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Confirm Delete</h2>
        <p className="mb-6 text-center">Are you sure you want to delete this definition sheet?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setDeleteModalOn(false)}
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </ReactModal>
  );
}
