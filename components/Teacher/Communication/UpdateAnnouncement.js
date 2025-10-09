import axios from 'axios';
import { useRouter } from 'next/router'
import { useState,useEffect, useContext} from 'react'
import Loader from "../../common/Loading";
import ReactModal from "react-modal";
import Multiselect from 'multiselect-react-dropdown';

export function UpdateAnnouncement({
    setupdateModalOn
    ,updateCommunicationid
    ,updatetitle
    ,updatecontent
    ,updatestudentId
    ,setupdateCommunicationid
    ,setupdatetitle
    ,setupdatecontent
    ,setupdatestudentId
    ,Allstudents
    ,updateCommunicationrelationshipid}) {
    console.log(updatestudentId)
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [LoadingmodalIsOpen, setLoadingModalIsOpen] = useState(false);
    const [studentId, setstudentId] = useState(updatestudentId)
    const handleSelectChangeForSubject = (e) => {
        setstudentId(e.target.value);
    };
    console.log(studentId)
    const handleOKClickForupdate = async() => {
        setLoadingModalIsOpen(true)
        const data = await axios.patch(`../../api/Communication/updateCommunication/${updateCommunicationid}?param=${updateCommunicationrelationshipid}`,{
            "updatetitle": updatetitle,
            "updatecontent": updatecontent,
            "updatestudentId": studentId
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
                        <div className="flex flex-col justify-between items-center gap-5">
                            <div className="w-full relative mb-5">
                                <input 
                                    id="Title" 
                                    type="text" 
                                    className="block w-full px-3 text-xl text-black bg-transparent py-4 border-2 border-black rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
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
                      
                            <div className="relative mb-5">
                                <textarea
                                    value={updatecontent}
                                    onChange={(e) => setupdatecontent(e.target.value)} 
                                    className="block w-full px-3 text-xl text-black bg-transparent py-4 border-2 border-black rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                                    id="w3review" 
                                    name="w3review" 
                                    rows="4" 
                                    cols="50" 
                                />
                                <label 
                                    htmlFor="floating_outlined" 
                                    className="absolute text-2xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                                >
                                    Content
                                </label>
                            </div>
                        </div>

                        <div className="w-full mb-5">
                            <select
                                name="select"
                                value={studentId}
                                onChange={handleSelectChangeForSubject}
                                className="py-4 border-2 border-black rounded-xl block w-full bg-white appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black px-3"
                            >
                                <option value="" disabled hidden></option>
                                { Allstudents.map((data,index)=>(
                                    <option key={index} value={data.students_id} className="text-sm lg:text-xl text-black">{data.name}</option>
                                ))}
                            </select>
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