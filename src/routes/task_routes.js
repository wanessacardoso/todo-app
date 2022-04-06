const express = require('express');

const tasks_routes = express.Router();

const tasks = [
  { id: 1, description: 'Description 1', done: false },
  { id: 2, description: 'Description 2', done: true },
  { id: 3, description: 'Description 3', done: false },
  { id: 4, description: 'Description 4', done: true },
  { id: 5, description: 'Description 5', done: false },
];

const generateId = () => {
  return tasks[tasks.length - 1].id + 1;
}

tasks_routes.post('/', (req, res) => {
  const { description } = req.body;
  if (!description) {
    return res.status(400).send({ error: 'You must provide a description' });
  }
  const newTask = {
    id: generateId(),
    description,
    done: false,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

tasks_routes.get('/', (req, res) => {
  res.json(tasks);
});

tasks_routes.get('/:id', (req, res) => {
  const { id } = req.params;
  const foundTask = tasks.find(task => task.id === parseInt(id));
  if (!foundTask) {
    return res.status(404).send({ error: 'Task not found' });
  }
  res.json(foundTask);
});

module.exports = tasks_routes;