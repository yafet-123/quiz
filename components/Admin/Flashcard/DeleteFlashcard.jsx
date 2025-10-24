import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Loader from "../../common/Loading";
import ReactModal from "react-modal";

export function DeleteFlashcard({ setdeleteModalOn, card }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [LoadingmodalIsOpen, setLoadingModalIsOpen] = useState(false);
  const [deleteflashcardid, setdeleteflashcardid] = useState(card.id)

  const handleOKClickFordelete = async () => {
    setLoadingModalIsOpen(true);
    try {
      await axios.delete(`../api/flashcard/deleteFlashcard/${deleteflashcardid}`);
      router.reload();
    } catch (error) {
      console.log(error);
      setLoadingModalIsOpen(false);
    } finally {
      setdeleteModalOn(false);
    }
  };

  return (
    <div className="bg-gray-200 opacity-95 fixed inset-0 z-50">
      <div className="flex h-screen justify-center items-center">
        <div className="bg-white py-10 px-6 lg:px-10 border-4 border-red-500 rounded-xl shadow-xl w-full max-w-md">
          <h2 className="text-center text-xl font-semibold text-gray-700 mb-6">
            Are you sure you want to delete this flashcard?
          </h2>

          <div className="flex justify-center space-x-4">
            <button
              disabled={loading}
              onClick={handleOKClickFordelete}
              className={`rounded px-5 py-2.5 ${
                loading
                  ? "text-gray-600 bg-gray-200"
                  : "text-white bg-red-500 hover:bg-red-600"
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => setdeleteModalOn(false)}
              className="rounded px-5 py-2.5 text-white bg-gray-400 hover:bg-gray-500"
            >
              No
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
