import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import Loader from "../../common/Loading";
import ReactModal from "react-modal";
import moment from 'moment';

export function UpdateStudent({ setupdateModalOn, updateStudent, setUpdateStudent }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [LoadingmodalIsOpen, setLoadingModalIsOpen] = useState(false);
  console.log(updateStudent)
  const handleChange = (e) => {
    setUpdateStudent({ ...updateStudent, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setLoading(true);
    setLoadingModalIsOpen(true);
    try {
      await axios.patch(`/api/student/update/${updateStudent.user_id}`, {
        name: updateStudent.name,
        email: updateStudent.email,
        gradeLevel: updateStudent.gradeLevel,
        schoolName: updateStudent.schoolName,
        dateOfBirth: updateStudent.dateOfBirth,
        gender: updateStudent.gender,
      });
      router.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to update student. Please try again.");
      setLoading(false);
      setLoadingModalIsOpen(false);
    }
  };

  const handleCancel = () => setupdateModalOn(false);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4 py-10 overflow-auto">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-8 md:p-12 relative animate-fadeIn overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Update Student Info</h2>
          <p className="text-gray-500 text-sm">
            Modify the student’s details and click <strong>Update</strong> to save.
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <InputField label="Full Name" name="name" value={updateStudent.name} onChange={handleChange} />
          <InputField label="Email" name="email" type="email" value={updateStudent.email} onChange={handleChange} />
          <InputField label="Grade Level" name="gradeLevel" value={updateStudent.gradeLevel} onChange={handleChange} />
          <InputField label="School Name" name="schoolName" value={updateStudent.schoolName} onChange={handleChange} />
          
          <InputField
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            value={moment(updateStudent.dateOfBirth).utc().format("YYYY-MM-DD")}
            onChange={handleChange}
          />

          <div>
            <label className="block text-gray-700 font-medium mb-2">Gender</label>
            <select
              name="gender"
              value={updateStudent.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={handleCancel}
            className="px-5 py-3 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            disabled={loading}
            onClick={handleUpdate}
            className={`px-6 py-3 rounded-xl text-white font-semibold transition ${
              loading ? "bg-purple-300 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>

        {/* Loading Modal */}
        <ReactModal isOpen={LoadingmodalIsOpen} className="flex items-center justify-center w-full h-full">
          <Loader />
        </ReactModal>
      </div>
    </div>
  );
}

function InputField({ label, ...props }) {
  return (
    <div className="relative">
      <label className="block text-gray-700 font-medium mb-2">{label}</label>
      <input
        {...props}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
      />
    </div>
  );
}
