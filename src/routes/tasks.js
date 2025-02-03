const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasks');

// Criar tarefa
router.post('/', tasksController.create);

// Buscar todas as tarefas
router.get('/', tasksController.findAll);
router.get('/:id', tasksController.find);

// Buscar tarefas por parâmetros
router.get('/search', tasksController.find);

// Atualizar tarefa
router.put('/:id', tasksController.update);

// Soft delete tarefa
router.delete('/:id', tasksController.softDelete);

// Restaurar tarefa
router.patch('/:id/restore', tasksController.restore);

module.exports = router;