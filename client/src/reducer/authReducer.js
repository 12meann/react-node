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
    case "USER_LOADED":
    case "REGISTER_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        successMsg: action.payload.success,
        error: {},
        user: action.payload.user
      };
    case "LOGIN_FAIL":
    case "USER_LOADED_FAIL":
    case "REGISTER_FAIL":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
        user: null
      };
    case "LOGOUT":
      localStorage.removeItem("x-auth-token");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        successMsg: "You have successfully logout."
      };
    default:
      return state;
  }
};
