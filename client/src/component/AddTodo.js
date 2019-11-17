import React, { useState } from "react";
import axios from "axios";

const AddTodo = ({ setErrorMsg, todos, setTodos, setSuccessMsg }) => {
  const [newTodo, setNewTodo] = useState("");

  const addTodo = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("/todos", { todo: newTodo });
      setSuccessMsg(res.data.success);
      setTodos([...todos, res.data.newTodo]);
      setErrorMsg("");
      setTimeout(() => {
        setSuccessMsg("");
      }, 2000);
      setNewTodo("");
    } catch (error) {
      setErrorMsg(error.response.data.errorMsg);
    }
  };
  return (
    <form onSubmit={addTodo}>
      <div className="input">
        <label htmlFor="todo"></label>
        <input
          type="text"
          name="todo"
          placeholder="Enter Todo"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
        />
        <button type="submit" className="icon">
          <i className="material-icons small">add_circle</i>
        </button>
      </div>
    </form>
  );
};

export default AddTodo;
