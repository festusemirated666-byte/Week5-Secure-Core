const express = require("express");
const { exec } = require("child_process");

const app = express();

app.get("/api/run", (req, res) => {
  const command = req.query.command;

  exec(command, (error, stdout) => {
    if (error) {
      return res.status(500).json({ error: "Command failed" });
    }

    res.json({ output: stdout });
  });
});