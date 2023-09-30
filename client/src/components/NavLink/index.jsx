import React from 'react';
import { Link } from 'react-router-dom';

const NavLink = ({ to, children, isActive }) => {
  const linkClasses = `text-lg font-bold  ${
    isActive ? 'bg-secondary px-4 py-2 text-white rounded-xl' : 'text-secondary py-2 hover:text-primary'
  }`;

  return (
    <Link to={to} className={linkClasses}>
      {children}
    </Link>
  );
};

export default NavLink;
