import React, { useState } from 'react';
import { sendRequest } from "../../config/request";
import { useSelector } from "react-redux";

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
    <div>
      <h2>Set your availability</h2>
      <p>Let Calendly know when you’re typically available to accept meetings.</p>

      <div>
        <label>Available hours</label>
        <div>
          <select value={startTime} onChange={handleStartTimeChange}>
            {Array.from({ length: 24 }, (_, i) => {
              const hour = String(i).padStart(2, '0');
              return <option key={hour} value={`${hour}:00`}>{`${hour}:00`}</option>;
            })}
          </select>
          <span>—</span>
          <select value={endTime} onChange={handleEndTimeChange}>
            {Array.from({ length: 24 }, (_, i) => {
              const hour = String(i).padStart(2, '0');
              return <option key={hour} value={`${hour}:00`}>{`${hour}:00`}</option>;
            })}
          </select>
        </div>
      </div>

      <div>
        <label>Available days</label>
        <div>
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

      <button type="submit" onClick={handleSubmit}>Save</button>
    </div>
  );
};

export default Meetings;
