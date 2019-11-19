import React, { useEffect, useContext } from "react";
import axios from "axios";
import M from "materialize-css";
import { TodosContext } from "../context/TodosContext";
import { AuthContext } from "../context/AuthContext";

const TodoItem = ({ todo, oneTodo, setOneTodo }) => {
  const { deleteTodo } = useContext(TodosContext);
  const { state } = useContext(AuthContext);
  const { isAuthenticated } = state;
  console.log(isAuthenticated);
  const handleDelete = e => {
    e.preventDefault();
    deleteTodo(todo._id);
  };

  useEffect(() => {
    const modal = document.querySelectorAll(".modal");
    M.Modal.init(modal, {});
  }, [setOneTodo]);

  // const handleEdit = async () => {
  //   try {
  //     const res = await axios.get(`/todos/${todo._id}`);
  //     console.log(res.data);
  //     setOneTodo(res.data.todo);
  //   } catch (error) {
  //     console.log(error);
  //     error && setErrorMsg(error.response);
  //   }
  // };
  // const handleUpdate = async e => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.patch(`/todos/${todo._id}`, { todo: oneTodo });
  //     console.log(res.data);
  //     const editedTodo = todos.find(
  //       todo => todo._id === res.data.updatedTodo._id
  //     );
  //     console.log(editedTodo);
  //     setTodos([
  //       ...todos.filter(todo => todo._id !== res.data.updatedTodo._id),
  //       res.data.updatedTodo
  //     ]);
  //   } catch (error) {
  //     error && setErrorMsg(error.response);
  //   }
  // };
  return (
    <>
      <li key={todo._id} className="collection-item">
        <span className="flow-text">{todo.todo}</span>
        <button
          onClick={handleDelete}
          // className="secondary-content icon"
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
            value={oneTodo}
            onChange={e => setOneTodo(e.target.value)}
          />
        </div>
        <div className="modal-footer">
          <button className="btn waves-effect waves-light btn modal-close">
            Cancel
          </button>
          <button className="btn waves-effect waves-light btn modal-close">
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default TodoItem;
