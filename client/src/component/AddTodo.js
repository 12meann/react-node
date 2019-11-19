import React, { useState, useContext } from "react";
import { TodosContext } from "../context/TodosContext";
import { AuthContext } from "../context/AuthContext";

const AddTodo = () => {
  const [newTodo, setNewTodo] = useState("");
  const { todosState, addTodo } = useContext(TodosContext);
  const { state } = useContext(AuthContext);
  const { error, successMsg } = todosState;
  const { isAuthenticated } = state;

  const handleSubmit = e => {
    e.preventDefault();
    addTodo(newTodo);
    setNewTodo("");
  };
  return (
    <form onSubmit={handleSubmit}>
      {successMsg && <p>{successMsg}</p>}
      {error && <span className="helper-text">{error}</span>}
      <div className="row">
        <div className="input-field col s12">
          <input
            type="text"
            name="todo"
            value={newTodo}
            // className={error.errorMsg ? "invalid" : ""}
            onChange={e => setNewTodo(e.target.value)}
          />
          <label htmlFor="todo">Add Todo</label>

          <button
            type="submit"
            className={`btn ${!isAuthenticated ? "disabled" : ""}`}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddTodo;
