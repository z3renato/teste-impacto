class HomeController {
  constructor(model) {
    this.model = model;
  }

  async init() {
    const data = await this.model.fetchTaskStatusData();
    if (data) {
      this.renderChart(data);
    }
  }

  renderChart(data) {
    const ctx = document.getElementById('taskStatusChart').getContext('2d');
    const statusLabels = {
      'pendente': 'Pendentes',
      'em_progresso': 'Em Progresso',
      'finalizada': 'Finalizadas'
    };
    const statusOrder = ['pendente', 'em_progresso', 'finalizada'];
    const groupedData = data.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {});
    const labels = statusOrder.map(status => statusLabels[status]);
    const values = statusOrder.map(status => groupedData[status] || 0);

    new Chart(ctx, {
      type: 'pie',
      options: {
        responsive: true,
        maintainAspectRatio: false
      },
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: ['#ffc107','#007bff', '#28a745' ],
        }]
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const model = new HomeModel();
  const controller = new HomeController(model);
  controller.init();
});