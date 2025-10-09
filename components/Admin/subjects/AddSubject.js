import React from "react";
import { useState,useEffect, useContext} from 'react'
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/router'
import {FiEye, FiEyeOff} from 'react-icons/fi'
import Loader from "../../common/Loading";
import ReactModal from "react-modal";
import { useSession } from "next-auth/react";

export function AddSubject() {
    const [LoadingmodalIsOpen, setLoadingModalIsOpen] = useState(false);
    const router = useRouter();
    const { status, data } = useSession();
    const [loading, setLoading] = useState(false);
    const [SubjectName, setSubjectName] =useState("")
    const [error,seterror] = useState("")
    const UserData = data?.user;
    async function register(e){
        e.preventDefault();
        seterror("")
        setLoadingModalIsOpen(true);
        const data = await axios.post(`../../api/subject/Add`,{
            'SubjectName':SubjectName,
            "user_id": UserData.user_id,
        }).then(function (response) {
            console.log(response.data);
            router.reload()
            setLoadingModalIsOpen(false);
        }).catch(function (error) {
            console.log(error)
            seterror("Creating subject failed due to username is still exist or network error")
            setLoadingModalIsOpen(false);
        });
    }
                

    return (
        <div className="px-0 lg:px-10 pt-20">
            <form className="max-w-7xl mx-auto mt-20" onSubmit={register} >
                <h1 className="text-black text-xl lg:text-4xl font-bold text-center italic my-5">Subject</h1>

                <div className="relative flex-1 my-5">
                    <input 
                        id="subject" 
                        type="text" 
                        required
                        className="block w-full px-3 text-md lg:text-xl text-black bg-white py-4 border-2 border-black rounded-xl appearance-none   focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                        value={SubjectName}
                        onChange={(e) => setSubjectName(e.target.value)}
                    />
                    <label 
                        htmlFor="floating_outlined" 
                        className="absolute text-md lg:text-xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                        subject Name
                    </label>
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
