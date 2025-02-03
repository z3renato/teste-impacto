const express = require('express');
const cors = require('cors');  // Importa o CORS
const app = express();
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users');
const tasksRoutes = require('./routes/tasks');

// Configura o CORS para permitir requisições de qualquer origem
app.use(cors());  // Isso habilita o CORS para todas as rotas

app.use(bodyParser.json()); // Para parsing de JSON no corpo das requisições

// Usar as rotas para users e tasks
app.use('/users', usersRoutes);
app.use('/tasks', tasksRoutes);

app.get('/', (req, res) => {
  res.send('API online!');
})

// Configurar porta da aplicação
const port = process.env.API_PORT || 3000;
app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});