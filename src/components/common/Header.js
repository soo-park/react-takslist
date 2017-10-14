import React from 'react';
import { Link, IndexLink } from 'react-router';

const Header = () => {
  return (
    <nav className="header">
      <Link to="/tasks" activeClassName="active" />
    </nav>
  );
};

export default Header;