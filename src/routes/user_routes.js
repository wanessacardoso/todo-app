const express = require('express');

const users_routes = express.Router();

const users = [
    { id: 1, nome: 'Maria', idade: 15, email: 'maria@gmail.com', senha: '526458' },
    { id: 2, nome: 'Joao', idade: 45, email: 'joao@hotmail.com', senha: '452163' },
    { id: 3, nome: 'Luiza', idade: 28, email: 'luiza@hotmail.com', senha: '526548' },
    { id: 4, nome: 'Mariana', idade: 36, email: 'mariana@gmail.com', senha: '958632' },
    { id: 5, nome: 'Pedro', idade: 54, email: 'pedro@live.com', senha: '452893' },
];

const generateId = () => {
    return users[users.length - 1].id + 1;
}

const getUser = (req, res, next) => {
    const { id } = req.params;
    const user = users.find((user) => user.id == id);
    if (!user) {
      return res.status(404).send({ error: 'Usuário não encontrado' });
    };
    req.user = user;
    next();
}

//Método POST
users_routes.post('/', (req, res) => {
    const { nome, idade, email, senha } = req.body;
  
    //Validações...
    if (!nome) {
      return res.status(400).send({ error: 'Forneça o nome' });
    }
  
    const newUser = {
      id: generateId(), nome, idade, email, senha
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

//Método GET
users_routes.get('/', (req, res) => {
    res.json(users);
});
  
users_routes.get('/:id', getUser, (req, res) => {
    const { user } = req;
    res.json(user);
});

//Método PUT...
// users_routes.put('/:id', isValidBody, getUser, (req, res) => {
//     const { task: foundTask } = req;
  
//     Object.assign(foundTask, req.body);
  
//     return res.send(foundTask);
// });

//Método Patch...
users_routes.patch('/:id/complete', getUser, (req, res) => {
    const { user } = req;
    user.done = true;
    return res.status(200).send(user);
})

//Método DELETE
users_routes.delete('/:id', (req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex(user => user.id === parseInt(id));
  
    if (userIndex < 0) {
      return res.status(404).send({ error: 'Usuario não encontrado' });
    }
  
    users.splice(userIndex, 1);
  
    return res.status(204).send();
});
  
module.exports = users_routes;