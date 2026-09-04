require("dotenv").config();

const express = require("express");
const { checkDatabaseConnection } = require("./db");

const app = express();
const port = Number(process.env.APP_PORT || 3000);

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

app.listen(port, "0.0.0.0", () => {
  console.log(`Task Manager API running on port ${port}`);
});
