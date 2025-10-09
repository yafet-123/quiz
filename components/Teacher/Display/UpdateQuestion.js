import axios from 'axios';
import { useRouter } from 'next/router'
import { useState,useEffect, useContext} from 'react'
import Loader from "../../common/Loading";
import ReactModal from "react-modal";

export function UpdateQuestion({
    setupdatequestionid,
    setupdatequestion,
    setupdatecorrectAnswer,
    setupdatepoints,
    setupdatetimedisplay,
    setanswer,
    setupdateModalOn,
    updatequestionid,
    updatequestion,
    updatecorrectAnswer,
    updatepoints,
    updatetimedisplay,
    updateanswer,
}) {
    const router = useRouter();
    const dateTime = new Date(updatetimedisplay);
    const dateOnly = dateTime.toISOString().split('T')[0];
    console.log(dateOnly)
    const [loading, setLoading] = useState(false);
    const [LoadingmodalIsOpen, setLoadingModalIsOpen] = useState(false);
    const handleAnswerChange = (index, value) => {
        const updatedAnswers = [...updateanswer];
        updatedAnswers[index] = value;
        setanswer(updatedAnswers);
    };

	const handleOKClickForupdate = async() => {
        setLoadingModalIsOpen(true)
        const data = await axios.patch(`../../api/question/updateQuestion/${updatequestionid}`,{
            "updatequestion": updatequestion,
            "updatecorrectAnswer": updatecorrectAnswer,
            "updatepoints":updatepoints,
            "updatetimedisplay":updatetimedisplay,
            "updateanswer":updateanswer
        }).then(function (response) {
            console.log(response.data);
            router.reload()
        }).catch(function (error) {
            console.log(error);
            setLoadingModalIsOpen(false)
        });
        setupdateModalOn(false)
        console.log(updateanswer)
       
    }

    const handleCancelClickForupdate = () => {
        setupdateModalOn(false)
    }

	return(
		<div className="bg-gray-200 opacity-95 fixed inset-0 z-50   ">
            <div className="flex h-screen justify-center items-center ">
                <div className="flex-col justify-center bg-white py-24 px-5 lg:px-10 border-4 border-sky-500 rounded-xl ">
                    <div className="flex text-center text-xl text-zinc-600 font-bold mb-10" >Update Question</div>
                    <div className="flex flex-col justify-between items-center w-full">
                        <div className="relative mb-10 w-full">
                            <input 
                                id="Question" 
                                type="text" 
                                className="block w-full px-3 text-xl text-black bg-transparent py-4 border-2 border-black rounded-xl appearance-none   focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                                value={updatequestion}
                                onChange={(e) => setupdatequestion(e.target.value)}
                            />
                            <label 
                                htmlFor="floating_outlined" 
                                className="absolute text-2xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                            >
                                Question
                            </label>
                        </div>
                    

                        <div className="flex justify-between items-center gap-5 w-full">
                            <div className="relative mb-10">
                                <input 
                                    id="Question" 
                                    type="text" 
                                    className="block w-full px-3 text-xl text-black bg-transparent py-4 border-2 border-black rounded-xl appearance-none   focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                                    value={updatepoints}
                                    onChange={(e) => setupdatepoints(e.target.value)}
                                />
                                <label 
                                    htmlFor="floating_outlined" 
                                    className="absolute text-2xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                                >
                                    Points
                                </label>
                            </div>

                            <div className="relative mb-10">
                                <input 
                                    id="CorrectAnswer" 
                                    type="text" 
                                    className="block w-full px-3 text-xl text-black bg-transparent py-4 border-2 border-black rounded-xl appearance-none   focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                                    value={updatecorrectAnswer}
                                    onChange={(e) => setupdatecorrectAnswer(e.target.value)}
                                />
                                <label 
                                    htmlFor="floating_outlined" 
                                    className="absolute text-2xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                                >
                                    Correct Answer
                                </label>
                            </div>
                            <div className="relative mb-10">
                                <input 
                                    id="timedisplay" 
                                    type="date"
                                    required
                                    className="block w-full px-3 text-xl text-black bg-transparent py-4 border-2 border-black rounded-xl appearance-none   focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                                    value={dateOnly}
                                    onChange={(e) => setupdatetimedisplay(e.target.value)}
                                />
                                <label 
                                    htmlFor="floating_outlined" 
                                    className="absolute text-md lg:text-lg text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                                >
                                    Date
                                </label>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between w-full mx-5">
                            {updateanswer.map((answer,index)=>(
                                <div
                                 key={index} 
                                className="relative mb-10 mx-5">
                                    <input 
                                        id="choose" 
                                        type="text" 
                                        className="block w-full px-3 text-xl text-black bg-transparent py-4 border-2 border-black rounded-xl appearance-none   focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                                        value={answer}
                                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                                    />
                                    <label 
                                        htmlFor="floating_outlined" 
                                        className="absolute text-2xl text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                                    >
                                        Correct Answer
                                    </label>
                                </div>
                            ))}
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