import React, { useState } from "react";
import { UpdateStudent } from "./UpdateStudent";
import { DeleteStudent } from "./DeleteStudent";
import moment from 'moment';

export function DisplayStudent({ students }) {
  const [updateModalOn, setUpdateModalOn] = useState(false);
  const [updateStudent, setUpdateStudent] = useState(null);
  const [deleteModalOn, setDeleteModalOn] = useState(false);
  const [deleteUserid, setDeleteUserid] = useState("");

  const handleUpdateClick = (student) => {
    setUpdateStudent(student);
    setUpdateModalOn(true);
  };

  return (
    <div className="w-full mt-10 px-4 pb-10">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">
        Student Management
      </h1>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg bg-white">
          <thead className="bg-[#009688] text-white">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Grade</th>
              <th className="py-3 px-4 text-left">School</th>
              <th className="py-3 px-4 text-left">DOB</th>
              <th className="py-3 px-4 text-left">Gender</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students && students.length > 0 ? (
              students.map((student) => (
                <tr
                  key={student.user_id}
                  className="border-t border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-4">{student.user_id}</td>
                  <td className="py-3 px-4">{student.name}</td>
                  <td className="py-3 px-4">{student.email}</td>
                  <td className="py-3 px-4">{student.gradeLevel}</td>
                  <td className="py-3 px-4">{student.schoolName}</td>
                  <td className="py-3 px-4">{moment(student.dateOfBirth).utc().format("YYYY-MM-DD")}</td>
                  <td className="py-3 px-4">{student.gender}</td>
                  <td className="py-3 px-4 flex justify-center gap-3">
                    <button
                      onClick={() => handleUpdateClick(student)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => {
                        setDeleteUserid(student.user_id);
                        setDeleteModalOn(true);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="py-4 text-center text-gray-500 italic"
                >
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {students && students.length > 0 ? (
          students.map((student) => (
            <div
              key={student.user_id}
              className="border border-gray-300 rounded-xl bg-white shadow-sm p-4"
            >
              <p className="text-gray-800 font-semibold">
                ID: <span className="font-normal">{student.user_id}</span>
              </p>
              <p className="text-gray-800 font-semibold">
                Name: <span className="font-normal">{student.name}</span>
              </p>
              <p className="text-gray-800 font-semibold">
                Email: <span className="font-normal">{student.email}</span>
              </p>
              <p className="text-gray-800 font-semibold">
                Grade: <span className="font-normal">{student.gradeLevel}</span>
              </p>
              <p className="text-gray-800 font-semibold">
                School: <span className="font-normal">{student.schoolName}</span>
              </p>
              <p className="text-gray-800 font-semibold">
                DOB: <span className="font-normal">
                  {moment(student.dateOfBirth).utc().format("YYYY-MM-DD")}
                </span>
              </p>
              <p className="text-gray-800 font-semibold">
                Gender: <span className="font-normal">{student.gender}</span>
              </p>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => handleUpdateClick(student)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm"
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    setDeleteUserid(student.user_id);
                    setDeleteModalOn(true);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 italic">No students found.</p>
        )}
      </div>

      {updateModalOn && (
        <UpdateStudent
          setupdateModalOn={setUpdateModalOn}
          updateStudent={updateStudent}
          setUpdateStudent={setUpdateStudent}
        />
      )}

      {deleteModalOn && (
        <DeleteStudent
          deleteuserid={deleteUserid}
          setDeleteModalOn={setDeleteModalOn}
        />
      )}
    </div>
  );
}
