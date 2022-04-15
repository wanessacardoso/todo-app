const express = require('express');

const users_routes = express.Router();

users_routes.get('/', (req, res) => {
    res.send('Lista de usuários');
});
  
module.exports = users_routes;