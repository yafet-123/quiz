import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'
import Link from 'next/link'
export default function ResetPassword() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState("")
  const { token } = router.query
  async function handleSubmit(e){
        e.preventDefault()
        const data = await axios.post(`../api/teacher/ResetPasswordapi`,{
            "password": password,
            "token": token,
        }).then(function (response) {
            setError(response.data.status);
            setSuccess(true);
        }).catch(function (error) {
            console.log(error)
            seterror("Reset Passwor Failed")        
        });
       
  }

  if (success) {
    return(
      <div className="flex flex-col justify-center items-center h-screen w-full bg-[#e6e6e6]" >
        <p className="mb-5 text-black text-xl font-bold">Your password has been successfully reset password.</p>
        <Link href="/auth/Teacher/Login/signin-teacher">
          <a className="w-32 text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl p-4">
            Login
          </a>
        </Link>

      </div>
    )
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full bg-[#e6e6e6]" >
      <h1 className="text-black text-xl lg:text-4xl font-bold text-center italic my-5">Reset Password</h1>
      <form className="flex flex-col rounded-xl w-full lg:w-[45rem] py-10" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <div className="relative mx-5 mb-10">
            <input 
              id="password" 
              type="password" 
              required
              className="block w-full px-3 text-sm lg:text-xl text-black bg-transparent py-4 border-2 border-black rounded-xl appearance-none   focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <label 
                htmlFor="floating_outlined" 
                className="absolute text-sm lg:text-xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#e6e6e6] px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
                New Password
            </label>
          </div>
          {error && <p>{error}</p>}
          <div className="flex justify-end mx-5">
            <button 
                className="w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl p-4"
            >
               Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}