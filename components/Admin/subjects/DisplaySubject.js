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
  const [updatesubjectid, setupdatesubjectid] = useState();
  const [updatesubjectname, setupdatesubjectname] = useState("");

  return (
    <div className="px-4 lg:px-10 py-10">
      <h1 className="text-center text-3xl font-bold mb-8 text-gray-800 italic">
        Subjects List
      </h1>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto shadow-md rounded-2xl">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="px-6 py-4 text-left">ID</th>
              <th className="px-6 py-4 text-left">Subject Name</th>
              <th className="px-6 py-4 text-left">Description</th>
              <th className="px-6 py-4 text-left">Created Date</th>
              <th className="px-6 py-4 text-left">Modified Date</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y divide-gray-200">
            {subjectes.map((data, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition duration-200"
              >
                <td className="px-6 py-4 font-semibold">{data.subject_id}</td>
                <td className="px-6 py-4 font-medium">{data.SubjectName}</td>
                <td className="px-6 py-4 text-gray-500">{data.description}</td>
                <td className="px-6 py-4">
                  {moment(data.createDate).utc().format("YYYY-MM-DD")}
                </td>
                <td className="px-6 py-4">
                  {moment(data.ModifiedDate).utc().format("YYYY-MM-DD")}
                </td>
                <td className="px-6 py-4 text-center space-x-3">
                  <button
                    onClick={() => {
                      setupdateModalOn(true);
                      setupdatesubjectid(data.subject_id);
                      setupdatesubjectname(data.SubjectName);
                    }}
                    className="inline-flex items-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl transition-transform transform hover:scale-105"
                  >
                    <FiEdit2 /> Edit
                  </button>
                  <button
                    onClick={() => {
                      setdeleteModalOn(true);
                      setdeletesubjectid(data.subject_id);
                    }}
                    className="inline-flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition-transform transform hover:scale-105"
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
      <div className="md:hidden grid grid-cols-1 gap-4">
        {subjectes.map((data, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-5 border border-gray-200"
          >
            <div className="mb-3">
              <h2 className="text-lg font-semibold text-gray-800">
                {data.SubjectName}
              </h2>
              <p className="text-sm text-gray-500">ID: {data.subject_id}</p>
            </div>

            <p className="text-gray-700 text-sm mb-2">
              <span className="font-semibold">Description:</span> {data.description}
            </p>

            <div className="text-gray-700 text-sm space-y-1">
              <p>
                <span className="font-semibold">Created:</span>{" "}
                {moment(data.createDate).utc().format("YYYY-MM-DD")}
              </p>
              <p>
                <span className="font-semibold">Modified:</span>{" "}
                {moment(data.ModifiedDate).utc().format("YYYY-MM-DD")}
              </p>
            </div>

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => {
                  setupdateModalOn(true);
                  setupdatesubjectid(data.subject_id);
                  setupdatesubjectname(data.SubjectName);
                }}
                className="flex items-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm transition-transform transform hover:scale-105"
              >
                <FiEdit2 /> Edit
              </button>

              <button
                onClick={() => {
                  setdeleteModalOn(true);
                  setdeletesubjectid(data.subject_id);
                }}
                className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-transform transform hover:scale-105"
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
          updatesubjectid={updatesubjectid}
          updatesubjectname={updatesubjectname}
          setupdatesubjectname={setupdatesubjectname}
          setupdatesubjectid={setupdatesubjectid}
        />
      )}
    </div>
  );
}
