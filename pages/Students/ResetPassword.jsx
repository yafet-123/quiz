import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { MainHeader } from "../../components/common/MainHeader";

export default function ResetPassword() {
  const router = useRouter();
  const { token } = router.query;

  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/student/ResetPassword", {
        password,
        token,
      });

      if (response.data.status === "Password Reset Success") {
        setSuccess(true);
      } else {
        setError(response.data.status || "Failed to reset password.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // ✅ Success View
  if (success) {
    return (
      <>
        <MainHeader title="Save My Exam : Password Reset" />
        <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-5">
          <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center">
            <h1 className="text-2xl font-bold text-blue-700 mb-4">
              Password Reset Successful 🎉
            </h1>
            <p className="text-gray-700 mb-8">
              Your password has been successfully updated. You can now log in
              to your account.
            </p>

            <Link
              href="/auth/Student/Login/signin-student"
              className="inline-block w-full py-3 text-lg text-white bg-blue-700 rounded-xl hover:bg-blue-800 transition duration-200"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </>
    );
  }

  // 🧩 Reset Password Form
  return (
    <>
      <MainHeader title="Save My Exam : Reset Password" />
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 px-5">
        <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
            Reset Your Password
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                id="password"
                type="password"
                required
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="peer w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-gray-900 text-lg bg-transparent focus:border-blue-600 focus:outline-none transition"
              />
              <label
                htmlFor="password"
                className="absolute text-gray-600 text-lg left-4 top-3.5 bg-white px-1 transition-all 
                peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 
                peer-placeholder-shown:text-base 
                peer-focus:top-[-0.6rem] peer-focus:text-blue-600 peer-focus:text-sm"
              >
                New Password
              </label>
            </div>

            {error && (
              <p className="text-red-600 text-center text-sm font-medium">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 text-lg font-semibold rounded-xl text-white transition duration-200 ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-700 hover:bg-blue-800"
              }`}
            >
              {loading ? "Updating..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
