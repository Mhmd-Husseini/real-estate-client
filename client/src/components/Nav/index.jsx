import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../logo.svg';
import ButtonSm from '../ButtonSm';
import NavLink from '../NavLink';
import { sendRequest } from '../../config/request';

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [authenticated, setAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignInClick = () => {
    navigate('/auth');
  };

  const handleLogout = async () => {
    try {
      await sendRequest({method: "POST",route: "user/logout", includeHeaders: true});
        localStorage.removeItem("token");
        navigate("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
      localStorage.removeItem("token");
      navigate("/auth");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      <div className="flex justify-between gap-5 items-center lg:mx-auto mx-5 mt-3 max-w-screen-xl md:pb-5 md:pt-8 ">
        <img src={logo} alt="Logo" className="h-22 w-22" />
        <div className="hidden md:flex justify-between w-1/2">
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
          {authenticated && (
            <NavLink to="/dashboard" isActive={location.pathname.startsWith('/dashboard')}>
              Dashboard
            </NavLink>
          )}
        </div>
        <div className="md:hidden">
          <button onClick={toggleMobileMenu}>
            <svg className="w-8 h-8 text-gray-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              )}
            </svg>
          </button>
        </div>
        <ButtonSm buttonText={authenticated?"Logout":"Sign In"} onClick={authenticated? handleLogout: handleSignInClick} />
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="flex flex-col items-center mx-auto max-w-screen-xl">
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
            {authenticated && (
              <NavLink to="/dashboard" isActive={location.pathname.startsWith('/dashboard')}>
                Dashboard
              </NavLink>
            )}
          </div>
        </div>
      )}
      <Outlet/>
    </div>
  );
};

export default Nav;
