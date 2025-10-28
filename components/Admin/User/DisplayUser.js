import React, { useState } from "react";
import axios from "axios";
import { UpdateUser } from "./UpdateUser";
import { DeleteUser } from "./DeleteUser";

export function DisplayUser({ users }) {
  const [updateModalOn, setUpdateModalOn] = useState(false);
  const [updateuserid, setUpdateUserid] = useState("");
  const [updateemail, setUpdateEmail] = useState("");
  const [updateusername, setUpdateUsername] = useState("");
  const [deleteModalOn, setDeleteModalOn] = useState(false);
  const [deleteUserid, setDeleteUserid] = useState("");

  const handleUpdateClick = (user) => {
    setUpdateUserid(user.user_id);
    setUpdateEmail(user.email);
    setUpdateUsername(user.UserName);
    setUpdateModalOn(true);
  };

  return (
    <div className="w-full mt-10 px-4 pb-10">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">
        User Management
      </h1>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg bg-white">
          <thead className="bg-[#009688] text-white">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Username</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.user_id}
                  className="border-t border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-4">{user.user_id}</td>
                  <td className="py-3 px-4">{user.UserName}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4 flex justify-center gap-3">
                    <button
                      onClick={() => handleUpdateClick(user)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => {
                        setDeleteUserid(user.user_id);
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
                  colSpan={4}
                  className="py-4 text-center text-gray-500 italic"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {users && users.length > 0 ? (
          users.map((user) => (
            <div
              key={user.user_id}
              className="border border-gray-300 rounded-xl bg-white shadow-sm p-4"
            >
              <p className="text-gray-800 font-semibold">
                ID: <span className="font-normal">{user.user_id}</span>
              </p>
              <p className="text-gray-800 font-semibold">
                Username: <span className="font-normal">{user.UserName}</span>
              </p>
              <p className="text-gray-800 font-semibold">
                Email: <span className="font-normal">{user.email}</span>
              </p>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => handleUpdateClick(user)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm"
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    setDeleteUserid(user.user_id);
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
          <p className="text-center text-gray-500 italic">No users found.</p>
        )}
      </div>

      {updateModalOn && (
        <UpdateUser
          setupdateModalOn={setUpdateModalOn}
          updateuserid={updateuserid}
          updateemail={updateemail}
          updateusername={updateusername}
          setupdateemail={setUpdateEmail}
          setupdateusername={setUpdateUsername}
        />
      )}

      {deleteModalOn && (
        <DeleteUser
          deleteuserid={deleteUserid}
          setDeleteModalOn={setDeleteModalOn}
        />
      )}
    </div>
  );
}
