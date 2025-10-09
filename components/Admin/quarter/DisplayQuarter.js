import React from "react";
import { useState,useEffect, useContext} from 'react'
import moment from 'moment';
import { useRouter } from 'next/router'
import {DeleteQuarter} from './DeleteQuarter.js'
import {UpdateQuarter} from './UpdateQuarter.js'


export function DisplayQuarter({quarter}) {
    const router = useRouter();
    console.log(quarter)
    const [deletemodalOn, setdeleteModalOn] = useState(false);
    const [updatemodalOn, setupdateModalOn] = useState(false);
    const [deletequarterid,setdeletequarterid] = useState()
    const [updatequarterid,setupdatequarterid] = useState()
    const [updatequartername,setupdatequartername] = useState("")

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
                              <th className="text-black p-3 text-lg font-semibold tracking-wide text-left">Quarter Name</th>
                              <th className="text-black p-3 text-lg font-semibold tracking-wide text-left">Created Date</th>
                              <th className="text-black p-3 text-lg font-semibold tracking-wide text-left">Modified Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {quarter.map((data,index)=>(
                                <tr key={index} className="even:bg-neutral-300 odd:bg-neutral-200  w-full">
                                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                        <p className="font-bold text-gray-700 hover:underline">{data.quarter_id}</p>
                                    </td>
                                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                        {data.quarterName}
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
                                                setupdatequarterid(data.quarter_id)
                                                setupdatequartername(data.quarterName)
                                            }} 
                                            className="bg-[#009688] text-white font-bold py-2 px-4 border-b-4 border-[#009688] hover:scale-110 duration-1000 ease-in-out rounded">
                                            Edit
                                        </button>
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                        <button 
                                            onClick={() => {
                                                clickedFordelete()
                                                setdeletequarterid(data.quarter_id)
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
                    {quarter.map((data,index)=>(
                        <div key={index} className=" bg-neutral-200 space-y-3 p-2 lg:p-4 rounded-lg shadow overflow-scroll">
                            <div>
                                <p className="text-blue-500 font-bold hover:underline">
                                    <span className="text-lg">Id : </span> 
                                    <span className="text-sm ">{data.quarter_id}</span>
                                </p>
                            </div>
                            <div className="text-gray-700 font-bold">
                                <span className="text-lg">Class Name : </span>
                                <span className="text-md">{data.quarterName} </span>
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
                                        setupdatequarterid(data.quarter_id)
                                        setupdatequartername(data.quarterName)
                                    }}  
                                    className="bg-[#009688] text-white font-bold py-2 px-4 border-b-4 border-[#009688] hover:scale-110 duration-1000 ease-in-out rounded">
                                    Edit
                                </button>

                                <button
                                    onClick={() => {
                                        clickedFordelete()
                                        setdeletequarterid(data.quarter_id)
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
                <DeleteQuarter setdeleteModalOn={setdeleteModalOn} deletequarterid={deletequarterid}/>
            }

            {updatemodalOn && 
                <UpdateQuarter setupdateModalOn={setupdateModalOn} updatequarterid={updatequarterid} updatequartername={updatequartername} setupdatequartername={setupdatequartername} setupdatequarterid={setupdatequarterid} />
            }
        </div>
    );
}
