import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Hero from "../../../components/Students/question/Hero"
import { prisma } from '../../../util/db.server.js'
import { useSession } from "next-auth/react";
import { MainHeader } from '../../../components/common/MainHeader';
import { VerticalNavbar } from "../../../components/Students/VerticalNavbar";
import { getSession } from "next-auth/react";
import ReactModal from "react-modal";
import Loader from "../../../components/common/Loading";
import axios from 'axios';
import moment from 'moment';

export async function getServerSideProps(context) {
  const {params,req,res,query} = context
  const id = query.id
  const SubjectId = query.subjectId

  const session = await getSession(context);
  const userRole = await session?.user?.role
  if (userRole !== 'student') {
    return {
      redirect: {
        destination: '/auth/Student/Login/signin-student', // Redirect to the error page for unauthorized access
        permanent: false,
      },
    };
  }
  const studentId = session.user.user_id
  const student = await prisma.Students.findUnique({
    where:{ students_id: Number(session.user.user_id) },
    include:{
      Class:{
        select:{
          ClassName:true
        }
      }
    }
    
  });
  if (student === null) {
    return {
      redirect: {
        destination: '/auth/error',
        permanent: false,
      },
    };
  }

  const types = await prisma.QuestionType.findUnique({
    where:{ question_type_id: Number(id) },  
  });

  const type = types.questiontypeName

  const hasUserAnswered = await prisma.UserAnswer.findFirst({
    where: {
        students_id: Number(session.user.user_id),
        question_type_id: Number(id),
        subject_id: Number(SubjectId),
    },
  });

  console.log(hasUserAnswered)

  if (hasUserAnswered) {
    // Redirect or handle the case where the user has already answered questions
    return {
      redirect: {
        destination: '/Students/question/answed', // Replace with the path you want to redirect to
        permanent: false,
      },
    };
  }

  const question = await prisma.Question.findMany({
      where:{
        AND: [
          {
            ClassQuestion:{
              some: {
                class_id: Number(student.class_id)
              },
            }
          },
          {question_type_id: Number(id)},
          {subject_id: Number(SubjectId),}
        ]
      },
      orderBy: {
        // Specify the column and the order (asc for ascending)
        question_id: 'asc'
      },
      include:{
        Subject:{
          select:{
            SubjectName: true,
          }
        }
      }
    })

  let redirectToAnswered = false;
  const filteredQuestions = [];
  question.filter((ques) => {
    // Customize the comparison logic based on your requirements
    const currentDate = new Date();
    const timedisplayDate = new Date(ques.timedisplay);
    console.log(timedisplayDate)
    const isConditionSatisfied = currentDate > timedisplayDate;
    console.log(isConditionSatisfied)
    if (isConditionSatisfied) {
      redirectToAnswered = true;
      filteredQuestions.push(ques);
    }

    return isConditionSatisfied; // Include the question in the filtered array if the condition is true
  });

  if (redirectToAnswered) {
    return {
      redirect: {
        destination: '/Students/question/timePassedQuestions', // Replace with the path you want to redirect to
        permanent: false,
      },
    };
  }

  const questionCount = await prisma.Question.aggregate({
    where:{
      AND: [
        {
          ClassQuestion:{
            some: {
              class_id: Number(student.class_id)
            },
          }
        },
        {question_type_id: Number(id)},
        {subject_id: Number(SubjectId),}
      ]
    },
    _count: {
      question_id: true // Assuming question_id is the primary key of your Question model
    }
  });
  const Allquestion = question.map((data)=>({
    question_id:data.question_id,
    question:data.question,
    points:data.points,
    timedisplay: data.timedisplay.toISOString(),
    answer:data.answer || null
  }))
  const questionlength = questionCount._count.question_id
  const classes = student.Class.ClassName

  return {
    props: {
      Allquestion,
      questionlength,
      classes,
      type,
      studentId,
      SubjectId
    }, // will be passed to the page component as props
  }
}

