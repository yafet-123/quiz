import React, { useState } from "react";
import moment from "moment";
import { useRouter } from "next/router";
import { DeleteSubject } from "./DeleteSubject";
import { UpdateSubject } from "./UpdateSubject";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

export function DisplaySubject({ subjectes }) {
  const router = useRouter();
  const [deletemodalOn, setdeleteModalOn] = useState(false);
  const [updatemodalOn, setupdateModalOn] = useState(false);
  const [deletesubjectid, setdeletesubjectid] = useState();
  const [subject, setsubject] = useState();

  return (
    <div className="px-4 lg:px-12 py-12 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800 italic">
        Subjects List
      </h1>

      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto rounded-2xl shadow-md border border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm uppercase tracking-wide">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">ID</th>
              <th className="px-6 py-4 text-left font-semibold">Subject Name</th>
              <th className="px-6 py-4 text-left font-semibold">Description</th>
              <th className="px-6 py-4 text-left font-semibold">Created</th>
              <th className="px-6 py-4 text-left font-semibold">Modified</th>
              <th className="px-6 py-4 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 divide-y divide-gray-200">
            {subjectes.map((data, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 transition duration-200 ease-in-out"
              >
                <td className="px-2 py-4 font-semibold text-emerald-700">
                  {data.id}
                </td>
                <td className="px-2 py-4 font-medium">{data.SubjectName}</td>
                <td className="px-2 py-4 text-gray-600">
                  {data.description || "—"}
                </td>
                <td className="px-2 py-4 text-sm text-gray-500">
                  {moment(data.createDate).utc().format("YYYY-MM-DD")}
                </td>
                <td className="px-2 py-4 text-sm text-gray-500">
                  {moment(data.ModifiedDate).utc().format("YYYY-MM-DD")}
                </td>
                <td className="flex px-2 py-4 text-center space-x-2">
                  <button
                    onClick={() => {
                      setupdateModalOn(true);
                      setsubject(data)
                    }}
                    className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105 shadow-sm"
                  >
                    <FiEdit2 /> Edit
                  </button>
                  <button
                    onClick={() => {
                      setdeleteModalOn(true);
                      setdeletesubjectid(data.id);
                    }}
                    className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all transform hover:scale-105 shadow-sm"
                  >
                    <FiTrash2 /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden grid grid-cols-1 gap-6">
        {subjectes.map((data, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl shadow-md p-5 transition-all hover:shadow-lg"
          >
            <div className="mb-3">
              <h2 className="text-xl font-semibold text-emerald-700">
                {data.SubjectName}
              </h2>
              <p className="text-xs text-gray-500">ID: {data.id}</p>
            </div>

            <p className="text-gray-700 text-sm mb-2">
              <span className="font-semibold">Description:</span>{" "}
              {data.description || "—"}
            </p>

            <div className="text-gray-600 text-sm space-y-1">
              <p>
                <span className="font-semibold">Created:</span>{" "}
                {moment(data.createDate).utc().format("YYYY-MM-DD")}
              </p>
              <p>
                <span className="font-semibold">Modified:</span>{" "}
                {moment(data.ModifiedDate).utc().format("YYYY-MM-DD")}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() => {
                  setupdateModalOn(true);
                  setsubject(data)
                }}
                className={`flex items-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm 
                transition-all hover:scale-105 shadow-sm`}
              >
                <FiEdit2 /> Edit
              </button>
              <button
                onClick={() => {
                  setdeleteModalOn(true);
                  setdeletesubjectid(data.id);
                }}
                className={`flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm 
                transition-all hover:scale-105 shadow-sm`}
              >
                <FiTrash2 /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {deletemodalOn && (
        <DeleteSubject
          setdeleteModalOn={setdeleteModalOn}
          deletesubjectid={deletesubjectid}
        />
      )}
      {updatemodalOn && (
        <UpdateSubject
          setupdateModalOn={setupdateModalOn}
          subject={subject}
        />
      )}
    </div>
  );
}
