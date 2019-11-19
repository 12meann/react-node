export const initialState = {
  loading: false,
  error: "",
  successMsg: "",
  todos: [],
  todo: ""
};

export const todosReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true
      };
    case "GET_TODOS":
      return {
        ...state,
        loading: false,
        todos: action.payload.todos
      };
    case "GET_TODOS_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload.errorMsg
      };
    case "ADD_TODO":
      return {
        ...state,
        loading: false,
        todos: [...state.todos, action.payload.newTodo],
        successMsg: action.payload.success,
        error: ""
      };
    case "ADD_TODO_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload.errorMsg
      };
    case "DELETE_TODO":
      return {
        ...state,
        loading: false,
        todos: [
          ...state.todos.filter(
            todo => todo._id !== action.payload.deletedTodo._id
          )
        ],
        error: "",
        successMsg: action.payload.success
      };
    case "DELETE_TODO_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload.errorMsg
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
