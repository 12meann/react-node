import React, { createContext, useReducer, useEffect } from "react";
import { authReducer, initialState } from "../reducer/authReducer";
import axios from "axios";
import applyToken from "../utilities/applyToken";

export const AuthContext = createContext();

const AuthContextProvider = props => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  if (localStorage.token) {
    applyToken(localStorage.token);
  }
  const login = async userData => {
    dispatch({ type: "LOADING" });
    try {
      const res = await axios.post("/login", JSON.stringify(userData), config);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

      //set token in headers
      applyToken(res.data.token);
      loadUser();
      setTimeout(() => {
        dispatch({ type: "CLEAR_MSG" });
      }, 2000);
    } catch (error) {
      dispatch({ type: "LOGIN_FAIL", payload: error.response.data });
    }
  };
  const loadUser = async () => {
    if (localStorage.token) {
      applyToken(localStorage.token);
    }
    try {
      const res = await axios.get("/user");
      dispatch({ type: "USER_LOADED", payload: res.data });
    } catch (error) {
      dispatch({ type: "USER_LOADED_ERROR", payload: error.response.data });
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    setTimeout(() => {
      dispatch({ type: "CLEAR_MSG" });
    }, 2000);
  };

  const register = async userData => {
    dispatch({ type: "LOADING" });
    try {
      const res = await axios.post(
        "/register",
        JSON.stringify(userData),
        config
      );
      console.log(res.data);
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
      //set token in headers
      applyToken(res.data.token);
      loadUser();
      setTimeout(() => {
        dispatch({ type: "CLEAR_MSG" });
      }, 2000);
    } catch (error) {
      dispatch({ type: "REGISTER_FAIL", payload: error.response.data });
    }
  };
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ state, login, loadUser, logout, register }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
