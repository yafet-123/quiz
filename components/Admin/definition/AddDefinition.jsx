import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { prisma } from "../../../util/db.server";
import axios from "axios";
import Loader from "../../common/Loading";
import ReactModal from "react-modal";

// Dynamically import React Quill (avoid SSR issues)
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export function AddDefinition({ subjects, userId }) {
  const router = useRouter();
  const { data } = useSession();

  const [title, setTitle] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [description, setDescription] = useState("");
  const [definitions, setDefinitions] = useState([
    { term: "", meaning: "", example: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [loadingModalIsOpen, setLoadingModalIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Add a new definition input set
  const addDefinitionField = () => {
    setDefinitions([...definitions, { term: "", meaning: "", example: "" }]);
  };

  // Remove a definition input set
  const removeDefinitionField = (index) => {
    const newDefs = definitions.filter((_, i) => i !== index);
    setDefinitions(newDefs);
  };

  // Update definition values
  const handleDefinitionChange = (index, field, value) => {
    const newDefs = [...definitions];
    newDefs[index][field] = value;
    setDefinitions(newDefs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    setLoadingModalIsOpen(true);

    if (!subjectId) {
      setError("Please select a subject.");
      setLoading(false);
      setLoadingModalIsOpen(false);
      return;
    }

    try {
      await axios.post("/api/definitionSheet/add", {
        title,
        description,
        subjectId: parseInt(subjectId),
        createdBy: userId,
        definitions,
      });

      setSuccess("Definition Sheet created successfully!");
      setTitle("");
      setSubjectId("");
      setDescription("");
      setDefinitions([{ term: "", meaning: "", example: "" }]);
    } catch (err) {
      console.error(err);
      setError("Failed to create definition sheet. Try again later.");
    } finally {
      setLoading(false);
      setLoadingModalIsOpen(false);
    }
  };

  return (
    <div className="px-2 lg:px-10 pb-20">
      <form
        className="max-w-7xl mx-auto mt-10"
        onSubmit={handleSubmit}
      >
        <h1 className="text-black text-xl lg:text-4xl font-bold text-center italic my-5">
          Add Definition Sheet
        </h1>

        {/* Title */}
        <div className="relative flex-1 my-5">
          <input
            type="text"
            required
            placeholder="Sheet Title"
            className="block w-full px-3 py-4 text-black border-2 border-black rounded-xl focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Select Subject */}
        <div className="my-5">
          <select
            required
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009688]"
          >
            <option value="">Select Subject</option>
            {subjects.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="my-5">
          <label className="block font-medium mb-2">Sheet Description</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            className="bg-white rounded-xl"
          />
        </div>

        {/* Definitions */}
        <div className="my-5">
          <h2 className="text-xl font-semibold mb-2">Definitions</h2>
          {definitions.map((def, index) => (
            <div
              key={index}
              className="border p-4 rounded-xl mb-4 relative bg-white"
            >
              {definitions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeDefinitionField(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              )}

              <input
                type="text"
                placeholder="Term"
                required
                value={def.term}
                onChange={(e) =>
                  handleDefinitionChange(index, "term", e.target.value)
                }
                className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-xl"
              />
              <label className="block font-medium mb-1">Meaning</label>
              <ReactQuill
                theme="snow"
                value={def.meaning}
                onChange={(value) =>
                  handleDefinitionChange(index, "meaning", value)
                }
                className="mb-2 bg-white rounded-xl"
              />
              <label className="block font-medium mb-1">Example (optional)</label>
              <ReactQuill
                theme="snow"
                value={def.example}
                onChange={(value) =>
                  handleDefinitionChange(index, "example", value)
                }
                className="bg-white rounded-xl"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addDefinitionField}
            className="flex items-center gap-2 text-[#009688] font-semibold mt-2"
          >
            Add Another Definition
          </button>
        </div>

        {/* Error / Success */}
        {error && <p className="text-red-600 font-semibold">{error}</p>}
        {success && <p className="text-green-600 font-semibold">{success}</p>}

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            disabled={loading}
            className={`px-8 py-3 text-lg font-semibold rounded-xl transition duration-300 flex items-center justify-center gap-2 
              ${loading ? "bg-gray-300 cursor-not-allowed" : "bg-[#009688] hover:bg-[#00796b] text-white shadow-md"}`}
          >
            {loading ? "Submitting..." : "Submit Definition Sheet"}
          </button>
        </div>

        <ReactModal
          isOpen={loadingModalIsOpen}
          className="flex items-center justify-center w-full h-full"
        >
          <Loader />
        </ReactModal>
      </form>
    </div>
  );
}
