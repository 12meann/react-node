import React, {
  createContext,
  useReducer,
  useEffect,
  useCallback
} from "react";
import { todosReducer, initialState } from "../reducer/todosReducer";
import axios from "axios";

export const TodosContext = createContext();
const TodosContextProvider = props => {
  const [todosState, dispatch] = useReducer(todosReducer, initialState);
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: "LOADING" });
      try {
        const res = await axios.get("/todos");
        dispatch({ type: "GET_TODOS", payload: res.data });
      } catch (error) {
        dispatch({ type: "GET_TODOS_FAIL", payload: error.response.data });
      }
    };
    fetchTodos();
  }, []);

  const addTodo = async todo => {
    dispatch({ type: "LOADING" });
    try {
      const res = await axios.post("/todos", { todo }, config);
      console.log(res.data);
      dispatch({ type: "ADD_TODO", payload: res.data });

      setTimeout(() => {
        dispatch({ type: "CLEAR_MSG" });
      }, 2000);
    } catch (error) {
      console.log(error.response.data);
      dispatch({ type: "ADD_TODO_FAIL", payload: error.response.data });
    }
  };
  const deleteTodo = async todoId => {
    dispatch({ type: "LOADING" });
    try {
      const res = await axios.delete(`/todos/${todoId}`);
      dispatch({ type: "DELETE_TODO", payload: res.data });
      setTimeout(() => {
        dispatch({ type: "CLEAR_MSG" });
      }, 2000);
    } catch (error) {
      dispatch({ type: "DELETE_TODO_FAIL", payload: error.response.data });
    }
  };
  return (
    <TodosContext.Provider value={{ todosState, addTodo, deleteTodo }}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
