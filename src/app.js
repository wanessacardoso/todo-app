const express = require('express');
const app = express();

app.use(express.json());

const tasks_routes = require('./routes/task_routes');
app.use('/tasks', tasks_routes);

//criar a rota de usuários

app.get('*', (req, res) => {
  res.status(404).send({ error: "Route doesn't exist" });
});

module.exports = app;