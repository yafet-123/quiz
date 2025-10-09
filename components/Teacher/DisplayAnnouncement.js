import React from "react";
import { useState,useEffect, useContext} from 'react'
import moment from 'moment';
import { useRouter } from 'next/router'
import {DeleteAnnouncement} from './DeleteAnnouncement.js'
import {UpdateAnnouncement} from './UpdateAnnouncement.js'


export function DisplayAnnouncement({Allannouncements,Allclasses}) {
    const router = useRouter();
    const [deletemodalOn, setdeleteModalOn] = useState(false);
    const [updatemodalOn, setupdateModalOn] = useState(false);
    const [deleteAnnouncementid,setdeleteAnnouncementid] = useState()
    const [updateAnnouncementid,setupdateAnnouncementid] = useState()
    const [updatetitle,setupdatetitle] = useState("")
    const [updatecontent,setupdatecontent] = useState("")
    const [updateClassId,setupdateClassId] = useState("")
    console.log(Allannouncements)
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
                              <th className="text-black p-3 text-lg font-semibold tracking-wide text-left">Title</th>
                              <th className="text-black p-3 text-lg font-semibold tracking-wide text-left">Content</th>
                              <th className="text-black p-3 text-lg font-semibold tracking-wide text-left">Class</th>
                              <th className="text-black p-3 text-lg font-semibold tracking-wide text-left">Created Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {Allannouncements.map((data,index)=>(
                                <tr key={index} className="even:bg-neutral-300 odd:bg-neutral-200  w-full">
                                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                        <p className="font-bold text-gray-700 hover:underline">{data.announcement_id}</p>
                                    </td>
                                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                        {data.title}
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                        {data.content}
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                        {data.classDetails.map((classDetail) => (
                                          <span key={classDetail.class_id} className="px-2">{classDetail.class_name}</span>
                                        ))}
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                        {moment(data.createDate).utc().format('YYYY-MM-DD')}
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                        <button
                                            onClick={() => {
                                                clickedForupdate()
                                                setupdateAnnouncementid(data.announcement_id)
                                                setupdatetitle(data.title)
                                                setupdatecontent(data.content)
                                                setupdateClassId(data.classDetails)
                                            }} 
                                            className="bg-[#009688] text-white font-bold py-2 px-4 border-b-4 border-[#009688] hover:scale-110 duration-1000 ease-in-out rounded">
                                            Edit
                                        </button>
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                        <button 
                                            onClick={() => {
                                                clickedFordelete()
                                                setdeleteAnnouncementid(data.announcement_id)
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
                    {Allannouncements.map((data,index)=>(
                        <div key={index} className=" bg-neutral-200 space-y-3 p-2 lg:p-4 rounded-lg shadow overflow-scroll">
                            <div>
                                <p className="text-blue-500 font-bold hover:underline">
                                    <span className="text-lg">Id : </span> 
                                    <span className="text-sm ">{data.announcement_id}</span>
                                </p>
                            </div>
                            <div className="text-gray-700 font-bold">
                                <span className="text-lg">Title : </span>
                                <span className="text-md">{data.title} </span>
                            </div>

                            <div className="text-gray-700 font-bold">
                                <span className="text-lg">Content : </span>
                                <span className="text-md">{data.content} </span>
                            </div>

                            <div className="text-gray-700 font-bold">
                                <span className="text-lg">Class : </span>
                                <span className="text-md">{data.class} </span>
                            </div>

                            <div className="text-black font-bold">
                              <span className="text-lg">createDate : </span>
                              <span className="text-sm">{moment(data.createDate).utc().format('YYYY-MM-DD')}</span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <button
                                    onClick={() => {
                                        clickedForupdate()
                                        setupdateAnnouncementid(data.announcement_id)
                                        setupdatetitle(data.title)
                                        setupdatecontent(data.Content)
                                        setupdateClassId(data.class_id)
                                    }}  
                                    className="bg-[#009688] text-white font-bold py-2 px-4 border-b-4 border-[#009688] hover:scale-110 duration-1000 ease-in-out rounded">
                                    Edit
                                </button>

                                <button
                                    onClick={() => {
                                        clickedFordelete()
                                        setdeleteAnnouncementid(data.announcement_id)
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
                <DeleteAnnouncement setdeleteModalOn={setdeleteModalOn} deleteAnnouncementid={deleteAnnouncementid}/>
            }

            {updatemodalOn && 
                <UpdateAnnouncement 
                    setupdateModalOn={setupdateModalOn}
                    updateAnnouncementid={updateAnnouncementid}
                    updatetitle={updatetitle}
                    updatecontent={updatecontent}
                    updateClassId={updateClassId} 
                    setupdateAnnouncementid={setupdateAnnouncementid}
                    setupdatetitle={setupdatetitle}
                    setupdatecontent={setupdatecontent}
                    setupdateClassId={setupdateClassId}
                    Allclasses={Allclasses}
                />
            }
        </div>
    );
}
