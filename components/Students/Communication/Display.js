import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { useState,useEffect, useContext} from 'react'
import moment from 'moment';
import Gravatar from 'react-gravatar';
import axios from 'axios';
import ReactModal from "react-modal";
import Loader from "../../common/Loading";
import {UpdateCommunication} from './UpdateCommunication'
import {DeleteCommunication} from './DeleteCommunication'

export default function Display({Allcommunications, teacherId, studentId, student}) {
  const router = useRouter();

  const [content, setcontent] = useState()
  const [error , seterror] = useState()
  const [classId,setclassId] = useState()
  const [loading, setLoading] = useState(false);
  const [deletecategoryId,setdeletecategoryId] = useState()
  const [updatecontent, setupdatecontent] = useState()
  const [updatecommunicationId, setupdatecommunicationId] = useState()
  const [deletecommunicationId, setdeletecommunicationId] = useState()
  const [updatemodalOn, setupdateModalOn] = useState(false);
  const [deletemodalOn, setdeleteModalOn] = useState(false);

  const clickedForupdate = () => {
    setupdateModalOn(true)
  }

  const clickedFordelete = () => {
    setdeleteModalOn(true)
  }

  async function handleSubmit(values){
    setLoading(true)
    console.log(content)
    const data = await axios.post(`../../../api/student/addRespond`,{
        "content":content,
        "classId" : classId,
        "studentsId":studentId,
        "teacherId":teacherId
    }).then(function (response) {
      console.log(response.data);
      setLoadingModalIsOpen(false);
      router.push(router.asPath);
    }).catch(function (error) {
      seterror("Creating Respond Failed")
      setLoading(false)
    });
  }

  return (
    <div className="pt-0 pb-20 w-full h-full px-5 lg:px-10 gap-5 ">
      {Allcommunications.map((data,index)=>(
        <div  key={index} className="w-full">
          <div className={`flex items-center space-x-2 mb-5 ${data.isStudent ? "justify-end":"justify-start"}`}>
            { data.isStudent ?
              <div className="rounded-full overflow-hidden">
                <Gravatar email={data.studentemail} size={50} />
              </div>
              :
              <div className="rounded-full overflow-hidden">
                <Gravatar email={data.email} size={50} />
              </div>
            }

            <div className={`${data.isStudent ? "w-3/4 bg-gray-300 text-gray-700 py-3 px-5 rounded-lg" : "w-3/4 bg-blue-500 text-white py-3 px-5 rounded-lg"}`}>
              <div className="flex justify-between items-center my-1">
                <p className={` ${data.isStudent ? "hidden":"flex text-sm lg:text-md"}`}><span className="font-bold"> Title : </span> {data.title}</p>
                <p className="font-bold text-sm lg:text-md">{moment(data.ModifiedDate).utc().format('YYYY-MM-DD')}</p>
              </div>
              <p className="font-normal text-sm lg:text-md"> <span className="font-bold"> Content :</span> {data.content}</p> 
              { data.isStudent ?
                <div key={index} className="flex justify-between items-center mt-1">
                  <button
                    onClick={() => {
                      clickedForupdate()
                      setupdatecontent(data.content)
                      setupdatecommunicationId(data.communication_id)
                    }} 
                    disabled={loading}
                    className="text-md text-blue-500 hover:text-white hover:bg-blue-500 px-2 px-1 font-bold rounded-md"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => { 
                      clickedFordelete()
                      setdeletecategoryId(data.communication_relation_id)
                      setdeletecommunicationId(data.communication_id)
                    }}
                    disabled={loading}
                    className="text-md text-red-500 hover:text-white hover:bg-red-500 px-2 px-1 font-bold rounded-md"
                  >
                    Delete
                  </button>
                </div>
                :
                <div></div>
              }
            </div>
          </div>      
        </div>
      ))}
      <form onSubmit={handleSubmit} className="bg-white p-4 flex items-center rounded-lg">
        <input
          value={content}
          onChange={(e) => setcontent(e.target.value)} 
          type="text" 
          required
          placeholder="Type your message..." 
          className="flex-1 p-2 border rounded-md mr-2" 
        />
        <button
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Send
        </button>
      </form>

        {updatemodalOn && 
          <UpdateCommunication 
            setupdateModalOn={setupdateModalOn} 
            updatecommunicationId={updatecommunicationId} 
            updatecontent={updatecontent} 
            setupdatecontent={setupdatecontent}
          />
        }

        {deletemodalOn && 
          <DeleteCommunication 
            setdeleteModalOn={setdeleteModalOn} 
            deletecommunicationId={deletecommunicationId} 
            deletecategoryId={deletecategoryId} 
          />
        }

      <ReactModal
        isOpen={loading}
                // onRequestClose={closeModal}
        className="flex items-center justify-center w-full h-full"
      >
        <Loader />
      </ReactModal>
    </div>
  );
};