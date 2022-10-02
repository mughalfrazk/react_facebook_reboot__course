import React, { Fragment, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { AuthContext } from '../context/auth-context';

const Header = () => {
  const auth = useContext(AuthContext);

  const logoutUser = () => {
    auth.getData('', '');
    localStorage.removeItem('auth-data');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Facebook Reboot
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Newsfeed
                <span className="visually-hidden">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile">
                My Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/settings">
                Account Setting
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/post/create">
                Create New Post
              </NavLink>
            </li>
            {auth.role === 'admin' && (
              <Fragment>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/create-admin">
                    Create New Admin
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/users">
                    Users List
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/disabled-post">
                    Disabled Posts
                  </NavLink>
                </li>
              </Fragment>
            )}
          </ul>
          {auth.role === 'admin' && (
            <span className="badge bg-dark rounded-pill">Admin</span>
          )}
          <div className="dropdown">
            <a
              className="nav-link dropdown-toggle text-white"
              data-bs-toggle="dropdown"
              // href="#"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {auth.email}
            </a>
            <div className="dropdown-menu">
              {/* <div className="dropdown-divider"></div> */}
              <button className="dropdown-item" onClick={logoutUser}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
