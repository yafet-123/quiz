// pages/announcements.js
import moment from 'moment';
import React from 'react';

// const announcementsData = [
//   {
//     id: 1,
//     teacher:"yafet",
//     title: 'Important Announcement',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     date: '2024-02-15',
//   },
//   {
//     id: 2,
//     teacher:"yafet",
//     title: 'Important Announcement',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     date: '2024-02-15',
//   },

//   {
//     id: 3,
//     teacher:"yafet",
//     title: 'Important Announcement',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//     date: '2024-02-15',
//   },
// ];

const Announcements = ({announcements}) => {
  return (
    <div className="w-full px-5 bg-white rounded-lg p-8 shadow-md lg:ml-5">
      <h1 className="text-center text-2xl font-bold mb-5">Announcements</h1>
      <ul>
        {announcements.map((announcement) => (
          <li key={announcement.announcement_id} className="p-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent rounded-lg mb-5">
            <div className="flex flex-col lg:flex-row justify-between items-center mb-5">
              <h2 className="text-white text-md font-normal">{announcement.teacherName}</h2>
              <p className="text-white text-md font-normal">
                {moment(announcement.ModifiedDate).utc().format('YYYY-MM-DD')} 
              </p>
            </div>
            <h2 className="text-white text-xl font-bold mb-2">{announcement.title}</h2>
            <p className="text-white text-lg font-semibold">{announcement.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Announcements;
