export async function up(knex) {
  await knex.raw(`
    CREATE TABLE tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      person_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      description TEXT NULL,
      status TEXT CHECK( status IN ('pendente', 'em_progresso', 'finalizada') ) DEFAULT 'pendente',
      priority TEXT CHECK( priority IN ('baixa', 'media', 'alta') ) DEFAULT 'media',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      deleted_at DATETIME NULL,
      FOREIGN KEY (person_id) REFERENCES persons(id) ON DELETE CASCADE
    );
  `);
  const tasks = [
    { person_id: 1, title: 'Revisar documentação', description: 'Verificar e corrigir a documentação do projeto', status: 'pendente', priority: 'baixa' },
    { person_id: 2, title: 'Desenvolver página de login', description: 'Criar a página de login com autenticação de usuário', status: 'em_progresso', priority: 'media' },
    { person_id: 3, title: 'Testar funcionalidade de checkout', description: 'Realizar testes no fluxo de checkout e corrigir erros encontrados', status: 'finalizada', priority: 'alta' },
    { person_id: 4, title: 'Reunião de planejamento', description: 'Participar da reunião para discutir as próximas etapas do projeto', status: 'pendente', priority: 'baixa' }
  ];
  for (const task of tasks) {
    await knex('tasks').insert(task);
  }
}

export async function down(knex) {
  await knex.raw(`DROP TABLE IF EXISTS tasks;`);
}