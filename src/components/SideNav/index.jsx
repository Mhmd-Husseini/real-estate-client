import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUser, faHome, faBuilding, faCalendar } from '@fortawesome/free-solid-svg-icons'; 

const SideNav = () => {
  return (
    <div className="flex p-4 m-5">
      <div>
        <div className='text-white text-xl font-semibold rounded-md bg-primary py-2 px-6'>
            <div className='flex flex-nowrap items-center'> <p>Dashboard</p> <FontAwesomeIcon icon={faTachometerAlt} className='ml-3'/> </div>
        </div>
        <ul className="mt-4 text-lg text-gray-800 flex flex-col items-start">
          <li className="flex items-center mb-4">
            <NavLink to="" >
              <FontAwesomeIcon icon={faUser} className="mr-3" /> Profile
            </NavLink>
          </li>
          <li className="flex items-center mb-4">
            <NavLink to="properties" >
              <FontAwesomeIcon icon={faBuilding} className="mr-3" /> My Properties
            </NavLink>
          </li>
          <li className="flex items-center mb-4">
            <NavLink to="add" >
              <FontAwesomeIcon icon={faHome} className="mr-3" /> Add Property
            </NavLink>
          </li>
          <li className="flex items-center mb-2">
            <NavLink to="meetings" >
              <FontAwesomeIcon icon={faCalendar} className="mr-3" /> Meetings
            </NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default SideNav;
