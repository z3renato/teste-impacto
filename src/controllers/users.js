// @ts-nocheck
const User = require('../models/users');
const { validateUserCreateDTO, validateUserUpdateDTO } = require('../dtos/userDTO');

const usersController = {

 
  async create(req, res) {
    const { name, email, github_username, avatar, is_admin } = req.body;

    // Validando dados de criação
    const validation = validateUserCreateDTO(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ error:'Requisição inválida',message: validation.message });
    }

    try {
      const userData = { name, email, github_username, avatar, is_admin };
      const user = await User.create(userData);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(error.statusCode).json(error);
    }
  },

  // Buscar todos os usuários
  async findAll(req, res) {
    try {
      const users = await User.findAll();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  },

  // Buscar usuário por parâmetros
  async find(req, res) {
    let searchParams = req.query;
    searchParams = { ...searchParams, ...req.params }
    try {
      const users = await User.find(searchParams);
      if (users.length === 0) {
        return res.status(404).json({ message: 'Nenhum usuárioo encontrado' });
      }
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  },

  // Atualizar usuário
  async update(req, res) {
    const { id } = req.params;
    const { name, email, github_username, avatar, is_admin } = req.body;

    // Validando dados de atualização
    const validation = validateUserUpdateDTO(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ error:'Requisição inválida',message: validation.message });
    }

    try {
      const updatedUser = await User.update(id, { name, email, github_username, avatar, is_admin });
      if (updatedUser) {
        return res.status(200).json(updatedUser);
      } else {
        return res.status(404).json({ error:'Requisição inválida',message: 'Usuário não encontrado' });
      }
    } catch (error) {
      return res.status(500).json({ error:'Requisição inválida',message: 'Erro ao atualizar usuário' });
    }
  },


  async softDelete(req, res) {
    console.log('passou aqui')
    const { id } = req.params;
    console.log({id})
    try {
      const deletedUser = await User.softDelete(id);
      if (deletedUser) {
        return res.status(200).json({ message: 'Usuário deletado com sucesso' });
      } else {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
  },


  async restore(req, res) {
    const { id } = req.params;
    try {
      const restoredUser = await User.restore(id);
      if (restoredUser) {
        return res.status(200).json({ message: 'Usuário restaurado com sucesso' });
      } else {
        return res.status(404).json({ message: 'Usuário não encontrado' })
      }
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao restaurar usuário' })
    }
  }

}

module.exports = usersController;