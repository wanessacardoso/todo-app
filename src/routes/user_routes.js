const express = require('express');

const users_routes = express.Router();

users_routes.get('/', (req, res) => {
    const tasks = [
        { id: 1, nome: 'Maria', usuario: 'maria562', email: 'maria@gmail.com', senha: '526458' },
        { id: 2, nome: 'Joao', usuario: 'joao159', email: 'joao@hotmail.com', senha: '452163' },
        { id: 3, nome: 'Luiza', usuario: 'luiza369', email: 'luiza@hotmail.com', senha: '526548' },
        { id: 4, nome: 'Mariana', usuario: 'mariana742', email: 'mariana@gmail.com', senha: '958632' },
        { id: 5, nome: 'Pedro', usuario: 'pedro251', email: 'pedro@live.com', senha: '452893' },
      ];

    res.send(tasks);
});

users_routes.post('/teste-post', (req, res) => {
    res.send('Incluir um usuário');
});

users_routes.put('/teste-put/:id', (req, res) => {
    res.send(`Editar o usuário ${req.params.id}`);
});

// Método patch...

users_routes.delete('/teste-delete/:id', (req, res) => {
    res.send(`Excluir o usuário ${req.params.id}`);
});

module.exports = users_routes;