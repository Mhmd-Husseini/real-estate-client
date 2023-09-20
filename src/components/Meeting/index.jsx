import React, { useEffect, useState } from 'react';
import { sendRequest } from '../../config/request';

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

  return (
<div className="bg-white rounded-lg shadow-md p-6">
  {loading ? (
    <p></p>
  ) : error ? (
    <p className="text-center text-gray-600">No Available Meetings</p>
  ) : (
    <ul className="divide-y divide-gray-300">
      {meetings.map((meeting) => (
        <li key={meeting.id} className="py-4 flex flex-col justify-center items-center">
          <div className='flex mb-5'>
            <div className="mb-2">
              <p className="text-lg font-semibold">
                Seller: {meeting.seller.name}
              </p>
              <p className="text-sm text-gray-600">
                Phone: {meeting.seller.phone}
              </p>
            </div>
            <div className="mb-2 ml-8">
              <p className="text-lg font-semibold">
                Buyer: {meeting.buyer.name}
              </p>
              <p className="text-sm text-gray-600">
                Phone: {meeting.buyer.phone}
              </p>
            </div>
          </div>
          <div className="mb-5">
            <p className="text-lg font-semibold">
              Property: {meeting.property.title}
            </p>
            <p className="text-sm text-gray-600">
              Price: {meeting.property.price}
            </p>
            <p className="text-sm text-gray-600">
              Address: {meeting.property.address}
            </p>
          </div>
          <div>
            <p className="text-lg font-semibold">Date: {meeting.date}</p>
          </div>
        </li>
      ))}
    </ul>
  )}
</div>

  );
};

export default Meeting;
