import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const hashPassword = await bcrypt.hash(password, 8);
  try {
    //check if user already exists in db
    const getUser = db.prepare("SELECT * FROM users WHERE username = ?");
    const user = getUser.get(username);

    if (user) {
      return res
        .status(409)
        .json({ message: "An account with this email already exists" });
    }

    // create a new user
    const insertUser = db.prepare(
      `INSERT INTO users (username, password) VALUES (?, ?)`
    );
    const result = insertUser.run(username, hashPassword);

    // add a default todo to new users
    const defaultTodo = "Hello :) make your first Todo.";
    const insertTodo = db.prepare(`
        INSERT INTO todos (user_id, task) VALUES (?, ?)`);

    insertTodo.run(result.lastInsertRowid, defaultTodo);

    //create token to identify users
    const token = jwt.sign(
      { id: result.lastInsertRowid },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.status(201).json({ token });
  } catch (err) {
    console.error("Registration Error:", err.message);
    res.status(500).json({ message: "Registration failed" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // check the user if it exist
    const getUser = db.prepare(`SELECT * FROM users WHERE username = ?`);
    const user = getUser.get(username);

    //Guard clause in_case user not found
    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Login failed" });
  }
});

export default router;
