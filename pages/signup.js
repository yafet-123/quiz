import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaArrowRight, FaSchool, FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import { MainHeader } from "../components/common/MainHeader";
import axios from "axios";
import { useSession, getSession,getCsrfToken } from "next-auth/react";

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
        router.push("/auth/Student/Login/signin-student");
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#417094] to-white px-4 py-24">
        <div className="bg-white shadow-lg rounded-2xl p-8 md:p-10 w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-[#417094] mb-2">
            Create Your Account
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Join thousands of students and start learning smarter.
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
              <select name="gender" value={form.gender} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#417094] outline-none">
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {error && <p className="text-red-500 text-lg">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#417094] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#417094]"
              }`}
            >
              {loading ? "Please wait..." : <>Sign Up <FaArrowRight /></>}
            </button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-6">
            Already have an account?{" "}
            <Link href="/auth/Student/Login/signin-student" className="text-[#417094] font-semibold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

function InputField({ icon, label, ...props }) {
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-2">{label}</label>
      <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#417094]">
        {icon && <span className="text-gray-400 mr-3">{icon}</span>}
        <input className="w-full outline-none" {...props} required />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const userRole = await session?.user?.role;
  console.log(userRole)
  if (userRole === "student") {
    return {
      redirect: { destination: "/Students", permanent: false },
    };
  }
  if (userRole === "teacher") {
    return {
      redirect: {
        destination: "/auth/Teacher/Login/signin-teacher",
        permanent: false,
      },
    };
  }
  if (userRole === "admin") {
    return {
      redirect: {
        destination: "/auth/Admin/Login/signin-user",
        permanent: false,
      },
    };
  }

  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}