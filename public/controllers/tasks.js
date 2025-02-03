//@ts-nocheck
import { Task } from '../models/tasks.js';

document.addEventListener("DOMContentLoaded", async () => {
  const taskModel = new Task();
  const user = new URLSearchParams(window.location.search).get('user');
  // console.log({ user })
  const users = await taskModel.getUsers();

  const groupedUsers = users.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
  }, {});

  const tasksTableBody = document.getElementById("tasksTableBody");
  const searchInput = document.getElementById("searchInput");
  let tasks = [];

  async function loadTasks() {
    console.log("carregando tarefas");
    tasks = await taskModel.getAllTasks(user);
    renderTable(tasks);
  }

  function renderTable(filteredTasks) {
    tasksTableBody.innerHTML = "";
    const statusNames = {
      "pendente": "Pendente",
      "finalizada": "Finalizada",
      "em_progresso": "Em progresso"
    }
    if (!filteredTasks || filteredTasks.length == 0) {
      const row = `<tr>
                    <td>
                      Nenhum Registro
                    </td>
                </tr>`;
      tasksTableBody.innerHTML += row;
    }
    filteredTasks.forEach(task => {
      let name = !!groupedUsers[task.person_id] ? groupedUsers[task.person_id].name : '-'
      if (!groupedUsers[task.person_id]) name = '-';
      const row = `<tr>
                    <td>${task.id}</td>
                    <td>${task.title}</td>
                    <td>${task.description || "-"}</td>
                    <td>${statusNames[task.status]}</td>
                    <td>${task.priority}</td>
                    <td>${name}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editTask(${task.id})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">Excluir</button>
                    </td>
                </tr>`;
      tasksTableBody.innerHTML += row;
    });
  }



  window.editTask = (id) => {
    window.location.href = `/views/taskForm.html?id=${id}`;
  };

  window.viewTask = (id) => {
    window.location.href = `/views/taskForm.html?id=${id}&readOnly=1`;
  };

  window.deleteTask = async (id) => {
    if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
      await taskModel.deleteTask(id);
      window.location.href = `/views/tasks.html`;

    }
  };

  loadTasks();
});