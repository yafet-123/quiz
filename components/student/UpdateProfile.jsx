import React, { useState } from 'react';
import axios from 'axios';

export function UpdateProfile({ updateData, setUpdateData, setUpdateModalOn }) {
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.patch(`/api/student/updateProfile/${updateData.students_id}`, updateData);
      console.log("Updated response:", response.data);
      setUpdateModalOn(false);
      window.location.reload(); // Or update state locally for smoother UX
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-11/12 max-w-md relative">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Update Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={updateData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* School Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">School Name</label>
            <input
              type="text"
              name="schoolName"
              value={updateData.schoolName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={updateData.dateOfBirth || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Gender</label>
            <select
              name="gender"
              value={updateData.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={updateData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setUpdateModalOn(false)}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition duration-150"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg text-white transition duration-150 ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
