import React, { useState } from 'react';
import { sendRequest } from "../../config/request";
import ButtonSm from '../../components/ButtonSm';
import Meetings from '../../components/Meetings';
import Modal from "../../components/Modal";

const Schedule = () => {
  const [availability, setAvailability] = useState({sunday: { start_time: '', end_time: '' },monday: { start_time: '', end_time: '' },tuesday: { start_time: '', end_time: '' },
    wednesday: { start_time: '', end_time: '' },thursday: { start_time: '', end_time: '' },friday: { start_time: '', end_time: '' },saturday: { start_time: '', end_time: '' },});
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {setShowModal(true);};
  const closeModal = () => {setShowModal(false);};
  const handleStartTimeChange = (day, value) => {
    setAvailability({ ...availability, [day]: { ...availability[day], start_time: value } });
  };
  const handleEndTimeChange = (day, value) => {
    setAvailability({ ...availability, [day]: { ...availability[day], end_time: value } });
  };

  const handleSubmit = async () => {
    const availableTime = JSON.stringify(availability);
    try {
      const response = await sendRequest({ method: "POST", route: `user/setAvailable`, body: { available_time: availableTime }});
      openModal()
    } catch (error) {
      console.error('Error updating available time:', error);
    }
  };

  return (
    <div className='md:flex md:gap-40'>
      <div className="text-lg text-gray-800 font-medium leading-9 max-w-2xl md:ml-20">
        <h2 className="text-3xl text-gray-800 font-medium leading-9">Set your availability</h2>
        <div className="w-36 h-1.5 bg-gradient-to-r from-primary to-black mb-5 mt-3"></div>
        <div className='mt-10'>
          {Object.keys(availability).map((day) => (
            <div key={day} className="mb-4 flex items-center">
              <p className="w-32">{day.charAt(0).toUpperCase() + day.slice(1)}:</p>
              <select value={availability[day].start_time} onChange={(e) => handleStartTimeChange(day, e.target.value)} className="w-24">
                {Array.from({ length: 24 }, (_, i) => {
                  const hour = String(i).padStart(2, '0');
                  return (
                    <option key={hour} value={`${hour}:00`}>{`${hour}:00`}</option>
                  );
                })}
              </select>
              <span className="mx-2">—</span>
              <select value={availability[day].end_time} onChange={(e) => handleEndTimeChange(day, e.target.value)} className="w-24" >
                {Array.from({ length: 24 }, (_, i) => {
                  const hour = String(i).padStart(2, '0');
                  return (
                    <option key={hour} value={`${hour}:00`}>{`${hour}:00`}</option>
                  );
                })}
              </select>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <ButtonSm onClick={handleSubmit} buttonText="Save" />
        </div>
      </div>
      <div className='mt-10 md:mt-0'>
        <h2 className="text-3xl text-gray-800 font-medium leading-9">Your Meetings</h2>
        <div className="w-36 h-1.5 bg-gradient-to-r from-primary to-black mb-5 mt-3"></div>
        <Meetings />
      </div>
      {showModal && (<Modal message="Available Time Set Successfuly" onClose={closeModal} />)}
    </div>
  );
};

export default Schedule;
