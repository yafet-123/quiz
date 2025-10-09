import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = ({serverdate}) => {
  const [date, setDate] = useState(serverdate);

  const onChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="bg-white rounded-lg lg:p-8 shadow-md mx-5 ">
      <h1 className="text-center text-2xl font-bold mb-5">Calender</h1>
      <Calendar onChange={onChange} value={date} />
    </div>
  );
};

export default MyCalendar;
