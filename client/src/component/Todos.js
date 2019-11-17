import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [oneTodo, setOneTodo] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/todos");
        setLoading(false);
        setTodos(res.data.todos);
      } catch (error) {
        setErrorMsg(error.response.data.errorMsg);
      }
    };
    fetchTodos();
  }, []);

  return (
    <main className="todos">
      {errorMsg && <p>{errorMsg}</p>}
      {successMsg && <p>{successMsg}</p>}
      <AddTodo
        setErrorMsg={setErrorMsg}
        todos={todos}
        setTodos={setTodos}
        setSuccessMsg={setSuccessMsg}
      />
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
              oneTodo={oneTodo}
              setOneTodo={setOneTodo}
              todos={todos}
              setTodos={setTodos}
              setSuccessMsg={setSuccessMsg}
              setErrorMsg={setErrorMsg}
            />
          ))
        ) : null}
      </ul>
    </main>
  );
};

export default Todos;
