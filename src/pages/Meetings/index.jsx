import React, { useState } from 'react';
import { sendRequest } from "../../config/request";
import { useSelector } from "react-redux";
import ButtonSm from '../../components/ButtonSm';

const Meetings = () => {
  const [availableDays, setAvailableDays] = useState({
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
  });

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const token = useSelector((state) => state.auth.token);

  const handleDayChange = (day) => {
    setAvailableDays({ ...availableDays, [day]: !availableDays[day] });
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedDays = Object.keys(availableDays).filter((day) => availableDays[day]);
    const availableTime = JSON.stringify({days:selectedDays,start_time:startTime,end_time:endTime});

    try {
      const response = await sendRequest({ method: "POST", route: `user/setAvailable`, body:{ available_time: availableTime }, token });

      console.log(response);
    } catch (error) {
      console.error('Error updating available time:', error);
    }
  };

  return (
    <div className='text-lg text-gray-800 font-medium leading-9 max-w-2xl ml-20 '>
      <h2 className='text-3xl text-gray-800 font-medium leading-9 '>Set your availability</h2>
      <div className='w-36 h-1.5 bg-gradient-to-r from-primary to-black mb-5 mt-3'>
      </div>
      <div>
        <label className='text-xl text-secondary font-semibold'>Available hours:</label>
        <div>
          <select value={startTime} onChange={handleStartTimeChange}>
            {Array.from({ length: 24 }, (_, i) => {
              const hour = String(i).padStart(2, '0');
              return <option key={hour} value={`${hour}:00`}>{`${hour}:00`}</option>;
            })}
          </select>
          <span> — </span>
          <select value={endTime} onChange={handleEndTimeChange}>
            {Array.from({ length: 24 }, (_, i) => {
              const hour = String(i).padStart(2, '0');
              return <option key={hour} value={`${hour}:00`}>{`${hour}:00`}</option>;
            })}
          </select>
        </div>
      </div>

      <div>
        <label className='text-xl text-secondary font-semibold'>Available days:</label>
        <div className='flex gap-4 text-lg font-semibold'>
          {Object.entries(availableDays).map(([day, isChecked]) => (
            <label key={day}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleDayChange(day)}
              />
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </label>
          ))}
        </div>
      </div>
      <div className='mt-6'> 
        <ButtonSm onClick={handleSubmit} buttonText='Save' />
      </div>      
    </div>
  );
};

export default Meetings;
