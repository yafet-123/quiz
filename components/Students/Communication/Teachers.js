import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import Gravatar from 'react-gravatar';

export default function Teachers({Allteachers}) {
  const router = useRouter();

  function handleGoToCommunication(id){
    router.push(`/Students/Communication/Teacher/${id}`)
  }
  return (
    <div className="pt-0 pb-20 w-full h-full px-5 lg:px-10 gap-5 ">
      {Allteachers.map((data,index)=>(
        <div key={index} className="flex-1 overflow-x-hidden overflow-y-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <button
                onClick={()=> handleGoToCommunication(data.teacher_id)} 
                className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4"
              >
                  <div className="rounded-full overflow-hidden">
                    <Gravatar email={data.email} size={50} />
                  </div>                  
                  <div>
                      <h3 className="text-lg font-semibold">{data.name}</h3>
                  </div>
              </button>
          </div>
      </div>
      ))}
    </div>
  );
};