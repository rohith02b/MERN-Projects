const Task = require('../models/tasks');

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.json(tasks);
  } catch (error) {
    res.status(200).json(error);
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(200).json(task);
  } catch (error) {
    res.status(200).json(error);
  }
};

const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
    });
    res.json(task);
  } catch (error) {
    res.status(200).json(error);
  }
};

const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body);
    res.json('Updated');
  } catch (error) {
    res.status(200).json(error);
  }
};

const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    res.status(200).json(`Deleted ${req.params.id} `);
  } catch (error) {
    res.status(200).json(error);
  }
};

module.exports = { getTasks, createTask, updateTask, getTask, deleteTask };
