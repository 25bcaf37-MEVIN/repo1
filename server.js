import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Todo from "./models/Todo.js";
import auth from "./middleware/auth.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected."))
  .catch(err => console.log(err));

// Register
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  if (!(username && password)) return res.status(400).json({ error: "Required" });
  const exists = await User.findOne({ username });
  if (exists) return res.status(400).json({ error: "User exists" });
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hash });
  res.status(201).json({ user: user.username });
});

// Login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });
  const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "2h" });
  res.json({ token });
});

// Get my todos
app.get("/api/todos", auth, async (req, res) => {
  const todos = await Todo.find({ user: req.user.id });
  res.json(todos);
});

// Add new todo
app.post("/api/todos", auth, async (req, res) => {
  const todo = await Todo.create({
    user: req.user.id,
    text: req.body.text,
    completed: false
  });
  res.status(201).json(todo);
});

// Update todo
app.put("/api/todos/:id", auth, async (req, res) => {
  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    { $set: { ...req.body } },
    { new: true }
  );
  if (!todo) return res.status(404).json({ error: "Not found" });
  res.json(todo);
});

// Delete todo
app.delete("/api/todos/:id", auth, async (req, res) => {
  const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!todo) return res.status(404).json({ error: "Not found" });
  res.json({ success: true });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
