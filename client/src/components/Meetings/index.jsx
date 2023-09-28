import React, { useEffect, useState } from 'react';
import { sendRequest } from '../../config/request';
import { format, isToday, isTomorrow } from 'date-fns';
import PeriodMeetings from '../PeriodMeetings'; 

const Meeting = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await sendRequest({ method: 'GET', route: 'user/meetings' });
        setMeetings(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching meeting data:', error);
        setError('An error occurred while fetching meetings.');
        setLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  const formatDate = (date) => {
    return format(new Date(date), 'EEEE, MMMM do yyyy');
  };

  const pastMeetings = [];
  const todayMeetings = [];
  const tomorrowMeetings = [];
  const laterMeetings = [];

  if (!loading && !error) {
    const currentDate = new Date();

    meetings.forEach((meeting) => {
      const meetingDate = new Date(meeting.date);
      if (meetingDate < currentDate) {
        pastMeetings.push(meeting);
      } else if (isToday(meetingDate)) {
        todayMeetings.push(meeting);
      } else if (isTomorrow(meetingDate)) {
        tomorrowMeetings.push(meeting);
      } else {
        laterMeetings.push(meeting);
      }
    });
  }

  return (
    <div className="rounded-lg mt-10">
      <PeriodMeetings title="Past " meetings={pastMeetings} formatDate={formatDate} />
      <PeriodMeetings title="Today's " meetings={todayMeetings} formatDate={formatDate} />
      <PeriodMeetings title="Tomorrow's " meetings={tomorrowMeetings} formatDate={formatDate} />
      <PeriodMeetings title="Later " meetings={laterMeetings} formatDate={formatDate} />
    </div>
  );
};

export default Meeting;
