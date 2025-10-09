import React from "react";
import { useState,useEffect, useContext} from 'react'
import moment from 'moment';
import { useRouter } from 'next/router'
import {DeleteSubject} from './DeleteSubject.js'
import {UpdateSubject} from './UpdateSubject.js'


export function DisplaySubject({subjectes}) {
    const router = useRouter();
    console.log(subjectes)
    const [deletemodalOn, setdeleteModalOn] = useState(false);
    const [updatemodalOn, setupdateModalOn] = useState(false);
    const [deletesubjectid,setdeletesubjectid] = useState()
    const [updatesubjectid,setupdatesubjectid] = useState()
    const [updatesubjectname,setupdatesubjectname] = useState("")

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
                              <th className="text-black p-3 text-lg font-semibold tracking-wide text-left">Subject Name</th>
                              <th className="text-black p-3 text-lg font-semibold tracking-wide text-left">Created Date</th>
                              <th className="text-black p-3 text-lg font-semibold tracking-wide text-left">Modified Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {subjectes.map((data,index)=>(
                                <tr key={index} className="even:bg-neutral-300 odd:bg-neutral-200  w-full">
                                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                        <p className="font-bold text-gray-700 hover:underline">{data.subject_id}</p>
                                    </td>
                                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                        {data.SubjectName}
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
                                                setupdatesubjectid(data.subject_id)
                                                setupdatesubjectname(data.SubjectName)
                                            }} 
                                            className="bg-[#009688] text-white font-bold py-2 px-4 border-b-4 border-[#009688] hover:scale-110 duration-1000 ease-in-out rounded">
                                            Edit
                                        </button>
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                        <button 
                                            onClick={() => {
                                                clickedFordelete()
                                                setdeletesubjectid(data.subject_id)
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
                    {subjectes.map((data,index)=>(
                        <div key={index} className=" bg-neutral-200 space-y-3 p-2 lg:p-4 rounded-lg shadow overflow-scroll">
                            <div>
                                <p className="text-blue-500 font-bold hover:underline">
                                    <span className="text-lg">Id : </span> 
                                    <span className="text-sm ">{data.subject_id}</span>
                                </p>
                            </div>
                            <div className="text-gray-700 font-bold">
                                <span className="text-lg">Class Name : </span>
                                <span className="text-md">{data.SubjectName} </span>
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
                                        setupdatesubjectid(data.subject_id)
                                        setupdatesubjectname(data.SubjectName)
                                    }}  
                                    className="bg-[#009688] text-white font-bold py-2 px-4 border-b-4 border-[#009688] hover:scale-110 duration-1000 ease-in-out rounded">
                                    Edit
                                </button>

                                <button
                                    onClick={() => {
                                        clickedFordelete()
                                        setdeletesubjectid(data.subject_id)
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
                <DeleteSubject setdeleteModalOn={setdeleteModalOn} deletesubjectid={deletesubjectid}/>
            }

            {updatemodalOn && 
                <UpdateSubject setupdateModalOn={setupdateModalOn} updatesubjectid={updatesubjectid} updatesubjectname={updatesubjectname} setupdatesubjectname={setupdatesubjectname} setupdatesubjectid={setupdatesubjectid} />
            }
        </div>
    );
}
