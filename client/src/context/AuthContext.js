import React, { createContext, useReducer } from "react";
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
  const login = async userData => {
    dispatch({ type: "LOADING" });
    try {
      const res = await axios.post("/login", JSON.stringify(userData), config);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      console.log("res data", res.data);
      //set token in headers
      applyToken(res.data.token);
      loadUser();
    } catch (error) {
      console.log(error.response.data);
      dispatch({ type: "LOGIN_FAIL", payload: error.response.data });
    }
  };
  const loadUser = async () => {
    dispatch({ type: "LOADING" });
    try {
      const res = await axios.get("/user");
      console.log(res.data);
      dispatch({ type: "USER_LOADED", payload: res.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "USER_LOADED_ERROR", payload: error.response.data });
    }
  };

  return (
    <AuthContext.Provider value={{ state, login, loadUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
