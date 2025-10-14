import React, { useState } from "react";
import moment from "moment";
import { DeleteUser } from "./DeleteUser.js";
import { UpdateUser } from "./UpdateUser.js";

export function DisplayUser({ users }) {
  const [deletemodalOn, setDeleteModalOn] = useState(false);
  const [updatemodalOn, setUpdateModalOn] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState();
  const [updateUserId, setUpdateUserId] = useState();
  const [updateEmail, setUpdateEmail] = useState("");
  const [updateUsername, setUpdateUsername] = useState("");
  
  const handleDeleteClick = (id) => {
    setDeleteUserId(id);
    setDeleteModalOn(true);
  };

  const handleUpdateClick = (user) => {
    setUpdateUserId(user.user_id);
    setUpdateUsername(user.UserName);
    setUpdateEmail(user.email);
    setUpdateModalOn(true);
  };

  return (
    <div className="px-4 lg:px-10 py-8">
      {/* Desktop Table */}
      <div className="overflow-auto rounded-xl shadow-lg hidden md:block">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              {["Id", "User Name", "Email", "Created Date", "Modified Date", "Actions"].map(
                (header, idx) => (
                  <th
                    key={idx}
                    className="p-3 text-gray-800 font-semibold text-lg border-b border-gray-200"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className="even:bg-gray-50 odd:bg-white hover:bg-gray-100 transition"
              >
                <td className="p-3 text-gray-700 font-medium">{user.user_id}</td>
                <td className="p-3 text-gray-700">{user.UserName}</td>
                <td className="p-3 text-gray-700 break-words">
                  {user.email || (
                    <span className="text-red-600 font-semibold">No Email Address</span>
                  )}
                </td>
                <td className="p-3 text-gray-700">
                  {moment(user.createDate).utc().format("YYYY-MM-DD")}
                </td>
                <td className="p-3 text-gray-700">
                  {moment(user.ModifiedDate).utc().format("YYYY-MM-DD")}
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleUpdateClick(user)}
                    className="bg-[#009688] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#00796b] transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(user.user_id)}
                    className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        {users.map((user, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-4 space-y-2 hover:shadow-lg transition"
          >
            <p className="text-blue-500 font-bold">
              Id: <span className="text-gray-700 font-medium">{user.user_id}</span>
            </p>
            <p className="text-gray-700 font-bold">
              User Name: <span className="font-medium">{user.UserName}</span>
            </p>
            <p className="text-gray-700 font-bold break-words">
              Email:{" "}
              <span className={user.email ? "font-medium" : "text-red-600 font-semibold"}>
                {user.email || "No Email Address"}
              </span>
            </p>
            <p className="text-gray-700 font-bold">
              Created:{" "}
              <span className="font-medium">
                {moment(user.createDate).utc().format("YYYY-MM-DD")}
              </span>
            </p>
            <p className="text-gray-700 font-bold">
              Modified:{" "}
              <span className="font-medium">
                {moment(user.ModifiedDate).utc().format("YYYY-MM-DD")}
              </span>
            </p>
            <div className="flex justify-between mt-2">
              <button
                onClick={() => handleUpdateClick(user)}
                className="bg-[#009688] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#00796b] transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteClick(user.user_id)}
                className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {deletemodalOn && <DeleteUser setdeleteModalOn={setDeleteModalOn} deleteuserid={deleteUserId} />}
      {updatemodalOn && (
        <UpdateUser
          setupdateModalOn={setUpdateModalOn}
          updateuserid={updateUserId}
          updateemail={updateEmail}
          updateusername={updateUsername}
          setupdateemail={setUpdateEmail}
          setupdateusername={setUpdateUsername}
        />
      )}
    </div>
  );
}
