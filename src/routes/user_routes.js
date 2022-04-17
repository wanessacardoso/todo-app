const express = require('express');

const users_routes = express.Router();

const users = [
    { id: 1, nome: 'Maria', idade: 15, email: 'maria@gmail.com', senha: '526458' },
    { id: 2, nome: 'Joao', idade: 45, email: 'joao@hotmail.com', senha: '452163' },
    { id: 3, nome: 'Luiza', idade: 28, email: 'luiza@hotmail.com', senha: '526548' },
    { id: 4, nome: 'Mariana', idade: 36, email: 'mariana@gmail.com', senha: '958632' },
    { id: 5, nome: 'Pedro', idade: 54, email: 'pedro@live.com', senha: '452893' },
];

users_routes.post('/teste-post', (req, res) => {
    const { id, nome, idade, email, senha } = req.body;
    const user = { id, nome, idade, email, senha };
    users.push(user);
    return res.status(201).json(user);
});

users_routes.get('/', (req, res) => {
    const allUsers = users;
    return res.status(201).json(allUsers);
});

users_routes.get('/:user_id', (req, res) => {
    const { user_id } = req.params;
    const user = users.find((user) => user.id == user_id);
    if (!user) res.status(404).json("Not found");
    return res.status(201).json(user);
});

users_routes.put('/teste-put/:id', (req, res) => {
    res.send(`Editar o usuário ${req.params.id}`);
});

// Método patch...

// users_routes.delete('/teste-delete/:user_id', (req, res) => {
//     const { user_id } = req.params;
//     const filtroUsers = users.filter((user) => user.id == user_id);
//     users = filtroUsers;
//     return res.status(204).json("Deletado");
// });

module.exports = users_routes;