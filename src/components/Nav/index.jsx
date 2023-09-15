import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../logo.svg';
import ButtonSm from '../ButtonSm';
import NavLink from '../NavLink'; 

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignInClick = () => {
    navigate('/auth');
  };

  return (
    <div>
      <div className="py-8 flex justify-between items-center mx-auto max-w-screen-xl">
        <img src={logo} alt="Logo" className="h-22 w-22" />
        <div className="flex justify-between w-1/2">
          <NavLink to="/" isActive={location.pathname === '/'}>
            Home
          </NavLink>
          <NavLink to="/houses" isActive={location.pathname.startsWith('/houses')}>
            Houses
          </NavLink>
          <NavLink to="/lands" isActive={location.pathname.startsWith('/lands')}>
            Lands
          </NavLink>
          <NavLink to="/trends" isActive={location.pathname.startsWith('/trends')}>
            Trends
          </NavLink>
          <NavLink to="/dashboard" isActive={location.pathname.startsWith('/dashboard')}>
            Dashboard
          </NavLink>
        </div>
        <ButtonSm buttonText="Sign In" onClick={handleSignInClick} />
      </div>
      <Outlet />
    </div>
  );
};

export default Nav;
