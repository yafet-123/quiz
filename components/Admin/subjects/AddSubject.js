import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import ReactModal from "react-modal";
import Loader from "../../common/Loading";
import { FiPlusCircle } from "react-icons/fi";

export function AddSubject() {
  const [loadingModalIsOpen, setLoadingModalIsOpen] = useState(false);
  const router = useRouter();
  const { data } = useSession();
  const [loading, setLoading] = useState(false);
  const [subjectName, setSubjectName] = useState("");
  const [description, setDescription] = useState("");
  const [svg, setSvg] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const userData = data?.user;
  console.log(userData)
  async function register(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    setLoadingModalIsOpen(true);

    try {
      await axios.post(`../../api/subject/Add`, {
        SubjectName: subjectName,
        description,
        svg,
        // user_id: userData.user_id,
        user_id: 1
      });
      setSuccess("Subject created successfully!");
      setSubjectName("");
      setDescription("");
      setSvg("");
      setLoading(false);
      setLoadingModalIsOpen(false);
      router.reload();
    } catch (error) {
      console.error(error);
      setError(
        "Creating subject failed — please check if the subject name already exists or try again later."
      );
      setLoading(false);
      setLoadingModalIsOpen(false);
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen py-24 px-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10 flex items-center justify-center gap-2">
          <FiPlusCircle className="text-[#009688]" />
          Add New Subject
        </h1>

        <form onSubmit={register} className="space-y-6">
          {/* Subject Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Subject Name
            </label>
            <input
              type="text"
              required
              placeholder="Enter subject name"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009688] focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              rows={4}
              placeholder="Write a short description about the subject..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009688] focus:border-transparent"
            />
          </div>

          {/* SVG Path */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              SVG File Path (optional)
            </label>
            <input
              type="text"
              placeholder="/categories/image--mathematics.svg"
              value={svg}
              onChange={(e) => setSvg(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009688] focus:border-transparent"
            />
          </div>

          {/* Error / Success Messages */}
          {error && (
            <div className="text-red-600 font-semibold text-center">
              {error}
            </div>
          )}
          {success && (
            <div className="text-green-600 font-semibold text-center">
              {success}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 text-lg font-semibold rounded-xl transition duration-300 flex items-center justify-center gap-2 
                ${
                  loading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#009688] hover:bg-[#00796b] text-white shadow-md"
                }`}
            >
              {loading ? "Submitting..." : "Submit Subject"}
            </button>
          </div>
        </form>
      </div>

      <ReactModal
        isOpen={loadingModalIsOpen}
        className="flex items-center justify-center w-full h-full"
      >
        <Loader />
      </ReactModal>
    </div>
  );
}
