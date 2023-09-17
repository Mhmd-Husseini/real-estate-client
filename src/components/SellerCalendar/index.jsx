import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ButtonSm from '../ButtonSm';
import './style.css';

const SellerCalendar = ({ seller }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const availableTime = JSON.parse(seller.available_time) || {
    days: [], 
    start_time: '',
    end_time: '',
  };

  const { days, start_time, end_time } = availableTime;
  const isDateAvailable = (date) => {
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    return days.includes(dayName);
  };

  const checkIfDateIsAvailable = (date) => {
    if (!isDateAvailable(date)) {
      return false;
    }

    const selectedDateString = date.toISOString().split('T')[0];

    if (
      selectedDateString >= seller.start_date &&
      selectedDateString <= seller.end_date
    ) {
      if (!selectedHour) {
        return true;
      }

      const selectedHourNumber = parseInt(selectedHour.split(':')[0], 10);
      const startHourNumber = parseInt(start_time.split(':')[0], 10);
      const endHourNumber = parseInt(end_time.split(':')[0], 10);

      return (
        selectedHourNumber >= startHourNumber &&
        selectedHourNumber <= endHourNumber
      );
    }
    return false;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedHour(null);
  };

  const handleHourChange = (hour) => {
    setSelectedHour(hour);
  };

  const generateHoursArray = () => {
    const start = parseInt(start_time.split(':')[0], 10);
    const end = parseInt(end_time.split(':')[0], 10);
    const hoursArray = [];

    for (let i = start; i <= end; i++) {
      const hour = `${i.toString().padStart(2, '0')}:00`;
      hoursArray.push(hour);
    }

    return hoursArray;
  };

  const hoursArray = generateHoursArray();
  const hasAvailableTime = days.length > 0 && start_time && end_time;

  return (
    <div className="w-full">
      <div>
        {hasAvailableTime ? (
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileClassName={({ date }) => {
              const isAvailable = checkIfDateIsAvailable(date);
              return isAvailable ? 'custom-available-style' : 'custom-unavailable-style';
            }}
            minDate={new Date()} 
          />
        ) : (
          <p className="text-red-500">Seller has no available time, try to contact him.</p>
        )}
      </div>
      {hasAvailableTime && (
        <div className="bg-gray-100 p-4 rounded-lg">
          {selectedDate && isDateAvailable(selectedDate) && (
            <>
              <h3 className="text-lg font-bold text-secondary">Available Times</h3>
              <ul className="mt-2 flex flex-wrap gap-5">
                {hoursArray.map((hour) => (
                  <li key={hour} className="flex items-center">
                    <input
                      type="radio"
                      id={hour}
                      name="selectedHour"
                      value={hour}
                      checked={selectedHour === hour}
                      onChange={() => handleHourChange(hour)}
                      className="mr-2"
                    />
                    <label htmlFor={hour}>{hour}</label>
                  </li>
                ))}
              </ul>
              <div className="flex justify-center mt-8 mb-2">
                <ButtonSm buttonText="Reserve" />
              </div>
            </>
          )}
          {(!selectedDate || !isDateAvailable(selectedDate)) && (
            <p className="text-red-500">
              No available slots for the selected date.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SellerCalendar;
