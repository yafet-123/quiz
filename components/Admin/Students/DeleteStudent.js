import axios from 'axios';
import { useRouter } from 'next/router'
import { useState,useEffect, useContext} from 'react'
import Loader from "../../common/Loading";
import ReactModal from "react-modal";

export function DeleteStudent({setdeleteModalOn,deleteuserid}) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [LoadingmodalIsOpen, setLoadingModalIsOpen] = useState(false);
	const handleOKClickFordelete = async() => {
        setLoadingModalIsOpen(true)
        const data = await axios.delete(`../api/student/deleteStudent/${deleteuserid}`,{
        }).then(function (response) {
            console.log(response.data);
            router.reload()
        }).catch(function (error) {
            console.log(error);
            setLoadingModalIsOpen(false)
        });
        setdeleteModalOn(false)
    }

    const handleCancelClickFordelete = () => {
        setdeleteModalOn(false)
    }
	return(
		<div className="bg-gray-200 opacity-90 fixed inset-0 z-50   ">
            <div className="flex h-screen justify-center items-center ">
                <div className="flex-col justify-center bg-white py-24 px-5 lg:px-10 border-4 border-sky-500 rounded-xl ">
                    <div className="flex text-xl text-zinc-600 font-bold mb-10" >Are you sure You want to delete Student ?</div>
                    <div className="flex">
                    	<button 
                            disabled={loading} 
                            onClick={handleOKClickFordelete} 
                            className={`rounded px-4 py-4  ${loading ? "text-black bg-gray-200" : "text-white  bg-green-400 hover:bg-green-600"}`}
                        >
                            Yes
                        </button>
                    	<button onClick={handleCancelClickFordelete} className="rounded px-4 py-4 ml-4 text-white bg-blue-400 hover:bg-blue-600">No</button>
                 	</div>
                    
                </div>
            </div>
            <ReactModal
                isOpen={LoadingmodalIsOpen}
                // onRequestClose={closeModal}
                className="flex items-center justify-center w-full h-full"
            >
                <Loader />
            </ReactModal>
        </div>
	)
}