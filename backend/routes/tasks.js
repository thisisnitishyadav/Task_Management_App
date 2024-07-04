const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

router.post('/', async (req, res) => {
  const { title, description, dueDate } = req.body;
  const task = new Task({ title, description, dueDate });
  await task.save();
  res.json(task);
});

router.get('/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.json(task);
});

router.put('/:id', async (req, res) => {
  const { title, description, dueDate } = req.body;
  const task = await Task.findByIdAndUpdate(req.params.id, { title, description, dueDate }, { new: true });
  res.json(task);
});

router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

module.exports = router;
