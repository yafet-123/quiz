import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Hero from "../../../../components/Students/answered/Hero"
import { prisma } from '../../../../util/db.server.js'
import { useSession } from "next-auth/react";
import { MainHeader } from '../../../../components/common/MainHeader';
import { VerticalNavbar } from "../../../../components/Teacher/VerticalNavbar";
import { getSession } from "next-auth/react";
import ReactModal from "react-modal";
import Loader from "../../../../components/common/Loading";
import axios from 'axios';

export async function getServerSideProps(context) {
  const {params,req,res,query} = context
  const id = query.id
  const SubjectId = query.subjectId
  const studentId = query.studentId
  const session = await getSession(context);
  const userRole = await session?.user?.role
  if (userRole !== 'teacher') {
    return {
      redirect: {
        destination: '/auth/Teacher/Login/signin-teacher', // Redirect to the error page for unauthorized access
        permanent: false,
      },
    };
  }

  const teacher = await prisma.Teacher.findUnique({
    where:{ teacher_id: Number(session.user.user_id) },
  });

  if (teacher === null) {
    return {
      redirect: {
        destination: '/auth/error',
        permanent: false,
      },
    };
  }

  const student = await prisma.Students.findUnique({
    where:{ students_id: Number(studentId) },
    include:{
      Class:{
        select:{
          ClassName:true
        }
      }
    }
    
  });

  const types = await prisma.QuestionType.findUnique({
    where:{ question_type_id: Number(id) },  
  });

  const type = types.questiontypeName

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
    })
  const questionIds = question.map(data => data.question_id);

  const userAnswers = await prisma.UserAnswer.findMany({
    where: {
      question_id: {
        in: questionIds,
      },
      students_id: Number(student.students_id), // Replace with the actual students_id
      subject_id: Number(SubjectId),   // Replace with the actual subject_id
      question_type_id: Number(id), // Replace with the actual question_type_id
    },
    orderBy: {
      // Specify the column and the order (asc for ascending)
      user_answer_id: 'asc',
    }, 
    include:{
      Question:{
        select:{
          question:true,
          correctAnswer:true,
          answer:true,
          points:true,
          timedisplay:true
        }
      }
    }
  });
  const Allquestion = userAnswers.map((data)=>({
    user_answer_id:data.user_answer_id,
    user_answer:data.user_answer,
    question: data.Question.question,
    correctAnswer: data.Question.correctAnswer,
    answer: data.Question.answer,
    points: data.Question.points,
    timedisplay: data.Question.timedisplay.toISOString(),
  }))
  console.log(userAnswers);

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

  const marks = await prisma.Mark.findMany({
    where:{
      AND: [
        {question_type_id: Number(id)},
        {students_id : Number(student.students_id) },
        {subject_id: Number(SubjectId)},
        {question_type_id: Number(id)},
      ]
    },
  });
  const questionlength = questionCount._count.question_id
  const mark = marks.map((data)=>({
    mark_id:data.mark_id,
    mark:data.mark
  }))

  const classes = student.Class.ClassName
  return {
    props: {
      Allquestion,
      questionlength,
      classes,
      type,
      studentId,
      SubjectId,
      mark
    }, // will be passed to the page component as props
  }
}

const Question = ({Allquestion,questionlength,classes,type,studentId, SubjectId, mark}) => {
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

  function handleChange(newValue) {
      setselected(newValue);
  }
  const { status, data } = useSession();
 
  return (
    <React.Fragment>
      <MainHeader title="MatricMate : Students" />
      <div className="flex bg-[#e6e6e6] pt-10">
        <VerticalNavbar onChange={handleChange} data={data} />
        {Allquestion.length == 0 ? (
          <div className="bg-[#E6E6E6] w-full px-2 lg:px-10 h-full py-20">
            <p className="text-center font-bold text-[#00225F] text-3xl md:text-4xl lg:text-5xl pt-10 mb-5">Sorry No question Are Done.</p>
          </div>
        ) : (
          <div className='bg-[#E6E6E6] w-full px-2 lg:px-10 h-full py-20'>
            <Hero Allquestion={Allquestion} classes={classes} type={type} />
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
                          className={` list-none mb-5 px-[16px] py-4 border-2 border-[#d3d3d3] cursor-pointer rounded-lg
                            ${ question.correctAnswer === answer ? 'text-white bg-[#000925]' : 'hover:bg-[#d8d8d8] hover:text-black'}
                          `}
                        >
                          <span>{answer}</span>
                        </li>
                      ))}
                      <div className="flex flex-col justify-between">
                        <p className="font-bold text-[#00225F] text-lg md:text-xl mb-5">
                          Correct Answer : {question.correctAnswer}
                        </p>

                        <p className="font-bold text-[#00225F] text-lg md:text-xl mb-5">
                          Student Answer : {question.user_answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="bg-white p-5 w-full flex items-center justify-center mt-5">
                  <p className="text-center text-center text-xl font-bold">Mark: {mark[0]?.mark}</p>
                </div>
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