import React, { useState } from 'react';
import { sendRequest } from "../../config/request";
import { useSelector } from "react-redux";
import ButtonSm from '../../components/ButtonSm';

const Meetings = () => {
  const [availability, setAvailability] = useState({
    sunday: { start_time: '', end_time: '' },
    monday: { start_time: '', end_time: '' },
    tuesday: { start_time: '', end_time: '' },
    wednesday: { start_time: '', end_time: '' },
    thursday: { start_time: '', end_time: '' },
    friday: { start_time: '', end_time: '' },
    saturday: { start_time: '', end_time: '' },
  });

  const token = useSelector((state) => state.auth.token);

  const handleStartTimeChange = (day, value) => {
    setAvailability({ ...availability, [day]: { ...availability[day], start_time: value } });
  };

  const handleEndTimeChange = (day, value) => {
    setAvailability({ ...availability, [day]: { ...availability[day], end_time: value } });
  };

  const handleSubmit = async () => {
    const availableTime = JSON.stringify(availability);

    try {
      const response = await sendRequest({ method: "POST", route: `user/setAvailable`, body: { available_time: availableTime }, token });

      console.log(response);
    } catch (error) {
      console.error('Error updating available time:', error);
    }
  };

  return (
    <div className='text-lg text-gray-800 font-medium leading-9 max-w-2xl ml-20 '>
      <h2 className='text-3xl text-gray-800 font-medium leading-9 '>Set your availability</h2>
      <div className='w-36 h-1.5 bg-gradient-to-r from-primary to-black mb-5 mt-3'></div>
      <div>
        <label className='text-xl text-secondary font-semibold'>Available hours:</label>
        {Object.keys(availability).map((day) => (
          <div key={day}>
            {day.charAt(0).toUpperCase() + day.slice(1)}:
            <select
              value={availability[day].start_time}
              onChange={(e) => handleStartTimeChange(day, e.target.value)}
            >
              {Array.from({ length: 24 }, (_, i) => {
                const hour = String(i).padStart(2, '0');
                return <option key={hour} value={`${hour}:00`}>{`${hour}:00`}</option>;
              })}
            </select>
            <span> — </span>
            <select
              value={availability[day].end_time}
              onChange={(e) => handleEndTimeChange(day, e.target.value)}
            >
              {Array.from({ length: 24 }, (_, i) => {
                const hour = String(i).padStart(2, '0');
                return <option key={hour} value={`${hour}:00`}>{`${hour}:00`}</option>;
              })}
            </select>
          </div>
        ))}
      </div>
      <div className='mt-6'>
        <ButtonSm onClick={handleSubmit} buttonText='Save' />
      </div>
    </div>
  );
};

export default Meetings;
