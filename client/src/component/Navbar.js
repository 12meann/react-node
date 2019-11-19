import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { state, logout } = useContext(AuthContext);
  const { isAuthenticated } = state;

  const handleLogout = e => {
    e.preventDefault();
    logout();
  };
  return (
    <>
      <nav>
        <div className="nav-wrapper container">
          <Link to="/" className="brand-logo left">
            Todo App
          </Link>

          <ul className="right">
            {!isAuthenticated ? (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
