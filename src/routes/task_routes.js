const { parse } = require('dotenv');
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

const isInvalidBody = (body) => {
  let validFields = ['description', 'done'];

  Object.keys(body).forEach(key => {

    if (!validFields.includes(key)) {
      return 'Invalid field';
    }

    if (!body[key]) {
      return 'Missing fields';
    };
  });
};

tasks_routes.patch('/:id/complete', (req, res) => {
  const { id } = req.params;
  const foundTask = tasks.find(task => task.id == id);
  if (!foundTask) {
    return res.status(404).send({ error: 'Task not found' });
  };
  foundTask.done = true;
  return res.status(200).send(foundTask);
})

tasks_routes.put('/:id', (req, res) => {
  const { id } = req.params;

  const error = isInvalidBody(req.body);
  if (error) {
    return res.status(400).send({ error });
  }

  const foundTask = tasks.find(task => task.id == id);
  if (foundTask < 0) {
    return res.status(404).send({ error: 'Task not found' });
  }

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

tasks_routes.post('/', (req, res) => {

  const error = isInvalidBody(req.body);
  if (error) {
    return res.status(400).send({ error });
  }

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