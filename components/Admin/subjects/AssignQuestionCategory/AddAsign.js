import React from "react";
import { useState,useEffect, useContext} from 'react'
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/router'
import {FiEye, FiEyeOff} from 'react-icons/fi'
import Loader from "../../../common/Loading";
import ReactModal from "react-modal";
import { useSession } from "next-auth/react";
import Multiselect from 'multiselect-react-dropdown';

export function AddAsign({subjects,questioncategory}) {
    const [LoadingmodalIsOpen, setLoadingModalIsOpen] = useState(false);
    const router = useRouter();
    const { status, data } = useSession();
    const [loading, setLoading] = useState(false);

    const [questioncategoryId, setquestioncategoryId] = useState([])
    const [subjectId, setsubjectId] = useState()

    const [error,seterror] = useState("")
    const UserData = data?.user;

    console.log(questioncategoryId)
    console.log(subjectId)
    async function register(e){
        e.preventDefault();
        seterror("")
        setLoadingModalIsOpen(true);
        const data = await axios.post(`../../api/subject/AddAssign`,{
            'questioncategoryId':questioncategoryId,
            'subjectId':subjectId,
            "user_id": UserData.user_id,
        }).then(function (response) {
            console.log(response.data);
            router.reload()
            setLoadingModalIsOpen(false);
        }).catch(function (error) {
            console.log(error)
            seterror("Creating subject and Question Category Assign failed due to username is still exist or network error")
            setLoadingModalIsOpen(false);
        });
    }
    
    const handleSelectChangeForSubject = (e) => {
        setsubjectId(e.target.value);
    };

    return (
        <div className="px-0 lg:px-10 pt-20">
            <form className="max-w-7xl mx-auto mt-10" onSubmit={register} >
                <h1 className="text-black text-xl lg:text-4xl font-bold text-center italic my-5">Subject Assign To Question Category</h1>

                <div className="relative z-0 w-full mb-5">
                    <select
                        name="select"
                        value={subjectId}
                        onChange={handleSelectChangeForSubject}
                        className="py-4 border-2 border-black rounded-xl block w-full bg-white appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black px-3"
                    >
                        <option value="" disabled hidden></option>
                        <option value="" ></option>
                        { subjects.map((data,index)=>(
                            <option key={index} value={data.subject_id} className="text-sm lg:text-xl text-black">{data.SubjectName}</option>
                        ))}
                    </select>
                    <label
                        htmlFor="select"
                        className={`absolute duration-300 top-2 left-0 px-1 -z-1 text-sm lg:text-xl text-black left-2 bg-white ${
                            subjectId ? 'text-xs' : 'text-sm'
                            } ${subjectId ? '-translate-y-full' : 'translate-y-0'} transform origin-0`}
                    >
                        Select Subject
                    </label>
                    <span className="text-sm text-red-600 hidden" id="error">
                        Option has to be selected
                    </span>
                </div>


                <div className="mb-10">
                    <Multiselect
                        displayValue="questioncategoryName"
                        placeholder = "Question Category Name"
                        className="z-50 w-full px-1 lg:px-3 text-md lg:text-xl text-black bg-white py-4 border-2 border-black rounded-xl appearance-none    focus:outline-none focus:ring-0 focus:border-blue-500 peer"
                        onKeyPressFn={function noRefCheck(){}}
                        onRemove={function noRefCheck(){}}
                        onSearch={function noRefCheck(){}}
                        onSelect={(e)=>{
                            e.map((data,index)=>(
                               setquestioncategoryId([...questioncategoryId, data.question_category_id])
                            ))
                        }}
                        options={questioncategory}
                    />
                </div>

                <div className="mx-2 my-5 lg:my-0 flex flex-col lg:flex-row justify-between">
                    <h1 className="text-red-600  text-md lg:text-2xl font-bold text-left mb-5 lg:mb-0">
                        { error }
                    </h1>
                    <button 
                        disabled={loading}
                        className={`float-right text-white font-medium rounded-lg text-xl p-4 text-center inline-flex items-center 
                            ${loading ? "bg-gray-200" : "bg-[#009688] hover:bg-[#009688] focus:ring-4 focus:ring-[#009688]" }`}
                    >
                        Submit
                    </button>
                </div>

                <ReactModal
                    isOpen={LoadingmodalIsOpen}
                    // onRequestClose={closeModal}
                    className="flex items-center justify-center w-full h-full"
                >
                    <Loader />
                </ReactModal>
            </form>
        </div>
    );
}
