import React from 'react';
import Accordion from '../Accordion';
import Meeting from '../Meeting';

const PeriodMeetings = ({ title, meetings, formatDate }) => {
  return (
    <Accordion title={title}>
      {meetings.length > 0 ? (
        meetings.map((meeting) => (
          <Meeting key={meeting.id} meeting={meeting} formatDate={formatDate} />
        ))
      ) : (
        <p className="text-gray-600 mb-4">No {title.toLowerCase()} meetings</p>
      )}
    </Accordion>
  );
};

export default PeriodMeetings;
