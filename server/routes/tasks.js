const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }
    const tasks = await Task.find(filter).sort({ updatedAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch tasks" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, status, owner, dueDate } = req.body;
    if (!title || !owner) {
      return res.status(400).json({ error: "title and owner are required" });
    }
    const task = await Task.create({ title, description, status, owner, dueDate });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: "Unable to create task", details: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: "Unable to update task" });
  }
});

module.exports = router;
