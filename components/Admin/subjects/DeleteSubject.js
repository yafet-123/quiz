import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Loader from "../../common/Loading";
import ReactModal from "react-modal";
import { MdOutlineWarningAmber } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

export function DeleteSubject({ setdeleteModalOn, deletesubjectid }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [LoadingmodalIsOpen, setLoadingModalIsOpen] = useState(false);

  const handleOKClickFordelete = async () => {
    setLoading(true);
    setLoadingModalIsOpen(true);
    try { 
      await axios.delete(`../api/subject/deleteSubject/${deletesubjectid}`);
      router.reload();
    } catch (error) {
      console.error(error);
      setLoadingModalIsOpen(false);
    } finally {
      setdeleteModalOn(false);
      setLoading(false);
    }
  };

  const handleCancelClickFordelete = () => {
    setdeleteModalOn(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl w-[90%] max-w-md p-8 border-t-4 border-rose-500">
        {/* Close Button */}
        <button
          onClick={handleCancelClickFordelete}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
        >
          <IoMdClose size={24} />
        </button>

        {/* Warning Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-rose-100 text-rose-600 p-4 rounded-full">
            <MdOutlineWarningAmber size={40} />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-3">
          Delete Subject
        </h2>

        {/* Message */}
        <p className="text-center text-gray-600 mb-8 text-sm">
          Are you sure you want to delete this subject? This action cannot be
          undone.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            disabled={loading}
            onClick={handleOKClickFordelete}
            className={`px-6 py-3 rounded-lg font-semibold text-white shadow-md transition-all ${
              loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-rose-500 hover:bg-rose-600"
            }`}
          >
            {loading ? "Deleting..." : "Yes, Delete"}
          </button>
          <button
            onClick={handleCancelClickFordelete}
            className="px-6 py-3 rounded-lg font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all shadow-sm"
          >
            Cancel
          </button>
        </div>

        {/* Loading Modal */}
        <ReactModal
          isOpen={LoadingmodalIsOpen}
          className="flex items-center justify-center w-full h-full"
        >
          <Loader />
        </ReactModal>
      </div>
    </div>
  );
}
