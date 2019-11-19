import React, { useState } from "react";
import axios from "axios";
import applyToken from "../utilities/applyToken";
import { Redirect } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [loading, setLoading] = useState(false);
  const handleSubmit = async e => {
    e.preventDefault();
    clearErrors();
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords don't match");
      return;
    } else {
      try {
        setLoading(true);
        const user = { email, password, name };
        const res = await axios.post("/register", JSON.stringify(user), {
          headers: {
            "Content-Type": "application/json"
          }
        });
        //set token in headers

        applyToken(res.data.token);
        const loadUser = await axios.get("/user");
        setLoading(false);
        setSuccessMsg(res.data.success);
        clearFields();
        setIsAuthenticated(true);
      } catch (error) {
        setNameError(error.response.data.name);
        setEmailError(error.response.data.email);
        setPasswordError(error.response.data.password);
        setConfirmPasswordError(error.response.data.confirmPassword);
      }
    }
  };
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  function clearErrors() {
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
  }
  function clearFields() {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }
  return (
    <div className="row">
      {successMsg && <p>{successMsg}</p>}
      <form onSubmit={handleSubmit} className="col s12">
        <h3 className="center-align">Register</h3>
        <div className="row">
          <div className="input-field col s12">
            <input
              name="email"
              type="email"
              className={emailError ? "invalid" : ""}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email</label>
            {emailError && <span className="helper-text">{emailError}</span>}
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              name="name"
              type="text"
              value={name}
              className={nameError ? "invalid" : ""}
              onChange={e => setName(e.target.value)}
            />
            <label htmlFor="name">Name</label>
            {nameError && <span className="helper-text">{nameError}</span>}
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              name="password"
              type="password"
              className={passwordError ? "invalid" : ""}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            {passwordError && (
              <span className="helper-text">{passwordError}</span>
            )}
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              name="confirmPassword"
              type="password"
              className={confirmPasswordError ? "invalid" : ""}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <label htmlFor="password">Confirm Password</label>
            {confirmPasswordError && (
              <span className="helper-text">{confirmPasswordError}</span>
            )}
          </div>
        </div>

        <div className="col s12">
          <button type="submit" className="waves-effect btn-large">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
