import React from 'react';
import { Outlet } from 'react-router-dom';
import logo from '../../logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Nav = () => {
  return (
    <div>
        <div className=" py-8 flex justify-between items-center mx-auto max-w-screen-xl">
            <img src={logo} alt="Logo" className="h-22 w-22" />
            <div className="flex justify-between w-1/2">
                <a href="#" className="text-secondary hover:text-primary text-lg font-bold hover:underline">Homes</a>
                <a href="#" className="text-secondary hover:text-primary text-lg font-bold hover:underline">Lands</a>
                <a href="#" className="text-secondary hover:text-primary text-lg font-bold hover:underline">Trends</a>
                <a href="#" className="text-secondary hover:text-primary text-lg font-bold hover:underline">Profile</a>
                <a href="#" className="text-secondary hover:text-primary text-lg font-bold hover:underline">About Us</a>
            </div>
            <button className="text-neutral-800 py-4 font-semibold px-5 rounded-tr-2xl bg-primary hover:bg-secondary hover:text-white text-sm whitespace-pre-wrap">
                  Sign Up   <FontAwesomeIcon icon={faArrowRight} />
            </button>
        </div>      
        <Outlet />
    </div>
  );
};

export default Nav;