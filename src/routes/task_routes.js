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

const isValidBody = (req, res, next) => {
  let validFields = ['description', 'done'];

  Object.keys(req.body).forEach(key => {

    if (!validFields.includes(key)) {
      return res.status(400).send({ error: 'Invalid body' });
    }

    if (req.body[key] === undefined) {
      return res.status(400).send({ error: 'Missing fields' });
    };
  });
  next();
};

const getTask = (req, res, next) => {
  const { id } = req.params;
  const task = tasks.find((task) => task.id == id);
  if (!task) {
    return res.status(404).send({ error: 'Task not found' });
  };
  req.task = task;
  next();
}

tasks_routes.patch('/:id/complete', getTask, (req, res) => {
  const { task } = req;
  task.done = true;
  return res.status(200).send(task);
})

tasks_routes.put('/:id', isValidBody, getTask, (req, res) => {
  const { task: foundTask } = req;

  Object.assign(foundTask, req.body);

  return res.send(foundTask);
});

tasks_routes.delete('/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(task => task.id === parseInt(id));

  if (taskIndex < 0) {
    return res.status(404).send({ error: 'Task not found' });
  }

  tasks.splice(taskIndex, 1);

  return res.status(204).send();
});

tasks_routes.post('/', isValidBody, (req, res) => {

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

tasks_routes.get('/:id', getTask, (req, res) => {
  const { task } = req;
  res.json(task);
});

module.exports = tasks_routes;