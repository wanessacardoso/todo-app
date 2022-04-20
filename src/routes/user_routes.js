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

const isValidBody = (req, res, next) => {
  let validFields = ['nome', 'idade', 'email', 'senha'];

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

const getUser = (req, res, next) => {
    const { id } = req.params;
    const user = users.find((user) => user.id == id);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    };
    req.user = user;
    next();
}

users_routes.post('/', isValidBody, (req, res) => {
    const { nome, idade, email, senha } = req.body;

    if (!(nome && email && senha)){
      return res.status(400).send({ error: 'Fill in the fields' });
    } 
    if (idade < 0) {
      return res.status(400).send({ error: 'Invalid Age' });
    }
  
    const newUser = {
      id: generateId(), nome, idade, email, senha
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

users_routes.get('/', (req, res) => {
    res.json(users);
});
  
users_routes.get('/:id', getUser, (req, res) => {
    const { user } = req;
    res.json(user);
});

users_routes.put('/:id', isValidBody, getUser, (req, res) => {
    const { user } = req;
    Object.assign(user, req.body);
    return res.send(user);
});

//Método Patch...
users_routes.patch('/:id/edit', getUser, (req, res) => {
    const { user } = req;
    const { email, senha } = req.body;
    if (email) {
      user.email = req.body.email;
    }
    if (senha) {
      user.senha = req.body.senha;
    }
    return res.status(200).send(user);
})

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