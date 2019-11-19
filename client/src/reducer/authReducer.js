export const initialState = {
  loading: false,
  error: {},
  isAuthenticated: false,
  successMsg: ""
  // emailError: "",
  // passwordError: "",
  // confirmPasswordError: "",
  // nameError: ""
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
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        successMsg: action.payload.success,
        error: {}
      };
    case "LOGIN_FAIL":
    case "USER_LOADED_FAIL":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload
        // emailError: action.payload,
        // isAuthenticated: false,
        // passwordError: ""
      };

    default:
      return state;
  }
};
