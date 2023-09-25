import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import logo from '../../logo.svg'

const Layout = () => {
  const navigate= useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/")  
  };
  return (
    <div className="flex min-h-screen">
      <div className="bg-secondary text-white w-2/12 min-h-screen">
        <div className="p-4">
          <div className="text-3xl font-bold mt-6 mb-16">Dashboard</div>
            <ul className="space-y-2 text-xl">
            <li>
              <NavLink to="" className="block text-white px-4 py-2 my-4 rounded transition-all duration-300 focus:ring-2 focus:ring-primary focus:outline-none hover:underline hover:bg-primary hover:text-secondary">Profile</NavLink>
            </li>
            <li>
              <NavLink to="users" className="block text-white px-4 py-2 my-4 rounded transition-all duration-300 focus:ring-2 focus:ring-primary focus:outline-none hover:underline hover:bg-primary hover:text-secondary" >Users</NavLink>
            </li>
            <li>
              <NavLink to="analytics" className="block text-white px-4 py-2 my-4 rounded transition-all duration-300 focus:ring-2 focus:ring-primary focus:outline-none hover:underline hover:bg-primary hover:text-secondary">Analytics</NavLink>
            </li>
            </ul>
        </div>
      </div>

      <div className="flex-1 p-5">
        <div className="mb-4 flex justify-between mx-7">
          <img src={logo} alt="Logo" className="w-20 h-20"/>
          <button className="text-lg text-secondary font-semibold mt-2" onClick={handleLogout}>Logout</button>
        </div>
        <div className="flex-1 justify-start msx-7 p-4 10/12"><Outlet /></div>
      </div>
    </div>
  );
};

export default Layout;
