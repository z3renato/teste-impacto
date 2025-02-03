// @ts-nocheck

import { Task } from '../models/tasks.js';

document.addEventListener("DOMContentLoaded", async () => {
  const taskId = new URLSearchParams(window.location.search).get('id');
  const readOnly = new URLSearchParams(window.location.search).get('readOnly');
  const taskModel = new Task();

  const formTitle = document.getElementById('formTitle');
  const submitButton = document.getElementById('submitButton');
  const cancelButton = document.getElementById('cancelButton');
  const taskForm = document.getElementById('taskForm');
  const userSelect = document.getElementById('user');

  if (taskId) {
    const [task] = await taskModel.getTaskById(taskId);
    if (task) {
      formTitle.textContent = readOnly?'Visualizar Tarefa':'Editar Tarefa';
      populateForm(task, readOnly);
      submitButton.textContent = 'Atualizar';
      submitButton.onclick = async (e) => {
        e.preventDefault();
        await updateTask(taskId);
      };
    } else {
      alert('Tarefa não encontrada');
    }
  } else {
    formTitle.textContent = 'Cadastrar Tarefa';
    submitButton.onclick = async (e) => {
      e.preventDefault();
      await createTask();
    };
    loadUsers(0);
  }

  cancelButton.onclick = () => {
    window.location.href = '/views/tasks.html';
  };

  function populateForm(task, readOnly = false) {
    document.getElementById('title').value = task.title;
    document.getElementById('description').value = task.description;
    document.getElementById('status').value = task.status;
    document.getElementById('priority').value = task.priority;
    loadUsers(task.person_id);

    if (readOnly) makeFieldsReadonly();
  }

  async function loadUsers(selectedUserId) {
    const users = await taskModel.getUsers();
    const option = document.createElement('option');
    option.value = 0;
    option.textContent = 'Selecione';
    if (!selectedUserId) {
      option.selected = true;
    }
    userSelect.appendChild(option);
    users.forEach(user => {
      const option = document.createElement('option');
      option.value = user.id;
      option.textContent = user.name;
      if (user.id === selectedUserId) {
        option.selected = true;
      }
      userSelect.appendChild(option);
    });
  }

  function makeFieldsReadonly() {
    document.getElementById('title').readOnly = true;
    document.getElementById('description').readOnly = true;
    document.getElementById('status').disabled = true;
    document.getElementById('priority').disabled = true;
    document.getElementById('user').disabled = true;
    submitButton.disabled = true;
  }

  async function createTask() {
    const newTask = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      status: document.getElementById('status').value,
      priority: document.getElementById('priority').value,
      person_id: Number(document.getElementById('user').value)
    };
    // console.log({newTask})
    // return;
    const response = await taskModel.createTask(newTask);
    if (response.error) {
      alert(response.message);
    } else {
      alert('Tarefa criada com sucesso');
      setTimeout(() => {
        window.location.href = '/views/tasks.html';
      }, 1000);
    }
  }

  async function updateTask(id) {
    const updatedTask = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      status: document.getElementById('status').value,
      priority: document.getElementById('priority').value,
      person_id: Number(document.getElementById('user').value)
    };
    // return;
    const response = await taskModel.updateTask(id, updatedTask);
    if (response.error) {
      alert(response.message);
    } else {
      alert('Tarefa atualizada com sucesso');
      setTimeout(() => {
        window.location.href = '/views/tasks.html';
      }, 1000);
    }
  }
});