const express = require('express');
const app = express();

app.use(express.json());

const tasks_routes = require('./routes/task_routes');
app.use('/tasks', tasks_routes);

//Rota de usuários
const users_routes = require('./routes/user_routes');
app.use('/users', users_routes);

app.get('*', (req, res) => {
  res.status(404).send({ error: "Route doesn't exist" });
});

module.exports = app;