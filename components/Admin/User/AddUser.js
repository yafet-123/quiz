import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Loader from "../../common/Loading";
import ReactModal from "react-modal";
import { useSession } from "next-auth/react";

export function AddUser() {
  const { data } = useSession();
  const UserData = data?.user;
  const router = useRouter();

  const [LoadingmodalIsOpen, setLoadingModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [UserName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [typepassword, setTypepassword] = useState("password");
  const [typepasswordconfirm, setTypepasswordconfirm] = useState("password");

  const [passworderror, setPasswordError] = useState("");
  const [error, setError] = useState("");

  async function register(e) {
    e.preventDefault();
    if (confirmPassword !== password) {
      setPasswordError("Password and confirm password should match.");
      return;
    }
    setPasswordError("");
    setError("");
    setLoadingModalIsOpen(true);

    try {
      await axios.post(`../api/user/registerUser`, {
        UserName,
        Password: password,
        email,
        role: "admin",
        user_id: UserData.user_id,
      });
      router.reload();
    } catch (err) {
      setError(
        "Creating user failed due to existing username or network error."
      );
      setLoadingModalIsOpen(false);
    }
  }

  return (
    <div className="flex justify-center px-4 lg:px-10 pt-20">
      <form
        className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8 lg:p-12"
        onSubmit={register}
      >
        <h1 className="text-3xl lg:text-4xl font-bold text-center text-[#004d40] mb-8">
          Add New User
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Username */}
          <div className="relative">
            <input
              type="text"
              value={UserName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="peer block w-full px-4 py-4 rounded-xl border-2 border-gray-300 focus:border-[#009688] focus:ring-1 focus:ring-[#009688] text-gray-900 text-lg placeholder-transparent"
              placeholder="Username"
            />
            <label className="absolute left-4 top-4 text-gray-400 text-lg transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-lg peer-focus:-top-3 peer-focus:text-sm peer-focus:text-[#009688]">
              Username
            </label>
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="peer block w-full px-4 py-4 rounded-xl border-2 border-gray-300 focus:border-[#009688] focus:ring-1 focus:ring-[#009688] text-gray-900 text-lg placeholder-transparent"
              placeholder="Email"
            />
            <label className="absolute left-4 top-4 text-gray-400 text-lg transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-lg peer-focus:-top-3 peer-focus:text-sm peer-focus:text-[#009688]">
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={typepassword}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="peer block w-full px-4 py-4 rounded-xl border-2 border-gray-300 focus:border-[#009688] focus:ring-1 focus:ring-[#009688] text-gray-900 text-lg placeholder-transparent"
              placeholder="Password"
            />
            <label className="absolute left-4 top-4 text-gray-400 text-lg transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-lg peer-focus:-top-3 peer-focus:text-sm peer-focus:text-[#009688]">
              Password
            </label>
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 hover:text-gray-900 transition"
              onClick={() =>
                setTypepassword(typepassword === "password" ? "text" : "password")
              }
            >
              {typepassword === "password" ? <FiEye size={24} /> : <FiEyeOff size={24} />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={typepasswordconfirm}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="peer block w-full px-4 py-4 rounded-xl border-2 border-gray-300 focus:border-[#009688] focus:ring-1 focus:ring-[#009688] text-gray-900 text-lg placeholder-transparent"
              placeholder="Confirm Password"
            />
            <label className="absolute left-4 top-4 text-gray-400 text-lg transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-lg peer-focus:-top-3 peer-focus:text-sm peer-focus:text-[#009688]">
              Confirm Password
            </label>
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 hover:text-gray-900 transition"
              onClick={() =>
                setTypepasswordconfirm(
                  typepasswordconfirm === "password" ? "text" : "password"
                )
              }
            >
              {typepasswordconfirm === "password" ? <FiEye size={24} /> : <FiEyeOff size={24} />}
            </span>
          </div>
        </div>

        {/* Error message */}
        {(passworderror || error) && (
          <p className="text-red-600 font-semibold mt-6">{passworderror || error}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full lg:w-auto bg-[#009688] hover:bg-[#00796b] text-white font-bold py-3 px-8 rounded-xl shadow-lg transition duration-300 text-lg flex justify-center items-center mx-auto"
        >
          Submit
        </button>

        {/* Loader Modal */}
        <ReactModal
          isOpen={LoadingmodalIsOpen}
          className="flex items-center justify-center w-full h-full bg-black/30"
        >
          <Loader />
        </ReactModal>
      </form>
    </div>
  );
}
