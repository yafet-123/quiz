import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export function DeleteStudent({setDeleteModalOn,deleteuserid}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/student/deleteStudent/${deleteuserid}`);
      router.reload();
    } catch (error) {
      console.error(error);
      setLoading(false);
    } finally {
      setDeleteModalOn(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-lg text-center">
        <h2 className="text-lg font-semibold mb-3">Delete Student</h2>
        <p className="text-gray-600 mb-4">
          Are you sure you want to delete this Student?
        </p>

        <div className="flex justify-center gap-3">
          <button
            onClick={() => setDeleteModalOn(false)}
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
