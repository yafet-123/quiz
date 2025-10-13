import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import ReactModal from "react-modal";
import Loader from "../../common/Loading";
import { FiUserPlus } from "react-icons/fi";
import { FiEye, FiEyeOff } from "react-icons/fi";

export function AddUser() {
  const [loadingModalIsOpen, setLoadingModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data } = useSession();
  const userData = data?.user;

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [typePassword, setTypePassword] = useState("password");
  const [typePasswordConfirm, setTypePasswordConfirm] = useState("password");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function register(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Password and Confirm Password must match.");
      return;
    }

    setLoading(true);
    setLoadingModalIsOpen(true);

    try {
      await axios.post(`../api/user/registerUser`, {
        UserName: userName,
        Password: password,
        email,
        role: "admin",
        user_id: userData.user_id,
      });

      setSuccess("User created successfully!");
      setUserName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setLoading(false);
      setLoadingModalIsOpen(false);
      router.reload();
    } catch (err) {
      console.error(err);
      setError(
        "Creating user failed — username may already exist or network error."
      );
      setLoading(false);
      setLoadingModalIsOpen(false);
    }
  }

  return (
    <div className="flex flex-col items-center min-h-screen py-24 px-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10 flex items-center justify-center gap-2">
          <FiUserPlus className="text-[#009688]" />
          Add New User
        </h1>

        <form onSubmit={register} className="space-y-6">
          {/* Username */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              required
              placeholder="Enter username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009688] focus:border-transparent"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009688] focus:border-transparent"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type={typePassword}
              required
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009688] focus:border-transparent"
            />
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 hover:text-gray-900 transition"
              onClick={() =>
                setTypePassword(typePassword === "password" ? "text" : "password")
              }
            >
              {typePassword === "password" ? <FiEye size={24} /> : <FiEyeOff size={24} />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-2">
              Confirm Password
            </label>
            <input
              type={typePasswordConfirm}
              required
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#009688] focus:border-transparent"
            />
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 hover:text-gray-900 transition"
              onClick={() =>
                setTypePasswordConfirm(
                  typePasswordConfirm === "password" ? "text" : "password"
                )
              }
            >
              {typePasswordConfirm === "password" ? (
                <FiEye size={24} />
              ) : (
                <FiEyeOff size={24} />
              )}
            </span>
          </div>

          {/* Error / Success Messages */}
          {error && <div className="text-red-600 font-semibold text-center">{error}</div>}
          {success && (
            <div className="text-green-600 font-semibold text-center">{success}</div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 text-lg font-semibold rounded-xl transition duration-300 flex items-center justify-center gap-2 ${
                loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#009688] hover:bg-[#00796b] text-white shadow-md"
              }`}
            >
              {loading ? "Submitting..." : "Submit User"}
            </button>
          </div>
        </form>
      </div>

      <ReactModal
        isOpen={loadingModalIsOpen}
        className="flex items-center justify-center w-full h-full"
      >
        <Loader />
      </ReactModal>
    </div>
  );
}
