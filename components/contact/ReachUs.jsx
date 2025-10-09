import React from "react";
import Link from "next/link";
import Image from "next/image";
import reachUsImage from "../../public/background.jpg";
import {BsFacebook, BsYoutube, BsLinkedin, BsInstagram, BsTwitter} from 'react-icons/bs'

const ReachUs = () => {
  const socialMediaLinks = [
    {id:"/",path:<BsLinkedin size={30} color="black"/>},
    {id:"/",path:<BsInstagram size={30} color="black"/>},
  ]
  
  return (
    <div className="flex flex-col gap-6 md:gap-10 w-full md:px-10">
      <div className="relative w-full !h-[30rem] relative">
        <Image
          src={reachUsImage}
          alt="Reach Us Image"
          fill
          className="w-full !h-full"
          priority
        />
      </div>

      <div className="flex justify-center gap-4">
        {socialMediaLinks.map((paths, index) => {
          return (
            <Link key={index} href={paths.path} target="_blank">
              {paths.path}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ReachUs;
