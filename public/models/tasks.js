const API_URL = "http://localhost:3001/tasks";

export class Task {
  async getAllTasks(user) {
    try {
      const url = !!user? `${API_URL}/search?person_id=${user}` : API_URL;
      // console.log({url})
      const response = await fetch(url);
      if (!response.ok) return []
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error; 
    }
  }

  async createTask(taskData) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error; 
    }
  }

  async getTaskById(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) throw new Error("Erro ao buscar tarefa");
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error; 
    }
  }

  async updateTask(id, taskData) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error; 
    }
  }

  async deleteTask(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });
      if (!response.ok) throw new Error("Erro ao excluir tarefa");
    } catch (error) {
      console.error(error);
      throw error; 
    }
  }

  async getUsers() {
    try {
      const response = await fetch("http://localhost:3001/users");
      if (!response.ok) throw new Error("Erro ao buscar usuários");
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}