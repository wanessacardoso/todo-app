const express = require('express');
const app = express();

app.get('/', (request, response) => {
  response.send("TODO APP");
})


module.exports = app;