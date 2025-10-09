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

export function AddQuestion({Allclasses,Alltypes,Allsubjects,teacherId}) {
    const [LoadingmodalIsOpen, setLoadingModalIsOpen] = useState(false);
    const router = useRouter();
    const { status, data } = useSession();
    const [loading, setLoading] = useState(false);

    const [classId, setClassId] = useState([])
    const [typeId, settypeId] = useState()
    const [subjectId, setsubjectId] = useState()
    const[timedisplay,settimedisplay] = useState("")
    const [error,seterror] = useState("")
    const [typechange , settypechange] = useState(true)
    const UserData = data?.user;
    const uniqueSubjects = [...new Set(Allsubjects.map(subject => subject.SubjectName))].map(SubjectName => {
  		const subject = Allsubjects.find(subject => subject.SubjectName === SubjectName);
  		return {
  		  subject_id: subject.subject_id,
  		  SubjectName: SubjectName
  		};
	});
    async function handleSubmit(values){
    	console.log(subjectId)
 		setLoadingModalIsOpen(true);
        const transformedData = values.questions.map((question) => ({
        	question: question.question,
        	answers: question.answers.map((answer) => answer.answer),
        	correctAnswer: question.correctAnswer,
        	points: question.points,
      	}))    

        const data = await axios.post(`../../api/teacher/addQuestion`,{
            "Question":transformedData,
            "typeId":typeId,
            "classId":classId,
            "subjectId": subjectId,
            "timedisplay": timedisplay,
            "teacherId":teacherId
        }).then(function (response) {
            console.log(response.data);
            router.reload()
            setLoadingModalIsOpen(false);
        }).catch(function (error) {
            seterror("Creating Ai Search Failed")
            setLoading(false)
            setLoadingModalIsOpen(false);
        });
    }

    const handleSelectChangeFortype = (e) => {
        settypeId(e.target.value);
    };

    const handleSelectChangeForsubject = (e) =>{
    	setsubjectId(e.target.value)
    }

    const initialValues = {
    	questions: [
      		{
        		question: '',
        		correctAnswer: '',
        		answers: [''],
        		points: '',
      		},
    	],
  	};

    return (
        <div className="px-0 lg:px-10">
        	<h1 className="text-black text-xl lg:text-4xl font-bold text-center italic my-5">Add Question</h1>
        	<Formik initialValues={initialValues} onSubmit={handleSubmit}>
			    {({ values, handleSubmit }) => (
			        <Form onSubmit={handleSubmit}>
			        	<div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
		                    <Multiselect
		                        displayValue="ClassName"
		                        placeholder = "Class"
		                        className="z-50 mb-5 w-full px-1 lg:px-3 text-md lg:text-xl text-black bg-white py-2 border-2 border-black rounded-xl appearance-none    focus:outline-none focus:ring-0 focus:border-blue-500 peer"
		                        onKeyPressFn={function noRefCheck(){}}
		                        onRemove={function noRefCheck(){}}
		                        onSearch={function noRefCheck(){}}
		                        onSelect={(e)=>{
		                            e.map((data,index)=>(
		                               setClassId([...classId, data.class_id])
		                            ))
		                        }}
		                        options={Allclasses}
		                    />
   
		                    <div className="relative z-0 w-full mb-5">
		                        <select
		                            name="select"
		                            value={typeId}
		                            onChange={handleSelectChangeFortype}
		                            className="py-2 lg:py-4 border-2 border-black rounded-xl block w-full bg-white appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black px-3"
		                        >
		                            <option value="" disabled hidden></option>
		                            { Alltypes.map((data,index)=>(
		                                <option key={inex} value={data.question_type_id} className="text-sm lg:text-lg text-black">{data.questiontypeName}</option>
		                            ))}
		                        </select>
		                        <label
		                            htmlFor="select"
		                            className={`absolute duration-300 top-2 left-0 px-1 -z-1 text-sm lg:text-lg text-black left-2 bg-white ${
		                                typeId ? 'text-xs' : 'text-sm'
		                                } ${typeId ? '-translate-y-full' : 'translate-y-0'} transform origin-0`}
		                        >
		                            Type of Question
		                        </label>
		                        <span className="text-sm text-red-600 hidden" id="error">
		                            Option has to be selected
		                        </span>
		                    </div>

		                    <div className="relative z-0 w-full mb-5">
		                        <select
		                            name="select"
		                            value={subjectId}
		                            onChange={handleSelectChangeForsubject}
		                            className="py-2 lg:py-4 border-2 border-black rounded-xl block w-full bg-white appearance-none z-1 focus:outline-none focus:ring-0 focus:border-black px-3"
		                        >
		                            <option value="" disabled hidden></option>
		                            { uniqueSubjects.map((data,index)=>(
		                                <option key={index} value={data.subject_id} className="text-sm lg:text-xl text-black">{data.SubjectName}</option>
		                            ))}
		                        </select>
		                        <label
		                            htmlFor="select"
		                            className={`absolute duration-300 top-5 left-0 px-1 -z-1 text-sm lg:text-lg text-black left-2 bg-white ${
		                                subjectId ? 'text-xs' : 'text-sm'
		                                } ${subjectId ? '-translate-y-full' : 'translate-y-0'} transform origin-0`}
		                        >
		                           Subject
		                        </label>
		                        <span className="text-sm text-red-600 hidden" id="error">
		                            Option has to be selected
		                        </span>
		                    </div>

		                    <div className="relative mb-5 w-full mb-5">
		                        <input 
		                            id="timedisplay" 
		                            type={typechange ? "text" : "date"} 
		                            required
		                            className="block w-full px-3 text-md lg:text-xl text-black bg-white py-4 border-2 border-black rounded-xl appearance-none   focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
		                            value={timedisplay}
		                            onChange={(e) => settimedisplay(e.target.value)}
		                            onClick = {()=> settypechange(false)}
		                        />
		                        <label 
		                            htmlFor="floating_outlined" 
		                            className="absolute text-md lg:text-lg text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
		                        >
		                            Answered Viewed Date
		                        </label>
		                    </div>
                		</div>

				        <FieldArray name="questions">
				            {({ push, remove }) => (
				              	<div>
					                {values.questions.map((question, questionIndex) => (
					                  	<div key={questionIndex}>
					                    	<label>
					                      		<span className="text-black text-lg lg:text-xl font-bold text-center italic">
					                      			Question {questionIndex + 1}:
					                      		</span>
						                      	<Field
						                        	type="text"
						                        	name={`questions.${questionIndex}.question`}
						                        	className="block w-full px-3 text-sm lg:text-xl text-black bg-white py-2 border-2 border-black rounded-xl appearance-none   focus:outline-none focus:ring-0 focus:border-blue-500 peer" 
						                        	placeholder=" "
						                      	/>
					                    	</label>

					                    	<div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:pl-10 my-5 w-full">
					                    		<label className="w-full lg:pr-5">
						                    		<span className="text-black text-lg lg:text-xl font-bold text-center italic">
									                    points
									                </span>
	                      							
							                      	<Field
							                        	type="text"
							                        	name={`questions.${questionIndex}.points`}
							                        	className="block w-full px-3 text-sm lg:text-xl text-black bg-white py-2 border-2 border-black rounded-xl appearance-none   focus:outline-none focus:ring-0 focus:border-blue-500 peer" 
									                    placeholder=" "
							                      	/>
							                    </label>

						                    	<label className="w-full lg:pl-5">
						                    		<span className="text-black text-lg lg:text-xl font-bold text-center italic">
									                    Correct Answer:
									                </span>
	                      							
							                      	<Field
							                        	type="text"
							                        	name={`questions.${questionIndex}.correctAnswer`}
							                        	className="block w-full px-3 text-sm lg:text-xl text-black bg-white py-2 border-2 border-black rounded-xl appearance-none   focus:outline-none focus:ring-0 focus:border-blue-500 peer" 
									                    placeholder=" "
							                      	/>
							                    </label>
							                </div>

					                    	<FieldArray name={`questions.${questionIndex}.answers`}>
					                      		{({ push: pushAnswer, remove: removeAnswer }) => (
					                        		<div className="lg:pl-10 my-5">
					                          			{question.answers.map((answer, answerIndex) => (
					                            			<div key={answerIndex} className="">
								                              	<label>
								                              		<span className="text-black text-lg lg:text-xl font-bold text-center italic">
								                                		Choice {answerIndex + 1}:
								                                	</span>
								                                	<Field
								                                  		type="text"
								                                  		name={`questions.${questionIndex}.answers.${answerIndex}.answer`}
								                                  		className="block w-full px-3 text-sm lg:text-xl text-black bg-white py-2 border-2 border-black rounded-xl appearance-none   focus:outline-none focus:ring-0 focus:border-blue-500 peer" 
								                                  		placeholder=" "
								                                	/>
								                              	</label>
						                              			<button
						                                			type="button"
						                                			onClick={() => removeAnswer(answerIndex)}
						                                			className="my-2 w-48 bg-red-500 text-white font-bold py-2 px-2 border-b-4 border-red-500 hover:scale-110 duration-1000 ease-in-out rounded"
						                              			>
						                                			Remove Answer
						                              			</button>
					                            			</div>
					                          			))}
					                          			<button
					                            			type="button"
					                            			onClick={() =>
					                              				pushAnswer({ answer: '', correct: false })
					                            			}
					                            			className="my-2 w-48 bg-green-700 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:scale-110 duration-1000 ease-in-out rounded"
					                          			>
					                            			Add Answer
					                          			</button>
					                        		</div>
					                      		)}
					                    	</FieldArray>

					                    	<button
					                      		type="button"
					                      		onClick={() => remove(questionIndex)}
					                      		className="my-2 bg-red-500 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:scale-110 duration-1000 ease-in-out rounded"
					                    	>
					                      		Remove Question
					                    	</button>
					                  	</div>
					                ))}
				                	<button
				                  		type="button"
				                  		onClick={() =>
				                    		push({
				                      			question: '',
				                      			answers: [{ answer: '', correct: false }],
				                    		})
				                  		}
				                  		className="my-2 bg-green-700 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:scale-110 duration-1000 ease-in-out rounded"
				                	>
				                  		Add Question
				                	</button>
				              	</div>
				            )}
				        </FieldArray>

			          	<button 
			          		type="submit"
			          		
                        	className={`mb-5 w-64 float-right text-white font-medium rounded-lg text-xl p-4 text-center flex justify-center items-center 
                            	${loading ? "bg-gray-200" : "bg-[#009688] hover:bg-[#009688] focus:ring-4 focus:ring-[#009688]" }`}
                    	>
                        	Submit
                    	</button>
			        </Form>
			    )}
			</Formik>
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