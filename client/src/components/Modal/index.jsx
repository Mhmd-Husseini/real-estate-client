import React from 'react';

const PopupModal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-primary bg-opacity-20" style={{ zIndex: 999 }}>
      <div className="w-1/3 p-8 rounded-lg shadow-lg bg-secondary text-white" >
        <div className="mb-4">
          <p className="text-xl font-semibold">{message}</p>
        </div>
        <div className="text-right">
          <button onClick={onClose} className="px-4 py-2 bg-white hover:bg-gray-400 text-gray-800 font-semibold rounded">
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
