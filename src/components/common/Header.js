import React from 'react';
import { Link, IndexLink } from 'react-router';

const Header = () => {
  return (
    <nav className="header">
      <Link to="/tasks" activeClassName="active">Tasks</Link>
      <span> | </span>
      <Link to="/sort" activeClassName="active">Sort</Link>
    </nav>
  );
};

export default Header;