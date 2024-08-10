// controllers/taskController.js
const Task = require("../models/taskModel");

const addTask = async (req, res) => {
  const { userId, title, description } = req.body;
  try {
    const newTask = await Task.createTask(userId, title, description);
    res.status(200).json(newTask);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.getTasks(req.params.id);
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
};

const updateTask = async (req, res) => {
  const id = req.params.id;

  const { title, description } = req.body;
  try {
    const updatedTask = await Task.updateTask(title, description, id);
    res.status(200).json(updatedTask);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.body;
  try {
    await Task.deleteTask(id);
    res.status(200).json("Task deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
};

module.exports = { addTask, getTasks, updateTask, deleteTask };
