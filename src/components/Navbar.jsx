import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { authSlice } from '../redux-store/auth-slice';
import { decode } from "../utils/jwt-utils";


const Navbar = (props) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    dispatch(authSlice.actions.logout());
  };

  const authStatus = useSelector((state) => state.auth);
  if (authStatus.isLoggedIn) {
    var userInfo = decode(authStatus.token);
    console.log(userInfo);
  }

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/">
          Credit Card
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <NavLink exact to="/" activeClassName="active">
                <span className="nav-link">Home</span>
              </NavLink>
            </li>
            {authStatus.isLoggedIn ? (
              <>
                <li className="nav-item">
                  <NavLink exact to="/authenticated" activeClassName="active">
                    <span className="nav-link">Dashboard</span>
                  </NavLink>
                </li>
                {userInfo.Roles !== "user" ? (
                  <li className="nav-item">
                    <NavLink exact to="/staff-sign-up" activeClassName="active">
                      <span className="nav-link">Staff Registration</span>
                    </NavLink>
                  </li>
                ) : (
                  <li className="nav-item">
                    <NavLink exact to="/apply-new" activeClassName="active">
                      <span className="nav-link">Apply Now</span>
                    </NavLink>
                  </li>
                )}
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink exact to="/login" activeClassName="active">
                    <span className="nav-link">Login</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink exact to="/signup" activeClassName="active">
                    <span className="nav-link">Sign up</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          {authStatus.isLoggedIn ? (
            <button
              className="btn btn-primary btn-sm ml-auto"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : null}
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;
