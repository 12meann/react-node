export const initialState = {
  loading: false,
  error: {},
  isAuthenticated: false,
  successMsg: "",
  user: null
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true
      };

    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        successMsg: action.payload.success,
        error: {},
        user: action.payload.user
      };
    case "USER_LOADED":
      return {
        ...state,
        loading: false,
        user: action.payload,
        isAuthenticated: true
      };
    case "LOGIN_FAIL":
    case "USER_LOADED_FAIL":
    case "REGISTER_FAIL":
      localStorage.removeItem("token");
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
        user: null
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        successMsg: "You have successfully logout."
      };
    case "CLEAR_MSG":
      return {
        ...state,
        successMsg: ""
      };
    default:
      return state;
  }
};