const Question = ({Allquestion,questionlength,classes,type,studentId, SubjectId}) => {
  const router = useRouter();
  const id = router.query.id;
  const [LoadingmodalIsOpen, setLoadingModalIsOpen] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [totalscore, settotalscore] = useState(0)
  const [error,seterror] = useState("")
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const onAnswerSelected = (answer, question_id, points) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [question_id]: {
        answer,
        question_id,
        points,

      },
    }));
  };

  const allQuestionsAnswered = Allquestion.every((question) => {
    const isAnswered = selectedAnswers.hasOwnProperty(question.question_id);
    console.log(`Question ${question.question_id} answered: ${isAnswered}`);
    return isAnswered;
  });
 
  async function calculateScore (e){
    e.preventDefault();
    const selectedAnswersArray = await Object.values(selectedAnswers);
    setLoadingModalIsOpen(true);
    const data = await axios.post(`../../api/answer/check`,{
      'selectedAnswers':selectedAnswersArray,
      'id': id,
      'studentId':studentId,
      'SubjectId':SubjectId
    }).then(function (response) {
      console.log(response.data);
      setLoadingModalIsOpen(false);
      router.reload()
    }).catch(function (error) {
        console.log(error)
        seterror("Creating Class failed due to username is still exist or network error")
        setLoadingModalIsOpen(false);
    });
  };

  function handleChange(newValue) {
      setselected(newValue);
  }

  function handleReturn(){
    router.push('/Students/question/subject')
  }

  const { status, data } = useSession();
  console.log(type)
  return (
    <React.Fragment>
      <MainHeader title="MatricMate : Students" />
      <div className="flex bg-[#e6e6e6] pt-10">
        <VerticalNavbar onChange={handleChange} data={data} />
        {Allquestion.length == 0 ? (
          <div className="bg-[#E6E6E6] w-full px-2 lg:px-10 h-full py-20 flex flex-col justify-center items-center">
            <p className="text-center font-bold text-[#00225F] text-3xl md:text-3xl lg:text-4xl pt-10 mb-5 leading-10">
              {`We're working hard to bring you more engaging questions! Unfortunately, there are no questions available at the moment. 
              Please check back later for new content.`}
            </p>
            <button
              onClick={handleReturn} 
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent text-white px-10 py-2 rounded-xl">
              Return
            </button>
          </div>
        ) : (
          <div className='bg-[#E6E6E6] w-full px-2 lg:px-10 h-full py-20'>
            <Hero Allquestion={Allquestion} classes={classes} type={type} />
            <p className="font-bold text-[#00225F] text-center text-xl md:text-2xl px-2 lg:px-16 pt-10">
              This Question will be hide <span className="text-red-700">{moment(Allquestion[0].timedisplay).utc().format('YYYY-MMMM-DD')} </span> 
              and answer will be visible
            </p>
            <div className="lg:px-16">
                {Allquestion.map((question, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="py-5">
                      <h2 className={`font-bold text-[#00225F] text-lg md:text-xl ${!showResult ? "flex" : "hidden"}`}>
                        Question: {index + 1}
                        <span>/{questionlength}</span>
                      </h2>
                    </div>
                    <div className='bg-[#f8f8f8] p-[1rem] mt-[1rem] rounded-xl' key={index}>
                      <div className="flex justify-between items-center">
                        <h3 className={` font-bold w-3/4 text-[#00225F] text-lg md:text-xl mb-5 `}>
                          {question.question}
                        </h3>
                        <p className="font-bold text-[#00225F] text-lg md:text-xl mb-5">
                          {question.points} point
                        </p>
                      </div>
                      {question.answer.map((answer, idx) => (
                        <li
                          key={idx}
                          onClick={() => onAnswerSelected(answer, question.question_id, question.points)}
                          className={` list-none mb-5 px-[16px] py-4 border-2 border-[#d3d3d3] cursor-pointer rounded-lg
                            ${ selectedAnswers[question.question_id] && selectedAnswers[question.question_id].answer === answer ? 'text-white bg-[#000925]' : 'hover:bg-[#d8d8d8] hover:text-black'}
                          `}
                        >
                          <span>{answer}</span>
                        </li>
                      ))}
                    </div>
                  </div>
                ))}

                <button 
                  onClick={calculateScore} 
                  disabled={!allQuestionsAnswered}
                  className={`px-[20px] text-[#f8f8f8] text-base w-full px-[16px] py-[12px] mt-[12px] rounded-xl cursor-pointer bg-[#808080]
                    ${ allQuestionsAnswered ? 'text-white bg-black' : 'hover:bg-[#d8d8d8] hover:text-black'}
                  `}
                >
                  Submit
                </button>
            </div>
          </div>
        )}
        <ReactModal
          isOpen={LoadingmodalIsOpen}
          // onRequestClose={closeModal}
          className="flex items-center justify-center w-full h-full"
        >
            <Loader />
        </ReactModal>
      </div>
    </React.Fragment>
  );
};

export default Question;