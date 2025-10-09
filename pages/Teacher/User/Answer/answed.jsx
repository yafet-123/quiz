import { VerticalNavbar } from "../../../../components/Teacher/VerticalNavbar";
import { useSession } from "next-auth/react";
import { useState,useEffect} from 'react'
import { useRouter } from 'next/router'
import { MainHeader } from '../../../../components/common/MainHeader';
import React from 'react'
import { prisma } from '../../../../util/db.server.js'


export default function Answered(){
  function handleChange(newValue) {
      setselected(newValue);
  }
  const { status, data } = useSession();
  return (
    <React.Fragment>
      <MainHeader title="MatricMate : Students" />
      <div className="flex bg-[#e6e6e6] pt-10">
        <VerticalNavbar onChange={handleChange} data={data} />
        <div className="w-full pt-20">
          <p></p>
        </div>
      </div>
    </React.Fragment>  );

}
