import React from "react";
import { useState,useEffect, useContext} from 'react'
import moment from 'moment';
import { useRouter } from 'next/router'
import {DeleteUser} from './DeleteUser.js'
import {UpdateUser} from './UpdateUser.js'

export function DisplayUser({users}) {
    const router = useRouter();
    const [deletemodalOn, setdeleteModalOn] = useState(false);
    const [updatemodalOn, setupdateModalOn] = useState(false);
    const [deleteuserid,setdeleteuserid] = useState()
    const [updateuserid,setupdateuserid] = useState()
    const [updateemail, setupdateemail] = useState("")
    const [updateusername,setupdateusername] = useState("")
    const [LoadingmodalIsOpen, setLoadingModalIsOpen] = useState(false);

    const clickedFordelete = () => {
        setdeleteModalOn(true)
    }

    const clickedForupdate = () => {
        setupdateModalOn(true)
    }

    return (
        <div className="px-0 lg:px-10">
            <div className="p-2 lg:p-5">
                <div className="overflow-auto rounded-lg shadow hidden md:block">
                    <table className="w-full">
                        <thead className="bg-neutral-100 border-b-2 border-gray-200">
                            <tr>
                              <th className="text-black p-3 text-lg font-semibold tracking-wide text-left">Id</th>
                              <th className="text-black p-3 text-lg font-semibold tracking-wide text-left">User Name</th>
                              <th className="text-black p-3 text-lg font-semibold tracking-wide text-left">Email</th>
                              <th className="text-black p-3 text-lg font-semibold tracking-wide text-left">Created Date</th>
                              <th className="text-black p-3 text-lg font-semibold tracking-wide text-left">Modified Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.map((data,index)=>(
                                <tr key={index} className="even:bg-neutral-300 odd:bg-neutral-200  w-full">
                                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                        <p className="font-bold text-[#009688] hover:underline">{data.user_id}</p>
                                    </td>
                                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                        {data.UserName}
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                        <h1 className="text-black flex justify-between my-5 font-bold text-lg md:text-xl">
                                            <span className={ `font-normal font-medium ${data.email ? " " : "text-red-800"}`}>
                                                { data.email ? data.email : "No Email Address" }
                                            </span>
                                        </h1>
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                        {moment(data.createDate).utc().format('YYYY-MM-DD')}
                                    </td>
                                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                        {moment(data.ModifiedDate).utc().format('YYYY-MM-DD')}
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                        <button
                                            onClick={() => {
                                                clickedForupdate()
                                                setupdateuserid(data.user_id)
                                                setupdateusername(data.UserName)
                                                setupdateemail(data.email)
                                            }} 
                                            className="bg-[#009688] text-white font-bold py-2 px-4 border-b-4 border-[#009688] hover:scale-110 duration-1000 ease-in-out rounded">
                                            Edit
                                        </button>
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                        <button 
                                            onClick={() => {
                                                clickedFordelete()
                                                setdeleteuserid(data.user_id)
                                            }}
                                            className="bg-red-500 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:scale-110 duration-1000 ease-in-out rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:hidden">
                    {users.map((data,index)=>(
                        <div key={index} className=" bg-neutral-200 space-y-3 p-2 lg:p-4 rounded-lg shadow overflow-scroll">
                            <div>
                                <p className="text-blue-500 font-bold hover:underline">
                                    <span className="text-lg">Id : </span> 
                                    <span className="text-sm ">{data.user_id}</span>
                                </p>
                            </div>
                            <div className="text-gray-700 font-bold">
                                <span className="text-lg">User Name : </span>
                                <span className="text-md">{data.UserName} </span>
                            </div>

                            <div className="text-md lg:text-lg text-gray-700 font-bold break-words ">
                                Email : <span className={ `font-normal font-medium ${data.email ? " " : "text-red-800"}`}>
                                    { data.email ? data.email : "No Email Address" }
                                </span>
                            </div>

                            <div className="text-black font-bold">
                              <span className="text-lg">createDate : </span>
                              <span className="text-sm">{moment(data.createDate).utc().format('YYYY-MM-DD')}</span>
                            </div>
                            <div className="text-black font-bold">
                              <span className="text-lg">Modified Date : </span>
                              <span className="text-sm">{moment(data.ModifiedDate).utc().format('YYYY-MM-DD')}</span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <button
                                    onClick={() => {
                                        clickedForupdate()
                                        setupdateuserid(data.user_id)
                                        setupdateusername(data.UserName)
                                        setupdateemail(data.email)
                                    }}  
                                    className="bg-[#009688] text-white font-bold py-2 px-4 border-b-4 border-[#009688] hover:scale-110 duration-1000 ease-in-out rounded">
                                    Edit
                                </button>

                                <button
                                    onClick={() => {
                                        clickedFordelete()
                                        setdeleteuserid(data.user_id)
                                    }} 
                                    className="bg-red-500 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:scale-110 duration-1000 ease-in-out rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
    
            </div>

            {deletemodalOn && 
                <DeleteUser setdeleteModalOn={setdeleteModalOn} deleteuserid={deleteuserid}/>
            }

            {updatemodalOn && 
                <UpdateUser setupdateModalOn={setupdateModalOn} updateuserid={updateuserid} updateemail={updateemail} updateusername={updateusername} setupdateemail={setupdateemail} setupdateusername={setupdateusername} />
            }
        </div>
    );
}
