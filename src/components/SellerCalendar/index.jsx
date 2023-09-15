import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const SellerCalendar = ({ seller }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const availableTime = JSON.parse(seller.available_time);
  const { days } = availableTime;

  const isDateAvailable = (date) => {
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    return days.includes(dayName);
  };

  const isWeekend = (date) => {
    const dayNumber = date.getDay(); 
    return dayNumber === 0 || dayNumber === 6; 
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
        <div className='w-full'>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileClassName={({ date }) =>
              isWeekend(date)
                ? 'text-black bg-red-500'
                : isDateAvailable(date)
                ? 'bg-primary text-gray-700'
                : 'bg-red-500 text-gray-700'
            }
          />
        </div>
        <div className=" bg-gray-100 p-4 rounded-lg"> 
          {selectedDate && isDateAvailable(selectedDate) && (
            <>
              <h3 className="text-lg font-semibold">Available Times</h3>
              <ul className="mt-2">
                <li>{availableTime.start_time} - {availableTime.end_time}</li>
              </ul>
            </>
          )}
          {(!selectedDate || !isDateAvailable(selectedDate)) && (
            <p className="text-red-500">No available slots for the selected date.</p>
          )}
        </div>
    </div>
  );
};

export default SellerCalendar;
