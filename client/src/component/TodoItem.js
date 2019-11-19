import React, { useEffect, useContext, useState } from "react";
import M from "materialize-css";
import { TodosContext } from "../context/TodosContext";
import { AuthContext } from "../context/AuthContext";

const TodoItem = ({ todo }) => {
  const { deleteTodo, getTodo, todosState, updateTodo } = useContext(
    TodosContext
  );
  const { state } = useContext(AuthContext);
  const { isAuthenticated } = state;
  const { oneTodo } = todosState;
  const [editTodo, setEditTodo] = useState(oneTodo ? oneTodo : "");

  const handleDelete = e => {
    e.preventDefault();
    deleteTodo(todo._id);
  };

  useEffect(() => {
    const modal = document.querySelectorAll(".modal");
    M.Modal.init(modal, {});
  }, [setEditTodo]);

  const handleEdit = async e => {
    e.preventDefault();
    getTodo(todo._id);
  };
  const handleUpdate = e => {
    e.preventDefault();
    updateTodo(todo._id, editTodo);
  };

  return (
    <>
      <li key={todo._id} className="collection-item">
        <span className="flow-text">{todo.todo}</span>
        <button
          onClick={handleDelete}
          className={`secondary-content icon ${
            !isAuthenticated ? "disabled" : ""
          }`}
          disabled={!isAuthenticated}
        >
          <i className="material-icons">delete</i>
        </button>
        <button
          data-target="modal1"
          className="modal-trigger secondary-content icon"
          onClick={handleEdit}
        >
          <i className="material-icons">edit</i>
        </button>
      </li>

      {/* Modal Structure */}
      <div id="modal1" className="modal">
        <div className="modal-content">
          <label htmlFor="oneTodo"></label>
          <input
            type="text"
            name="todo"
            value={editTodo}
            onChange={e => setEditTodo(e.target.value)}
          />
        </div>
        <div className="modal-footer">
          <button className="btn waves-effect waves-light btn modal-close">
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="btn waves-effect waves-light btn modal-close"
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default TodoItem;
