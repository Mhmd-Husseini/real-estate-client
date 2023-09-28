import React from 'react';
import { format } from 'date-fns';

const Meeting = ({ meeting, formatDate }) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg font-semibold shadow-md mb-4">
      <div className="text-lg font-bold text-secondary mb-2">{meeting.property.title}</div>
      <div className="text-gray-700 mb-2">
        Seller: {meeting.seller.name} ({meeting.seller.phone})
      </div>
      <div className="text-gray-700 mb-2">
        Buyer: {meeting.buyer.name} ({meeting.buyer.phone})
      </div>
      <div className="text-gray-700 mb-2">Address: {meeting.property.address}</div>
      <div className="text-gray-700">Date: {formatDate(meeting.date)}</div>
    </div>
  );
};

export default Meeting;
