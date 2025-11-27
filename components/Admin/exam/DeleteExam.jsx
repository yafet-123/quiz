import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
 
export function DeleteExam({ setDeleteModalOn, examId, userId }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/exam/delete-exam/${examId}`);
      router.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to delete exam.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 shadow-lg w-[90%] max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Delete Exam</h2>
        <p className="text-gray-600 mb-6">Are you sure you want to delete this exam?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleDelete}
            disabled={loading}
            className={`px-5 py-2 rounded-lg ${
              loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
          >
            {loading ? "Deleting..." : "Yes, Delete"}
          </button>
          <button
            onClick={() => setDeleteModalOn(false)}
            className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
