// @ts-nocheck
import { User } from '../models/users.js';

document.addEventListener('DOMContentLoaded', async () => {
  const userId = new URLSearchParams(window.location.search).get('id'); 
  const readOnly = new URLSearchParams(window.location.search).get('readOnly'); 
  const UsersModel = new User();

  const formTitle = document.getElementById('formTitle');
  const submitButton = document.getElementById('submitButton');
  const cancelButton = document.getElementById('cancelButton');
  const userForm = document.getElementById('userForm');


  if (userId) {
    const [user] = await UsersModel.getUserById(userId);
    // console.log({ user })
    if (user) {
      formTitle.textContent = readOnly ? 'Visualizar Usuário' : 'Editar Usuário';
      populateForm(user, readOnly);
      submitButton.textContent = 'Atualizar';
      submitButton.onclick = async (e) => {
        e.preventDefault();
        await updateUser(userId);
      };
    } else {
      alert('Usuário não encontrado');
    }
  } else {
    formTitle.textContent = 'Cadastrar Usuário';
    submitButton.onclick = async (e) => {
      e.preventDefault();
      await createUser();
    };
  }

  cancelButton.onclick = () => {
    window.location.href = '/views/users.html';
  };

  function populateForm(user, readOnly) {
    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
    document.getElementById('github').value = user.github_username || '';
    if (readOnly) makeFieldsReadonly();
  }

  function makeFieldsReadonly() {
    document.getElementById('name').readOnly = true;
    document.getElementById('email').readOnly = true;
    document.getElementById('github').readOnly = true;
    submitButton.disabled = true;
  }

  async function createUser() {
    const newUser = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      github_username: document.getElementById('github').value,
    };

    const response = await UsersModel.createUser(newUser);
    if (response.error) {
      console.log(response)
      alert(response.message)
    } else {
      alert('Usuário criado com sucesso. Id: ' + response.id)
      setTimeout(() => {
        window.location.href = '/views/users.html';
      }, 1000);
    }
  }

  async function updateUser(id) {
    const updatedUser = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      github_username: document.getElementById('github').value,
    };
    const response = await UsersModel.updateUser(id, updatedUser);
    if (response.error) {
      console.log(response)
      alert(response.message)
    } else {
      alert('Usuário atualizado com sucesso.')
      setTimeout(() => {
        window.location.href = '/views/users.html';
      }, 1000);
    }

  }
});