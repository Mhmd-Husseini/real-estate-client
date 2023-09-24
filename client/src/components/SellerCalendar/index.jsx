import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ButtonSm from '../ButtonSm';
import Modal from '../Modal';
import './style.css';
import { sendRequest } from "../../config/request";
import { useLocation } from 'react-router-dom';

const SellerCalendar = ({ seller, booked }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const availableTime = JSON.parse(seller.available_time) || {};
  const location = useLocation();
  const property_id = location.pathname.split('/').pop();
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {setShowModal(true);};
  const closeModal = () => {setShowModal(false);};

  const isDateAvailable = (date) => {
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    if (availableTime[dayName] && availableTime[dayName].start_time && availableTime[dayName].end_time) {
      return true;
    }
    return false;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const renderAvailableTimes = () => {
    if (!selectedDate || !isDateAvailable(selectedDate)) {
      return <p className="text-red-500">No available slots for the selected date</p>;
    }

    const dayName = selectedDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const { start_time, end_time } = availableTime[dayName];
    const startHour = parseInt(start_time.split(':')[0]);
    const endHour = parseInt(end_time.split(':')[0]);
    const hoursArray = [];

    for (let i = startHour; i <= endHour; i++) {
      const hour = `${i.toString().padStart(2, '0')}:00`;
      hoursArray.push(hour);
    }

    const handleReserve = async () => {
      if (selectedDate) {
        if (selectedDate.getHours() === undefined) {
          console.error('No hour selected');
          return;
        }
    
        try {
          const response = await sendRequest({method: "POST",route: `user/bookMeeting`,body: {
              seller_id: seller.id,
              property_id: property_id,
              date: selectedDate.toISOString(), 
            },
          }); 
          openModal()
          console.log(response)    
        } catch (error) {
          console.error('Error reserving meeting:', error);
          
        }
      }
    };

    return (
      <>
        <h3 className="text-lg font-bold text-secondary">Available Times</h3>
        <ul className="mt-2 flex flex-wrap gap-5">
          {hoursArray.map((hour) => {
            const isBooked = booked.some((booking) => {
              const bookingDate = new Date(booking.date);
              return (
                bookingDate.getDate() === selectedDate.getDate() &&
                bookingDate.getHours() === parseInt(hour.split(':')[0])
              );
            });

            if (isBooked) {
              return null; 
            }

            return (
              <li key={hour} className="flex items-center">
                <input type="radio" id={hour} name="selectedHour" value={hour}checked={selectedDate && selectedDate.getHours() === parseInt(hour.split(':')[0])}
                       onChange={() => handleHourChange(hour)} className="mr-2"/>
                <label htmlFor={hour}>{hour}</label>
              </li>
            );
          })}
        </ul>
        <div className="flex justify-center mt-8 mb-2">
          <ButtonSm buttonText="Reserve" onClick={handleReserve} />
        </div>
      </>
    );
  };

  const handleHourChange = (hour) => {
    const newDate = new Date(selectedDate);
    const [hourPart] = hour.split(':');
    newDate.setHours(parseInt(hourPart));
    setSelectedDate(newDate);
  };

  return (
    <div className="w-full">
      <div>
        <Calendar onChange={handleDateChange} value={selectedDate} tileClassName={({ date }) => {
            const isAvailable = isDateAvailable(date);
            return isAvailable ? 'custom-available-style' : 'custom-unavailable-style';
          }}
          minDate={new Date()}
        />
      </div>
      <div className="bg-gray-100 p-4 rounded-lg">
        {renderAvailableTimes()}
      </div>
      {showModal && (<Modal message="Meeting Booked Successfuly" onClose={closeModal} />)}
    </div>
  );
};

export default SellerCalendar;
