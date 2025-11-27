import { MainHeader } from '../../components/common/MainHeader';
import React, { useState } from "react";
import axios from 'axios';
import { HiOutlineLockClosed } from 'react-icons/hi';
import Link from "next/link"

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function forgotPasswordRegister(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`/api/student/forgotPassword`, { email });
      setStatus(response.data.status);
    } catch (error) {
      console.log("Password Changing Failed", error);
      setStatus("Failed to send reset email. Try again!");
    }
    setLoading(false);
  }

  return (
    <React.Fragment>
      <MainHeader title="Aceit : Forgot Password" />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-blue-50 via-indigo-50 to-purple-50 px-4 pt-10">
        <div className="flex flex-col items-center w-full max-w-md lg:max-w-lg pt-10">
          
          {/* Hero Icon */}
          <div className="bg-blue-100 p-3 rounded-full mb-6 animate-bounce">
            <HiOutlineLockClosed className="text-blue-700 w-12 h-12" />
          </div>

          <div className="bg-white w-full rounded-3xl shadow-2xl p-5 flex flex-col">
            <h1 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-6 italic">
              Reset Password
            </h1>

            {status && (
              <p className="text-center text-red-500 font-semibold mb-6 animate-pulse">
                {status}
              </p>
            )}


            <div className="relative w-full mb-8">
              <label className="block text-gray-700 font-medium mb-3">
                Email
              </label>
              <input 
                id="email" 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="peer block w-full px-4 py-5 text-gray-800 bg-gray-50 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring focus:ring-blue-200 text-lg"
                placeholder="Enter Your Email"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              onClick={forgotPasswordRegister}
              className={`w-full py-4 text-white font-bold text-lg rounded-xl 
                ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800'}
                transition-all duration-300 shadow-lg`}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>

            <p className="text-center text-gray-500 text-sm mt-6">
              Remembered your password? <Link href="/auth/Admin/Login/signin-user"> 
              <a className="text-blue-600 hover:underline">Login</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
