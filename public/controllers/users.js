// @ts-nocheck
import {User} from '../models/users.js'



document.addEventListener("DOMContentLoaded", () => {
  
  const UsersModel = new User();

  const usersTableBody = document.getElementById("usersTableBody");
  const searchInput = document.getElementById("searchInput");
  let users = [];

  async function loadUsers() {
    console.log("carregando usuários")
    users = await UsersModel.getAllUsers();
    renderTable(users);
  }

  function renderTable(filteredUsers) {
    usersTableBody.innerHTML = "";
    filteredUsers.forEach(user => {
      const row = `<tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.github_username || "-"}</td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="viewUser(${user.id})">Visualizar</button>
                    <button class="btn btn-warning btn-sm" onclick="editUser(${user.id})">Editar</button>
                    <button class="btn btn-secondary btn-sm" onclick="userTasks(${user.id})">Tarefas</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Excluir</button>
                </td>
            </tr>`;
      usersTableBody.innerHTML += row;
    });
  }

  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    // if (searchTerm.length < 3) return
    const filteredUsers = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm)
    );
    renderTable(filteredUsers);
  });

  window.editUser = (id) => {
    window.location.href = `/views/userForm.html?id=${id}`;
  };
  window.viewUser = (id) => {
    window.location.href = `/views/userForm.html?id=${id}&readOnly=1`;
  };
  window.userTasks = (id) => {
    window.location.href = `/views/tasks.html?user=${id}`;
  };

  window.deleteUser = async (id) => {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
      await UsersModel.deleteUser(id);
      loadUsers();
    }
  };

  loadUsers();
});
