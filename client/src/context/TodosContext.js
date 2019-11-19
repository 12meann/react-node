import React, { createContext, useReducer, useEffect } from "react";
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

      dispatch({ type: "ADD_TODO", payload: res.data });

      setTimeout(() => {
        dispatch({ type: "CLEAR_MSG" });
      }, 2000);
    } catch (error) {
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
  const getTodo = async todoId => {
    try {
      const res = await axios.get(`/todos/${todoId}`);
      dispatch({ type: "GET_ONE_TODO", payload: res.data });
    } catch (error) {
      dispatch({ type: "GET_ONE_TODO_FAIL", payload: error.response.data });
    }
  };
  const updateTodo = async (todoId, updatedTodo) => {
    try {
      const res = await axios.patch(
        `/todos/${todoId}`,
        { todo: updatedTodo },
        config
      );
      dispatch({ type: "UPDATE_TODO", payload: res.data });
      setTimeout(() => {
        dispatch({ type: "CLEAR_MSG" });
      }, 2000);
    } catch (error) {
      console.log(error.response.data);
      dispatch({ type: "UPDATE_TODO_FAIL", payload: error.response.data });
    }
  };
  return (
    <TodosContext.Provider
      value={{ todosState, addTodo, deleteTodo, getTodo, updateTodo }}
    >
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
