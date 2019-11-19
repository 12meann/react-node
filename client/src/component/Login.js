import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, login } = useContext(AuthContext);
  const { loading, isAuthenticated, error, successMsg } = state;

  const handleSubmit = e => {
    e.preventDefault();
    const userData = { email, password };
    login(userData);
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div className="row">
      {loading && (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      )}
      {successMsg && <p>{successMsg}</p>}
      {error.errorMsg && <p>{error.errorMsg}</p>}

      <form className="col s12" onSubmit={handleSubmit}>
        <h3 className="center-align">Login</h3>
        <div className="row">
          <div className="input-field col s12">
            <input
              name="email"
              type="email"
              className={error.email ? "invalid" : ""}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email</label>
            {error.email && <span className="helper-text">{error.email}</span>}
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              name="password"
              type="password"
              className={error.password ? "invalid" : ""}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            {error.password && (
              <span className="helper-text">{error.password}</span>
            )}
          </div>
          <div className="col s12">
            <button
              type="submit"
              className="waves-effect waves-light btn-large"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
