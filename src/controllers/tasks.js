const Task = require('../models/tasks');
const { validateTaskCreateDTO, validateTaskUpdateDTO } = require('../dtos/taskDTO');


const tasksController = {

  // Criar tarefa
  async create(req, res) {
    const { person_id, title, description, status, priority } = req.body;

    const validation = validateTaskCreateDTO(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ error: "Requisição inválida", message: validation.message });
    }

    try {
      const taskData = { person_id, title, description, status, priority };
      const task = await Task.create(taskData);
      return res.status(201).json(task);
    } catch (error) {
      return res.status(error.statusCode).json(error);
    }
  },

  // Buscar todas as tarefas
  async findAll(req, res) {
    try {
      const tasks = await Task.findAll();
      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar tarefas' });
    }
  },

  // Buscar tarefas por parâmetros
  async find(req, res) {
    let searchParams = req.query;
    if (Object.keys(searchParams).length==0){
      searchParams = { ...req.params}
    }
      console.log(req.params)
    try {
      const tasks = await Task.find(searchParams);
      if (tasks.length === 0) {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
      }
      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar tarefas' });
    }
  },

  // Atualizar tarefa
  async update(req, res) {
    const { id } = req.params;
    const { person_id, title, description, status, priority } = req.body;

    // Validando dados de atualização
    const validation = validateTaskUpdateDTO(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ error: validation.message });
    }

    try {
      const updatedTask = await Task.update(id, { person_id, title, description, status, priority });
      if (updatedTask) {
        return res.status(200).json(updatedTask);
      } else {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar tarefa' });
    }
  },

  // Soft delete tarefa
  async softDelete(req, res) {
    const { id } = req.params;
    try {
      const deletedTask = await Task.softDelete(id);
      if (deletedTask) {
        return res.status(200).json({ message: 'Tarefa deletada com sucesso' });
      } else {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar tarefa' });
    }
  },

  // Restaurar tarefa
  async restore(req, res) {
    const { id } = req.params;
    try {
      const restoredTask = await Task.restore(id);
      if (restoredTask) {
        return res.status(200).json({ message: 'Tarefa restaurada com sucesso' });
      } else {
        return res.status(404).json({ message: 'Tarefa não encontrada' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao restaurar tarefa' });
    }
  }

};

module.exports = tasksController;