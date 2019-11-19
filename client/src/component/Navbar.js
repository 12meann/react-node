import React, { useEffect, useState } from "react";
import M from "materialize-css";
import { Link } from "react-router-dom";
import { isRegExp } from "util";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // useEffect(() => {
  //   const navBar = document.querySelectorAll(".sidenav");
  //   M.Modal.init(navBar);
  // }, []);
  useEffect(() => {
    if (localStorage.getItem("x-aut-token")) {
      setIsAuthenticated(true);
    }
  }, [isAuthenticated]);
  const handleLogout = e => {
    console.log("click");
    e.preventDefault();
    localStorage.removeItem("x-auth-token");
    setIsAuthenticated(false);
  };
  return (
    <>
      <nav>
        <div className="nav-wrapper container">
          <Link to="/" className="brand-logo">
            Todo App
          </Link>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons right">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
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
                <a onClick={handleLogout}>Logout</a>
              </li>
            )}
          </ul>
        </div>
      </nav>
      {/* sidenav */}
      <ul className="sidenav" id="mobile-demo">
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/register">Logout</Link>
        </li>
      </ul>
    </>
  );
};

export default Navbar;
