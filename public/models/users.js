const API_URL = "http://localhost:3001/users";

export class User {
  async getAllUsers() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Erro ao buscar usuários");
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error; 
    }
  }

  async createUser(userData) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
       return await response.json();
    } catch (error) {
      console.error(error);
      throw error; 
    }
  }

  async getUserById(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) throw new Error("Erro ao buscar usuário");
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error; 
    }
  }

  async updateUser(id, userData) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
     
      return await response.json()
    } catch (error) {
      console.error(error);
      throw error; 
    }
  }

  async deleteUser(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });
      if (!response.ok) throw new Error("Erro ao excluir usuário");
    } catch (error) {
      console.error(error);
      throw error; 
    }
  }
}