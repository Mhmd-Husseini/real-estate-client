import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import logo from '../../logo.svg'

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      <div className="bg-secondary text-white w-1/6 min-h-screen">
        <div className="p-4">
          <div className="text-3xl font-bold my-7 mb-16">Dashboard</div>
            <ul className="space-y-2 text-xl">
            <li>
              <NavLink to="" className="block text-white hover:bg-secondary px-4 py-2 rounded">Profile</NavLink>
            </li>
            <li>
              <NavLink to="/admin/users" className="block text-white hover:bg-secondary px-4 py-2 rounded" >Users</NavLink>
            </li>
            <li>
              <NavLink to="/admin/authors" className="block text-white hover:bg-secondary px-4 py-2 rounded">Authors</NavLink>
            </li>
            <li>
              <NavLink to="/admin/analytics" className="block text-white hover:bg-secondary px-4 py-2 rounded">Analytics</NavLink>
            </li>
            </ul>
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="mb-4 flex justify-between mx-7">
          <img src={logo} alt="Logo" className="w-20 h-20"/>
          <button className="text-lg text-secondary font-semibold mt-2">Logout</button>
        </div>
        <div className="mx-7 my-16"><Outlet /></div>
      </div>
    </div>
  );
};

export default Layout;
