import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  //context
  const { register, state } = useContext(AuthContext);
  const { isAuthenticated, loading, error, successMsg } = state;

  const handleSubmit = e => {
    e.preventDefault();
    const user = { email, password, name };
    register(user);
  };
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  console.log("state", state);
  return (
    <div className="row">
      {loading && (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      )}
      {successMsg && <p>{successMsg}</p>}
      <form onSubmit={handleSubmit} className="col s12">
        <h3 className="center-align">Register</h3>
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
              name="name"
              type="text"
              value={name}
              className={error.name ? "invalid" : ""}
              onChange={e => setName(e.target.value)}
            />
            <label htmlFor="name">Name</label>
            {error.name && <span className="helper-text">{error.name}</span>}
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
        </div>
        <div className="row"></div>

        <div className="col s12">
          <button type="submit" className="waves-effect btn-large">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
