import React, { useState } from 'react';

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-4 md:w-[25rem] w-[20rem]">
      <div
        className="flex justify-between items-center bg-gray-100 p-3 cursor-pointer" onClick={toggleAccordion}>
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <span className={`text-primary transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          &#9660;
        </span>
      </div>
      {isOpen && <div className="p-4 border-t border-gray-200">{children}</div>}
    </div>
  );
};

export default Accordion;
