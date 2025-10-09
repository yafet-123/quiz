import axios from 'axios';
import { useRouter } from 'next/router'
import { useState,useEffect, useContext} from 'react'
import Loader from "../../../common/Loading";
import ReactModal from "react-modal";

export function UpdateAssign({setupdateModalOn,updateuserid, updateassignid, updateclassid, updatesubjectid, setupdateassignid,setupdateuserid,setupdateclassid,setupdatesubjectid,teachers,subjectes,classes,}) {
    const router = useRouter();
    console.log("updateuserid")
    const [loading, setLoading] = useState(false);
    const [LoadingmodalIsOpen, setLoadingModalIsOpen] = useState(false);
    console.log(updateuserid)
    console.log(updateclassid)
    console.log(updatesubjectid)
    const handleOKClickForupdate = async() => {
        setLoadingModalIsOpen(true)
        const data = await axios.patch(`../../api/teacher/updateAssign/${updateassignid}`,{
            "updateuserid": updateuserid,
            "updateclassid": updateclassid,
            "updatesubjectid": updatesubjectid
        }).then(function (response) {
            console.log(response.data);
            router.reload()
        }).catch(function (error) {
            console.log(error);
            setLoadingModalIsOpen(false)
        });
        setupdateModalOn(false)
       
    }
    console.log(teachers)
    const handleCancelClickForupdate = () => {
        setupdateModalOn(false)
    }

    const handleSelectChangeForTeacher = (e) => {
        setupdateuserid(e.target.value);
    };

    const handleSelectChangeForSubject = (e) => {
        setupdatesubjectid(e.target.value);
    };

    const handleSelectChangeForClass = (e) => {
        setupdateclassid(e.target.value);
    };

	return(
		<div className="bg-gray-200 opacity-95 fixed inset-0 z-50   ">
            <div className="flex h-screen justify-center items-center ">
                <div className="flex-col justify-center bg-white py-24 px-5 lg:px-10 border-4 border-sky-500 rounded-xl ">
                    <div className="flex text-center text-xl text-zinc-600 font-bold mb-20" >Update Teacher</div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 my-10">
                        <div className="relative z-0 w-full">
                            <select
                                name="select"
                                value={updateuserid}
                                onChange={handleSelectChangeForTeacher}
                                className="py-4 border-2 border-black rounded-xl block w-full bg-white appearance-none focus:outline-none focus:ring-0 focus:border-black px-3"
                            >
                                <option value="" disabled hidden></option>
                                { teachers.map((data,index)=>(
                                    <option key={index} value={data.teacher_id} className="text-sm lg:text-xl text-black">{data.UserName}</option>
                                ))}
                            </select>
                            <label
                                htmlFor="select"
                                className={`absolute duration-300 top-2 left-0 px-1 -z-1 text-sm lg:text-xl text-black left-2 bg-white ${
                                    updateuserid ? 'text-xs' : 'text-sm'
                                    } ${updateuserid ? '-translate-y-full' : '-translate-y-0'} transform origin-0`}
                            >
                                Select an Teacher
                            </label>
                            <span className="text-sm text-red-600 hidden" id="error">
                                Option has to be selected
                            </span>
                        </div>

                        <div className="relative z-0 w-full">
                            <select
                                name="select"
                                value={updateclassid}
                                onChange={handleSelectChangeForClass}
                                className="py-4 border-2 border-black rounded-xl block w-full bg-white appearance-none focus:outline-none focus:ring-0 focus:border-black px-3"
                            >
                                <option value="" disabled hidden></option>
                                { classes.map((data,index)=>(
                                    <option key={index} value={data.class_id} className="text-sm lg:text-xl text-black">{data.ClassName}</option>
                                ))}
                            </select>
                            <label
                                htmlFor="select"
                                className={`absolute duration-300 top-2 left-0 px-1 -z-1 text-sm lg:text-xl text-black left-2 bg-white ${
                                    updateclassid ? 'text-xs' : 'text-sm'
                                    } ${updateclassid ? '-translate-y-full' : '-translate-y-0'} transform origin-0`}
                            >
                                Select an Class
                            </label>
                            <span className="text-sm text-red-600 hidden" id="error">
                                Option has to be selected
                            </span>
                        </div>

                        <div className="relative z-0 w-full">
                            <select
                                name="select"
                                value={updatesubjectid}
                                onChange={handleSelectChangeForSubject}
                                className="py-4 border-2 border-black rounded-xl block w-full bg-white appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black px-3"
                            >
                                <option value="" disabled hidden></option>
                                { subjectes.map((data,index)=>(
                                    <option key={index} value={data.subject_id} className="text-sm lg:text-xl text-black">{data.SubjectName}</option>
                                ))}
                            </select>
                            <label
                                htmlFor="select"
                                className={`absolute duration-300 top-2 left-0 px-1 -z-1 text-sm lg:text-xl text-black left-2 bg-white ${
                                    updatesubjectid ? 'text-xs' : 'text-sm'
                                    } ${updatesubjectid ? '-translate-y-full' : 'translate-y-0'} transform origin-0`}
                            >
                                Select an Subject
                            </label>
                            <span className="text-sm text-red-600 hidden" id="error">
                                Option has to be selected
                            </span>
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