import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import logo from '../../logo.svg';
import ButtonSm from '../ButtonSm';

const Nav = () => {
  return (
    <div>
        <div className=" py-8 flex justify-between items-center mx-auto max-w-screen-xl">
            <img src={logo} alt="Logo" className="h-22 w-22" />
            <div className="flex justify-between w-1/2">
                <Link to="/" className="text-secondary hover:text-primary text-lg font-bold hover:underline">Home</Link>
                <Link to="/houses" className="text-secondary hover:text-primary text-lg font-bold hover:underline">Houses</Link>
                <Link to="/Lands" className="text-secondary hover:text-primary text-lg font-bold hover:underline">Lands</Link>
                <a href="#" className="text-secondary hover:text-primary text-lg font-bold hover:underline">Trends</a>
                <a href="#" className="text-secondary hover:text-primary text-lg font-bold hover:underline">Profile</a>
            </div>
            <ButtonSm buttonText='Sign In'/>
        </div>      
        <Outlet />
    </div>
  );
};

export default Nav;