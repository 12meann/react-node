import React, { useState } from "react";
import axios from "axios";
import applyToken from "../utilities/applyToken";

import { Redirect } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    clearErrors();
    try {
      setLoading(true);
      const user = { email, password };
      const res = await axios.post("/login", JSON.stringify(user), {
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log("res data", res.data);
      //set token in headers

      applyToken(res.data.token);
      const loadUser = await axios.get("/user");
      setLoading(false);
      setSuccessMsg(res.data.success);
      clearFields();
      setIsAuthenticated(true);
    } catch (error) {
      setLoading(false);
      setErrorMsg(error.response.data.errorMsg);
      setEmailError(error.response.data.email);
      setPasswordError(error.response.data.password);
      console.log(error.response.data);
    }
  };
  function clearErrors() {
    setEmailError("");
    setPasswordError("");
  }
  function clearFields() {
    setEmail("");
    setPassword("");
  }

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="row">
      {loading ? <p>loading...</p> : null}
      {successMsg && <p>{successMsg}</p>}
      {errorMsg && <p>{errorMsg}</p>}
      <form className="col s12" onSubmit={handleSubmit}>
        <h3 className="center-align">Login</h3>
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
