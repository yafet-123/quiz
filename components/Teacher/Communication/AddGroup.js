import React from "react";
import { useState,useEffect, useContext} from 'react'
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/router'
import {FiEye, FiEyeOff} from 'react-icons/fi'
import Loader from "../../common/Loading";
import ReactModal from "react-modal";
import { useSession } from "next-auth/react";
import Multiselect from 'multiselect-react-dropdown';

export function AddGroup({Allclasses,teacherId,Allstudents, Allsubjects}) {
    const [studentId, setstudentId] = useState([])
    const router = useRouter();
  	const [title, settitle] = useState('');
  	const [content, setcontent] = useState('');
  	const [loading, setloading] = useState(false)
  	const [error, seterror] = useState("")
  	console.log(Allstudents)
  	async function handleSubmit(values){
    	setloading(true);
    
    	const data = await axios.post(`../../../api/chat`,{
    	  "title":title,
    	  "content":content,
    	  "studentId" : studentId,
    	  "teacherId":teacherId
    	}).then(function (response) {
    	  	console.log(response.data);
      		router.push(router.asPath);
      		setloading(false);
    	}).catch(function (error) {
      		seterror("Creating Ai Search Failed")
      		setloading(false);
    	});
  	}
    return (
        <div className="px-0 lg:px-10 w-full">
        	<h1 className="text-black text-xl lg:text-4xl font-bold text-center italic my-5">Add Communication</h1>
			<form onSubmit={handleSubmit}>
			    <div className="px-0 lg:px-10">
		          	<div className="flex justify-between flex-col items-center">
			            <div className="w-full">
			              <Multiselect
			                displayValue="name"
			                placeholder = "Student"
			                className="z-50 mb-5 w-full px-1 lg:px-3 text-md lg:text-xl text-black bg-white py-2 border-2 border-black rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer"
			                onKeyPressFn={function noRefCheck(){}}
			                onRemove={function noRefCheck(){}}
			                onSearch={function noRefCheck(){}}
			                onSelect={(e)=>{
			                  e.map((data,index)=>(
			                    setstudentId([...studentId, data.students_id])
			                  ))
			                }}
			                options={Allstudents}
			              />
			            </div>

			            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full mb-5">
			              <div className="relative w-full">
			                <input 
			                  id="title" 
			                  type="text" 
			                  value={title}
			                  required
			                  className="block w-full px-3 text-sm lg:text-xl text-black bg-white py-4 border-2 border-black rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
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
			                  id="content" 
			                  type="text" 
			                  value={content}
			                  required
			                  className="block w-full px-3 text-sm lg:text-xl text-black bg-white py-4 border-2 border-black rounded-xl appearance-none focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
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
		          	</div>

		          	<button 
		              disabled={loading}
		              className={`float-right text-white font-medium rounded-lg text-xl p-4 text-center inline-flex items-center 
		                ${loading ? "bg-gray-200" : "bg-[#009688] hover:bg-[#009688] focus:ring-4 focus:ring-[#009688]" }`}
		              onClick={handleSubmit}
		            >
		              Send
		            </button>
		        </div>	
			</form>
			<ReactModal
                isOpen={loading}
                // onRequestClose={closeModal}
                className="flex items-center justify-center w-full h-full"
            >
                <Loader />
            </ReactModal>
        </div>
    );
}