const API_URL = "http://localhost:3001/tasks";

class HomeModel {
  async fetchTaskStatusData() {
      try {
          const response = await fetch(API_URL); 
          if (!response.ok) {
              throw new Error('Erro ao buscar os dados do gráfico');
          }
          return await response.json();
      } catch (error) {
          console.error(error);
          return null;
      }
  }
}