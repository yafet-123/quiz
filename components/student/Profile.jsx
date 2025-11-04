import React, { useState } from 'react';
import Gravatar from 'react-gravatar';
import moment from 'moment';
import { UpdateProfile } from './UpdateProfile';

const Profile = ({ Allstudents }) => {
  const [updateModalOn, setUpdateModalOn] = useState(false);
  const [updateData, setUpdateData] = useState({});

  const clickedForUpdate = () => {
    setUpdateData({
      students_id: Allstudents.students_id,
      name: Allstudents.name || "",
      schoolName: Allstudents.schoolName || "",
      dateOfBirth: Allstudents.dateOfBirth
        ? moment(Allstudents.dateOfBirth).utc().format('YYYY-MM-DD')
        : "",
      gender: Allstudents.gender || "",
      email: Allstudents.email || "",
    });
    setUpdateModalOn(true);
  };

  return (
    <div className="flex flex-col mb-5 px-5">
      <div className="bg-white rounded-xl p-5 lg:p-8 shadow-lg w-full lg:w-80 text-center border border-gray-100">
        <h1 className="text-center text-2xl font-bold mb-5 text-gray-800">Profile</h1>
        <div className="flex items-center justify-center mb-4">
          <div className="rounded-full overflow-hidden border-4 border-blue-500">
            <Gravatar email={Allstudents.email} size={100} />
          </div>
        </div>

        <div className="mb-4 space-y-1 text-gray-700">
          <h2 className="text-lg font-semibold">{Allstudents.name}</h2>
          <p className="text-sm"><span className="font-bold"> School:</span> {Allstudents.schoolName}</p>
          <p className="text-sm"><span className="font-bold"> Gender:</span> {Allstudents.gender}</p>
          <p className="text-sm">
            <span className="font-bold"> Date of Birth:{" "}</span>
            {Allstudents.dateOfBirth
              ? moment(Allstudents.dateOfBirth).utc().format("YYYY-MM-DD")
              : "N/A"}
          </p>
          <p className="text-sm"><span className="font-bold"> Email:</span> {Allstudents.email}</p>
        </div>

        <button
          onClick={clickedForUpdate}
          className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition duration-200"
        >
          Edit Profile
        </button>
      </div>

      {updateModalOn && (
        <UpdateProfile
          updateData={updateData}
          setUpdateData={setUpdateData}
          setUpdateModalOn={setUpdateModalOn}
        />
      )}
    </div>
  );
};

export default Profile;
