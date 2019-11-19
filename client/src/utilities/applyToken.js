import axios from "axios";

const applyToken = token => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
    localStorage.setItem("x-auth-token", token);
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
    localStorage.removeItem("x-auth-token");
  }
};

export default applyToken;
