import React from "react";
import { useState,useEffect, useContext} from 'react'
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/router'
import {FiEye, FiEyeOff} from 'react-icons/fi'
import Loader from "../common/Loading";
import ReactModal from "react-modal";
import { useSession } from "next-auth/react";
import Multiselect from 'multiselect-react-dropdown';
import { Formik, Form, FieldArray, Field } from 'formik';

export function AddAnnouncement({Allclasses,teacherId}) {
    const [LoadingmodalIsOpen, setLoadingModalIsOpen] = useState(false);
    const router = useRouter();
    const { status, data } = useSession();
    const [loading, setLoading] = useState(false);

    const [classId, setclassId] = useState([])
    const [title, settitle] = useState()
    const [content, setcontent] = useState()
    const [error,seterror] = useState("")
    const [typechange , settypechange] = useState(true)
    const UserData = data?.user;

    async function handleSubmit(values){
 		setLoadingModalIsOpen(true);

        const data = await axios.post(`../../../api/teacher/addAnnouncement`,{
            "title":title,
            "content":content,
            "classId" : classId,
            "teacherId":teacherId
        }).then(function (response) {
            console.log(response.data);
            router.push(router.asPath);
            setLoadingModalIsOpen(false);
        }).catch(function (error) {
            seterror("Creating Ai Search Failed")
            setLoading(false)
            setLoadingModalIsOpen(false);
        });
    }

    return (
        <div className="px-0 lg:px-10">
        	<h1 className="text-black text-xl lg:text-4xl font-bold text-center italic my-5">Add Announcement</h1>
    
			    <form onSubmit={handleSubmit}>
			    	<div className="w-full mt-5">
		                <Multiselect
		                    displayValue="ClassName"
		                    placeholder = "Class"
		                    className="z-50 mb-5 w-full px-1 lg:px-3 text-md lg:text-xl text-black bg-white py-2 border-2 border-black rounded-xl appearance-none    focus:outline-none focus:ring-0 focus:border-blue-500 peer"
		                    onKeyPressFn={function noRefCheck(){}}
		                    onRemove={function noRefCheck(){}}
		                    onSearch={function noRefCheck(){}}
		                    onSelect={(e)=>{
		                        e.map((data,index)=>(
		                           setclassId([...classId, data.class_id])
		                        ))
		                    }}
		                    options={Allclasses}
		                />
                	</div>

				    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full mb-5">
				       	<div className="relative w-full">
		                    <input 
		                        id="Title" 
		                        type="text" 
		                        value={title}
		                        required
		                        className="block w-full px-3 text-sm lg:text-xl text-black bg-white py-4 border-2 border-black rounded-xl appearance-none   focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
		                        onChange={(e) => settitle(e.target.value)}
		                    />
		                    <label 
		                        htmlFor="floating_outlined" 
		                        className="absolute text-sm lg:text-xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
		                    >
		                        Title
		                    </label>
                  		</div>

                    	<div className="relative w-full">
		                  	<input 
		                  	    id="Content" 
		                  	    type="text" 
		                  	    value={content}
		                  	    required
		                  	    className="block w-full px-3 text-sm lg:text-xl text-black bg-white py-4 border-2 border-black rounded-xl appearance-none   focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
		                  	    onChange={(e) => setcontent(e.target.value)}
		                  	/>
		                  	<label 
		                  	    htmlFor="floating_outlined" 
		                  	    className="absolute text-sm lg:text-xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
		                  	>
		                  	    Content
		                  	</label>
                    	</div>
				    </div>

			        <button 
			        	type="submit"
			        	disabled={loading}
                     	className={`mb-5 w-64 float-right text-white font-medium rounded-lg text-xl p-4 text-center flex justify-center items-center 
                         	${loading ? "bg-gray-200 bg-opacity-10" : "bg-[#009688] hover:bg-[#009688] focus:ring-4 focus:ring-[#009688]" }`}
                  	>
                     	Submit
                  	</button>
			    </form>
			  	<ReactModal
                    isOpen={LoadingmodalIsOpen}
                    // onRequestClose={closeModal}
                    className="flex items-center justify-center w-full h-full"
                >
                    <Loader />
                </ReactModal>
        </div>
    );
}