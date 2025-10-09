import { VerticalNavbar } from "../../../components/Students/VerticalNavbar";
import { useSession } from "next-auth/react";
import { useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import { MainHeader } from '../../../components/common/MainHeader';
import React from 'react'
import { prisma } from '../../../util/db.server.js'


export default function Answered(){
  const router = useRouter();
  function handleChange(newValue) {
      setselected(newValue);
  }
  function handleReturn(){
    router.push('/Students/question/subject')
  }
  const { status, data } = useSession();
  return (
    <React.Fragment>
      <MainHeader title="MatricMate : Students" />
      <div className="flex bg-[#e6e6e6] pt-10">
        <VerticalNavbar onChange={handleChange} data={data} />
        <div className="bg-[#E6E6E6] w-full px-2 lg:px-10 h-full py-20 flex flex-col justify-center items-center">
          <p className="text-center font-bold text-[#00225F] text-3xl md:text-3xl lg:text-4xl pt-10 mb-5 leading-10">
            Great questions await answers! While there are no questions that have been answered yet, feel free to explore and answer some questions 
            to contribute to the community.
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
