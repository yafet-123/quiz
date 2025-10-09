import React from 'react'
import { MainHeader } from '../../components/common/MainHeader';
import { useRouter } from "next/router";
import Link from 'next/link'
export default function Error () {
  const { error } = useRouter().query;
  const router = useRouter();
  return(
    <React.Fragment>
      <MainHeader title="Authentication Error Page" />
      <div className="w-full h-screen bg-gray-100  pt-24 grid justify-center content-center ">
        <div className="flex flex-col justify-center items-center px-5 lg:px-32">
          <p className="text-center text-md lg:text-4xl font-bold">
              Oops! It seems there was an issue accessing this page.
             Please check if you have the necessary permissions or contact support for assistance.
          </p>
        </div>
      </div>
    </React.Fragment>
  )
};