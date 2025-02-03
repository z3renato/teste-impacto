export default {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./src/db/database.sqlite" 
    },
    useNullAsDefault: true, 
    migrations: {
      directory: "./src/migrations" 
    }
  },

  production: {
    client: "sqlite3",
    connection: {
      filename: "./src/db/database.sqlite"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./src/migrations"
    }
  }
};