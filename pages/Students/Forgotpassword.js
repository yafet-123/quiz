import { MainHeader } from '../../components/common/MainHeader';
import React from "react";
import axios from 'axios';
import { useState,useEffect, useContext} from 'react'
import { getSession } from "next-auth/react";
export async function getServerSideProps(context) {
  const session = await getSession(context);
  const userRole = await session?.user?.role
  if (userRole === 'student') {
    return {
      redirect: {
        destination: '/', // Redirect to the error page for unauthorized access
        permanent: false,
      },
    };
  }
  
  if (userRole === 'teacher') {
    return {
      redirect: {
        destination: '/auth/Teacher/Login/signin-teacher', // Redirect to the error page for unauthorized access
        permanent: false,
      },
    };
  }

  if (userRole === 'admin') {
    return {
      redirect: {
        destination: '/auth/Admin/Login/signin-user', // Redirect to the error page for unauthorized access
        permanent: false,
      },
    };
  }

  return {
    props: {
      
    }, // will be passed to the page component as props
  }
}

export default function ForgotPassword() {
  const [email, setemail] = useState("")
  const [status, setStatus] = useState("")
  const [loading, setloading] = useState(false)

  async function forgotPasswordregister(e){
    e.preventDefault()
    setloading(true)
    const data = await axios.post(`../../../api/student/forgotPassword`,{
        "email": email,
    }).then(function (response) {
      setStatus(response.data.status)
      console.log(response)
      setloading(false)
    }).catch(function (error) {
        console.log("Password Changing Failed")
        setloading(false)
    });
    setloading(false) 
  }

  return (
    <React.Fragment>
      <MainHeader title="MatricMate : Forgot Password" />
      <div className="flex flex-col justify-center items-center h-screen w-full bg-[#e6e6e6]"> 
        
        <form className="flex flex-col bg-neutral-100  border border-slate-300 rounded-xl w-full lg:w-[45rem] h-full lg:h-[35rem]" onSubmit={forgotPasswordregister}>
          <h1 className="text-black text-xl lg:text-4xl font-bold text-center italic mt-20 mb-5">Reset Password</h1>
           <p className="text-red-500 text-xl font-bold text-center">{status}</p> 
          <div className="flex flex-col">
            <div className="relative my-10 mx-5">
              <input 
                  id="email" 
                  type="email" 
                  required
                  className="block w-full px-3 text-sm lg:text-xl text-black bg-transparent py-4 border-2 border-black rounded-xl appearance-none   focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
              />
              <label 
                  htmlFor="floating_outlined" 
                  className="absolute text-sm lg:text-xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-100  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
              >
                  Email
              </label>
            </div>

            <div className="flex justify-end mx-5">
              <button 
                  disabled={loading}
                  className={` ${ loading ? "bg-opacity-10" : "" } w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl p-4`}
              >
                  Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}