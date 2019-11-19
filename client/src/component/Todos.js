import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";
import { TodosContext } from "../context/TodosContext";
import { AuthContext } from "../context/AuthContext";

const Todos = () => {
  // const [todos, setTodos] = useState([]);
  // const [loading, setLoading] = useState(null);
  // const [errorMsg, setErrorMsg] = useState(null);
  // const [successMsg, setSuccessMsg] = useState("");
  // const [oneTodo, setOneTodo] = useState("");

  const { todosState } = useContext(TodosContext);
  const { todos, error, loading, successMsg } = todosState;
  const { state, isAuthenticated } = useContext(AuthContext);

  console.log("todosState", todosState);
  console.log("state", state);
  return (
    <main className="todos">
      {error.errorMsg && <p>{error.errorMsg}</p>}
      {successMsg && <p>{successMsg}</p>}
      {/* {isAuthenticated ? ( */}
      <AddTodo />
      {/* ) : (
        <p>Please Login/Register to add an item</p>
      )} */}
      <ul className="collection with-header">
        <li className="collection-header flow-text purple darken-1 white-text">
          Todos
        </li>
        {loading ? (
          <div className="progress">
            <div className="indeterminate"></div>
          </div>
        ) : todos ? (
          todos.map(todo => (
            <TodoItem
              key={todo._id}
              todo={todo}
              // oneTodo={oneTodo}
              // setOneTodo={setOneTodo}
              // todos={todos}
              // setTodos={setTodos}
              // setSuccessMsg={setSuccessMsg}
              // setErrorMsg={setErrorMsg}
            />
          ))
        ) : null}
      </ul>
    </main>
  );
};

export default Todos;
