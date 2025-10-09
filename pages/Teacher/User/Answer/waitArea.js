import { VerticalNavbar } from "../../../../components/Students/VerticalNavbar";
import { useSession } from "next-auth/react";
import { useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import { MainHeader } from '../../../../components/common/MainHeader';
import React from 'react'
import { prisma } from '../../../../util/db.server.js'


export default function WaitArea(){
  const router = useRouter();
  function handleChange(newValue) {
      setselected(newValue);
  }
  function handleReturn(){
    router.push('/Students/answered/subject')
  }
  const { status, data } = useSession();
  return (
    <React.Fragment>
      <MainHeader title="MatricMate : Students" />
      <div className="flex bg-[#e6e6e6] pt-10">
        <VerticalNavbar onChange={handleChange} data={data} />
        <div className="bg-[#E6E6E6] w-full px-2 lg:px-10 h-full py-20 flex flex-col justify-center items-center">
          <p className="text-center font-bold text-[#00225F] text-3xl md:text-3xl lg:text-4xl pt-10 mb-5 leading-10">
            Welcome to the Waiting Area! Your questions are currently under consideration, and answers will be revealed after 
            a designated time period has passed. Stay tuned for insightful responses!
          </p>
          <button
              onClick={handleReturn} 
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent text-white px-10 py-2 rounded-xl">
              Return
            </button>
        </div>
      </div>
    </React.Fragment>  );

}
