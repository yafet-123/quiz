import axios from 'axios';
import { useRouter } from 'next/router'
import { useState,useEffect, useContext} from 'react'
import Loader from "../common/Loading";
import ReactModal from "react-modal";
import Multiselect from 'multiselect-react-dropdown';

export function UpdateAnnouncement({
    setupdateModalOn
    ,updateAnnouncementid
    ,updatetitle
    ,updatecontent
    ,updateClassId
    ,setupdateAnnouncementid
    ,setupdatetitle
    ,setupdatecontent
    ,setupdateClassId
    ,Allclasses}) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [LoadingmodalIsOpen, setLoadingModalIsOpen] = useState(false);
    const classIds = updateClassId.map((classDetail) => classDetail.class_id);
    const [classId, setClassId] = useState(classIds)
    console.log(classId)
    const handleOKClickForupdate = async() => {
        setLoadingModalIsOpen(true)
        const data = await axios.patch(`../../api/teacher/updateAnnouncement/${updateAnnouncementid}`,{
            "updatetitle": updatetitle,
            "updatecontent": updatecontent,
            "updateClassId": classId
        }).then(function (response) {
            console.log(response.data);
            router.reload()
        }).catch(function (error) {
            console.log(error);
            setLoadingModalIsOpen(false)
        });
        setupdateModalOn(false)
       
    }

    const handleCancelClickForupdate = () => {
        setupdateModalOn(false)
    }

	return(
		<div className="bg-gray-200 opacity-95 fixed inset-0 z-50   ">
            <div className="flex h-screen justify-center items-center ">
                <div className="flex-col justify-center bg-white py-24 px-5 lg:px-10 border-4 border-sky-500 rounded-xl ">
                    <div className="flex text-center text-xl text-zinc-600 font-bold mb-10" >Update Announcement</div>
                    <div className="flex flex-col justify-between items-center">
                        <div className="flex justify-between items-center gap-5">
                            <div className="relative mb-10">
                                <input 
                                    id="Title" 
                                    type="text" 
                                    className="block w-full px-3 text-xl text-black bg-transparent py-4 border-2 border-black rounded-xl appearance-none   focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                                    value={updatetitle}
                                    onChange={(e) => setupdatetitle(e.target.value)}
                                />
                                <label 
                                    htmlFor="floating_outlined" 
                                    className="absolute text-2xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                                >
                                    Title
                                </label>
                            </div>

                            <div className="relative mb-10">
                                <input 
                                    id="Content" 
                                    type="text" 
                                    className="block w-full px-3 text-xl text-black bg-transparent py-4 border-2 border-black rounded-xl appearance-none   focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                                    value={updatecontent}
                                    onChange={(e) => setupdatecontent(e.target.value)}
                                />
                                <label 
                                    htmlFor="floating_outlined" 
                                    className="absolute text-2xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                                >
                                    Content
                                </label>
                            </div>
                        </div>
                        <div className="w-full">
                        <Multiselect
                            displayValue="ClassName"
                            placeholder = "Class"
                            className="z-50 mb-5 w-full px-1 text-md lg:text-xl text-black bg-white py-2 border-2 border-black rounded-xl appearance-none    focus:outline-none focus:ring-0 focus:border-blue-500 peer"
                            onKeyPressFn={function noRefCheck(){}}
                            onRemove={function noRefCheck(){}}
                            onSearch={function noRefCheck(){}}
                            onSelect={(e)=>{
                                e.map((data,index)=>(
                                   setClassId([...classId, data.class_id])
                                ))
                            }}
                            selectedValues={Allclasses.filter((option) => classId.includes(option.class_id))}
                            options={Allclasses}
                        />
                        </div>
                    </div>
                    <div className="flex">
                        <button 
                            disabled={loading}
                            onClick={handleOKClickForupdate} 
                            className={`rounded px-4 py-4  ${loading ? "text-black bg-gray-200" : "text-white  bg-[#009688] hover:bg-[#009688]"}`}
                        >
                            Yes
                        </button>
                        <button onClick={handleCancelClickForupdate} className="rounded px-4 py-4 ml-4 text-white bg-blue-400 hover:bg-blue-600">No</button>
                    </div>

                    <ReactModal
                        isOpen={LoadingmodalIsOpen}
                        // onRequestClose={closeModal}
                        className="flex items-center justify-center w-full h-full"
                    >
                        <Loader />
                    </ReactModal>
                </div>
           	</div>
        </div>
	)
}