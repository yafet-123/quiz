import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Gravatar from 'react-gravatar';
import {UpdateProfile} from './UpdateProfile'

const Profile = ({Allteachers}) => {
  const [updatemodalOn, setupdateModalOn] = useState(false);
  const [updateteacherid,setupdateteacherid] = useState()
  const [updatefirstName,setupdatefirstName] = useState()
  const [updatelastName,setupdatelastName] = useState()
  const [updateage,setupdateage] = useState("")
  const [updateUserName,setupdateUserName] = useState("")
  const [updateemail,setupdateemail] = useState("")

  const clickedForupdate = () => {
    setupdateModalOn(true)
  }
  return (
    <div className="flex flex-col mb-5">      
      <div className="bg-white rounded-lg p-8 shadow-md w-80 text-center">
        <h1 className="text-center text-2xl font-bold mb-5">Profile</h1>
        <div className="flex items-center justify-center">
          <div className="rounded-full overflow-hidden">
            <Gravatar email={Allteachers.email} size={100} />
          </div>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">{Allteachers.firstName} {Allteachers.lastName}</h2>
          <h2 className="text-lg font-semibold">UserName : {Allteachers.UserName}</h2>
          <p className="text-gray-500">Age: {Allteachers.age}</p>
          <p className="text-gray-500">Email: {Allteachers.email}</p>
        </div>

        <button 
          onClick={() => {
            clickedForupdate()
            setupdateteacherid(Allteachers.teacher_id)
            setupdatefirstName(Allteachers.firstName)
            setupdatelastName(Allteachers.lastName)
            setupdateage(Allteachers.age)
            setupdateUserName(Allteachers.UserName)
            setupdateemail(Allteachers.email)
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
        >
          Edit Profile
        </button>
      </div>
      {updatemodalOn && 
        <UpdateProfile
          updateteacherid={updateteacherid} 
          updatefirstName={updatefirstName}
          updatelastName={updatelastName}
          updateage={updateage}
          updateUserName={updateUserName}
          updateemail={updateemail}
          setupdateModalOn={setupdateModalOn}
          setupdatefirstName={setupdatefirstName}
          setupdatelastName={setupdatelastName}
          setupdateage={setupdateage}
          setupdateUserName={setupdateUserName}
          setupdateemail={setupdateemail}
        />
      }
    </div>

    
  );
};

export default Profile;
