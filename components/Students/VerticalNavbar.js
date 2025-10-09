import React, {useState,useEffect} from "react";
import { useRouter } from 'next/router'

import { GiTeacher } from "react-icons/gi";
import { RiAdminFill } from "react-icons/ri";
import { PiStudent } from "react-icons/pi";
import { SiBookstack } from "react-icons/si";
import { SiGoogleclassroom } from "react-icons/si";
import { FaQuestion,FaComment } from "react-icons/fa";
import { CiSquareQuestion } from "react-icons/ci";
import { AiOutlineUser,AiFillDashboard,AiOutlineMenu } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi"
import { WiMoonFirstQuarter } from "react-icons/wi";
import { MdQuestionAnswer } from "react-icons/md";
import Link from 'next/link'
import { useSession, signIn, signOut  } from "next-auth/react";


export function VerticalNavbar({onChange, data}){
    const SideBarList = [
        { link: "/Students", icon: <AiFillDashboard size={25}/>, name: "Dashboard",},
        { link: "/Students/question/subject", icon: <CiSquareQuestion size={25}/>, name: "Question",},
        { link: "/Students/answered/subject", icon: <MdQuestionAnswer size={25}/>, name: "Answer",},
        { link: "/Students/Communication", icon: <FaComment size={25}/>, name: "Communication",},
    ];
	const router = useRouter();
    const [sideBar , setsideBar] = useState(false);
    const handleSideBar = () => {
        setsideBar(!sideBar);
    };
    const path = router.pathname
    console.log(data)

	return(
            <div className={`flex h-full sticky top-0 bottom-0 ${sideBar ? "w-16 lg:w-28" : "w-16 lg:w-96"} pt-10`}>
                <nav className="w-full h-full flex flex-col py-8 lg:px-4 bg-[#e6e6e6] scroll_width">
                    <div className="flex justify-between ml-2 lg:ml-5">
                        <h1 className={`text-2xl font-bold text-black ${sideBar ? "hidden" : "hidden lg:flex"}`}>Student Page</h1>
                        <button 
                            onClick={handleSideBar} 
                            className={`flex text-black hover:text-slate-800 focus:outline-none ${ sideBar ? "flex justify-center items-center" : ""} `}
                        >
                            <AiOutlineMenu size={35} />
                        </button>
                    </div>
                    <div className="mt-10">
                        <ul>
                            {SideBarList.map((side, index) => (
                                <li className="mb-5" key={index}>
                                    <button 
                                        onClick = {()=>{
                                            router.push({
                                                pathname:side.link,
                                            })
                                        }}
                                        className={ side.link == path ? "lg:w-full bg-white flex items-center px-4 py-2 lg:py-4 text-xs lg:text-sm text-black rounded-xl":
                                        "lg:w-full flex items-center px-4 py-2 lg:py-4 text-xs lg:text-sm text-black hover:text-white hover:bg-[#009688] rounded-xl" }
                                    >
                                            <span className="text-xs lg:text-lg">{side.icon}</span>
                                            <span className={`ml-0 lg:ml-4 font-semibold ${sideBar ? 'hidden' : 'hidden lg:flex' } `}>
                                                {side.name}
                                            </span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-auto flex flex-col">                        
                        <button 
                            onClick={() => signOut({
                                callbackUrl: '/auth/Student/Login/signin-student'
                            })} 
                            className="flex items-center p-2 lg:p-4 text-xl text-black hover:text-black hover:bg-[#009688] rounded-xl hover:bg-white rounded-xl" href="#">
                            <span className="hidden lg:flex"><FiLogOut size={25} /></span>
                            <span className={`ml-1 lg:ml-4 text-xs lg:text-lg font-semibold ${sideBar ? "hidden" : "flex"} `}>Log Out</span>
                        </button>
                    </div>
                </nav>
            </div>
	)
}