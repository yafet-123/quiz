import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Loader from "../../common/Loading";
import ReactModal from "react-modal";

export function UpdateUser({
  setupdateModalOn,
  updateuserid,
  updateemail,
  updateusername,
  setupdateemail,
  setupdateusername,
}) {
  const router = useRouter();
  const [LoadingmodalIsOpen, setLoadingModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOKClickForupdate = async () => {
    setLoading(true);
    setLoadingModalIsOpen(true);
    console.log(updateuserid)
    try {
      await axios.patch(`/api/user/updateUser/${updateuserid}`, {
        UserName: updateusername,
        email: updateemail,
      });
      router.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to update user. Please try again.");
      setLoadingModalIsOpen(false);
      setLoading(false);
    }
  };

  const handleCancelClickForupdate = () => {
    setupdateModalOn(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-8 relative animate-fadeIn">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Update User Information
          </h2>
          <p className="text-gray-500 text-sm">
            Modify the user’s details below and click <strong>Update</strong> to
            save changes.
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <div className="relative">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              value={updateusername}
              onChange={(e) => setupdateusername(e.target.value)}
              placeholder="Enter username"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              value={updateemail}
              onChange={(e) => setupdateemail(e.target.value)}
              placeholder="Enter email address"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-10">
          <button
            onClick={handleCancelClickForupdate}
            className="px-5 py-3 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            disabled={loading}
            onClick={handleOKClickForupdate}
            className={`px-6 py-3 rounded-xl text-white font-semibold transition ${
              loading
                ? "bg-teal-300 cursor-not-allowed"
                : "bg-teal-600 hover:bg-teal-700"
            }`}
          >
            {loading ? "Updating..." : "Update"}
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
