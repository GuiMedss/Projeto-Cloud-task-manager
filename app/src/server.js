require("dotenv").config();

const express = require("express");
const { pool, checkDatabaseConnection } = require("./db");

const app = express();
const port = Number(process.env.APP_PORT || 3000);

app.use(express.static("public"));
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "task-manager-api"
  });
});

app.get("/db-health", async (req, res) => {
  try {
    await checkDatabaseConnection();
    res.json({
      status: "ok",
      database: "connected"
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      database: "unavailable",
      message: error.message
    });
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM tasks ORDER BY id");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.post("/tasks", async (req, res) => {
  const { title, description, done } = req.body;
  if (!title) {
    return res.status(400).json({ status: "error", message: "title is required" });
  }
  try {
    const [result] = await pool.query(
      "INSERT INTO tasks (title, description, done) VALUES (?, ?, ?)",
      [title, description || null, done ? true : false]
    );
    const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.put("/tasks/:id", async (req, res) => {
  const { title, description, done } = req.body;
  if (!title) {
    return res.status(400).json({ status: "error", message: "title is required" });
  }
  try {
    const [result] = await pool.query(
      "UPDATE tasks SET title = ?, description = ?, done = ? WHERE id = ?",
      [title, description || null, done ? true : false, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ status: "error", message: "task not found" });
    }
    const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [req.params.id]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM tasks WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ status: "error", message: "task not found" });
    }
    res.json({ status: "ok", deleted: Number(req.params.id) });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Task Manager API running on port ${port}`);
});
