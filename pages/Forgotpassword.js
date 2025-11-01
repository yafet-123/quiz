import { MainHeader } from '../components/common/MainHeader';
import React, { useState } from "react";
import axios from 'axios';

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function forgotPasswordRegister(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`/api/teacher/forgotPassword`, { email });
      setStatus(response.data.status);
      console.log(response);
    } catch (error) {
      console.log("Password Changing Failed", error);
      setStatus("Failed to send reset email. Try again!");
    }
    setLoading(false);
  }

  return (
    <React.Fragment>
      <MainHeader title="Save My Exam : Forgot Password" />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 px-4">
        <form 
          onSubmit={forgotPasswordRegister}
          className="bg-white shadow-2xl rounded-3xl max-w-lg w-full p-10 lg:p-16 flex flex-col"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-6 italic">
            Reset Password
          </h1>

          {status && (
            <p className="text-center text-red-500 font-semibold mb-6 animate-pulse">
              {status}
            </p>
          )}

          <div className="relative w-full mb-8">
            <input 
              id="email" 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="peer block w-full px-4 py-5 text-gray-800 bg-gray-50 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring focus:ring-blue-200 text-lg"
              placeholder="Email"
            />
            <label 
              htmlFor="email"
              className="absolute left-4 top-2 text-gray-500 text-lg peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all duration-300"
            >
              Email
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 text-white font-bold text-lg rounded-xl 
              ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900'}
              transition-all duration-300`}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </React.Fragment>
  );
}
