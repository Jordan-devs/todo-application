import express from "express";
import db from "../db.js";

const router = express.Router();

// Get todos when logged in
router.get("/", (req, res) => {
  try {
    const getTodos = db.prepare("SELECT * FROM todos WHERE user_id = ?");
    const todos = getTodos.all(req.userid);
    res.status(200).json(todos);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "Server side error" });
  }
});

// Add todos
router.post("/", (req, res) => {
  const { task } = req.body;
  if (!task || task.trim() === "") {
    return res.status(400).json({ error: "Task cannot be empty" });
  }
  const id = req.userid;

  try {
    const insertTodo = db.prepare(
      "INSERT INTO todos (user_id, task) VALUES (?, ?)"
    );
    const result = insertTodo.run(id, task);

    res.status(201).json({ id: result.lastInsertRowid, task, completed: 0 });
  } catch (error) {
    console.error("Error creating todo:", error.message);
    res.status(500).json({ error: "Failed to create todo" });
  }
});

// Update todos
router.put("/:id", (req, res) => {
  const { completed } = req.body;
  const { id } = req.params;

  try {
    const updateTodo = db.prepare(
      "UPDATE todos SET completed = ? WHERE id = ?"
    );

    const result = updateTodo.run(completed, id);

    if (result.changes === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json({ message: "Todo updated successfully " });
  } catch (error) {
    console.error("Error updating todo:", error.message);
    res.status(500).json({ error: "server side error" });
  }
});

// Delete todos
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const userid = req.userid;

  try {
    const deleteTodo = db.prepare(
      "DELETE FROM todos WHERE id = ? AND user_id = ?"
    );

    deleteTodo.run(id, userid);
    res.status(200).json({ message: "Todo deleted successfully " });
  } catch (error) {
    console.error("Error deleting todo:", error.message);
    res.status(500).json({ error: "server side error" });
  }
});

export default router;
