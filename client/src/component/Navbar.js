import React, { useContext } from "react";
import M from "materialize-css";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { state, logout } = useContext(AuthContext);
  const { isAuthenticated } = state;
  // useEffect(() => {
  //   const navBar = document.querySelectorAll(".sidenav");
  //   M.Modal.init(navBar);
  // }, []);

  const handleLogout = e => {
    console.log("click");
    e.preventDefault();
    logout();
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
