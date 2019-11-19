const express = require("express");
const router = express.Router();
const Todo = require("../model/Todo");
const isAuth = require("../middleware/isAuth");
const { getTodoId } = require("../middleware/getTodoId");

//get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({ todos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: "Server error", error });
  }
});
//get one todos
router.get("/:id", getTodoId, isAuth, (req, res) => {
  try {
    res.status(200).json(res.todo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: "Server error", error });
  }
});

//add todo
router.post("/", isAuth, async (req, res) => {
  const todo = req.body.todo;
  if (todo.trim() === "") {
    return res.status(400).json({ errorMsg: "Must not be empty" });
  }
  try {
    const data = new Todo({ todo });
    const newTodo = await data.save();
    res.status(201).json({ success: "Todo added", newTodo });
  } catch (error) {
    res.status(500).json({ errorMsg: "Server error", error });
  }
});

//edit todo
router.patch("/:id", getTodoId, isAuth, async (req, res) => {
  try {
    if (res.todo !== null) {
      res.todo.todo = req.body.todo;
    }
    if (req.body.todo.trim() === "") {
      return res.status(400).json({ errorMsg: "Must not be empty" });
    }
    const updatedTodo = await res.todo.save();
    res.status(200).json({ success: "Successfully updated todo", updatedTodo });
  } catch (error) {
    return res.status(400).json({ errorMsg: "Something went wrong", error });
  }
});

//delete todo

router.delete("/:id", getTodoId, isAuth, async (req, res) => {
  try {
    const deletedTodo = await res.todo.remove();
    res.status(200).json({ success: "Todo deleted", deletedTodo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMsg: "Server error", error });
  }
});

module.exports = router;
