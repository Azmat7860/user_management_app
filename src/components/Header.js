import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/logo.avif";
import "../assets/css/header.css";

const Header = () => {
  return (
    <header className="header">
      {/* Logo Section */}
      <Link to={"/"}>
        <div className="logo">
          <img src={logo} alt="User Management Logo" className="logo-image" />
        </div>
      </Link>
      {/* Navigation Links */}
      <nav className="nav">
        {/* NavLink to Add User Page */}
        <NavLink to="/add-user" className="nav-link" activeClassName="active">
          Add User
        </NavLink>
        {/* NavLink to Users Page */}
        <NavLink to="/users" className="nav-link" activeClassName="active">
          Users
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
