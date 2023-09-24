import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"; 

const SearchDropDown = ({ placeholder, options, onChange }) => {
  return (
    <div className="relative lg:max-w-sm">
      <div className="relative">
        <div className="relative">
          <select
            className="w-44 p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none border-gray-600 hover:cursor-pointer"
            onChange={(e) => onChange(e.target.value)} >
            {placeholder && (
              <option value="" disabled selected>
                {placeholder}
              </option>
            )}
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </div>
    </div>
  );
};

export default SearchDropDown;
