export async function up(knex) {
  await knex.raw(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      github_username TEXT DEFAULT NULL,
      avatar TEXT DEFAULT NULL,
      is_admin BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      deleted_at DATETIME NULL
    );
  `);
  const users = [
    { name: 'Admin', email: 'admin@example.com', is_admin: true },
    { name: 'Ana Oliveira', email: 'ana.oliveira@example.com', github_username: 'ana-oliveira', is_admin: false },
    { name: 'Carlos Pereira', email: 'carlos.pereira@example.com', github_username: 'carlos-pereira', is_admin: false },
    { name: 'Juliana Costa', email: 'juliana.costa@example.com', github_username: 'juliana-costa', is_admin: false }
  ];
  for (const user of users) {
    console.log("inserindo usuário", user)
    await knex('users').insert(user);
  }
}

export async function down(knex) {
  await knex.raw(`DROP TABLE IF EXISTS users;`);
}