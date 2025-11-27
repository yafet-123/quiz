import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaArrowRight, FaSchool, FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import { MainHeader } from "../../../components/common/MainHeader";
import axios from "axios";
import { useSession, getSession } from "next-auth/react";

export default function SignUp() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gradeLevel: "",
    schoolName: "",
    dateOfBirth: "",
    gender: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("/api/student/signup", form);

      if (res.status === 200) {
        router.reload()
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to sign up");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return ( 
    <>
      <MainHeader title="Aceit : Sign Up" />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white px-4 py-16">
        <div className="bg-white shadow-lg rounded-2xl p-8 md:p-10 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-purple-700 mb-2">
            Add new Student
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Create an account for Student.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <InputField icon={<FaUser />} label="Full Name" name="name" type="text" placeholder="John Doe" value={form.name} onChange={handleChange} />
            <InputField icon={<FaEnvelope />} label="Email Address" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} />
            <InputField icon={<FaLock />} label="Password" name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} />
            <InputField icon={<FaLock />} label="Confirm Password" name="confirmPassword" type="password" placeholder="••••••••" value={form.confirmPassword} onChange={handleChange} />
            <InputField icon={<FaSchool />} label="Grade Level" name="gradeLevel" type="text" placeholder="e.g. Grade 10" value={form.gradeLevel} onChange={handleChange} />
            <InputField icon={<FaSchool />} label="School Name" name="schoolName" type="text" placeholder="Your school name" value={form.schoolName} onChange={handleChange} />
            <InputField icon={<FaCalendarAlt />} label="Date of Birth" name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} />

            <div>
              <label className="block text-gray-700 font-medium mb-2">Gender</label>
              <select name="gender" value={form.gender} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none">
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {error && <p className="text-red-500 text-lg">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-purple-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-700"
              }`}
            >
              {loading ? "Please wait..." : <>Add Student <FaArrowRight /></>}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

function InputField({ icon, label, ...props }) {
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-2">{label}</label>
      <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-purple-500">
        {icon && <span className="text-gray-400 mr-3">{icon}</span>}
        <input className="w-full outline-none" {...props} required />
      </div>
    </div>
  );
}
