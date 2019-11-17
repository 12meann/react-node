const Todo = require("../model/Todo");

exports.getTodoId = async (req, res, next) => {
  let todo;
  try {
    todo = await Todo.findById(req.params.id);
    if (todo === null) res.status(400).json({ errorMsg: "No todo found" });
  } catch (error) {
    res.status(500).json({ errorMsg: "Server Error" });
  }
  res.todo = todo;
  next();
};
