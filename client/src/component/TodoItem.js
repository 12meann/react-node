import React, { useEffect } from "react";
import axios from "axios";
import M from "materialize-css";

const TodoItem = ({
  todo,
  todos,
  setTodo,
  setTodos,
  setErrorMsg,
  setSuccessMsg,
  oneTodo,
  setOneTodo
}) => {
  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/todos/${todo._id}`);
      setTodos([
        ...todos.filter(todo => todo._id !== res.data.deletedTodo._id)
      ]);
      setSuccessMsg(res.data.success);
      setTimeout(() => {
        setSuccessMsg("");
      }, 3000);
    } catch (error) {
      error && setErrorMsg(error.response.data.errorMsg);
    }
  };

  useEffect(() => {
    const modal = document.querySelectorAll(".modal");
    M.Modal.init(modal, {});
  }, [setOneTodo]);

  const handleEdit = async () => {
    try {
      const res = await axios.get(`/todos/${todo._id}`);
      console.log(res.data);
      setOneTodo(res.data.todo);
    } catch (error) {
      console.log(error);
      error && setErrorMsg(error.response);
    }
  };
  const handleUpdate = async e => {
    e.preventDefault();
    try {
      const res = await axios.patch(`/todos/${todo._id}`, { todo: oneTodo });
      console.log(res.data);
      const editedTodo = todos.find(
        todo => todo._id === res.data.updatedTodo._id
      );
      console.log(editedTodo);
      setTodos([
        ...todos.filter(todo => todo._id !== res.data.updatedTodo._id),
        res.data.updatedTodo
      ]);
    } catch (error) {
      error && setErrorMsg(error.response);
    }
  };
  return (
    <>
      <li key={todo._id} className="collection-item">
        <span className="flow-text">{todo.todo}</span>
        <button onClick={handleDelete} className="secondary-content icon">
          <i className="material-icons">delete</i>
        </button>{" "}
        <button
          onClick={handleEdit}
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
          <button
            className="btn waves-effect waves-light btn modal-close"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default TodoItem;
