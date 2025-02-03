const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

// Criar usuário
router.post('/', usersController.create);

// Buscar todos os usuários
router.get('/', usersController.findAll);
router.get('/:id', usersController.find);

// Buscar usuário por parâmetros
router.get('/search', usersController.find);

// Atualizar usuário
router.put('/:id', usersController.update);

// Soft delete usuário
router.delete('/:id', usersController.softDelete);

// Restaurar usuário
router.patch('/:id/restore', usersController.restore);

module.exports = router;