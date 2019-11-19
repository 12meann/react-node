import React, { useContext } from "react";

import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";
import { TodosContext } from "../context/TodosContext";

const Todos = () => {
  const { todosState } = useContext(TodosContext);
  const { todos, error, loading, successMsg } = todosState;

  return (
    <main className="todos">
      {error.errorMsg && <p>{error.errorMsg}</p>}
      {successMsg && <p>{successMsg}</p>}
      <AddTodo />

      <ul className="collection with-header">
        <li className="collection-header flow-text purple darken-1 white-text">
          Todos
        </li>
        {loading ? (
          <div className="progress">
            <div className="indeterminate"></div>
          </div>
        ) : todos ? (
          todos.map(todo => <TodoItem key={todo._id} todo={todo} />)
        ) : null}
      </ul>
    </main>
  );
};

export default Todos;
